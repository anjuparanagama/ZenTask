"use client";

import { useState } from "react";
import SideMenu from "@/components/SideMenu";
import SearchBar from "@/components/SearchBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <SideMenu collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`flex h-screen flex-col transition-all duration-200 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <header
          className={`
            z-30 transition-all duration-200
            md:fixed md:top-0 md:right-0
            ${collapsed ? "md:left-20" : "md:left-64"}
          `}
        >
          <SearchBar />
        </header>

        <main className="flex-1 overflow-y-auto p-2 md:mt-11">{children}</main>
      </div>
    </div>
  );
}
