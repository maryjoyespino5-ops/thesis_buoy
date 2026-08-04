// path: src/components/widgets/core/BeachMapWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

const beachZones = [
  { id: 1, name: "North Beach", status: "clean", x: 25, y: 20 },
  { id: 2, name: "Central Beach", status: "clean", x: 50, y: 35 },
  { id: 3, name: "South Beach", status: "warning", x: 75, y: 25 },
  { id: 4, name: "East Shore", status: "clean", x: 40, y: 60 },
  { id: 5, name: "West Cove", status: "clean", x: 65, y: 55 },
]

const statusColors = {
  clean: "bg-emerald-500",
  warning: "bg-amber-500",
  critical: "bg-red-500",
}

export function BeachMapWidget({
  zones = beachZones,
  selectedZone,
  onSelectZone,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Beach Map" icon="🗺️" className={className} {...props}>
      <div className="h-48 bg-surface-muted/30 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-10">🏖️</span>
        </div>
        {/* Beach outline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 5 50 Q 25 30, 50 40 Q 75 50, 95 35 L 95 95 L 5 95 Z"
            fill="rgba(14,165,233,0.05)"
            stroke="rgba(14,165,233,0.2)"
            strokeWidth="0.5"
          />
          <path
            d="M 5 60 Q 25 45, 50 50 Q 75 55, 95 45"
            fill="none"
            stroke="rgba(14,165,233,0.3)"
            strokeWidth="0.8"
            strokeDasharray="2,2"
          />
        </svg>
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onSelectZone?.(zone.id)}
            className={cn(
              "absolute w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold transition-all hover:scale-110",
              selectedZone === zone.id
                ? "bg-primary-500 text-white border-primary-600 scale-110"
                : "bg-white text-text-secondary border-primary-300",
            )}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {zone.id}
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-text-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Clean</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Warning</span>
      </div>
    </WidgetContainer>
  )
}
