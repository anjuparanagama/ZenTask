"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

type PriorityBarDatum = {
  priority: string;
  tasks: number;
  fill: string;
};

const defaultPriorityData: PriorityBarDatum[] = [
  {
    priority: "High",
    tasks: 0,
    fill: "#EF4444",
  },
  {
    priority: "Medium",
    tasks: 0,
    fill: "#F59E0B",
  },
  {
    priority: "Low",
    tasks: 0,
    fill: "#10B981",
  },
];

type TaskPriorityBarChartProps = {
  data?: PriorityBarDatum[];
};

export default function TaskPriorityBarChart({
  data = defaultPriorityData,
}: TaskPriorityBarChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm w-full pointer-events-none">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Task Priority Overview
        </h2>

        <p className="text-sm font-mono text-gray-500">
          Tasks grouped by priority level
        </p>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="priority" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip
              cursor={false}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="tasks"
              radius={[8, 8, 0, 0]}
              barSize={45}
              activeBar={false}
            >
              {data.map((item) => (
                <Cell key={item.priority} fill={item.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        {data.map((item) => (
          <div
            key={item.priority}
            className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: item.fill,
                }}
              />

              <span className="text-sm text-gray-600">{item.priority}</span>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-sm font-bold text-gray-800">{item.tasks}</p>

              <p className="text-xs text-gray-400">Tasks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
