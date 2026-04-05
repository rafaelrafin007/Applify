import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

function getUserIdFromSession(session: Session | null): string | null {
  const user = session?.user as (Session["user"] & { id?: string }) | undefined;
  return user?.id ?? null;
}

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

async function uploadBufferToCloudinary(buffer: Buffer, fileName: string): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "appifylab-task/posts",
        resource_type: "image",
        use_filename: true,
        unique_filename: true,
        filename_override: fileName,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve(result);
      }
    );

    upload.end(buffer);
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    configureCloudinary();

    const formData = await request.formData();
    const fileValue = formData.get("file");

    if (!(fileValue instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (fileValue.size === 0) {
      return NextResponse.json({ error: "Uploaded file is empty" }, { status: 400 });
    }

    if (!fileValue.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 422 });
    }

    const arrayBuffer = await fileValue.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await uploadBufferToCloudinary(buffer, fileValue.name);

    return NextResponse.json({
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      width: uploaded.width,
      height: uploaded.height,
      format: uploaded.format,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";

    if (message === "Cloudinary environment variables are missing") {
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
