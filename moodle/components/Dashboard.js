import { Fugaz_One } from "next/font/google";
import React from "react";
import Calender from "./Calender";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: "14:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    normal: "🙂",
    sad: "😔",
    happy: "😃",
    confused: "😟",
    angry: "😠",
    depressed: "😢",
  };

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {Object.keys(statuses).map((status, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 border-2 border-solid border-indigo-300 rounded-lg bg-indigo-50 hover:bg-indigo-300 duration-500"
            >
              <h3 className="text-lg font-semibold uppercase text-indigo-900 truncate">
                {status.replaceAll("_", " ")}
              </h3>
              <p className={`${fugaz.className} text-indigo-700`}>
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={`text-4xl sm:text-5xl md:text-6xl ${fugaz.className} text-center`}
      >
        How do you <span className={`textGradient`}>feel</span> today?
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(moods).map((mood, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 p-4 border-1 border-solid border-indigo-300 rounded-3xl bg-indigo-50 hover:bg-indigo-300 purpleShadow duration-200"
            >
              <p
                className={`${fugaz.className} text-3xl md:text-4xl lg:text-5xl`}
              >
                {moods[mood]}
              </p>
              <h3
                className={`text-base md:text-lg lg:text-xl font-semibold uppercase text-indigo-900 ${fugaz.className}`}
              >
                {mood}
              </h3>
            </div>
          );
        })}
      </div>
      <Calender />
    </div>
  );
}
