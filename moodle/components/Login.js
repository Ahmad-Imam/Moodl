"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/hooks/useAuth";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const { signup, login } = useAuth();
  const [authenticating, setAuthenticating] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    setAuthenticating(true);
    console.log("before try");
    try {
      if (isRegister) {
        console.log("in register");
        await signup(email, password);
      } else {
        console.log("in login");
        await login(email, password);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`${fugaz.className} text-4xl sm:text-5xl md:text-6xl`}>
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You are one step away</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border-2 border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-700 hover:border-indigo-400 duration-300"
        placeholder="Email"
      />
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border-2 border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-700 hover:border-indigo-400 duration-300"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          text={authenticating ? "Submitting" : "Submit"}
          dark={true}
          full
          handleClick={handleSubmit}
        />
      </div>
      <p className="text-center">
        {/* Don&#39;t have an account?{" "} */}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600"
        >
          {isRegister ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
