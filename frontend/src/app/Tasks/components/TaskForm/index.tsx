"use client";

import DialogModal from "@/components/DialogModal";
import { Task } from "../../columns";
import Dropdown from "@/components/DropDown";

type TaskPriority = Task["priority"];

type NewTaskForm = {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
};

interface TaskFormProps {
  open: boolean;
  mode: "create" | "edit";
  form: NewTaskForm;
  setForm: React.Dispatch<React.SetStateAction<NewTaskForm>>;
  onClose: () => void;
  onSubmit: () => void;
}

const TaskForm = ({
  open,
  mode,
  form,
  setForm,
  onClose,
  onSubmit,
}: TaskFormProps) => {
  const isValid =
    form.title.trim().length > 0 && form.dueDate.trim().length > 0;

  return (
    <DialogModal
      open={open}
      title={mode === "edit" ? "Edit Task" : "Add New Task"}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!isValid}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mode === "edit" ? "Save" : "Create"}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="grid gap-2">
          <label className="text-xs font-medium text-slate-500">Title</label>

          <input
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="e.g. Implement login"
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-medium text-slate-500">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Short details about the task"
            className="min-h-[70px] w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-500">
              Due Date
            </label>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  dueDate: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-500">
              Priority
            </label>

            <Dropdown
              value={form.priority}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  priority: value as TaskPriority,
                }))
              }
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
              className="py-2 rounded-xl"
            />
          </div>
        </div>

        {!isValid && (
          <p className="text-xs text-slate-500">
            Title and Due Date are required.
          </p>
        )}
      </div>
    </DialogModal>
  );
};

export default TaskForm;
