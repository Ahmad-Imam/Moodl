"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MoodData, getComparisonData } from "../mood-data";

export default function MoodComparisonChart({ data, year, month1, month2 }) {
  const comparisonData = getComparisonData(data, year, month1, month2);

  if (comparisonData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        No comparison data available
      </div>
    );
  }

  const month1Name = new Date(year, month1, 1).toLocaleString("default", {
    month: "short",
  });
  const month2Name = new Date(year, month2, 1).toLocaleString("default", {
    month: "short",
  });

  return (
    <ChartContainer
      config={{
        month1Value: {
          label: month1Name,
          color: "hsl(200 60% 50%)",
        },
        month2Value: {
          label: month2Name,
          color: "hsl(150 60% 50%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <BarChart
        data={comparisonData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar
          dataKey="month1Value"
          fill="hsl(200 60% 50%)"
          name={month1Name}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="month2Value"
          fill="hsl(150 60% 50%)"
          name={month2Name}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
