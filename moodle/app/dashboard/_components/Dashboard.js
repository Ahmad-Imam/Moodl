"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calender from "../../../components/Calender";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "../../../components/Login";
import Loading from "../../../components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { moodTypes } from "@/app/stats/_components/mood-data";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [moodData, setMoodData] = useState({});
  const now = new Date();

  function getDailyStreak() {
    if (moodData == null || moodData == undefined || moodData == {}) {
      return { current_streak: 0 };
    }

    let streak = 0;
    const date = new Date(now);

    if (
      !(
        moodData[date.getFullYear()] &&
        moodData[date.getFullYear()][date.getMonth()] &&
        moodData[date.getFullYear()][date.getMonth()][date.getDate()] != null
      )
    ) {
      date.setDate(date.getDate() - 1);
    }

    while (true) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      if (
        moodData[year] &&
        moodData[year][month] &&
        moodData[year][month][day] != null
      ) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    const current_streak = streak;
    return { current_streak };
  }

  function getCurrentMonthlyAverageMood() {
    if (moodData == null || moodData == undefined || moodData == {}) {
      return { monthly_average_mood: 0 };
    }

    const year = now.getFullYear();
    const month = now.getMonth();
    let totalDays = 0;
    let sumMoods = 0;

    if (moodData[year] && moodData[year][month]) {
      for (let day in moodData[year][month]) {
        sumMoods += moodData[year][month][day];
        totalDays++;
      }
    }
    const monthly_average = totalDays > 0 ? sumMoods / totalDays : 3;

    const monthly_average_mood =
      moodTypes[Math.round(monthly_average) - 1].label;

    return { monthly_average_mood };
  }

  function getTotalAverageMood() {
    if (moodData == null || moodData == undefined || moodData == {}) {
      return {
        total_days: 0,
        average_mood: 0,
        current_streak: 0,
        highest_streak: 0,
      };
    }

    const allMoodValues = Object.values(moodData).flatMap((yearData) =>
      Object.values(yearData).flatMap((monthData) => Object.values(monthData))
    );
    const total_number_of_days = allMoodValues.length;
    const sum_moods = allMoodValues.reduce((sum, mood) => sum + mood, 0);
    let average_mood =
      total_number_of_days > 0 ? sum_moods / total_number_of_days : 3;

    average_mood = moodTypes[Math.round(average_mood) - 1].label;

    const { current_streak } = getDailyStreak();

    return {
      total_days: total_number_of_days,
      average_mood: average_mood,
      current_streak,
      highest_streak: userDataObj?.streak,
    };
  }

  const statuses = {
    ...getTotalAverageMood(),
    ...getCurrentMonthlyAverageMood(),

    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(newMood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj.mood };

      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = newMood;

      const { current_streak } = getDailyStreak();

      const newStreak =
        current_streak > userDataObj.streak
          ? current_streak
          : userDataObj.streak;

      setMoodData(newData);
      setUserDataObj({ ...userDataObj, mood: newData, streak: newStreak });

      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          mood: {
            [year]: {
              [month]: {
                [day]: newMood,
              },
            },
          },
          streak: newStreak,
        },
        { merge: true }
      );
    } catch (err) {
      console.log("Failed to set data: ", err.message);
    }
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setMoodData(userDataObj?.mood);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {Object.keys(statuses).map((status, index) => {
          return (
            <div key={index} className="flex flex-col gap-2 p-4 cardCustom">
              <h3 className="text-lg font-semibold uppercase text-indigo-900 truncate">
                {status.replaceAll("_", " ")}
              </h3>
              <p className={`${fugaz.className} text-indigo-700`}>
                {statuses[status]}
                {status === "current_streak" &&
                statuses.current_streak === statuses.highest_streak
                  ? " 🔥"
                  : ""}
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
        {moodTypes.map((mood, moodIndex) => {
          return (
            <button
              onClick={() => handleSetMood(mood.value)}
              key={moodIndex}
              className="flex flex-col items-center justify-center gap-4 p-4 border-1 border-solid border-indigo-300 rounded-3xl bg-indigo-50 hover:bg-indigo-300 purpleShadow duration-200 cursor-pointer"
            >
              <p
                className={`${fugaz.className} text-3xl md:text-4xl lg:text-5xl`}
              >
                {mood.icon}
              </p>
              <h3
                className={`text-base md:text-lg lg:text-xl font-semibold uppercase text-indigo-900 ${fugaz.className}`}
              >
                {mood.label}
              </h3>
            </button>
          );
        })}
      </div>
      <Calender completeData={moodData} handleSetMood={handleSetMood} />
    </div>
  );
}
