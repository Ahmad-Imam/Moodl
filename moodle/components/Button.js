import { Fugaz_One } from "next/font/google";
import React from "react";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Button(props) {
  const { text, dark, full, handleClick, ...rest } = props;
  const color = dark ? "bg-indigo-600 text-white" : "text-indigo-600 bg-white";
  const width = full ? "grid place-items-center w-full" : "w-auto";
  return (
    <button
      onClick={handleClick}
      className={`${color} rounded-full overflow-hidden border-2 border-solid border-indigo-600 hover:opacity-90 text-blue-300 ${width} cursor-pointer`}
      {...rest}
    >
      <p
        className={`${fugaz.className} px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3`}
      >
        {text}
      </p>
    </button>
  );
}
