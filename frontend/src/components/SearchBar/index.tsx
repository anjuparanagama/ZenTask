"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface SearchBarProps {
  category?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  category = "Task Management",
  placeholder = "Search by task name...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="w-full flex items-center justify-between pt-3 px-4 gap-8 sm:gap-0">
      {/* Search Bar Center */}
      <div className="flex-1 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full max-w-2xl bg-white dark:bg-gray-800 rounded-full shadow-md dark:shadow-gray-900/50 pl-5 pr-2 py-1 border border-gray-200 dark:border-gray-700"
        >
          <span className="text-gray-700 dark:text-gray-200 text-sm font-medium hidden sm:block whitespace-nowrap">
            {category}
          </span>

          <span className="mx-4 h-5 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block" />

          <input
            type="text"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
          >
            <Search className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </button>
        </form>
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        suppressHydrationWarning
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-yellow-500" />
        ) : (
          <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}
