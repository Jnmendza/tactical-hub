"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface BlogPostCardProps {
  imageUrl: string;
  title: string;
  smallDesc: string;
  className?: string;
  slug: string;
}

export const BlogPostCard = ({
  imageUrl,
  title,
  smallDesc,
  className,
  slug,
}: BlogPostCardProps) => {
  const maxChars = 120;
  return (
    <div className={`${className} max-w-xs w-full group/card`}>
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-end p-4"
        )}
      >
        {/* Link should wrap only the clickable area */}
        <Link href={`/blog/${slug}`} className='absolute inset-0 z-10'>
          <span className='sr-only'>Go to {title}</span>
        </Link>

        {/* Image Component */}
        <div className='absolute inset-0'>
          <Image
            src={urlFor(imageUrl).url()}
            alt={title}
            fill
            className='object-cover rounded-md'
            priority
          />
        </div>
        <div className='absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60'></div>

        {/* ✅ Move the text outside Link & position it at the bottom */}
        <div className='absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent'>
          <h1 className='font-bold text-xl md:text-2xl text-gray-50'>
            {title}
          </h1>
          <p className='font-normal text-sm text-gray-50 mt-2'>
            {smallDesc.length > maxChars
              ? `${smallDesc.slice(0, maxChars)}...`
              : smallDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
