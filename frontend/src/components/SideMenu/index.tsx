"use client";

import { useState } from "react";
import {
  LayoutGrid,
  CheckSquare,
  Settings,
  LogOut,
  ListTodo,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "Dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
];

const FOOTER_ITEMS: NavItem[] = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Logout", icon: LogOut },
];

interface SidebarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

export default function Sidebar({ activeId, onNavigate }: SidebarProps) {
  const [internalActive, setInternalActive] = useState<string>(
    activeId ?? "Dashboard",
  );

  const active = activeId ?? internalActive;

  const handleClick = (id: string) => {
    setInternalActive(id);
    onNavigate?.(id);
  };

  return (
    <aside className="flex h-screen w-64 flex-col justify-between rounded-r-xl bg-white p-4 shadow-sm">
      <div>
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white">
            <ListTodo size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Zen<span className="text-green-800">Task</span>
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleClick(id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-500 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
        {FOOTER_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}
