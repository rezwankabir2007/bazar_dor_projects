import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // ব্রাউজার নিজেই বুঝে নেবে সে কি localhost এ আছে নাকি Vercel এ
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://bazar-dor-projects.vercel.app",
});

export const { signIn, signUp, signOut, useSession } = authClient;