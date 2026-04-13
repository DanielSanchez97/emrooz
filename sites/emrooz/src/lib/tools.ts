import { getCollection } from "astro:content";

export async function getTools() {
  const tools = await getCollection("tools");
  return tools.sort((a, b) => a.data.order - b.data.order);
}
