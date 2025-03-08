import { sanityClient } from "@/lib/sanity";

export async function getSimplePosts() {
  const query = `
          *[_type == 'blog'] | order(_createdAt desc) {
          title,
          smallDescription,
          "currentSlug": slug.current,
          coverImage,
          content,
          duration,
          publishedAt,
    "categoryTags": categories[]->title
      }`;

  const data = await sanityClient().fetch(query);
  return data;
}

export async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
      title,
      smallDescription,
      "currentSlug": slug.current,
      duration,
      content,
      coverImage
    }`;

  return await sanityClient().fetch(query, { slug });
}

export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) { title }`;

  const data = await sanityClient().fetch(query);
  return data.map((cat: { title: string }) => cat.title);
}
