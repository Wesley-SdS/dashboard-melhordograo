"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // Implementar lógica de signup
  };

  const handleGoogleSignUp = () => {
    // Implementar lógica de signup com Google
  };

  const handleGitHubSignUp = () => {
    // Implementar lógica de signup com GitHub
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/assets/dashboard.jpg"
          alt="Signup Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border-0 border-b-2 border-violet-800 focus:outline-none focus:border-violet-600 focus:ring-0"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 border-0 border-b-2 border-violet-800 focus:outline-none focus:border-violet-600 focus:ring-0"
          />
        </div>
        <div className="mb-7">
          <Input
            type="password"
            placeholder="Confirm Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 border-0 border-b-2 border-violet-800 focus:outline-none focus:border-violet-600 focus:ring-0"
          />
        </div>

        <button
          onClick={handleSignUp}
          className="w-full bg-stone-600 text-white py-2 px-4 rounded-md hover:bg-stone-400 focus:outline-none"
        >
          Sign Up
        </button>
        <div className="flex justify-between items-center gap-2 p-4">
          <div className="flex items-center gap-2">
            <Checkbox />
            <p>Remember me</p>
          </div>
          <div>
            <Link href="/forgotpassword" className="text-stone-800 underline">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center pt-5">
          <p>Continue de outra forma:</p>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handleGoogleSignUp}
            className="flex items-center justify-center w-48 h-12 border-2 border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <Image
              src="/assets/google.webp"
              alt="Sign Up with Google"
              width={36}
              height={36}
            />
            <span className="ml-2 text-gray-700">Google</span>
          </button>
          <button
            onClick={handleGitHubSignUp}
            className="flex items-center justify-center w-48 h-12 border-2 border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <Image
              src="/assets/github.jpg"
              alt="Sign Up with GitHub"
              width={36}
              height={36}
            />
            <span className="ml-2 text-gray-700">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
