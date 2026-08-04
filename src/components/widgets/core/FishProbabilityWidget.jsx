// path: src/components/widgets/core/FishProbabilityWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function FishProbabilityWidget({
  probability = 87,
  label = "Fish Presence",
  trend = "up",
  className,
  ...props
}) {
  const getColor = (p) => {
    if (p >= 80) return "text-emerald-500"
    if (p >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getBg = (p) => {
    if (p >= 80) return "bg-emerald-50"
    if (p >= 60) return "bg-amber-50"
    return "bg-red-50"
  }

  return (
    <WidgetContainer title="Fish Probability" icon="🎣" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-4xl font-bold leading-none", getColor(probability))}>
          {probability}%
        </span>
        <span className={cn("text-xs font-medium mb-1", trend === "up" ? "text-emerald-500" : "text-red-500")}>
          {trend === "up" ? "↑" : "↓"}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getBg(probability))}
          style={{ width: `${probability}%` }}
        />
      </div>
    </WidgetContainer>
  )
}
