import StatCard from "@/components/Cards";
import {
  ClipboardList,
  CheckCircle,
  Clock3,
  AlertTriangle,
} from "lucide-react";

export default function StatCardRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        icon={ClipboardList}
        amount="245"
        label="Total Tasks"
        gradientFrom="#60a5fa"
        gradientTo="#2563eb"
        iconColor="#2563eb"
      />

      <StatCard
        icon={CheckCircle}
        amount="168"
        label="Completed Tasks"
        gradientFrom="#6ee7b7"
        gradientTo="#059669"
        iconColor="#059669"
      />

      <StatCard
        icon={Clock3}
        amount="52"
        label="Pending Tasks"
        gradientFrom="#fde68a"
        gradientTo="#f59e0b"
        iconColor="#f59e0b"
      />

      <StatCard
        icon={AlertTriangle}
        amount="25"
        label="Overdue Tasks"
        gradientFrom="#fca5a5"
        gradientTo="#dc2626"
        iconColor="#dc2626"
      />
    </div>
  );
}
