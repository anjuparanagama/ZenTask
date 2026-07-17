import Dashboard from "@/app/Dashboard";
import SideMenu from "@/components/SideMenu";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideMenu />
      <div className="flex-1 overflow-y-auto items-start justify-start">
        <SearchBar />
        <Dashboard />
      </div>
    </div>
  );
}
