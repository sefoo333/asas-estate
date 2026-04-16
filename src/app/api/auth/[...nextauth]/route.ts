import prisma from "@/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";

declare module "next-auth" {
  interface Session {
    isNewUser?: boolean;
    Provided?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isNewUser?: boolean;
    Provided?: boolean;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    })
  ],
callbacks: {
  async jwt({ token, user, trigger, session }) {
    if (user) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      token.isNewUser = !existingUser;
      token.Provided = true;
    }

    if (trigger === "update" && session?.isNewUser !== undefined) {
      token.isNewUser = session.isNewUser;
    }

    return token;
  },

  async session({ session, token }) {
    session.isNewUser = token.isNewUser;
    session.Provided = token.Provided;
    return session;
  },
},
  secret:process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }