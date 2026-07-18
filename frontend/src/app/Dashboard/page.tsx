import PageTitle from "@/components/PageTitle";
import DashboardLayout from "@/components/Layout";
import MiniDashboard from "./MiniDashboard";
import AnalyticsDashboard from "./AnalyticsDashboard";

const index = () => {
  return (
    <DashboardLayout>
      <div className="m-4 gap-4 flex flex-col max-h-screen">
        <PageTitle title="Dashboard" />
        <MiniDashboard />
        <AnalyticsDashboard />
      </div>
    </DashboardLayout>
  );
};

export default index;
