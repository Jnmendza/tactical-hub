import { sanityClient, urlFor } from "@/lib/sanity";
import { BlogPost as BlogPostType } from "@/lib/types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getPost } from "@/data/sanity";

export const revalidate = 30;

export async function generateStaticParams() {
  const query = `*[_type == "blog"]{ "slug": slug.current }`;
  const posts = await sanityClient().fetch(query);

  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post: BlogPostType | null = await getPost(params.slug);

  if (!post) {
    return <h1>Post Not Found</h1>;
  }
  console.log(post);
  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h1 className='text-5xl font-bold text-center'>{post.title}</h1>
      <Image
        src={urlFor(post.coverImage).url()}
        alt={post.title}
        width={800}
        height={500}
        priority
        className='w-full mt-10 rounded-lg'
      />
      <div className='mt-16 m-auto prose dark:prose-invert'>
        <PortableText value={post.content} />
      </div>
    </div>
  );
}
