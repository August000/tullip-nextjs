import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "~/server/db";
import { env } from "~/env";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // PostgreSQL
        // usePlural: true, // if your tables are pluralized
    }),
    secret: env.BETTER_AUTH_SECRET as string,
    baseURL: env.BETTER_AUTH_URL as string,
    emailAndPassword: {
        enabled: true,
    },
    session: {
        cookieCache: { enabled: true, maxAge: 300 },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: env.GOOGLE_CLIENT_ID as string,
            clientSecret: env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [nextCookies()], // lets Server Actions set cookies automatically
});