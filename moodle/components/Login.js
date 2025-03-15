"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const { signup, login } = useAuth();
  const [authenticating, setAuthenticating] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthenticating(true);
    console.log("before try");
    try {
      if (isRegister) {
        console.log("in register");
        console.log(formData.email);
        await signup(formData);
        // await createUser(formData);
      } else {
        console.log("in login");
        console.log(formData);
        await login(formData.email, formData.password);
      }
      //set the form data

      console.log("after try");
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
      <form
        className="flex flex-col gap-4 items-center justify-center w-2/4"
        onSubmit={handleSubmit}
      >
        {isRegister && (
          <input
            // onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border-2 border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-700 hover:border-indigo-400 duration-300"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        )}
        <input
          // onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border-2 border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-700 hover:border-indigo-400 duration-300"
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input
          className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border-2 border-solid border-indigo-400 rounded-full outline-none focus:border-indigo-700 hover:border-indigo-400 duration-300"
          placeholder="Password"
          type="password"
          name="password"
          // onChange={(e) => setPassword(e.target.value)}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <div className="max-w-[400px] w-full mx-auto">
          <Button
            text={authenticating ? "Submitting" : "Submit"}
            dark={true}
            full
            handleClick={handleSubmit}
            type="submit"
          />
        </div>
      </form>
      <p className="text-center">
        {/* Don&#39;t have an account?{" "} */}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600 underline cursor-pointer"
        >
          {isRegister ? "Login with an existing account" : "Create an account"}
        </button>
      </p>
    </div>
  );
}
