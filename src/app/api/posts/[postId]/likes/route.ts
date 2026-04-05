import { PostVisibility } from "@prisma/client";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

function getUserIdFromSession(session: Session | null): string | null {
  const user = session?.user as (Session["user"] & { id?: string }) | undefined;
  return user?.id ?? null;
}

export async function GET(_request: Request, context: { params: Promise<{ postId: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = await context.params;
  if (!postId) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      OR: [{ visibility: PostVisibility.PUBLIC }, { authorId: userId }],
    },
    select: {
      id: true,
      likes: {
        orderBy: { createdAt: "desc" },
        select: {
          createdAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const users = post.likes.map((like) => ({
    ...like.user,
    likedAt: like.createdAt,
  }));

  return NextResponse.json({ users, total: users.length });
}
