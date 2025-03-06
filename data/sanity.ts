import { sanityClient } from "@/lib/sanity";

export async function getSimplePosts() {
  const query = `
          *[_type == 'blog'] | order(_createdAt desc) {
      title,
          smallDescription,
          "currentSlug": slug.current,
          coverImage,
          duration
      }`;

  const data = await sanityClient().fetch(query);
  return data;
}

export async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
      title,
      content,
      coverImage
    }`;

  return await sanityClient().fetch(query, { slug });
}
