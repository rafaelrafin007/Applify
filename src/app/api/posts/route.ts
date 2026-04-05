import { PostVisibility } from "@prisma/client";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const createPostSchema = z.object({
  content: z.string().trim().min(1, "Post content is required").max(5000, "Post content is too long"),
  imageUrl: z.string().trim().max(2048, "Image URL is too long").optional(),
  visibility: z.nativeEnum(PostVisibility).default(PostVisibility.PUBLIC),
});

type RawPostInput = {
  content?: FormDataEntryValue | string;
  imageUrl?: FormDataEntryValue | string;
  visibility?: FormDataEntryValue | string;
};

function getUserIdFromSession(session: Session | null): string | null {
  const user = session?.user as (Session["user"] & { id?: string }) | undefined;
  return user?.id ?? null;
}

function normalizePostInput(raw: RawPostInput) {
  return {
    content: typeof raw.content === "string" ? raw.content : "",
    imageUrl: typeof raw.imageUrl === "string" && raw.imageUrl.trim() ? raw.imageUrl : undefined,
    visibility: typeof raw.visibility === "string" ? raw.visibility : undefined,
  };
}

async function parseRequestBody(request: Request): Promise<RawPostInput> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = await request.json();
    if (!json || typeof json !== "object") {
      throw new Error("Invalid JSON payload");
    }

    const body = json as Record<string, unknown>;

    return {
      content: typeof body.content === "string" ? body.content : undefined,
      imageUrl: typeof body.imageUrl === "string" ? body.imageUrl : undefined,
      visibility: typeof body.visibility === "string" ? body.visibility : undefined,
    };
  }

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const formData = await request.formData();

    return {
      content: formData.get("content") ?? undefined,
      imageUrl: formData.get("imageUrl") ?? undefined,
      visibility: formData.get("visibility") ?? undefined,
    };
  }

  throw new Error("Unsupported content type");
}

function isFormSubmission(request: Request): boolean {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    where: {
      OR: [{ visibility: PostVisibility.PUBLIC }, { authorId: userId }],
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      content: true,
      imageUrl: true,
      visibility: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawInput = await parseRequestBody(request);
    const parsed = createPostSchema.safeParse(normalizePostInput(rawInput));

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content: parsed.data.content,
        imageUrl: parsed.data.imageUrl,
        visibility: parsed.data.visibility,
      },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        visibility: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (isFormSubmission(request)) {
      return NextResponse.redirect(new URL("/feed", request.url), { status: 303 });
    }

    return NextResponse.json({ message: "Post created successfully", post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Invalid JSON payload" || message === "Unsupported content type") {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
