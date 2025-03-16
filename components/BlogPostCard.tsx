"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface BlogPostCardProps {
  imageUrl: string;
  title: string;
  smallDesc: string;
  className?: string;
}

export const BlogPostCard = ({
  imageUrl,
  title,
  smallDesc,
  className,
}: BlogPostCardProps) => {
  const maxChars = 120;
  return (
    <div className={`${className} max-w-xs w-full group/card`}>
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto flex flex-col justify-end p-4"
        )}
      >
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

        <div className='text content'>
          <h1 className='font-bold text-xl md:text-2xl text-gray-50 relative z-10'>
            {title}
          </h1>
          <p className='font-normal text-sm text-gray-50 relative z-10 my-4 text-ellipsis'>
            {smallDesc.length > maxChars
              ? `${smallDesc.slice(0, maxChars)}...`
              : smallDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
