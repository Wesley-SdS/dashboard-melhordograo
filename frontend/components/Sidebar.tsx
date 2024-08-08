"use client";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative dark:text-white ">
      <button
        className="md:hidden flex items-center px-3 py-2 text-gray-700 hover:text-black dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <ul
        className={`absolute md:relative md:flex md:items-center md:justify-between md:mx-5 md:space-x-5 rounded-lg ml-4
              top-8 left-0 w-48 md:w-auto
              transition-transform duration-300 ease-in-out ${
                isOpen
                  ? "bg-stone-900 text-white dark:bg-stone-900"
                  : "bg-white dark:bg-transparent dark:text-white"
              } ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <li className="relative group">
          <Link
            href="/dashboard/diary"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Diário de Bordo
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="/dashboard/sales"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Vendas
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="/dashboard/products"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Produtos
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="/dashboard/categories"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Categorias
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="/dashboard/financial"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Financeiro
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="/dashboard/integrations"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Integrações
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="/dashboard/customization"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Personalização
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="/dashboard/settings"
            className="relative text-gray-700 dark:text-white hover:text-black flex items-center px-5 py-2"
          >
            Configurações
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-950 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
