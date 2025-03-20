import Dashboard from "@/app/dashboard/_components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import React from "react";

export const metadata = {
  title: "Moodl . Dashboard",
  description: "Dashboard page",
};

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
