import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import prisma from "./prisma";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { User as PrismaUser } from "@prisma/client";
import { getRandomString } from "./utils";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    })
  ],
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async ({...data}) => {
      const userId = getRandomString(10);
      const user = await prisma.user.create({
        data: {
          id: userId,
          name: userId,
          email: data.email,
          emailVerified: data.emailVerified,
        },
      });
      return user;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({session, user}) => {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          salary: user.salary !== null && user.salaryRangeId !== null ? {
            value: user.salary,
            sr: user.salaryRangeId
          } : null
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
      name: string;
      email: string;
      salary: {
        value: number
        sr: string
      } | null;
    };
  }
}
