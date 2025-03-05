import {
  Fugaz_One,
  Geist,
  Geist_Mono,
  Inter,
  Open_Sans,
} from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Moodle",
  description: "Mood tracker application",
};

const open = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${open.className} w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col`}
      >
        <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
          <h1
            className={`${fugaz.className} textGradient text-base sm:text-lg`}
          >
            Moodle
          </h1>
        </header>
        {children}
        <footer className="p-4 sm:p-8 ">Footer</footer>
      </body>
    </html>
  );
}
