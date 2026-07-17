"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Search } from "lucide-react";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="w-full flex justify-center pt-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-xl bg-white rounded-full shadow-md pl-5 pr-2 py-2"
      >
        <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
          {category}
        </span>

        <span className="mx-4 h-5 w-px bg-gray-300" />

        <input
          type="text"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
        />

        <button
          type="submit"
          aria-label="Search"
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors shrink-0"
        >
          <Search className="w-5 h-5 text-gray-800" />
        </button>
      </form>
    </div>
  );
}
