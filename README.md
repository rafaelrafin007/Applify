# Appifylab Task - Social Feed App

## Project Overview
This is a full-stack social feed assessment app built with Next.js App Router and TypeScript.

Core scope implemented:
- Credentials authentication (register/login)
- Protected feed route
- Public/private posts with visibility filtering
- Comments and nested replies (single `Comment` table with self-relation)
- Like/unlike for posts, comments, and replies
- Liked-users list display
- Image upload to Cloudinary for post creation

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth (credentials provider, JWT session)
- Zod (input validation)
- bcryptjs (password hashing)
- Cloudinary (image hosting/upload)

## Local Setup
1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
cp .env.example .env
```

3. Fill all required env values in `.env` (see below).

4. Apply Prisma migrations and generate client:
```bash
npx prisma migrate dev
```

5. Run the app:
```bash
npm run dev
```

6. Open:
- `http://localhost:3000/login`
- `http://localhost:3000/register`
- `http://localhost:3000/feed`

## Environment Variables
Required in `.env` (local) and Vercel Project Settings (production):

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Notes:
- `NEXTAUTH_SECRET` should be a long random secret.
- `NEXTAUTH_URL` should be your app base URL in each environment.

## Implemented Features
- User registration with `firstName`, `lastName`, `email`, `password`
- Credentials login with secure password verification
- Feed access restricted to authenticated users
- Feed query rules:
  - show all `PUBLIC` posts
  - show current user's own `PRIVATE` posts
  - hide other users' `PRIVATE` posts
- Create posts with text + optional image
- Comment on posts
- Reply to comments
- Like/unlike posts, comments, and replies
- View users who liked a post/comment/reply

## Assumptions / Limitations
- No pagination or infinite scroll yet.
- Feed interactions use simple form submits/refresh instead of optimistic UI.
- No edit/delete for posts/comments/replies yet.
- No forgot-password, social login, notifications, or profile management.
- Cloudinary upload currently accepts images only and stores under `appifylab-task/posts`.

## Vercel Deployment Checklist
1. Push repository to GitHub.
2. Import project in Vercel.
3. Set Framework Preset to `Next.js`.
4. Add all required environment variables (listed above) for Production (and Preview if needed).
5. Ensure `DATABASE_URL` points to production PostgreSQL.
6. Ensure Cloudinary keys are valid in Vercel env settings.
7. Redeploy after env vars are added/updated.
8. Run Prisma migrations against production DB:
```bash
npx prisma migrate deploy
```
9. Validate flows after deploy:
- register/login
- protected `/feed`
- post create with image upload
- comment/reply/like actions

## Is `NEXTAUTH_URL` Required On Vercel?
- Not strictly required for basic Vercel preview usage because host info can be inferred.
- Recommended for stability and callback correctness.
- Required when using a custom production domain to avoid auth callback mismatch issues.
- Best practice: set it explicitly to your production URL (for example `https://your-domain.com`).
