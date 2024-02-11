import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import prisma from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { User as PrismaUser } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({session, user}) => {
      return {
        ...session,
        user: {
          id: user.id,
          salaryChecked: user.salary !== null,
        },
      };
    }
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends PrismaUser {
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      salaryChecked: boolean;
    };
  }
}
