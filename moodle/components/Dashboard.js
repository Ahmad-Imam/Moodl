"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./Loading";
import { useAuth } from "@/hooks/useAuth";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [moodData, setMoodData] = useState({});
  const now = new Date();
  console.log("dash re rednered");
  // console.log(userDataObj);
  // console.log(moodData);

  function getDailyStreak() {
    let streak = 0;
    const date = new Date(now);

    // If there's no entry for today, move to yesterday.
    if (
      !(
        moodData[date.getFullYear()] &&
        moodData[date.getFullYear()][date.getMonth()] &&
        moodData[date.getFullYear()][date.getMonth()][date.getDate()] != null
      )
    ) {
      date.setDate(date.getDate() - 1);
    }

    // Count consecutive days with a mood entry
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
    return streak;
  }

  function getCurrentMonthlyAverageMood() {
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
    const monthly_average =
      totalDays > 0 ? (sumMoods / totalDays).toFixed(2) : 0;
    return { monthly_average };
  }

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    let average_mood = 0;
    // console.log("data");
    // console.log(moodData);
    // console.log(userDataObj);
    for (let year in moodData) {
      for (let month in moodData[year]) {
        for (let day in moodData[year][month]) {
          let days_mood = moodData[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }

    average_mood = sum_moods / total_number_of_days;
    const current_streak = getDailyStreak();

    return {
      num_days: total_number_of_days,
      average_mood: average_mood.toFixed(2),
      current_streak,
    };
  }
  //monthly average mood
  //highest streak
  const statuses = {
    ...countValues(),
    ...getCurrentMonthlyAverageMood(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(newMood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj.mood };
      // const newData = JSON.parse(JSON.stringify(userDataObj || {}));

      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = newMood;
      console.log("newData");

      const dailyStreak = getDailyStreak();
      console.log(dailyStreak);
      console.log(userDataObj.streak);

      const newStreak =
        dailyStreak > userDataObj.streak ? dailyStreak : userDataObj.streak;

      console.log("newStreak");
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

  const moods = {
    normal: "🙂",
    sad: "😔",
    happy: "😃",
    confused: "😟",
    angry: "😠",
    depressed: "😢",
  };

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

  // console.log("currentUser");
  // console.log(currentUser);
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
                {status === "num_days" ? " 🔥" : ""}
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
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => handleSetMood(moodIndex + 1)}
              key={moodIndex}
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
            </button>
          );
        })}
      </div>
      <Calender completeData={moodData} handleSetMood={handleSetMood} />
    </div>
  );
}
