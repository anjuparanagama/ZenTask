"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmationModal";
import {
  LayoutGrid,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "Dashboard", label: "Dashboard", icon: LayoutGrid, href: "/Dashboard" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, href: "/Tasks" },
];

const FOOTER_ITEMS: NavItem[] = [
  { id: "logout", label: "Logout", icon: LogOut, href: "#/logout" },
];

interface SidebarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  activeId,
  onNavigate,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 640 && width < 1280) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, setCollapsed]);

  const openLogoutModal = () => {
    setMobileOpen(false);
    setLogoutModalOpen(true);
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const active = activeId ?? (pathname === "/Tasks" ? "tasks" : "Dashboard");

  const handleClick = (id: string) => {
    onNavigate?.(id);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const renderNavButton = (
    { id, label, icon: Icon }: NavItem,
    isFooter = false,
    isMobile = false,
  ) => {
    const isActive = active === id;

    const isCollapsed = collapsed && !isMobile;

    return (
      <button
        key={id}
        type="button"
        onClick={() => handleClick(id)}
        title={isCollapsed ? label : undefined}
        className={`group relative flex items-center text-sm font-medium transition-all duration-200 ${
          isCollapsed
            ? "h-11 w-11 justify-center rounded-xl px-0 mx-auto"
            : "w-full gap-3 rounded-xl px-3 py-2.5"
        } ${
          isActive && !isFooter
            ? "bg-teal-500 text-white shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
        }`}
      >
        <Icon size={18} className="shrink-0" />

        <span
          className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
            isCollapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
          }`}
        >
          {label}
        </span>

        {isCollapsed && (
          <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-50">
            {label}
          </span>
        )}
      </button>
    );
  };

  const renderNavLink = (
    { id, label, icon: Icon, href }: NavItem,
    isMobile = false,
  ) => {
    const isActive = active === id;
    const isCollapsed = collapsed && !isMobile;

    return (
      <Link
        key={id}
        href={href}
        onClick={() => handleClick(id)}
        title={isCollapsed ? label : undefined}
        className={`group relative flex items-center text-sm font-medium transition-all duration-200 ${
          isCollapsed
            ? "h-11 w-11 justify-center rounded-xl px-0 mx-auto"
            : "w-full gap-3 rounded-xl px-3 py-2.5"
        } ${
          isActive
            ? "bg-teal-500 text-white shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
        }`}
      >
        <Icon size={18} className="shrink-0" />

        <span
          className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
            isCollapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
          }`}
        >
          {label}
        </span>

        {isCollapsed && (
          <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-50">
            {label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* ===== Mobile top bar ===== */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-sm md:hidden">
        <div className="flex items-center gap-2 px-1">
          <div className="flex items-center justify-center rounded-lg">
            <Image
              src="/topLogo.png"
              alt="ZenTask Logo"
              width={150}
              height={30}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute left-0 top-0 flex h-full w-72 flex-col justify-between bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-5 ">
              <div className="flex items-center gap-3">
                <Image
                  src="/topLogo.png"
                  alt="ZenTask Logo"
                  width={100}
                  height={60}
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              {NAV_ITEMS.map((item) => renderNavLink(item, true))}
            </nav>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 p-4">
            <div className="flex flex-col gap-2">
              {FOOTER_ITEMS.map((item) =>
                item.id === "logout" ? (
                  <button
                    key={item.id}
                    type="button"
                    onClick={openLogoutModal}
                    title={item.label}
                    className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  >
                    <item.icon size={18} className="shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                ) : (
                  renderNavButton(item, true, true)
                ),
              )}
              <button
                type="button"
                onClick={toggleTheme}
                className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
              >
                {mounted ? (isDark ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />) : <Moon size={18} className="shrink-0" />}
                <span className="whitespace-nowrap">Toggle theme</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          setLogoutModalOpen(false);
          router.push("/");
        }}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
        icon={<LogOut size={32} className="text-red-600" />}
      />

      {/* ===== Desktop sidebar===== */}
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-screen flex-col justify-between bg-white dark:bg-gray-800 p-3 shadow-sm transition-all duration-200 md:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
        </button>

        <div>
          <div
            className={`flex items-center mb-4 ${
              collapsed ? "justify-center" : "gap-3 px-2"
            }`}
          >
            <Image
              src="/topLogo.png"
              alt="ZenTask Logo"
              width={180}
              height={40}
              className={`shrink-0 transition-all duration-200 ${
                collapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
              }`}
            />
          </div>

          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => renderNavLink(item))}
          </nav>
        </div>

        <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700">
          {FOOTER_ITEMS.map((item) =>
            item.id === "logout" ? (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setLogoutModalOpen(true);
                }}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center text-sm font-medium transition-all duration-200 ${
                  collapsed
                    ? "h-11 w-11 justify-center rounded-xl px-0 mx-auto"
                    : "w-full gap-3 rounded-xl px-3 py-2.5"
                } text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100`}
              >
                <item.icon size={18} className="shrink-0" />
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
                    collapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
                  }`}
                >
                  {item.label}
                </span>
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-50">
                    {item.label}
                  </span>
                )}
              </button>
            ) : (
              renderNavButton(item, true)
            ),
          )}
          <button
            type="button"
            onClick={toggleTheme}
            title={collapsed ? "Toggle theme" : undefined}
            className={`group relative flex items-center text-sm font-medium transition-all duration-200 ${
              collapsed
                ? "h-11 w-11 justify-center rounded-xl px-0 mx-auto"
                : "w-full gap-3 rounded-xl px-3 py-2.5"
            } text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100`}
          >
            {mounted ? (isDark ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />) : <Moon size={18} className="shrink-0" />}
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
                collapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
              }`}
            >
              Toggle theme
            </span>
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-50">
                Toggle theme
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
