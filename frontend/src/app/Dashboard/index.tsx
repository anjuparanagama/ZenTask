import PageTitle from "@/components/PageTitle";
import MiniDashboard from "./MiniDashboard";

const index = () => {
  return (
    <div className="m-4 gap-4 flex flex-col">
      <PageTitle />
      <MiniDashboard />
    </div>
  );
};

export default index;
