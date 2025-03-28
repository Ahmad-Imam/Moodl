"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonthlyMoodPieChart from "./charts/monthly-mood-pie-chart";
import MoodLineChart from "./charts/mood-line-chart";
import WeekdayMoodBarChart from "./charts/weekday-mood-bar-chart";
import MonthlyMoodBarChart from "./charts/monthly-mood-bar-chart";

import MoodDistributionRadarChart from "./charts/mood-distrubtion-radar-chart";
import MoodComparisonChart from "./charts/mood-comparison-chart";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/components/Login";
import MoodInsights from "./mood-insights";

export default function MoodStatistics() {
  const { userDataObj, currentUser } = useAuth();
  const moodData = userDataObj?.mood;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const lastMonth = currentMonth === 1 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const comparisonMonth = selectedMonth - 1 > -1 ? selectedMonth - 1 : 11;
  console.log(selectedMonth);
  console.log(comparisonMonth);

  if (!currentUser) {
    return <Login />;
  }
  return (
    <div className="flex flex-col gap-8  max-w-full p-2">
      <div className="flex flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-semibold">Mood Analysis</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-md cursor-pointer ${
              selectedMonth === lastMonth && selectedYear === lastMonthYear
                ? "bg-indigo-500 text-primary-foreground"
                : "bg-indigo-100 text-secondary-foreground hover:bg-secondary/80"
            }`}
            onClick={() => {
              setSelectedMonth(lastMonth);
              setSelectedYear(lastMonthYear);
            }}
          >
            Last Month
          </button>
          <button
            className={`px-4 py-2 rounded-md cursor-pointer ${
              selectedMonth === currentMonth && selectedYear === currentYear
                ? "bg-indigo-500 text-primary-foreground"
                : "bg-indigo-100 text-secondary-foreground hover:bg-secondary/80"
            }`}
            onClick={() => {
              setSelectedMonth(currentMonth);
              setSelectedYear(currentYear);
            }}
          >
            This Month
          </button>
        </div>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-indigo-50">
          <TabsTrigger value="charts">Basic Charts</TabsTrigger>

          <TabsTrigger value="comparison">Comparisons</TabsTrigger>
        </TabsList>
        <TabsContent value="charts" className="flex flex-col gap-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="chartCustom purpleShadow">
              <CardHeader>
                <CardTitle>Monthly Mood Distribution</CardTitle>
                <CardDescription>
                  Pie chart showing the distribution of moods for{" "}
                  {new Date(selectedYear, selectedMonth, 1).toLocaleString(
                    "default",
                    { month: "long" }
                  )}{" "}
                  {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyMoodPieChart
                  data={moodData}
                  year={selectedYear}
                  month={selectedMonth}
                />
              </CardContent>
            </Card>
            <Card className="chartCustom purpleShadow">
              <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
                <CardDescription>
                  Line chart showing mood changes over time in{" "}
                  {new Date(selectedYear, selectedMonth, 1).toLocaleString(
                    "default",
                    { month: "long" }
                  )}{" "}
                  {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent className={""}>
                <MoodLineChart
                  data={moodData}
                  year={selectedYear}
                  month={selectedMonth}
                />
              </CardContent>
            </Card>
            <Card className="chartCustom purpleShadow">
              <CardHeader>
                <CardTitle>Mood by Day of Week</CardTitle>
                <CardDescription>
                  Bar chart showing mood distribution by day of week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WeekdayMoodBarChart
                  data={moodData}
                  year={selectedYear}
                  month={selectedMonth}
                />
              </CardContent>
            </Card>
            <Card className="chartCustom purpleShadow">
              <CardHeader>
                <CardTitle>Mood by Month</CardTitle>
                <CardDescription>
                  Bar chart showing mood distribution by month for{" "}
                  {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyMoodBarChart data={moodData} year={selectedYear} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="flex flex-col gap-6 mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="chartCustom purpleShadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Month-to-Month Comparison</CardTitle>
                  <CardDescription>
                    Compare mood patterns between last two months
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <MoodComparisonChart
                  data={moodData}
                  year={selectedYear}
                  month1={selectedMonth}
                  month2={comparisonMonth}
                />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="chartCustom purpleShadow">
                <CardHeader>
                  <CardTitle>Mood Distribution</CardTitle>
                  <CardDescription>
                    Radar chart showing mood distribution patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodDistributionRadarChart
                    data={moodData}
                    year={selectedYear}
                    month={selectedMonth}
                  />
                </CardContent>
              </Card>

              <MoodInsights moodData={moodData} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
