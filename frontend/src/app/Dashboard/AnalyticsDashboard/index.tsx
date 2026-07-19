import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import type { TaskStatusDatum } from "@/components/PieChart";

type PriorityBarDatum = {
  priority: string;
  tasks: number;
  fill: string;
};

type AnalyticsDashboardProps = {
  statusData?: TaskStatusDatum[];
  priorityData?: PriorityBarDatum[];
};

const index = ({ statusData, priorityData }: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <PieChart data={statusData} />
        <BarChart data={priorityData} />
      </div>
    </div>
  );
};

export default index;
