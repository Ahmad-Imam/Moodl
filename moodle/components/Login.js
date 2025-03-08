import { Fugaz_One } from "next/font/google";
import React from "react";
import Button from "./Button";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`${fugaz.className} text-4xl sm:text-5xl md:text-6xl`}>
        Login
      </h3>
      <p>You are one step away</p>
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border-2 border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-700 hover:border-indigo-400 duration-300"
        placeholder="Email"
      />
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border-2 border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-700 hover:border-indigo-400 duration-300"
        placeholder="Password"
        type="password"
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button text="Submit" dark={true} full />
      </div>
      <p className="text-center">
        Don&#39;t have an account?{" "}
        <span className="text-indigo-600">Sign up</span>
      </p>
    </div>
  );
}
