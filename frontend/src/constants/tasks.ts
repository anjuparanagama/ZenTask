import type { Task } from "@/app/Tasks/columns";

export const PRIORITY_TO_API = {
  High: "HIGH",
  Medium: "MEDIUM",
  Low: "LOW",
} as const;

export const STATUS_TO_API = {
  "To Do": "TODO",
  "In Progress": "IN_PROGRESS",
  Completed: "COMPLETED",
  Overdue: "TODO",
} as const;

export const API_TO_PRIORITY = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
} as const;

export type ApiPriority = keyof typeof API_TO_PRIORITY;
export type ApiStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type RawTask = {
  id: number;
  title: string;
  description: string;
  priority: ApiPriority;
  status: ApiStatus;
  due_date: string;
};

export type TaskInput = {
  title: string;
  description: string;
  dueDate: string;
  priority: Task["priority"];
  status?: Task["status"];
};
