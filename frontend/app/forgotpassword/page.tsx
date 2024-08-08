// app/forgotpassword/page.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Implementar lógica para recuperação de senha
    console.log(`Solicitação de recuperação de senha para: ${email}`);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border-0 border-b-2 border-violet-800 focus:outline-none focus:border-violet-600 focus:ring-0"
          />
        </div>
        <Button
          onClick={handleForgotPassword}
          className="w-full bg-violet-900 text-white py-2 px-4 rounded-md hover:bg-violet-700 focus:outline-none"
        >
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}
