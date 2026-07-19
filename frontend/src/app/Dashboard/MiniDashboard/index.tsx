import StatCard from "@/components/Cards";
import {
  ClipboardList,
  CheckCircle,
  Clock3,
  AlertTriangle,
} from "lucide-react";

type MiniDashboardProps = {
  totalTasks?: number;
  completedTasks?: number;
  inProgressTasks?: number;
  todoTasks?: number;
  overdueTasks?: number;
  isLoading?: boolean;
};

export default function StatCardRow({
  totalTasks = 0,
  completedTasks = 0,
  inProgressTasks = 0,
  todoTasks = 0,
  overdueTasks = 0,
  isLoading = false,
}: MiniDashboardProps) {
  const pendingTasks = inProgressTasks + todoTasks;
  const formatAmount = (value: number) => (isLoading ? "..." : String(value));

  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
      <StatCard
        icon={ClipboardList}
        amount={formatAmount(totalTasks)}
        label="Total Tasks"
        gradientFrom="#60a5fa"
        gradientTo="#2563eb"
        iconColor="#2563eb"
      />

      <StatCard
        icon={CheckCircle}
        amount={formatAmount(completedTasks)}
        label="Completed Tasks"
        gradientFrom="#6ee7b7"
        gradientTo="#059669"
        iconColor="#059669"
      />

      <StatCard
        icon={Clock3}
        amount={formatAmount(pendingTasks)}
        label="Pending Tasks"
        gradientFrom="#fde68a"
        gradientTo="#f59e0b"
        iconColor="#f59e0b"
      />

      <StatCard
        icon={AlertTriangle}
        amount={formatAmount(overdueTasks)}
        label="Overdue Tasks"
        gradientFrom="#fca5a5"
        gradientTo="#dc2626"
        iconColor="#dc2626"
      />
    </div>
  );
}
