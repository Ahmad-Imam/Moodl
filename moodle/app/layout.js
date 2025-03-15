import {
  Fugaz_One,
  Geist,
  Geist_Mono,
  Inter,
  Open_Sans,
} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "Moodle",
  description: "Mood tracker application",
};

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Logout from "@/components/Logout";
config.autoAddCss = false;

const open = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${open.className} w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col`}
        >
          <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
            <h1
              className={`${fugaz.className} textGradient text-base sm:text-lg`}
            >
              <Link href="/">Moodl</Link>
            </h1>
            <div className="flex items-center justify-between">
              <Logout />
            </div>
          </header>
          {children}
          <footer className="p-4 sm:p-8 grid place-items-center">
            <p className={`${fugaz.className} text-indigo-600`}>
              Created with Next.js
            </p>
          </footer>
        </body>
      </AuthProvider>
    </html>
  );
}
