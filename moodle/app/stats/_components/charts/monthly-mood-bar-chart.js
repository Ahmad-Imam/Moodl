"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MoodData, getMoodByMonth, moodTypes } from "../mood-data";

export default function MonthlyMoodBarChart({ data, year }) {
  const monthlyData = getMoodByMonth(data, year);

  if (monthlyData.every((item) => item.value === 0)) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        No data available
      </div>
    );
  }

  const chartData = monthlyData.map((item) => ({
    month: item.month.substring(0, 3),
    value: item.value,
    fill: item.value
      ? moodTypes[Math.round(item.value) - 1]?.color
      : "hsl(var(--chart-3))",
  }));

  return (
    <ChartContainer
      config={{
        value: {
          label: "Average Mood",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px] w-full "
    >
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 6]}
          ticks={[1, 2, 3, 4, 5, 6]}
          tickFormatter={(value) =>
            value > 0 ? moodTypes[value - 1]?.label.substring(0, 3) || "" : ""
          }
        />
        <YAxis type="category" dataKey="month" width={50} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                if (name === "value" && value) {
                  const roundedValue = Math.round(Number(value));
                  return [
                    `(${moodTypes[roundedValue - 1]?.label || "Unknown"}) `,
                    " Average Mood",
                  ];
                }
                return ["No ", "Value"];
              }}
            />
          }
        />
        <Bar
          dataKey="value"
          radius={[0, 4, 4, 0]}
          barSize={10}
          color="rgb(34 197 94 / var(--tw-bg-opacity, 1))"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`${entry}-${index}`}
              fill={entry.fill}
              color="rgb(34 197 94 / var(--tw-bg-opacity, 1))"
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
