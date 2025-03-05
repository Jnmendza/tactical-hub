"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Menu } from "lucide-react";
import React, { useState } from "react";
import { ArrowDown, SecondaryLogo } from "./svgs";
import ThemeButton from "./ThemeButton";
import { Bebas_Neue, Just_Another_Hand } from "next/font/google";
import Link from "next/link";

const bebasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const justAnotherHand = Just_Another_Hand({
  subsets: ["latin"],
  weight: "400",
});

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar (Visible on Large Screens) */}
      <aside className='w-64 bg-[#00cf78] text-[#00554b] p-8 fixed top-0 left-0 h-screen hidden lg:flex flex-col justify-between'>
        <div>
          <SecondaryLogo className='text-8xl' />
          <div
            className={`${bebasFont.className} text-4xl font-bold mt-4 flex flex-col space-y-4`}
          >
            <Link href={"/"}>HOME</Link>
            <Link href={"/"}>BLOG</Link>
            <Link href={"/"}>CATAGORIES</Link>
            <Link href={"/"}>LATEST</Link>
            <Link href={"/"}>POPULAR</Link>
          </div>
        </div>

        <div>
          <ThemeButton />
        </div>
      </aside>

      {/* Mobile Menu Button (Visible on Small Screens) */}
      <button
        className='lg:hidden fixed top-4 right-4 z-50 bg-[#00cf78] text-white p-2 rounded'
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar (Dialog Overlay) */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-[#00cf78] z-50 flex'>
            <div className='w-full max-w-md p-6 text-[#00554b]'>
              <Dialog.Close className='absolute top-4 right-4'>
                <X size={24} />
              </Dialog.Close>
              <div className='flex'>
                <ArrowDown className='text-2xl' />
                <h3
                  className={`${justAnotherHand.className} font-bold text-3xl`}
                >
                  WHERE TO?
                </h3>
              </div>
              <div
                className={`${bebasFont.className} text-4xl font-bold mt-4 flex flex-col space-y-4`}
              >
                <Link href={"/"}>HOME</Link>
                <Link href={"/"}>BLOG</Link>
                <Link href={"/"}>CATAGORIES</Link>
                <Link href={"/"}>LATEST</Link>
                <Link href={"/"}>POPULAR</Link>
              </div>
            </div>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Sidebar;
