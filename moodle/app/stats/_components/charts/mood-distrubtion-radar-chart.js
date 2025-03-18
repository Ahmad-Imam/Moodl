"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { MoodData, getMoodDistributionForRadar } from "../mood-data";

export default function MoodDistributionRadarChart({ data, year, month }) {
  const radarData = getMoodDistributionForRadar(data, year, month);
  const hasData = radarData.some((item) => item.A > 0);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        No data available
      </div>
    );
  }

  return (
    <ChartContainer
      config={{
        A: {
          label: "Frequency",
          color: "hsl(200 60% 50%)",
        },
      }}
      className="h-[300px] max-w-full"
    >
      <RadarChart data={radarData} outerRadius={90}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Mood"
          dataKey="A"
          stroke="hsl(200 60% 50%)"
          fill="hsl(200 60% 50%)"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ChartContainer>
  );
}
