import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SideMenu from "@/components/SideMenu";
import SearchBar from "@/components/SearchBar";
import DashboardLayout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZenTask",
  description: "Task & Analytics Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="h-full overflow-hidden bg-gray-50"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
