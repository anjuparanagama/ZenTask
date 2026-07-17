"use client";

import { useMemo, useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/Table";
import { createColumns, type Task } from "./columns";
import { tasks as initialTasks } from "./data";
import TaskForm from "./components/TaskForm";
import ConfirmModal from "@/components/ConfirmationModal";
import { Trash2 } from "lucide-react";

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

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [form, setForm] = useState<NewTaskForm>(emptyForm);

  const columns = useMemo(() => {
    return createColumns(
      (id, status) => {
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
      },
      (task) => {
        setEditingTask(task);
        setForm({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
        });
        setIsEditOpen(true);
      },
      (task) => {
        setDeletingTask(task);
        setIsDeleteOpen(true);
      },
    );
  }, []);

  const nextId = useMemo(() => {
    const max = tasks.reduce((acc, t) => Math.max(acc, t.id), 0);
    return max + 1;
  }, [tasks]);

  const isValid =
    form.title.trim().length > 0 && form.dueDate.trim().length > 0;

  const resetAndClose = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setEditingTask(null);
    setDeletingTask(null);
    setForm(emptyForm);
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
    if (!isValid || !editingTask) return;

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

  return (
    <div className="m-4 gap-4 flex flex-col max-h-screen">
      <PageTitle title="Tasks" onAddTask={() => setIsAddOpen(true)} />

      <DataTable columns={columns} data={tasks} />

      <TaskForm
        open={isAddOpen || isEditOpen}
        mode={isEditOpen ? "edit" : "create"}
        form={form}
        setForm={setForm}
        onClose={resetAndClose}
        onSubmit={isEditOpen ? updateTask : addTask}
      />

      <ConfirmModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={deleteTask}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
        icon={<Trash2 size={32} className="text-red-600" />}
      />
    </div>
  );
};

export default TasksPage;
