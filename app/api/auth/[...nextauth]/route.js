import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import GithubProvider from "next-auth/providers/github";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      
      try {
        await connectToDB();

        // Check if a user already exist
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if not save new user to the database

        if (!userExists) {
          console.log("Creating user");
          await User.create({
            email: profile.email,
            username:
              profile.name?.replace(" ", "").toLowerCase() || profile.login,
            image: profile.picture || profile.avatar_url,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
