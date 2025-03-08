import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { SimpleBlogCard } from "@/lib/types";
import { justAnotherHand } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

interface BlogHeaderProps {
  post: SimpleBlogCard;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <div className='relative w-full flex flex-col'>
      {/* Image Wrapper with Conditional Rounded Corners */}
      <div className='relative w-full md:rounded-xl overflow-hidden'>
        <AspectRatio.Root ratio={16 / 9} className='w-full'>
          <Image
            // src={"/"}
            src={urlFor(post.coverImage).url()}
            alt={post.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
            className='border border-secondary-green object-cover 
                      rounded-t-lg md:rounded-xl'
          />
        </AspectRatio.Root>

        {/* Black Overlay: Stays Only on the Image */}
        <div className='absolute inset-0 bg-black/40 rounded-t-lg md:rounded-xl pointer-events-none'></div>
      </div>

      {/* Green Content Box: Moves Below on Mobile, Overlays on Large Screens */}
      <div
        className='w-full md:w-auto md:max-w-[40%] bg-primary-green/90 p-4 md:p-6 rounded-lg shadow-lg 
                    md:absolute md:bottom-0 md:right-0 mt-[-10px] md:mt-0'
      >
        <h1 className='text-2xl md:text-3xl font-bold text-secondary-green line-clamp-3'>
          {post.title}
        </h1>
        <p className='mt-2 text-secondary-green line-clamp-3'>
          {post.smallDescription}
        </p>
        <div className='flex justify-between items-center mt-4'>
          <Button asChild className='bg-black text-mint-green'>
            <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
          </Button>
          <p
            className={`${justAnotherHand.className} text-2xl md:text-3xl ml-4 text-mint-green`}
          >
            {post.duration}
          </p>
        </div>
      </div>
    </div>
  );
}
