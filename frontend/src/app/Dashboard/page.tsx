"use client";

import { useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import DashboardLayout from "@/components/Layout";
import DataTable from "@/components/Table";
import MiniDashboard from "./MiniDashboard";
import AnalyticsDashboard from "./AnalyticsDashboard";
import {
  getCompletedTodayCount,
  getDashboardOverdueCount,
  getDashboardTaskCounts,
  getDashboardPriorityCounts,
  type DashboardPriorityCounts,
  type DashboardTaskCounts,
} from "../../services/dashboard.service";
import type { TaskStatusDatum } from "@/components/PieChart";

type PriorityTableRow = {
  priority: string;
  taskCount: number;
  share: string;
};

type PriorityBarDatum = {
  priority: string;
  tasks: number;
  fill: string;
};

const PRIORITY_BAR_COLORS = {
  High: "#EF4444",
  Medium: "#F59E0B",
  Low: "#10B981",
} as const;

const STATUS_COLORS = {
  completed: "#10B981",
  inProgress: "#3B82F6",
  todo: "#F59E0B",
} as const;

const index = () => {
  const [counts, setCounts] = useState<DashboardTaskCounts | null>(null);
  const [priorityCounts, setPriorityCounts] =
    useState<DashboardPriorityCounts | null>(null);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        const [taskCounts, overdueCount, priorityCount] =
          await Promise.all([
            getDashboardTaskCounts(),
            getDashboardOverdueCount(),
            getDashboardPriorityCounts(),
          ]);

        if (!active) return;

        setCounts(taskCounts);
        setPriorityCounts(priorityCount);
        setOverdueTasks(overdueCount.overdueTasks);

        const completedTodayResult = await getCompletedTodayCount().catch(
          () => ({ completedToday: 0 }),
        );
        if (active) {
          setCompletedToday(completedTodayResult.completedToday);
        }
      } catch (error) {
        if (!active) return;

        setCounts({
          totalTasks: 0,
          completedTasks: 0,
          inProgressTasks: 0,
          todoTasks: 0,
        });
        setPriorityCounts({
          totalTasks: 0,
          highPriorityTasks: 0,
          mediumPriorityTasks: 0,
          lowPriorityTasks: 0,
        });
        setOverdueTasks(0);
        setCompletedToday(0);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const statusData: TaskStatusDatum[] = [
    {
      name: "Completed",
      value: counts?.completedTasks ?? 0,
      fill: STATUS_COLORS.completed,
    },
    {
      name: "In Progress",
      value: counts?.inProgressTasks ?? 0,
      fill: STATUS_COLORS.inProgress,
    },
    {
      name: "To Do",
      value: counts?.todoTasks ?? 0,
      fill: STATUS_COLORS.todo,
    },
  ];

  const priorityChartData: PriorityBarDatum[] = useMemo(
    () => [
      {
        priority: "High",
        tasks: priorityCounts?.highPriorityTasks ?? 0,
        fill: PRIORITY_BAR_COLORS.High,
      },
      {
        priority: "Medium",
        tasks: priorityCounts?.mediumPriorityTasks ?? 0,
        fill: PRIORITY_BAR_COLORS.Medium,
      },
      {
        priority: "Low",
        tasks: priorityCounts?.lowPriorityTasks ?? 0,
        fill: PRIORITY_BAR_COLORS.Low,
      },
    ],
    [priorityCounts],
  );

  return (
    <DashboardLayout>
      <div className="m-4 gap-4 flex flex-col max-h-screen">
        <PageTitle title="Dashboard" />
        <MiniDashboard
          totalTasks={counts?.totalTasks}
          completedTasks={counts?.completedTasks}
          inProgressTasks={counts?.inProgressTasks}
          todoTasks={counts?.todoTasks}
          overdueTasks={overdueTasks}
          completedToday={completedToday}
          isLoading={loading}
        />
        <AnalyticsDashboard
          statusData={statusData}
          priorityData={priorityChartData}
        />
      </div>
    </DashboardLayout>
  );
};

export default index;
