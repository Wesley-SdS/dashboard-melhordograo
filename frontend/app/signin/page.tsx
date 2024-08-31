"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Importe o toast

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/signin", {
        email,
        password
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        console.log(
          "Token salvo no localStorage:",
          localStorage.getItem("token")
        ); // Verifique se o token foi salvo
        router.push("/");
        router.push("/");
        toast.success("Login bem-sucedido!"); // Exibe uma mensagem de sucesso
      } else {
        toast.error("Credenciais inválidas"); // Exibe uma mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error(
        "Ocorreu um erro durante o login. Por favor, tente novamente."
      ); // Exibe uma mensagem de erro
    }
  };

  const handleGoogleSignIn = () => {
    // Implementar lógica de login com Google
  };

  const handleGitHubSignIn = () => {
    // Implementar lógica de login com GitHub
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/assets/dashboard.jpg"
          alt="Signup Image"
          fill
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-4">Sign In</h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="E-mail:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border-0 border-b-2 border-violet-800 focus:outline-none focus:border-violet-600 focus:ring-0"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 border-0 border-b-2 border-violet-800 focus:outline-none focus:border-violet-600 focus:ring-0"
          />
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-stone-600 text-white py-2 px-4 rounded-md hover:bg-stone-400 focus:outline-none"
        >
          Sign In
        </button>
        <div className="flex items-center justify-center pt-5">
          <p>Continue de outra forma:</p>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-48 h-12 border-2 border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Sign in with Google"
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
            onClick={handleGitHubSignIn}
            className="flex items-center justify-center w-48 h-12 border-2 border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Sign in with GitHub"
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
