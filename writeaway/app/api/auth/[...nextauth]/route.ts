import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 1) Lookup user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("No user found");
        }

        // 2) Compare the hashed password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // 3) Return the user object (will be available in JWT)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    // If user goes to a page that requires auth, NextAuth will redirect them here:
    signIn: "/(auth)/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If 'user' is returned (on initial login), merge it into 'token'.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      // TS complains about 'session.user' possibly being undefined
      // and that 'id' doesn't exist. We'll force-cast here:
      (session.user as any).id = token.id;
      (session.user as any).email = token.email;
      (session.user as any).name = token.name;
      return session;
    },
  },
  // Optionally add a `secret` if needed
  // secret: process.env.NEXTAUTH_SECRET
};

// Export NextAuth as GET/POST handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
