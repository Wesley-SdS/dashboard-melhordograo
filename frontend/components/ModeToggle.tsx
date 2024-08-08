"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 p-1 bg-gray-200 dark:bg-gray-800 rounded-full transition-colors duration-300 ease-in-out"
    >
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center h-full w-full">
          {theme === "dark" ? (
            <SunIcon className="w-4 h-4 text-yellow-500" />
          ) : (
            <MoonIcon className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>
    </button>
  );
}
