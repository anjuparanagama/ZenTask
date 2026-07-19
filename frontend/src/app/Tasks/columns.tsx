"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Dropdown from "@/components/DropDown";

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "To Do" | "In Progress" | "Completed" | "Overdue";
  onEdit?: () => void;
  onDelete?: () => void;
};

export const createColumns = (
  updateStatus: (id: number, status: Task["status"]) => void,
  onEdit: (task: Task) => void,
  onDelete: (task: Task) => void,
): ColumnDef<Task>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.original.description;
      if (desc.length <= 50) return desc;
      return <span title={desc}>{desc.slice(0, 50)}...</span>;
    },
  },

  {
    accessorKey: "dueDate",
    header: "Due Date",
  },

  {
    accessorKey: "priority",
    header: "Priority",

    cell: ({ row }) => {
      const priority = row.original.priority;

      const styles = {
        High: "bg-red-600 text-white",
        Medium: "bg-orange-600 text-white",
        Low: "bg-green-600 text-white",
      };

      return (
        <span
          className={`
          px-3
          py-1
          rounded-xl
          text-center
          items-center
          justify-center
          flex
          text-sm
          font-semibold
          font-mono
          ${styles[priority]}
        `}
        >
          {priority}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const task = row.original;

      return (
        <Dropdown
          options={[
            {
              value: "To Do",
              label: "To Do",
            },
            {
              value: "In Progress",
              label: "In Progress",
            },
            {
              value: "Completed",
              label: "Completed",
            },
            {
              value: "Overdue",
              label: "Overdue",
            },
          ]}

          value={task.status}

          onChange={(value) => updateStatus(task.id, value)}

          className="w-40"
        />
      );
    },
  },

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => {
      const task = row.original;

      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="
              rounded-lg
              p-2
              text-blue-600
              transition
              hover:bg-blue-50
            "
            title="Edit task"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(task)}
            className="
              rounded-lg 
              text-red-600
              transition
              hover:bg-red-50
            "
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      );
    },
  },
];
