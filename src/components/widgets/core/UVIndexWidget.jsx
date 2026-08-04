// path: src/components/widgets/core/UVIndexWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function UVIndexWidget({
  uv = 7,
  level = "High",
  label = "UV Index",
  className,
  ...props
}) {
  const uvConfig = {
    Low: { color: "text-emerald-500", bg: "bg-emerald-50", bar: "bg-emerald-500" },
    Moderate: { color: "text-amber-500", bg: "bg-amber-50", bar: "bg-amber-500" },
    High: { color: "text-orange-500", bg: "bg-orange-50", bar: "bg-orange-500" },
    VeryHigh: { color: "text-red-500", bg: "bg-red-50", bar: "bg-red-500" },
  }

  const config = uvConfig[level] || uvConfig.Moderate
  const uvPercent = Math.min((uv / 11) * 100, 100)

  return (
    <WidgetContainer title="UV Index" icon="☀️" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-4xl font-bold leading-none", config.color)}>
          {uv}
        </span>
        <span className={cn("text-xs font-medium mb-1", config.color)}>
          {level}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", config.bar)}
          style={{ width: `${uvPercent}%` }}
        />
      </div>
      <p className="text-[10px] text-text-muted mt-1">Scale: 0–11+</p>
    </WidgetContainer>
  )
}
