// path: src/components/widgets/core/MapWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function MapWidget({
  buoys = [],
  selectedBuoyId,
  onSelectBuoy,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Map" icon="🗺️" className={className} {...props}>
      <div className="h-48 bg-surface-muted/30 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl opacity-20">🗺️</span>
        </div>
        {buoys.map((buoy) => (
          <button
            key={buoy.id}
            onClick={() => onSelectBuoy?.(buoy.id)}
            className={cn(
              "absolute w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all",
              selectedBuoyId === buoy.id
                ? "bg-primary-500 text-white border-primary-600 scale-110"
                : "bg-white text-text-secondary border-primary-300 hover:scale-110",
            )}
            style={{
              left: `${buoy.x}%`,
              top: `${buoy.y}%`,
            }}
          >
            {buoy.id}
          </button>
        ))}
      </div>
      {selectedBuoyId && (
        <p className="text-xs text-text-muted mt-2 text-center">
          Selected Buoy #{selectedBuoyId}
        </p>
      )}
    </WidgetContainer>
  )
}
