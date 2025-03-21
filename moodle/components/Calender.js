"use client";
import {
  dayNames,
  monthNames,
  moodTypes,
} from "@/app/stats/_components/mood-data";
import { baseRating, gradients } from "@/utils";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Calendar(props) {
  const { demo, completeData } = props;
  const now = new Date();
  const monthsArr = Object.keys(monthNames);
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectMonth] = useState(
    Object.keys(monthNames)[currMonth]
  );
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      setSelectedYear((curr) => curr - 1);
      setSelectMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((curr) => curr + 1);
      setSelectMonth(monthsArr[0]);
    } else {
      setSelectMonth(monthsArr[numericMonth + val]);
    }
  }
  const monthNow = new Date(
    selectedYear,
    Object.keys(monthNames).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, numericMonth + 1, 0).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4 pt-10">
      <div className="grid grid-cols-5 self-center items-center">
        {!demo && (
          <button
            onClick={() => {
              handleIncrementMonth(-1);
            }}
            className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 pr-5 cursor-pointer"
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} className="fa-fw" />
          </button>
        )}
        <p
          className={
            "text-center col-span-3 capitalized whitespace-nowrap textGradient " +
            fugaz.className
          }
        >
          {selectedMonth}, {selectedYear}
        </p>
        {!demo && (
          <button
            onClick={() => {
              handleIncrementMonth(+1);
            }}
            className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 pl-5 cursor-pointer"
          >
            <FontAwesomeIcon icon={faCircleChevronRight} className="fa-fw" />
          </button>
        )}
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => {
            return (
              <p
                key={day}
                className="text-xs sm:text-sm text-center text-indigo-400"
              >
                {day}
              </p>
            );
          })}
        </div>
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1 ">
              {dayNames.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div className="bg-white" key={dayOfWeekIndex} />;
                }

                let color = demo
                  ? gradients.indigo[baseRating[dayIndex]]
                  : dayIndex in data
                  ? moodTypes[data[dayIndex] - 1]?.color
                  : "white";

                return (
                  <div
                    style={{ background: color }}
                    className={
                      "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                      (isToday
                        ? " border-stone-950 border-2"
                        : " border-indigo-100") +
                      (color === "white" ? " text-indigo-400" : " text-white")
                    }
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
