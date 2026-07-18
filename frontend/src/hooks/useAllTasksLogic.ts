"use client";

import { useMemo, useState } from "react";
import { tasks as initialTasks } from "@/app/Tasks/data";
import type { Task } from "@/app/Tasks/columns";

type TaskPriority = Task["priority"];

type NewTaskForm = {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
};

const emptyForm: NewTaskForm = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Low",
};

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [form, setForm] = useState<NewTaskForm>(emptyForm);

  const nextId = useMemo(() => {
    const max = tasks.reduce((acc, task) => Math.max(acc, task.id), 0);
    return max + 1;
  }, [tasks]);

  const isValid =
    form.title.trim().length > 0 && form.dueDate.trim().length > 0;

  const updateStatus = (id: number, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });

    setIsEditOpen(true);
  };

  const openDelete = (task: Task) => {
    setDeletingTask(task);
    setIsDeleteOpen(true);
  };

  const addTask = () => {
    if (!isValid) return;

    const newTask: Task = {
      id: nextId,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      priority: form.priority,
      status: "To Do",
    };

    setTasks((prev) => [newTask, ...prev]);

    resetAndClose();
  };

  const updateTask = () => {
    if (!editingTask || !isValid) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: form.title.trim(),
              description: form.description.trim(),
              dueDate: form.dueDate,
              priority: form.priority,
            }
          : task,
      ),
    );

    resetAndClose();
  };

  const deleteTask = () => {
    if (!deletingTask) return;
    setTasks((prev) => prev.filter((task) => task.id !== deletingTask.id));
    resetAndClose();
  };

  const resetAndClose = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setEditingTask(null);
    setDeletingTask(null);
    setForm(emptyForm);
  };

  return {
    tasks,
    form,
    setForm,
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    addTask,
    updateTask,
    deleteTask,
    updateStatus,
    openEdit,
    openDelete,
    resetAndClose,
  };
}
