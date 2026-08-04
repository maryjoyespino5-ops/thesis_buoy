// path: src/components/widgets/core/DeploymentMapWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

const deploymentZones = [
  { id: 1, name: "Zone Alpha", buoys: 3, status: "active", x: 20, y: 30 },
  { id: 2, name: "Zone Bravo", buoys: 2, status: "active", x: 55, y: 20 },
  { id: 3, name: "Zone Charlie", buoys: 4, status: "active", x: 40, y: 55 },
  { id: 4, name: "Zone Delta", buoys: 1, status: "maintenance", x: 75, y: 60 },
  { id: 5, name: "Zone Echo", buoys: 2, status: "active", x: 25, y: 70 },
]

const statusColors = {
  active: "bg-emerald-500",
  maintenance: "bg-amber-500",
  offline: "bg-red-500",
}

export function DeploymentMapWidget({
  zones = deploymentZones,
  selectedZone,
  onSelectZone,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Deployment Map" icon="🗺️" className={className} {...props}>
      <div className="h-48 bg-surface-muted/30 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-10">🗺️</span>
        </div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="deployGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#deployGrid)" />
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
              {zone.buoys}
            </span>
            <span className="text-[7px] text-text-muted leading-none">buoys</span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-text-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Maintenance</span>
      </div>
    </WidgetContainer>
  )
}
