import { DollarSign } from "lucide-react";

export default function StatCard({
  icon: Icon = DollarSign,
  amount = "$2,342",
  label = "Total Income",
  gradientFrom = "#7dd3fc",
  gradientTo = "#3b82f6",
  iconColor = "#3b82f6",
  textColor = "#ffffff",
  waveColor = "rgba(255,255,255,0.22)",
  className = "",
}) {
  return (
    <div
      className={`relative w-auto h-28 rounded-2xl p-3.5 overflow-hidden shadow-md ${className}`}
      style={{
        background: `linear-gradient(160deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <svg
        className="absolute -bottom-2 -right-2 w-28 h-20"
        viewBox="0 0 120 90"
        preserveAspectRatio="none"
      >
        <path
          d="M120,90 L30,90 C10,90 0,70 20,55 C45,37 40,10 70,5 C100,0 120,25 120,50 Z"
          fill={waveColor}
        />
      </svg>

      <div className="relative z-10 w-8 h-8 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm">
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
      </div>

      <div className="relative z-10">
        <p
          className="text-lg font-bold leading-tight"
          style={{ color: textColor }}
        >
          {amount}
        </p>
        <p
          className="text-[11px] mt-0.5 opacity-85"
          style={{ color: textColor }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
