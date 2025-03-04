"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className='w-full relative flex items-center justify-between max-w-3xl mx-auto px-4 py-3'>
      <Link href={"/"} className='font-bold text-3xl'>
        Tactical<span className=''>Hub</span>
      </Link>

      <div className='space-x-4'>
        <Link href={"/"}>Home</Link>
        <Link href={"/blog"}>Blog</Link>
        <Link href={"/about"}>About</Link>
      </div>

      <Button onClick={toggleTheme} variant='outline'>
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </nav>
  );
}
