"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar Component */}
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Main Content */}
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isExpanded ? "ml-20 lg:ml-72" : "ml-0 lg:ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
