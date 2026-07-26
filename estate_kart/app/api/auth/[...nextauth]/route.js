import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOption";

const handler = NextAuth(authOptions);

// Next.js App Router requires exact uppercase naming for HTTP verbs
export { handler as GET, handler as POST };