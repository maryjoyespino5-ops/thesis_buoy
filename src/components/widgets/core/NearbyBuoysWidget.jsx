// path: src/components/widgets/core/NearbyBuoysWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

const statusColors = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
}

export function NearbyBuoysWidget({
  buoys = [],
  selectedBuoyId,
  onSelectBuoy,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Nearby Buoys" icon="📍" className={className} {...props}>
      <div className="space-y-1.5">
        {buoys.map((buoy) => (
          <button
            key={buoy.id}
            onClick={() => onSelectBuoy?.(buoy.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2",
              selectedBuoyId === buoy.id
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-text-secondary hover:bg-surface-muted",
            )}
          >
            <span className={cn("w-2 h-2 rounded-full flex-shrink-0", statusColors[buoy.status] || "bg-gray-400")} />
            <span className="flex-1">{buoy.name}</span>
            <span className="text-xs text-text-muted">{buoy.coords}</span>
          </button>
        ))}
      </div>
    </WidgetContainer>
  )
}
