// path: src/components/widgets/core/FishingZonesWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

const fishingZones = [
  { id: 1, name: "Zone North", status: "active", fish: "High", x: 25, y: 20 },
  { id: 2, name: "Zone East", status: "active", fish: "Medium", x: 60, y: 30 },
  { id: 3, name: "Zone South", status: "closed", fish: "Low", x: 50, y: 65 },
  { id: 4, name: "Zone West", status: "active", fish: "High", x: 20, y: 55 },
  { id: 5, name: "Zone Central", status: "active", fish: "Medium", x: 45, y: 40 },
]

const statusConfig = {
  active: { color: "text-emerald-500", bg: "bg-emerald-50", dot: "bg-emerald-500" },
  closed: { color: "text-red-500", bg: "bg-red-50", dot: "bg-red-500" },
}

export function FishingZonesWidget({
  zones = fishingZones,
  selectedZone,
  onSelectZone,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Fishing Zones" icon="🗺️" className={className} {...props}>
      <div className="h-40 bg-surface-muted/30 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl opacity-10">🐟</span>
        </div>
        {zones.map((zone) => {
          const cfg = statusConfig[zone.status] || statusConfig.active
          return (
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
                {zone.name.split(" ")[1]}
              </span>
              <span className={cn("w-1.5 h-1.5 rounded-full mt-0.5", cfg.dot)} />
            </button>
          )
        })}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-text-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Closed</span>
      </div>
    </WidgetContainer>
  )
}
