"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Plus, List, Grid2X2Plus } from "lucide-react";
import { format } from "date-fns";
import { usePathname } from "next/navigation";

export type TaskView = "list" | "grid";

interface PageTitleProps {
  title: string;
  description?: string;
  onAddTask?: () => void;
  view?: TaskView;
  onViewChange?: (view: TaskView) => void;
}
const PageTitle = ({
  title,
  description,
  onAddTask,
  view = "list",
  onViewChange,
}: PageTitleProps) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-slate-900 dark:text-slate-100 bg-clip-text text-2xl font-semibold tracking-tight ">
          {title || "Welcome Back"}
        </h1>
        <p className=" text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
          {description ||
            "Here is an overview of your dashboard and recent activities."}
        </p>
      </div>
      {pathname !== "/Tasks" ? (
        <div className="flex items-center gap-2 sm:border sm:border-gray-200 dark:sm:border-gray-700 rounded-md px-3 py-2 sm:shadow-sm bg-white dark:bg-gray-800">
          <CalendarDays size={18} className="text-gray-700 dark:text-gray-300" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {currentTime
              ? format(currentTime, "dd MMMM yyyy, EEEE")
              : "Loading..."}
          </p>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <button
            type="button"
            onClick={onAddTask}
            className="flex flex-row gap-1 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            <Plus size={20} /> Add Task
          </button>
          <div>
            <button
              className="flex flex-row gap-2  justify-center items-center  shadow-lg rounded-md bg-linear-to-r from-green-300 to-green-500 px-2 py-1 text-white font-semibold"
              onClick={() =>
                onViewChange?.(view === "list" ? "grid" : "list")
              }
              title={view === "list" ? "Switch to grid view" : "Switch to list view"}
            >
              {view === "list" ? <Grid2X2Plus size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
