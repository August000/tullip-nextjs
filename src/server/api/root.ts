import { createCallerFactory, createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { publicProcedure } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() };
  }),
  
  // Example protected procedure
  me: protectedProcedure.query(({ ctx }) => {
    // type-safe current user - session is guaranteed to exist
    return {
      user: ctx.session.user,
      sessionInfo: {
        id: ctx.session.session.id,
        expiresAt: ctx.session.session.expiresAt,
      },
    };
  }),
  
  // Example procedure that works for both authenticated and unauthenticated users
  profile: publicProcedure.query(({ ctx }) => {
    if (ctx.session) {
      return { 
        authenticated: true, 
        user: ctx.session.user,
      };
    }
    return { 
      authenticated: false, 
      user: null,
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
