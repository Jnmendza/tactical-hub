import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSimplePosts } from "@/data/sanity";
import { urlFor } from "@/lib/sanity";
import { SimpleBlogCard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;

export default async function Blog() {
  const data: SimpleBlogCard[] = await getSimplePosts();

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 mt-5 gap-5'>
      {data.map((post, index) => (
        <Card key={index} className='w-full border border-[#00554b]'>
          <Image
            src={urlFor(post.coverImage).url()}
            alt={post.title}
            width={600}
            height={500}
            className='rounded-t-lg h-[200px] object-cover'
          />
          <CardContent className='mt-5 text-black dark:text-[#ceeec6]'>
            <h3 className='text-lg line-clamp-2 font-bold '>{post.title}</h3>
            <p className='line-clamp-3 text-sm mt-2 prose prose-blue dark:prose-invert'>
              {post.smallDescription}
            </p>
            <Button asChild className='w-full mt-7 bg-black dark:bg-[#ceeec6]'>
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
