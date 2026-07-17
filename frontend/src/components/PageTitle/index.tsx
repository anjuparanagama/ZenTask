"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { format } from "date-fns";

const PageTitle = () => {
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
      {/* Left Content */}
      <div>
        <h1 className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your activities and performance
        </p>
      </div>

      {/* Date Time */}
      <div className="flex items-center gap-2 ">
        <CalendarDays size={20} />
        <p className="text-sm font-semibold text-gray-700">
          {currentTime ? format(currentTime, "EEEE, MMM dd") : "Loading..."}
        </p>
        <div className="flex items-end justify-end gap-1 text-xs text-gray-500">
          {currentTime ? format(currentTime, "hh:mm:ss a") : "--:--:--"}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
