"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
  X,
  Menu,
  ChevronDown,
  ChevronUp,
  Home,
  NotebookPen,
  ArrowDownNarrowWide,
} from "lucide-react";
import React, { useState } from "react";
import { ArrowDown as Arrow, SecondaryLogo } from "./svgs";
import ThemeButton from "./ThemeButton";
import { bebasFont, justAnotherHand } from "@/lib/fonts";
import Link from "next/link";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div className='group fixed left-4 top-4 h-[calc(100vh-2rem)] z-50'>
      {/* Desktop Sidebar */}
      <aside
        className={`h-full bg-primary-green text-secondary-green p-4 
          flex flex-col transition-all duration-300 ease-in-out
          rounded-xl shadow-lg relative hidden lg:flex
          ${isExpanded ? "w-64" : "w-16"}`}
      >
        {/* Burger Icon - Absolutely Positioned */}
        <button
          className='absolute top-4 left-4 p-2 rounded bg-black text-white w-8 h-8 z-[60]'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Menu size={18} />
        </button>

        {/* Logo */}
        <div className='flex justify-center mt-14 mb-6'>
          <SecondaryLogo
            className={`transition-all duration-300 ${
              isExpanded ? "text-7xl" : "text-3xl"
            }`}
          />
        </div>

        {/* Navigation Section */}
        <nav className='flex-1'>
          <div
            className={`${bebasFont.className} text-4xl font-bold flex flex-col space-y-4 ml-2`}
          >
            <Link
              href='/'
              className='flex items-center space-x-2 hover:text-white'
            >
              <Home size={24} />
              {isExpanded && <span className='ml-2'>HOME</span>}
            </Link>
            <Link
              href='/blog'
              className='flex items-center space-x-2 hover:text-white'
            >
              <NotebookPen size={24} />
              {isExpanded && <span className='ml-2'>BLOG</span>}
            </Link>

            {/* Collapsible Categories */}
            <div className='flex flex-col'>
              <Collapsible.Root
                open={isCategoriesOpen}
                onOpenChange={setIsCategoriesOpen}
              >
                <Collapsible.Trigger asChild>
                  <button
                    className={`flex items-center justify-between w-full hover:text-white ${
                      !isExpanded && "pointer-events-none"
                    }`}
                    disabled={!isExpanded}
                  >
                    <div className='flex items-center space-x-2'>
                      {isExpanded && <span>CATEGORIES</span>}
                      <ArrowDownNarrowWide
                        size={24}
                        className={`${isExpanded ? "hidden" : "block"}`}
                      />
                    </div>
                    {isExpanded && (
                      <span className='flex items-center'>
                        {isCategoriesOpen ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </span>
                    )}
                  </button>
                </Collapsible.Trigger>
                {isExpanded && (
                  <Collapsible.Content
                    className={`${justAnotherHand.className} pl-6 mt-2 space-y-2 text-3xl`}
                  >
                    <Link
                      href='/categories/all'
                      className='block hover:underline'
                    >
                      All
                    </Link>
                    <Link
                      href='/categories/new'
                      className='block hover:underline'
                    >
                      New
                    </Link>
                    <Link
                      href='/categories/popular'
                      className='block hover:underline'
                    >
                      Popular
                    </Link>
                  </Collapsible.Content>
                )}
              </Collapsible.Root>
            </div>
          </div>
        </nav>

        {/* Theme Button - Absolutely Positioned */}
        <div className='absolute bottom-4 left-2 z-[60]'>
          <ThemeButton />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <button
        className='lg:hidden fixed top-4 right-4 z-50 bg-primary-green text-white p-2 rounded'
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-primary-green/90 z-50 flex'>
            <div className='w-full max-w-md p-6 text-secondary-green'>
              <Dialog.Close className='absolute top-4 right-4'>
                <X size={24} />
              </Dialog.Close>
              <div className='flex items-center gap-2'>
                <Arrow className='text-2xl' />
                <h3
                  className={`${justAnotherHand.className} font-bold text-3xl`}
                >
                  WHERE TO?
                </h3>
              </div>
              <div
                className={`${bebasFont.className} text-4xl font-bold mt-4 flex flex-col space-y-4`}
              >
                <Link href='/'>HOME</Link>
                <Link href='/blog'>BLOG</Link>
                <Collapsible.Root>
                  <Collapsible.Trigger asChild>
                    <button className='flex items-center justify-between w-full'>
                      CATEGORIES
                      <ChevronDown size={24} className='ml-4' />
                    </button>
                  </Collapsible.Trigger>
                  <Collapsible.Content
                    className={`${justAnotherHand.className} pl-4 mt-2 space-y-2 text-3xl`}
                  >
                    <Link
                      href='/categories/all'
                      className='block hover:underline'
                    >
                      All
                    </Link>
                    <Link
                      href='/categories/new'
                      className='block hover:underline'
                    >
                      New
                    </Link>
                    <Link
                      href='/categories/popular'
                      className='block hover:underline'
                    >
                      Popular
                    </Link>
                  </Collapsible.Content>
                </Collapsible.Root>
              </div>
            </div>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Sidebar;
