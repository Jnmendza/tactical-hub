import { getSimplePosts } from "@/data/sanity";
import { SimpleBlogCard } from "./types";

export async function fetchBlogPosts(): Promise<SimpleBlogCard[]> {
  return await getSimplePosts();
}
