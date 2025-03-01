"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PlayerJerseyProps {
  number: number;
  position: string;
  name: string;
  isGoalkeeper?: boolean;
}

export default function PlayerJersey({ number, position, name, isGoalkeeper = false }: PlayerJerseyProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-md transition-transform",
          isGoalkeeper ? "bg-yellow-500" : "bg-red-600",
          isHovered && "scale-110"
        )}
      >
        {number}
      </div>
      
      {isHovered && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          <div>{position}</div>
          <div className="font-semibold">{name}</div>
        </div>
      )}
    </div>
  );
}