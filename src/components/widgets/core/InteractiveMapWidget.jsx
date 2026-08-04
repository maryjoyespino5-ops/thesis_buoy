// path: src/components/widgets/core/InteractiveMapWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

const communityZones = [
  { id: 1, name: "North Beach", status: "clean", x: 25, y: 20 },
  { id: 2, name: "Central Beach", status: "clean", x: 50, y: 35 },
  { id: 3, name: "South Cove", status: "warning", x: 75, y: 25 },
  { id: 4, name: "East Shore", status: "clean", x: 40, y: 60 },
  { id: 5, name: "West Bay", status: "clean", x: 65, y: 55 },
]

const statusColors = {
  clean: "bg-emerald-500",
  warning: "bg-amber-500",
  critical: "bg-red-500",
}

export function InteractiveMapWidget({
  zones = communityZones,
  selectedZone,
  onSelectZone,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Interactive Map" icon="🗺️" className={className} {...props}>
      <div className="h-48 bg-surface-muted/30 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-10">🏖️</span>
        </div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="communityGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#communityGrid)" />
        </svg>
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onSelectZone?.(zone.id)}
            className={cn(
              "absolute w-8 h-8 rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-110",
              selectedZone === zone.id
                ? "bg-primary-500/20 border-primary-500 scale-110"
                : "bg-surface/80 border-primary-300",
            )}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-[9px] font-bold text-text-primary leading-none">
              {zone.name.split(" ")[0]}
            </span>
            <span className={cn("w-1.5 h-1.5 rounded-full mt-0.5", statusColors[zone.status])} />
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
