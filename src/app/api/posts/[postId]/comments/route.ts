import { PostVisibility } from "@prisma/client";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const createCommentSchema = z.object({
  content: z.string().trim().min(1, "Comment content is required").max(3000, "Comment is too long"),
});

type RawCommentInput = {
  content?: FormDataEntryValue | string;
};

function getUserIdFromSession(session: Session | null): string | null {
  const user = session?.user as (Session["user"] & { id?: string }) | undefined;
  return user?.id ?? null;
}

function normalizeCommentInput(raw: RawCommentInput) {
  return {
    content: typeof raw.content === "string" ? raw.content : "",
  };
}

async function parseRequestBody(request: Request): Promise<RawCommentInput> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = await request.json();
    if (!json || typeof json !== "object") {
      throw new Error("Invalid JSON payload");
    }

    const body = json as Record<string, unknown>;
    return {
      content: typeof body.content === "string" ? body.content : undefined,
    };
  }

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return {
      content: formData.get("content") ?? undefined,
    };
  }

  throw new Error("Unsupported content type");
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

  try {
    const rawInput = await parseRequestBody(request);
    const parsed = createCommentSchema.safeParse(normalizeCommentInput(rawInput));

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
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

    const comment = await prisma.comment.create({
      data: {
        postId,
        authorId: userId,
        parentCommentId: null,
        content: parsed.data.content,
      },
      select: {
        id: true,
        postId: true,
        parentCommentId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (isFormSubmission(request)) {
      return NextResponse.redirect(new URL("/feed", request.url), { status: 303 });
    }

    return NextResponse.json({ message: "Comment created successfully", comment }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Invalid JSON payload" || message === "Unsupported content type") {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
