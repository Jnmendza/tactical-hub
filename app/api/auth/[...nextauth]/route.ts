import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("Redirect URI:", `${baseUrl}/api/auth/callback/google`);
      return baseUrl;
    },
    async session({ session, token }) {
      const user = await prisma.user.upsert({
        where: { email: session.user?.email! }, // Use email since no googleId
        update: {
          userName: session.user?.name,
          image: session.user?.image,
          updatedAt: new Date(),
        },
        create: {
          email: session.user?.email!,
          userName: session.user?.name,
          image: session.user?.image,
        },
      });

      session.user = {
        ...session.user,
        id: user.id,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
