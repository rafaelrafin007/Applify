import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import prisma from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as {
          id?: string;
          firstName?: string;
          lastName?: string;
          email?: string | null;
        };

        token.id = authUser.id;
        token.firstName = authUser.firstName;
        token.lastName = authUser.lastName;
        token.email = authUser.email ?? token.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const typedUser = session.user as typeof session.user & {
          id?: string;
          firstName?: string;
          lastName?: string;
        };

        typedUser.id = token.id as string | undefined;
        typedUser.firstName = token.firstName as string | undefined;
        typedUser.lastName = token.lastName as string | undefined;
        typedUser.email = (token.email as string | undefined) ?? typedUser.email;
        session.user = typedUser;
      }

      return session;
    },
  },
};
