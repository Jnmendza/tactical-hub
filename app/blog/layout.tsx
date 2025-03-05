import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export const metadata = {
  title: "Blog",
  description: "Read the latest blog posts",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 lg:pl-72 p-6'>{children}</div>
    </div>
  );
}
