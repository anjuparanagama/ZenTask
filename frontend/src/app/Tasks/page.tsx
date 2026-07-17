"use client";

import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/Table";
import { createColumns, type Task } from "./columns";
import { tasks as initialTasks } from "./data";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

  const columns = createColumns(updateStatus);

  return (
    <div className="m-4 gap-4 flex flex-col max-h-screen">
      <PageTitle title="Tasks" />

      <DataTable columns={columns} data={tasks} />
    </div>
  );
};

export default TasksPage;
