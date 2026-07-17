import StatCard from "@/components/Cards";
import { Landmark, PiggyBank, ArrowLeftRight, Wallet } from "lucide-react";

export default function StatCardRow() {
  return (
    <div className="grid grid-cols-4 gap-4 ">
      <StatCard
        icon={Landmark}
        amount="$2,342"
        label="Total Income"
        gradientFrom="#7dd3fc"
        gradientTo="#3b82f6"
        iconColor="#3b82f6"
      />
      <StatCard
        icon={PiggyBank}
        amount="$2,312"
        label="Paid Income"
        gradientFrom="#6ee7b7"
        gradientTo="#10b981"
        iconColor="#10b981"
      />
      <StatCard
        icon={ArrowLeftRight}
        amount="$2,332"
        label="Unpaid Income"
        gradientFrom="#fcd34d"
        gradientTo="#f59e0b"
        iconColor="#f59e0b"
      />
      <StatCard
        icon={Wallet}
        amount="$3,587"
        label="Total Income Sent"
        gradientFrom="#c4b5fd"
        gradientTo="#8b5cf6"
        iconColor="#8b5cf6"
      />
    </div>
  );
}
