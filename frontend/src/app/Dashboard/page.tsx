import PageTitle from "@/components/PageTitle";
import MiniDashboard from "./MiniDashboard";
import AnalyticsDashboard from "./AnalyticsDashboard";

const index = () => {
  return (
    <div className="m-4 gap-4 flex flex-col max-h-screen">
      <PageTitle title="Dashboard" />
      <MiniDashboard />
      <AnalyticsDashboard />
    </div>
  );
};

export default index;
