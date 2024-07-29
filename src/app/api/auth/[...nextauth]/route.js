import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import admin from "@/models/Admin";
import ConnectMongoDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await ConnectMongoDB();
          const businessAdmins = await admin.findOne({ email });

          if (!businessAdmins) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            businessAdmins.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return businessAdmins;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
