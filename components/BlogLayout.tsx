"use client";
import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import { SimpleBlogCard } from "@/lib/types";
import BlogHeader from "@/components/BlogHeader";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { justAnotherHand } from "@/lib/fonts";

export default function BlogPage({ posts }: { posts: SimpleBlogCard[] }) {
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [newFilter, setNewFilter] = useState<boolean>(false);
  if (!posts || posts.length === 0) return <p>No posts available.</p>;

  // Get the date from 7 days ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Store the first post before filtering
  const headerPost = posts[0];

  // Apply filters
  const filteredPosts = posts
    .slice(1) // Exclude the first post from filtering
    .filter((post) => {
      // If "New" is selected, only show posts from the last 7 days
      if (newFilter) {
        const postDate = new Date(post.publishedAt);
        return postDate >= oneWeekAgo;
      }

      // Otherwise, filter by category (or show all if no category is selected)
      return (
        activeFilter.length === 0 ||
        post.categoryTags.some((cat) => activeFilter.includes(cat))
      );
    });

  return (
    <div>
      {/* Hero Header */}
      {headerPost && <BlogHeader post={headerPost} />}

      {/* Filter Bar */}
      <div className='flex  justify-evenly mt-10'>
        <h1 className={`${justAnotherHand.className} text-7xl text-mint-green`}>
          Blog Posts
        </h1>
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          newFilter={newFilter}
          setNewFilter={setNewFilter}
        />
      </div>

      {/* Blog Grid */}
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
