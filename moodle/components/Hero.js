import { Fugaz_One } from "next/font/google";
import React from "react";
import Calender from "./Calender";
import HomeAction from "./HomeAction";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="py-4 sm:py-14 md:py-12 flex flex-col gap-4 md:gap-6 sm:gap-8">
      <h1 className="text-5xl sm:text-6xl md:text-7xl text-center">
        <span className={`${fugaz.className} textGradient`}>Moodl</span> tracks
        your
        <span className={`${fugaz.className} textGradient`}> daily </span> mood
        and helps you understand your emotions better over time.
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl w-full mx-auto text-center max-w-[600px]">
        Create your mood record and how you are feeling{" "}
        <span className="font-semibold"> everyday over the year</span>
      </p>

      <HomeAction />
      <Calender demo />
    </div>
  );
}
