import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return null;
    }

    const userId = await getAuthUserId(ctx);
    const user = userId === null ? null : await ctx.db.get(userId);

    return {
      ...user,
      name:
        user?.name ??
        identity.name ??
        identity.nickname ??
        identity.preferredUsername ??
        undefined,
      email: user?.email ?? identity.email ?? undefined,
      tokenIdentifier: identity.tokenIdentifier,
    };
  },
});
