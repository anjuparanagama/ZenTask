"use client";

import { useCallback, useEffect, useState } from "react";
import type { Task } from "@/app/Tasks/columns";
import {
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  getTasks,
  updateTask as updateTaskApi,
} from "@/services/task.service";
import type { TaskInput } from "@/services/task.service";
import { toast } from "sonner";

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [form, setForm] = useState<NewTaskForm>(emptyForm);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const isValid =
    form.title.trim().length > 0 && form.dueDate.trim().length > 0;

  const buildInput = (): TaskInput => ({
    title: form.title.trim(),
    description: form.description.trim(),
    dueDate: form.dueDate,
    priority: form.priority,
    status: editingTask?.status ?? "To Do",
  });

  const updateStatus = async (id: number, status: Task["status"]) => {
    const target = tasks.find((task) => task.id === id);
    if (!target) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task)),
    );

    try {
      await updateTaskApi(id, {
        title: target.title,
        description: target.description,
        dueDate: target.dueDate,
        priority: target.priority,
        status,
      });
    } catch {
      toast.error("Failed to update task status");
      fetchTasks();
    }
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

  const addTask = async () => {
    if (!isValid) return;

    try {
      await createTaskApi(buildInput());
      await fetchTasks();
      toast.success("Task added");
      resetAndClose();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const updateTask = async () => {
    if (!editingTask || !isValid) return;

    try {
      await updateTaskApi(editingTask.id, buildInput());
      await fetchTasks();
      toast.success("Task updated");
      resetAndClose();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async () => {
    if (!deletingTask) return;

    try {
      await deleteTaskApi(deletingTask.id);
      await fetchTasks();
      toast.success("Task deleted");
      resetAndClose();
    } catch {
      toast.error("Failed to delete task");
    }
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
    loading,
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
