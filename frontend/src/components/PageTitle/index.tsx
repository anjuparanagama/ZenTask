"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface PageTitleProps {
  title: string;
  description?: string;
}
const PageTitle = ({ title, description }: PageTitleProps) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-slate-900 bg-clip-text text-2xl font-semibold tracking-tight ">
          {title || "Welcome Back"}
        </h1>
        <p className=" text-sm text-gray-500">
          {description ||
            "Here is an overview of your dashboard and recent activities."}
        </p>
      </div>

      <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 shadow-sm">
        <CalendarDays size={18} />
        <p className="text-sm font-semibold text-gray-700">
          {currentTime
            ? format(currentTime, "dd MMMM yyyy, EEEE")
            : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default PageTitle;
