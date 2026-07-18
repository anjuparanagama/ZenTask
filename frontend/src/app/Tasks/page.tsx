"use client";

import { useMemo } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/Table";
import { createColumns } from "./columns";
import TaskForm from "./components/TaskForm";
import ConfirmModal from "@/components/ConfirmationModal";
import { Trash2 } from "lucide-react";
import DashboardLayout from "@/components/Layout";

import useTasks from "@/hooks/useAllTasksLogic";

const TasksPage = () => {
  const {
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
  } = useTasks();

  const columns = useMemo(
    () => createColumns(updateStatus, openEdit, openDelete),
    [],
  );

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default TasksPage;
