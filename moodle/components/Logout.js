"use client";
import React from "react";
import Button from "./Button";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Logout() {
  const { logout, currentUser } = useAuth();
  const pathname = usePathname();

  // console.log(currentUser);
  if (!currentUser) {
    return (
      <Link href={"/dashboard"}>
        <Button text="Login" dark />
      </Link>
    );
  }

  //   if (pathname === "/") {
  //     return (
  //       <Link href={"/dashboard"}>
  //         <Button text="Go to dashboard" />
  //       </Link>
  //     );
  //   }

  return (
    <div className="flex justify-center items-center gap-4">
      <p className="text-xl font-semibold"> User: {currentUser.email}</p>
      <Button text="Logout" handleClick={logout} />
    </div>
  );
}
