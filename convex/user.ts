import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { username, imageUrl, clerkId, email }) => {
    await ctx.db.insert("users", { username, imageUrl, clerkId, email });
  },
});

export const getUser = internalQuery({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();
  },
});
