// path: src/components/widgets/core/TrashDensityWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function TrashDensityWidget({
  density = "Low",
  items = "3/100m",
  label = "Trash Density",
  className,
  ...props
}) {
  const densityConfig = {
    Low: { color: "text-emerald-500", bg: "bg-emerald-50", bar: "bg-emerald-500" },
    Moderate: { color: "text-amber-500", bg: "bg-amber-50", bar: "bg-amber-500" },
    High: { color: "text-red-500", bg: "bg-red-50", bar: "bg-red-500" },
  }

  const config = densityConfig[density] || densityConfig.Low

  return (
    <WidgetContainer title="Trash Density" icon="🗑️" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-2xl font-bold leading-none", config.color)}>
          {density}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <p className="text-sm text-text-secondary mt-2">{items} per 100m</p>
      <div className="mt-3 h-1.5 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", config.bar)}
          style={{ width: density === "Low" ? "25%" : density === "Moderate" ? "55%" : "85%" }}
        />
      </div>
    </WidgetContainer>
  )
}
