import api from "@/lib/api";
import type { Task } from "@/app/Tasks/columns";
import {
  PRIORITY_TO_API,
  STATUS_TO_API,
  API_TO_PRIORITY,
  type RawTask,
  type TaskInput,
} from "@/constants/tasks";

export type { TaskInput };

const todayAsDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const normalizeStatus = (raw: RawTask): Task["status"] => {
  if (raw.status === "COMPLETED") return "Completed";
  if (raw.status === "IN_PROGRESS") return "In Progress";

  return raw.due_date < todayAsDateString() ? "Overdue" : "To Do";
};

const normalizeTask = (raw: RawTask): Task => ({
  id: raw.id,
  title: raw.title,
  description: raw.description,
  priority: API_TO_PRIORITY[raw.priority],
  status: normalizeStatus(raw),
  dueDate: raw.due_date,
});

const toApiStatus = (status: Task["status"] | undefined) =>
  STATUS_TO_API[status ?? "To Do"];

const isNotFoundError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "response" in error &&
  (error as { response?: { status?: number } }).response?.status === 404;

const buildTaskPayload = (input: TaskInput) => ({
  title: input.title,
  description: input.description,
  priority: PRIORITY_TO_API[input.priority],
  status: toApiStatus(input.status),
  due_date: input.dueDate,
});

export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await api.get<RawTask[]>("/tasks");
    return data.map(normalizeTask);
  } catch (error) {
    if (isNotFoundError(error)) return [];
    throw error;
  }
};

export const createTask = async (input: TaskInput) => {
  const { data } = await api.post("/tasks", buildTaskPayload(input));
  return data;
};

export const updateTask = async (id: number, input: TaskInput) => {
  const { data } = await api.put(`/tasks/${id}`, buildTaskPayload(input));
  return data;
};

export const deleteTask = async (id: number) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
