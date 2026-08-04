// path: src/components/widgets/core/MarineHealthWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function MarineHealthWidget({
  health = 94,
  label = "Overall Marine Health",
  trend = "up",
  className,
  ...props
}) {
  const getColor = (h) => {
    if (h >= 90) return "text-emerald-500"
    if (h >= 70) return "text-amber-500"
    return "text-red-500"
  }

  const getBg = (h) => {
    if (h >= 90) return "bg-emerald-50"
    if (h >= 70) return "bg-amber-50"
    return "bg-red-50"
  }

  return (
    <WidgetContainer title="Marine Health" icon="🌊" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-4xl font-bold leading-none", getColor(health))}>
          {health}%
        </span>
        <span className={cn("text-xs font-medium mb-1", trend === "up" ? "text-emerald-500" : "text-red-500")}>
          {trend === "up" ? "↑" : "↓"}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getBg(health))}
          style={{ width: `${health}%` }}
        />
      </div>
    </WidgetContainer>
  )
}
