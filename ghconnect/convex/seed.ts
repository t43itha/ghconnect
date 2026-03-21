import { mutation } from "./_generated/server";
import { businessesSeed, jobsSeed, eventsSeed, categoriesSeed } from "./seedData";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {

    const existingBusinesses = await ctx.db.query("businesses").collect();
    for (const b of existingBusinesses) await ctx.db.delete(b._id);

    const existingJobs = await ctx.db.query("jobs").collect();
    for (const j of existingJobs) await ctx.db.delete(j._id);

    const existingEvents = await ctx.db.query("events").collect();
    for (const e of existingEvents) await ctx.db.delete(e._id);

    const existingCategories = await ctx.db.query("categories").collect();
    for (const c of existingCategories) await ctx.db.delete(c._id);

    for (const business of businessesSeed)
      await ctx.db.insert("businesses", business);
    for (const job of jobsSeed) await ctx.db.insert("jobs", job);
    for (const event of eventsSeed) await ctx.db.insert("events", event);
    for (const category of categoriesSeed)
      await ctx.db.insert("categories", category);
  },
});
