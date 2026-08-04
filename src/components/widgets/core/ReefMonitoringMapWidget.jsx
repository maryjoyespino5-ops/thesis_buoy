// path: src/components/widgets/core/ReefMonitoringMapWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

const reefZones = [
  { id: 1, name: "Zone A", status: "healthy", x: 20, y: 30 },
  { id: 2, name: "Zone B", status: "healthy", x: 45, y: 20 },
  { id: 3, name: "Zone C", status: "warning", x: 70, y: 40 },
  { id: 4, name: "Zone D", status: "healthy", x: 30, y: 65 },
  { id: 5, name: "Zone E", status: "healthy", x: 60, y: 70 },
]

const statusColors = {
  healthy: "bg-emerald-500",
  warning: "bg-amber-500",
  critical: "bg-red-500",
}

export function ReefMonitoringMapWidget({
  zones = reefZones,
  selectedZone,
  onSelectZone,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Reef Monitoring Map" icon="🗺️" className={className} {...props}>
      <div className="h-48 bg-surface-muted/30 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-10">🪸</span>
        </div>
        {/* Reef zone polygons */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="reefGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(14,165,233,0.1)" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#reefGrid)" />
          {zones.map((zone) => (
            <circle
              key={zone.id}
              cx={zone.x}
              cy={zone.y}
              r="8"
              fill={zone.status === "healthy" ? "rgba(16,185,129,0.2)" : zone.status === "warning" ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.2)"}
              stroke={zone.status === "healthy" ? "#10b981" : zone.status === "warning" ? "#f59e0b" : "#ef4444"}
              strokeWidth="1"
              className="cursor-pointer transition-all hover:scale-110"
              onClick={() => onSelectZone?.(zone.id)}
            />
          ))}
        </svg>
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onSelectZone?.(zone.id)}
            className="absolute text-[9px] font-medium text-text-primary bg-surface/80 px-1.5 py-0.5 rounded transition-all hover:bg-surface"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {zone.name}
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-text-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Warning</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
      </div>
    </WidgetContainer>
  )
}
