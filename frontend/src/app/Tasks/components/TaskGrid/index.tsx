"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "@/app/Tasks/columns";
import Dropdown from "@/components/DropDown";
import { formatDueDate } from "@/lib/formatDate";

interface TaskGridProps {
  tasks: Task[];
  onStatusChange: (id: number, status: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const PRIORITY_STYLES: Record<Task["priority"], string> = {
  High: "bg-red-600 text-white",
  Medium: "bg-orange-600 text-white",
  Low: "bg-green-600 text-white",
};

const STATUS_OPTIONS = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Overdue", label: "Overdue" },
] as const;

const TaskCard = ({
  task,
  onStatusChange,
  onEdit,
  onDelete,
}: {
  task: Task;
  onStatusChange: (id: number, status: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-colors hover:border-teal-400/60 dark:hover:border-teal-500/40">
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {task.title}
      </h3>

      <span
        className={`rounded-xl px-3 py-1 text-sm font-semibold font-mono ${PRIORITY_STYLES[task.priority]}`}
      >
        {task.priority}
      </span>
    </div>

    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
      {task.description}
    </p>

    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
      <span className="font-medium">Due</span>
      <span className="font-mono">{formatDueDate(task.dueDate)}</span>
    </div>

    <div className="flex items-center justify-between gap-3">
      <div className="w-40">
        <Dropdown
          options={STATUS_OPTIONS.map((option) => ({ ...option }))}
          value={task.status}
          onChange={(value) => onStatusChange(task.id, value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(task)}
          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
          title="Edit task"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(task)}
          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default function TaskGrid({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskGridProps) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-16 text-center text-slate-400 dark:text-slate-500 shadow-sm">
        No tasks available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
