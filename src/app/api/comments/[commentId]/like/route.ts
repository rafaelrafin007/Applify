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

export async function POST(request: Request, context: { params: Promise<{ commentId: string }> }) {
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
    select: { id: true },
  });

  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  const existingLike = await prisma.commentLike.findUnique({
    where: {
      commentId_userId: {
        commentId,
        userId,
      },
    },
    select: { id: true },
  });

  let liked: boolean;

  if (existingLike) {
    await prisma.commentLike.delete({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    });
    liked = false;
  } else {
    await prisma.commentLike.create({
      data: {
        commentId,
        userId,
      },
    });
    liked = true;
  }

  const likesCount = await prisma.commentLike.count({
    where: { commentId },
  });

  if (isFormSubmission(request)) {
    return NextResponse.redirect(new URL("/feed", request.url), { status: 303 });
  }

  return NextResponse.json({ liked, likesCount });
}
