// path: src/components/widgets/core/WaterQualityIndexWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function WaterQualityIndexWidget({
  wqi = 96,
  label = "Water Quality Index",
  trend = "up",
  className,
  ...props
}) {
  const getColor = (w) => {
    if (w >= 90) return "text-emerald-500"
    if (w >= 70) return "text-amber-500"
    return "text-red-500"
  }

  const getBg = (w) => {
    if (w >= 90) return "bg-emerald-50"
    if (w >= 70) return "bg-amber-50"
    return "bg-red-50"
  }

  return (
    <WidgetContainer title="Water Quality Index" icon="💧" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-4xl font-bold leading-none", getColor(wqi))}>
          {wqi}
        </span>
        <span className="text-xs font-medium text-text-muted mb-1">/ 100</span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getBg(wqi))}
          style={{ width: `${wqi}%` }}
        />
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span className={cn(
          "font-medium",
          trend === "up" ? "text-emerald-500" : "text-red-500"
        )}>
          {trend === "up" ? "↑ Improving" : "↓ Declining"}
        </span>
      </div>
    </WidgetContainer>
  )
}
