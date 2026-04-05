"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setErrorMessage("Post content is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      let imageUrl: string | undefined;

      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadResult = (await uploadResponse.json()) as {
          imageUrl?: string;
          error?: string;
        };

        if (!uploadResponse.ok || !uploadResult.imageUrl) {
          throw new Error(uploadResult.error ?? "Image upload failed");
        }

        imageUrl = uploadResult.imageUrl;
      }

      const postResponse = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: trimmedContent,
          visibility,
          imageUrl,
        }),
      });

      const postResult = (await postResponse.json()) as {
        error?: string;
      };

      if (!postResponse.ok) {
        throw new Error(postResult.error ?? "Post creation failed");
      }

      setContent("");
      setVisibility("PUBLIC");
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16"
      onSubmit={handleSubmit}
    >
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <img src="/assets/images/txt_img.png" alt="User avatar" className="_txt_img" />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea
            className="form-control _textarea"
            placeholder="Write something"
            id="feed-post-box"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            disabled={isSubmitting}
          />
          <label className="_feed_textarea_label" htmlFor="feed-post-box">
            Write something ...
          </label>
        </div>
      </div>

      <div className="_feed_inner_text_area_bottom">
        <div className="_feed_inner_text_area_item" style={{ gap: "10px", flexWrap: "wrap" }}>
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <label className="_feed_inner_text_area_bottom_photo_link" htmlFor="feed-image-upload">
              Photo
            </label>
          </div>
          <input
            id="feed-image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="form-control"
            style={{ maxWidth: "220px" }}
            onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
            disabled={isSubmitting}
          />
          <select
            name="visibility"
            className="form-select"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as "PUBLIC" | "PRIVATE")}
            style={{ maxWidth: "140px" }}
            disabled={isSubmitting}
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button type="submit" className="_feed_inner_text_area_btn_link" disabled={isSubmitting}>
            <span>{isSubmitting ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>

      {errorMessage ? (
        <p style={{ marginTop: "10px", color: "#dc2626", fontSize: "13px" }}>{errorMessage}</p>
      ) : null}
    </form>
  );
}
