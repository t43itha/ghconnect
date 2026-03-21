import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  businesses: defineTable({
    name: v.string(),
    category: v.string(),
    description: v.string(),
    location: v.string(),
    image: v.string(),
    rating: v.number(),
    featured: v.boolean(),
    contactPhone: v.string(),
    contactEmail: v.string(),
    website: v.string(),
  }),
  jobs: defineTable({
    title: v.string(),
    company: v.string(),
    location: v.string(),
    type: v.string(),
    description: v.string(),
    requirements: v.array(v.string()),
    salary: v.string(),
    postedDate: v.string(),
    featured: v.boolean(),
  }),
  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    organizer: v.string(),
    image: v.string(),
    category: v.string(),
  }),
  categories: defineTable({
    name: v.string(),
    icon: v.string(),
    type: v.string(),
    count: v.number(),
  }),
});
