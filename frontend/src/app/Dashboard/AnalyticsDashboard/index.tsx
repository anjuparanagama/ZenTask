import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";

const index = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <PieChart />
        <BarChart />
      </div>
    </div>
  );
};

export default index;
