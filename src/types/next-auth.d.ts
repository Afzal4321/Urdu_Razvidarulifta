import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    email?: string;
    picture?: string;
  }
}
