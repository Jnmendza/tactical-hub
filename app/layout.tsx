"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Tactical Hub",
//   description:
//     "Design and customize football formations with drag and drop interface",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/blog");
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider>
          {!hideNavbar && <Navbar />}
          <main className='flex-grow'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
