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

  const { currentUser, userDataObj, setUserDataObj, loading, getAllUsers } =
    useAuth();
  const [data, setData] = useState({});

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }
    return {
      num_days: total_number_of_days,
      average_mood: sum_moods / total_number_of_days,
    };
  }

  async function handleSetMood(mood) {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    try {
      const newData = { ...userDataObj };

      if (!newData[year]) {
        newData[year] = {};
      }
      if (!newData[year][month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;

      setData(newData);
      setUserDataObj(newData);
      const docRef = doc(db, "users", currentUser.uid);
      console.log("docRef");
      console.log(docRef);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);

    console.log(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }
  console.log("currentUser");
  console.log(currentUser);
  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <button onClick={getAllUsers}>Testingssssssssssssss</button>
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
      <Calender data={data} handleSetMood={handleSetMood} />
    </div>
  );
}
