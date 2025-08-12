import NextAuth, { DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type JWT } from "next-auth/jwt";

import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import { getUserById } from "./helpers/read-db";

declare module "next-auth" {
  interface Session {
    user: {
      isPremium: boolean;
      address: string;
      fid: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isPremium: boolean;
    address: string;
    fid: number;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    error: "/error",
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      if (session.user && token.fid) session.user.fid = token.fid;
      if (session.user && token.address) session.user.address = token.address;
      if (session.user && token.isPremium)
        session.user.isPremium = token.isPremium;

      return session;
    },
    async jwt({ token }) {
      // console.log("token", token);
      if (token.sub) {
        const user = await getUserById(token.sub);
        // console.log("user", user);

        if (user) {
          token.isPremium = user.isPremium;
          token.address = user.walletAddress;
          token.fid = user.fid;
        }
      }
      return token;
    },
  },

  // always comment the cookies if pushing to prod
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none", // IMPORTANT for tunneling
  //       secure: true, // required for "none"
  //     },
  //   },
  //   csrfToken: {
  //     name: "__Host-next-auth.csrf-token",
  //     options: {
  //       httpOnly: false,
  //       sameSite: "none",
  //       secure: true,
  //     },
  //   },
  // },
  // eslint-disable-next-line
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
