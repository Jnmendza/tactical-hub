import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient, urlFor } from "@/lib/sanity";
import { SimpleBlogCard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export async function getPosts() {
  const query = `
        *[_type == 'blog'] | order(_createdAt desc) {
    title,
        smallDescription,
        "currentSlug": slug.current,
        coverImage
    }`;

  const data = await sanityClient().fetch(query);
  return data;
}

export default async function Blog() {
  const data: SimpleBlogCard[] = await getPosts();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
      {data.map((post, index) => (
        <Card key={index}>
          <Image
            src={urlFor(post.coverImage).url()}
            alt={post.title}
            width={600}
            height={500}
            className='rounded-t-lg h-[200px] object-cover'
          />
          <CardContent className='mt-5'>
            <h3 className='text-lg line-clamp-2 font-bold'>{post.title}</h3>
            <p className='line-clamp-3 text-sm mt-2 text-gray-600'>
              {post.smallDescription}
            </p>
            <Button asChild className='w-full mt-7'>
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
