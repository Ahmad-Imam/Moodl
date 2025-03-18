"use client";
import React from "react";
import Button from "./Button";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Logout() {
  const { logout, currentUser, userDataObj } = useAuth();

  if (!currentUser) {
    return (
      <Link href={"/dashboard"}>
        <Button text="Login" dark />
      </Link>
    );
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <p className="test-base sm:text-xl font-bold text-indigo-500">
        User:{" "}
        <span className={`text-indigo-700 ${fugaz.className}`}>
          {userDataObj?.username}
        </span>
      </p>
      <Button text="Logout" handleClick={logout} />
    </div>
  );
}
