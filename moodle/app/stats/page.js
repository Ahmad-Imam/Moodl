import Main from "@/components/Main";
import MoodStatistics from "./_components/mood-statistics";

export const metadata = {
  title: "Moodl . Statistics",
  description: "Statistics page showing mood statistics using charts",
};

export default function StaticsPage() {
  return (
    <Main>
      <h1 className="text-3xl font-bold mb-8">Mood Statistics Dashboard</h1>
      <MoodStatistics />
    </Main>
  );
}
