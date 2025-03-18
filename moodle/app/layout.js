import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "Moodle",
  description: "Mood tracker application",
};

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Logout from "@/components/Logout";
import Header from "@/components/Header";
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
          <div className="flex flex-col w-full relative h-screen">
            <Header />
            {children}
            <footer className="p-4 sm:p-8 grid place-items-center">
              <p className={`${fugaz.className} text-indigo-600`}>
                &copy; {new Date().getFullYear()} Moodl
              </p>
            </footer>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
