import api from "@/lib/api";

export type DashboardTaskCounts = {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
};

type DashboardTaskCountsResponse = {
  totalTasks: number | string;
  completedTasks: number | string;
  inProgressTasks: number | string;
  todoTasks: number | string;
};

type OverdueTaskCountResponse = {
  overdueTasks: number | string;
};

export const getDashboardTaskCounts =
  async (): Promise<DashboardTaskCounts> => {
    const { data } = await api.get<DashboardTaskCountsResponse>(
      "/dashboard/all-tasks-count",
    );

    return {
      totalTasks: Number(data.totalTasks),
      completedTasks: Number(data.completedTasks),
      inProgressTasks: Number(data.inProgressTasks),
      todoTasks: Number(data.todoTasks),
    };
  };

export const getDashboardOverdueCount = async (): Promise<{
  overdueTasks: number;
}> => {
  const { data } = await api.get<OverdueTaskCountResponse>(
    "/dashboard/overdue-tasks-count",
  );

  return {
    overdueTasks: Number(data.overdueTasks),
  };
};

export type DashboardPriorityCounts = {
  totalTasks: number;
  highPriorityTasks: number;
  mediumPriorityTasks: number;
  lowPriorityTasks: number;
};

export const getDashboardPriorityCounts =
  async (): Promise<DashboardPriorityCounts> => {
    const { data } = await api.get<DashboardPriorityCounts>(
      "/dashboard/priority-counts",
    );
    return {
      totalTasks: Number(data.totalTasks),
      highPriorityTasks: Number(data.highPriorityTasks),
      mediumPriorityTasks: Number(data.mediumPriorityTasks),
      lowPriorityTasks: Number(data.lowPriorityTasks),
    };
  };
