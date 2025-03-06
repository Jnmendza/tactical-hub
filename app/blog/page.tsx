import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSimplePosts } from "@/data/sanity";
import { urlFor } from "@/lib/sanity";
import { SimpleBlogCard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import BlogHeader from "@/components/BlogHeader";

export const revalidate = 30;

export default async function Blog() {
  const data: SimpleBlogCard[] = await getSimplePosts();
  if (!data || data.length === 0) return <p>No posts available.</p>;

  const [headerPost, ...posts] = data;

  return (
    <div>
      {/* Hero Header for First Post */}
      <BlogHeader post={headerPost} />

      {/* Blog Grid for Remaining Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        {posts.map((post, index) => (
          <Card key={index} className='w-full border border-secondary-green'>
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.title}
              width={600}
              height={500}
              className='rounded-t-lg h-[200px] object-cover'
            />
            <CardContent className='mt-5 text-black dark:text-mint-green'>
              <h3 className='text-lg line-clamp-2 font-bold'>{post.title}</h3>
              <p className='line-clamp-3 text-sm mt-2 prose prose-blue dark:prose-invert'>
                {post.smallDescription}
              </p>
              <Button
                asChild
                className='w-full mt-7 bg-black dark:bg-mint-green'
              >
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
