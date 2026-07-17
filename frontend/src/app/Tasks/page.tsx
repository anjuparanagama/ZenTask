"use client";

import { useMemo, useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/Table";
import { createColumns, type Task } from "./columns";
import { tasks as initialTasks } from "./data";
import TaskForm from "./components/TaskForm";

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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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
    setEditingTask(null);
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
    </div>
  );
};

export default TasksPage;
