import { ClipboardList } from "lucide-react";

export default function StatCard({
  icon: Icon = ClipboardList,
  amount = "245",
  label = "Total Tasks",
  gradientFrom = "#60a5fa",
  gradientTo = "#2563eb",
  iconColor = "#2563eb",
  textColor = "#ffffff",
  waveColor = "rgba(255,255,255,0.18)",
  className = "",
  description = "",
}) {
  return (
    <div
      className={`group relative h-32 overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Background Shape */}
      <svg
        className="absolute -right-5 -bottom-5 w-32 h-28 opacity-70"
        viewBox="0 0 120 90"
        preserveAspectRatio="none"
      >
        <path
          d="M120,90 L30,90 C10,90 0,70 20,55 C45,37 40,10 70,5 C100,0 120,25 120,50 Z"
          fill={waveColor}
        />
      </svg>

      {/* Icon */}
      <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-sm">
        <Icon
          className="h-5 w-5"
          style={{
            color: iconColor,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <p
            className="text-3xl font-bold tracking-tight"
            style={{
              color: textColor,
            }}
          >
            {amount}
          </p>

          <p
            className="mt-1 text-sm font-medium opacity-90"
            style={{
              color: textColor,
            }}
          >
            {label}
          </p>

          {description ? (
            <p
              className="mt-0.5 text-xs opacity-75"
              style={{
                color: textColor,
              }}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
