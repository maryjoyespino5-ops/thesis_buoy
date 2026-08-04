// path: src/components/widgets/core/MultiBuoyComparisonWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function MultiBuoyComparisonWidget({
  buoys = [
    { id: 1, name: "Buoy 01", temp: "28.6°C", ph: "8.1", do: "6.7", status: "green" },
    { id: 2, name: "Buoy 02", temp: "29.1°C", ph: "8.0", do: "5.9", status: "yellow" },
    { id: 3, name: "Buoy 03", temp: "27.9°C", ph: "8.2", do: "7.1", status: "green" },
    { id: 4, name: "Buoy 04", temp: "30.2°C", ph: "7.8", do: "5.2", status: "red" },
  ],
  selectedIds = [1, 2, 3],
  onToggleBuoy,
  className,
  ...props
}) {
  const metrics = ["Temp", "pH", "DO (mg/L)"]
  const metricKeys = ["temp", "ph", "do"]

  return (
    <WidgetContainer title="Multi-Buoy Comparison" icon="📊" className={className} {...props}>
      {/* Buoy selector */}
      <div className="flex flex-wrap gap-1 mb-3">
        {buoys.map((buoy) => (
          <button
            key={buoy.id}
            onClick={() => onToggleBuoy?.(buoy.id)}
            className={cn(
              "text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors",
              selectedIds.includes(buoy.id)
                ? "bg-primary-500 text-white"
                : "bg-surface-muted text-text-muted hover:bg-surface-muted/80",
            )}
          >
            {buoy.name}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className="space-y-2">
        {metrics.map((metric, mi) => (
          <div key={mi} className="text-xs">
            <div className="text-text-muted mb-1 font-medium">{metric}</div>
            <div className="flex gap-1">
              {buoys.filter((b) => selectedIds.includes(b.id)).map((buoy) => {
                const value = buoy[metricKeys[mi]]
                const isGood =
                  metricKeys[mi] === "temp"
                    ? parseFloat(value) < 30
                    : metricKeys[mi] === "ph"
                      ? parseFloat(value) >= 7.5 && parseFloat(value) <= 8.5
                      : parseFloat(value) >= 6.0
                return (
                  <div
                    key={buoy.id}
                    className={cn(
                      "flex-1 text-center p-1.5 rounded-md",
                      isGood ? "bg-emerald-50/50" : "bg-amber-50/50",
                    )}
                  >
                    <div className={cn("text-sm font-bold", isGood ? "text-emerald-700" : "text-amber-700")}>
                      {value}
                    </div>
                    <div className="text-[9px] text-text-muted">{buoy.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}
