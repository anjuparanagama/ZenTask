"use client";

import {
  Pie,
  PieChart,
  Sector,
  PieSectorDataItem,
  Tooltip,
  TooltipIndex,
} from "recharts";

const taskData = [
  { name: "Completed", value: 65, fill: "#10B981" },
  { name: "In Progress", value: 20, fill: "#3B82F6" },
  { name: "Pending", value: 10, fill: "#F59E0B" },
  { name: "Overdue", value: 5, fill: "#EF4444" },
];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;

  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));

  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 5) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 5) * sin;

  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 15) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 15) * sin;

  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;

  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* Center Label */}
      <text
        x={cx}
        y={cy}
        dy={5}
        textAnchor="middle"
        fill={fill}
        className="text-xs font-semibold"
      >
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 4}
        outerRadius={(outerRadius ?? 0) + 7}
        fill={fill}
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />

      <circle cx={ex} cy={ey} r={2} fill={fill} />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill="#374151"
        className="text-xs font-semibold"
      >
        {`${value} Tasks`}
      </text>

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={14}
        textAnchor={textAnchor}
        fill="#9CA3AF"
        className="text-[11px]"
      >
        {`${((percent ?? 0) * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export default function TaskStatusPieChart({
  isAnimationActive = true,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className=" text-lg font-semibold text-gray-800">
        Task Status Overview
      </h2>
      <p className="text-sm font-mono text-gray-500">Tasks grouped by Status</p>
      <div className="flex justify-center">
        <PieChart
          width={420}
          height={240}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
            left: 30,
          }}
        >
          <Pie
            activeShape={renderActiveShape}
            data={taskData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            dataKey="value"
            isAnimationActive={isAnimationActive}
          />

          <Tooltip content={() => null} defaultIndex={defaultIndex} />
        </PieChart>
      </div>

      {/* Legend */}
      <div className="-mt-2 grid grid-cols-2 gap-3 text-sm">
        {taskData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />

              <span className="text-gray-600">{item.name}</span>
            </div>

            <span className="font-semibold text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
