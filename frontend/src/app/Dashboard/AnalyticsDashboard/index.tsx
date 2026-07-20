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

const Index = ({ statusData, priorityData }: AnalyticsDashboardProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div className=" lg:col-span-2">
        <PieChart data={statusData} />
      </div>
      <div className="lg:col-span-3">
        <BarChart data={priorityData} />
      </div>
    </div>
  );
};

export default Index;
