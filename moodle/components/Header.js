import Link from "next/link";
import React from "react";
import Logout from "./Logout";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Header() {
  return (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
      <h1 className={`${fugaz.className} textGradient text-base sm:text-lg`}>
        <Link href="/">Moodl</Link>
        <Link href="/dashboard" className="pl-4">
          Dashboard
        </Link>
        <Link href="/stats" className="pl-4">
          Stats
        </Link>
        <Link href="/faq" className="pl-4">
          FAQ
        </Link>
      </h1>
      <div className="flex items-center justify-between">
        <Logout />
      </div>
    </header>
  );
}
