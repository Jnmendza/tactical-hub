"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import BlogHeader from "@/components/BlogHeader";
import { urlFor } from "@/lib/sanity";
import { SimpleBlogCard } from "@/lib/types";
import Image from "next/image";

export default function BlogPage({ posts }: { posts: SimpleBlogCard[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  if (!posts || posts.length === 0) return <p>No posts available.</p>;

  // List of filters
  const filters = ["All", "New", "5-3-2", "4-2-3-1", "3-5-2", "4-3-3"];

  // Store the first post before filtering
  const headerPost = posts[0];

  // Filter & Sort Posts
  const filteredPosts = posts
    .slice(1)
    .filter((post) => {
      if (activeFilter === "All") return true;
      if (activeFilter == "New") return true;
      return post.categoryTags?.some((cat) => cat === activeFilter);
    })
    .sort((a, b) =>
      activeFilter === "New"
        ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        : 0
    );

  return (
    <div>
      {/* Hero Header */}
      {headerPost && <BlogHeader post={headerPost} />}

      {/* Blog Grid */}
      {/* Filter Buttons */}
      <div className='flex space-x-4 my-6'>
        {filters.map((filter) => (
          <Button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md ${
              activeFilter === filter
                ? "bg-primary-green text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>
      <div className='grid grid-cols-1 gap-5 mt-10'>
        <BentoGrid className='mx-auto'>
          {filteredPosts.map(
            ({ title, smallDescription, coverImage, categoryTags }, index) => (
              <BentoGridItem
                key={index}
                title={title}
                description={smallDescription}
                tags={categoryTags || []}
                header={
                  <div className='relative w-full h-40 md:h-60 lg:h-72'>
                    <Image
                      src={urlFor(coverImage).url()}
                      alt={title}
                      fill
                      className='rounded-t-lg object-cover'
                    />
                  </div>
                }
                className={index % 5 === 0 ? "md:col-span-2" : ""}
              />
            )
          )}
        </BentoGrid>
      </div>
    </div>
  );
}
