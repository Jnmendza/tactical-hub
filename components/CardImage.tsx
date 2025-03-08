import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export const CardImage = ({
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
