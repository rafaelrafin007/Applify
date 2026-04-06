# Appifylab Full Stack Developer Task Submission

A full-stack social feed application built with **Next.js**, **TypeScript**, **Prisma**, **PostgreSQL**, **NextAuth**, and **Cloudinary**.

This project was built for the **Appifylab Full Stack Developer assessment** based on the provided **Login**, **Register**, and **Feed** designs.

---

## Live Demo

- **Live URL:** https://applify-beta.vercel.app/
- **GitHub Repository:** https://github.com/rafaelrafin007/Applify
- **Video Walkthrough:** [Add your YouTube unlisted/private link here]

---

## Project Summary

This application implements a small social feed platform with secure authentication and protected feed access.

### Implemented Core Features

- User registration with:
  - first name
  - last name
  - email
  - password
- Secure login with credentials authentication
- Protected feed route for authenticated users only
- Create posts with:
  - text
  - optional image upload
  - public/private visibility
- Feed ordering with newest posts first
- Public/private visibility rules:
  - **Public posts** are visible to everyone
  - **Private posts** are visible only to the author
- Comments on posts
- Replies to comments
- Like/unlike system for:
  - posts
  - comments
  - replies
- View users who liked a post, comment, or reply
- Image upload using Cloudinary

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- React

### Backend
- Next.js Route Handlers
- NextAuth (Credentials Provider, JWT session strategy)

### Database / ORM
- PostgreSQL
- Prisma ORM

### Validation / Security
- Zod
- bcryptjs

### Media Upload
- Cloudinary

### Deployment
- Vercel

---

## Application Flow

### Authentication
- Users can register through the register page
- Passwords are hashed using `bcryptjs`
- Users can log in using email and password
- Sessions are handled using **NextAuth JWT sessions**
- Unauthenticated users are redirected from `/feed` to `/login`

### Feed
- Logged-in users can create posts
- Posts can be marked as:
  - `PUBLIC`
  - `PRIVATE`
- The feed shows:
  - all public posts
  - the current user's own private posts
- Posts are sorted by `createdAt DESC`

### Comments and Replies
- Users can add comments to posts
- Users can reply to comments
- Comments and replies use a **single `Comment` table** with a self-relation through `parentCommentId`

### Likes
- Users can like/unlike:
  - posts
  - comments
  - replies
- Like state is toggled using composite unique keys
- The UI also shows who liked each item

### Image Upload
- Users can upload an image file while creating a post
- The file is uploaded to Cloudinary
- The returned Cloudinary URL is stored in the post record

---

## Database Design

### Main Models
- `User`
- `Post`
- `Comment`
- `PostLike`
- `CommentLike`

### Key Design Decisions
- Comments and replies are stored in the same table using a self-relation
- Separate like tables are used for posts and comments/replies
- Post visibility is managed using a Prisma enum:
  - `PUBLIC`
  - `PRIVATE`

This design keeps the data model simple, normalized, and extensible.

---

## Project Structure

```bash
.
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── login/
│   │   ├── register/
│   │   ├── feed/
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── validators/
├── .env.example
├── package.json
└── README.md