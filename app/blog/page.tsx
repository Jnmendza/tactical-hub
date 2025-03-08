import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSimplePosts } from "@/data/sanity";
import { urlFor } from "@/lib/sanity";
import { SimpleBlogCard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import BlogHeader from "@/components/BlogHeader";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
export const revalidate = 30;

export default async function Blog() {
  const data: SimpleBlogCard[] = await getSimplePosts();
  if (!data || data.length === 0) return <p>No posts available.</p>;

  const [headerPost, ...posts] = data;
  const validPosts = posts.filter((post) => post.coverImage?.asset?._ref);

  const CardImage = ({
    coverImage,
    title,
  }: {
    coverImage: any;
    title: string;
  }) => {
    if (!coverImage || !coverImage.asset?._ref) {
      console.warn("Invalid coverImage:", coverImage);
      return (
        <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100'></div>
      );
    }
    return (
      <div className='relative w-full h-40 md:h-60 lg:h-72'>
        <Image
          src={urlFor(coverImage).url()}
          alt={title}
          fill
          className='rounded-t-lg object-cover'
        />
      </div>
    );
  };
  const expandedIndices = [3, 6, 10, 14, 17]; // Customize this array to control which posts expand

  return (
    <div>
      {/* Hero Header for First Post */}
      <BlogHeader post={headerPost} />

      {/* Blog Grid for Remaining Posts */}
      <div className='grid grid-cols-1 gap-5 mt-10'>
        <BentoGrid className='mx-auto'>
          {validPosts.map(({ title, smallDescription, coverImage }, index) => (
            <BentoGridItem
              key={index}
              title={title}
              description={smallDescription}
              header={<CardImage coverImage={coverImage} title={title} />}
              className={expandedIndices.includes(index) ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
