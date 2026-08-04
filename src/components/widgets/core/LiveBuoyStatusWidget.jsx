// path: src/components/widgets/core/LiveBuoyStatusWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

const statusConfig = {
  green: { color: "text-emerald-500", bg: "bg-emerald-50", label: "Healthy" },
  yellow: { color: "text-amber-500", bg: "bg-amber-50", label: "Warning" },
  red: { color: "text-red-500", bg: "bg-red-50", label: "Critical" },
}

export function LiveBuoyStatusWidget({
  buoys = [],
  selectedBuoyId,
  onSelectBuoy,
  className,
  ...props
}) {
  const defaultBuoys = [
    { id: 1, name: "Buoy 01", status: "green", temp: "28.6°C", ph: "8.1", do: "6.7 mg/L" },
    { id: 2, name: "Buoy 02", status: "yellow", temp: "29.1°C", ph: "8.0", do: "5.9 mg/L" },
    { id: 3, name: "Buoy 03", status: "green", temp: "27.9°C", ph: "8.2", do: "7.1 mg/L" },
    { id: 4, name: "Buoy 04", status: "red", temp: "30.2°C", ph: "7.8", do: "5.2 mg/L" },
    { id: 5, name: "Buoy 05", status: "green", temp: "28.2°C", ph: "8.0", do: "6.9 mg/L" },
  ]

  const data = buoys.length > 0 ? buoys : defaultBuoys

  return (
    <WidgetContainer title="Live Buoy Status" icon="📡" className={className} {...props}>
      <div className="space-y-1.5">
        {data.map((buoy) => {
          const cfg = statusConfig[buoy.status] || statusConfig.green
          const isSelected = selectedBuoyId === buoy.id
          return (
            <button
              key={buoy.id}
              onClick={() => onSelectBuoy?.(buoy.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2",
                isSelected
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-text-secondary hover:bg-surface-muted",
              )}
            >
              <span className={cn("w-2 h-2 rounded-full flex-shrink-0", cfg.color)} />
              <span className="flex-1">{buoy.name}</span>
              <span className="text-xs text-text-muted">{cfg.label}</span>
            </button>
          )
        })}
      </div>
    </WidgetContainer>
  )
}
