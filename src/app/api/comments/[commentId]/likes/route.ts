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

export async function GET(_request: Request, context: { params: Promise<{ commentId: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await context.params;
  if (!commentId) {
    return NextResponse.json({ error: "Invalid comment id" }, { status: 400 });
  }

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      post: {
        OR: [{ visibility: PostVisibility.PUBLIC }, { authorId: userId }],
      },
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

  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  const users = comment.likes.map((like) => ({
    ...like.user,
    likedAt: like.createdAt,
  }));

  return NextResponse.json({ users, total: users.length });
}
