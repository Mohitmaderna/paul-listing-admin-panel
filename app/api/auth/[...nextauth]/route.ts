import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth/next";

/**
 * The handler for the NextAuth API.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
