import { fetchBlogPosts } from "@/lib/posts";
import BlogLayout from "@/components/BlogLayout"; // Client component

export const revalidate = 30; // Optional ISR

export default async function Blog() {
  const posts = await fetchBlogPosts(); // Fetch posts on the server

  return <BlogLayout posts={posts} />;
}
