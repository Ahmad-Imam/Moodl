"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { getMoodDistributionForMonth, moodTypes } from "../mood-data";

export default function MonthlyMoodPieChart({ data, year, month }) {
  const moodDistribution = getMoodDistributionForMonth(data, year, month);

  if (moodDistribution.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        No data available
      </div>
    );
  }

  return (
    <ChartContainer
      config={Object.fromEntries(
        moodTypes.map((type) => [
          type.label.toLowerCase(),
          { label: type.label, color: type.color },
        ])
      )}
      className="h-[300px] w-full"
    >
      <PieChart>
        <Pie
          data={moodDistribution}
          dataKey="count"
          nameKey="mood"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {moodDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {/* <ChartLegend
          content={<ChartLegendContent nameKey="mood" />}
          className="flex flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
        /> */}
      </PieChart>
    </ChartContainer>
  );
}
