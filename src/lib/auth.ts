import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL .env ফাইলে খুঁজে পাওয়া যায়নি!");
}

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bazar_dor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://bazar-dor-projects.vercel.app",
  
  // 🟢 সিকিউরিটি ও Invalid Origin এরর বন্ধ করার জন্য এটি যোগ করা জরুরি
  trustedOrigins: [
    "https://bazar-dor-projects.vercel.app",
    "http://localhost:3000",
  ],

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GIT_HUB_CLIENT_ID as string,
      clientSecret: process.env.GIT_HUB_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});