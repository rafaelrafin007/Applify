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

function isFormSubmission(request: Request): boolean {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");
}

export async function POST(request: Request, context: { params: Promise<{ postId: string }> }) {
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
    select: { id: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const existingLike = await prisma.postLike.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
    select: { id: true },
  });

  let liked: boolean;

  if (existingLike) {
    await prisma.postLike.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    liked = false;
  } else {
    await prisma.postLike.create({
      data: {
        postId,
        userId,
      },
    });
    liked = true;
  }

  const likesCount = await prisma.postLike.count({
    where: { postId },
  });

  if (isFormSubmission(request)) {
    return NextResponse.redirect(new URL("/feed", request.url), { status: 303 });
  }

  return NextResponse.json({ liked, likesCount });
}
