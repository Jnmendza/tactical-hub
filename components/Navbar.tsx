"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./svgs";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path ? "border-b-2 border-green-600 pb-1" : "hover:opacity-75";

  return (
    <nav className='w-full relative flex items-center justify-between max-w-3xl mx-auto px-4 py-3'>
      <Link href={"/"} className='flex font-bold text-3xl'>
        <Logo className='text-4xl mr-2' />
        Tactical<span className='text-[#00cf78]'>Hub</span>
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

      <ThemeButton />
    </nav>
  );
}
