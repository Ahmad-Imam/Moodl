import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import React from "react";

export const metadata = {
  title: "Moodle . Dashboard",
  description: "Dashboard page",
};

export default function DashboardPage() {
  const isAuth = true;

  return <Main>{isAuth ? <Dashboard /> : <Login />}</Main>;
}
