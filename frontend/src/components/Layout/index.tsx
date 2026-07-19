"use client";

import { useState } from "react";
import SideMenu from "@/components/SideMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <SideMenu collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`flex h-screen flex-col transition-all duration-200 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <main className="flex-1 overflow-y-auto p-2 md:mt-2">{children}</main>
      </div>
    </div>
  );
}
