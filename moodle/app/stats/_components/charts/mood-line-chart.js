"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getMoodDataForMonth, moodTypes } from "../mood-data";

export default function MoodLineChart({ data, year, month }) {
  const moodData = getMoodDataForMonth(data, year, month);

  if (moodData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        No data available
      </div>
    );
  }

  const chartData = moodData.map((item) => ({
    day: item.day,
    value: item.value,
    mood: moodTypes[item.value - 1].label,
  }));

  return (
    <ChartContainer
      config={{
        value: {
          label: "Mood Value",
          color: "hsl(200 60% 50%)",
        },
      }}
      className="h-[300px] w-full "
    >
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          label={{
            value: "Day of Month",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          domain={[1, 6]}
          ticks={[1, 2, 3, 4, 5, 6]}
          tickFormatter={(value) =>
            moodTypes[value - 1]?.label.substring(0, 3) || ""
          }
          label={{ value: "Mood", angle: -90, position: "insideLeft" }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                if (name === "value") {
                  return [moodTypes[Number(value) - 1]?.label || ""];
                }
                return ["No ", "Value"];
              }}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(200 60% 50%)"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
