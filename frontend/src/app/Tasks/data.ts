import { Task } from "./columns";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Create Login Page",
    description: "Build responsive login UI",
    dueDate: "2026-07-20",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Connect API",
    description: "Integrate backend APIs",
    dueDate: "2026-07-22",
    priority: "Medium",
    status: "To Do",
  },
  {
    id: 1,
    title: "Create Login Page",
    description: "Build responsive login UI",
    dueDate: "2026-07-20",
    priority: "High",
    status: "Overdue",
  },
  {
    id: 2,
    title: "Connect API",
    description: "Integrate backend APIs",
    dueDate: "2026-07-22",
    priority: "Low",
    status: "Completed",
  },
];
