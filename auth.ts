import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/db";
import bcrypt from "bcryptjs";

export const { auth, signIn, handlers, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        });

        if (!user) return null;

        const match = bcrypt.compare(credentials!.password, user.password);

        if (match) return user;

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || "USER";
      }

      return session;
    },
  },
});
