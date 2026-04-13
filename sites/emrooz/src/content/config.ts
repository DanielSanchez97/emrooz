import { defineCollection, z } from "astro:content";

const tools = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    status: z.enum(["planned", "in-progress", "live"]),
    order: z.number(),
    path: z.string(),
  }),
});

export const collections = { tools };
