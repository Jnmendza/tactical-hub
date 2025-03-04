"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";
import { Logo } from "./svgs";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path ? "border-b-2 border-blue-500 pb-1" : "hover:opacity-75";

  return (
    <nav className='w-full relative flex items-center justify-between max-w-3xl mx-auto px-4 py-3'>
      <Link href={"/"} className='flex font-bold text-3xl'>
        <Logo className='text-4xl mr-2' />
        Tactical<span className='text-green-600'>Hub</span>
      </Link>

      <div className='space-x-4'>
        <Link href={"/"} className={linkClass("/")}>
          Home
        </Link>
        <Link href={"/blog"} className={linkClass("/blog")}>
          Blog
        </Link>
        <Link href={"/about"} className={linkClass("/about")}>
          About
        </Link>
      </div>

      <Button onClick={toggleTheme} variant='outline'>
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </nav>
  );
}
