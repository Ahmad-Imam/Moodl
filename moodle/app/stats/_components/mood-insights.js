import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/Loading";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function MoodInsights({ moodData }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const colorMap = {
    positive: "green",
    negative: "amber",
    info: "blue",
  };
  const iconMap = {
    positive: "↑",
    negative: "!",
    info: "i",
  };

  async function generateInsights() {
    try {
      setLoading(true);
      const response = await fetch("/api/genai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moodData,
        }),
      });

      const data = await response.json();
      setLoading(false);

      setData(data);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  useEffect(() => {
    generateInsights();
  }, []);

  return (
    <Card className="chartCustom purpleShadow">
      <CardHeader>
        <CardTitle>Mood Insights</CardTitle>
        <CardDescription>
          Key insights from your mood data. Powered by{" "}
          <span className={`${fugaz.className} text-indigo-500`}>GEN AI</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <Loading />}
        {error && <div>Error: {error}</div>}
        {data && (
          <ul className="flex flex-col gap-3">
            {Object.keys(data).map((key, index) => {
              return (
                <li className="flex items-start gap-2" key={key}>
                  <div
                    className={`w-5 h-5 rounded-full bg-${colorMap[key]}-500 flex items-center justify-center text-white mt-0.5`}
                  >
                    <div>{iconMap[key]}</div>
                  </div>
                  <div>
                    <p className="font-medium">{data[key].header}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {data[key].description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
