// path: src/components/widgets/core/CoralHealthIndexWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function CoralHealthIndexWidget({
  index = 88,
  label = "Coral Health Index",
  trend = "Stable",
  className,
  ...props
}) {
  const getColor = (i) => {
    if (i >= 85) return "text-emerald-500"
    if (i >= 65) return "text-amber-500"
    return "text-red-500"
  }

  const getBg = (i) => {
    if (i >= 85) return "bg-emerald-50"
    if (i >= 65) return "bg-amber-50"
    return "bg-red-50"
  }

  return (
    <WidgetContainer title="Coral Health Index" icon="🪸" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-4xl font-bold leading-none", getColor(index))}>
          {index}
        </span>
        <span className="text-xs font-medium text-text-muted mb-1">/ 100</span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getBg(index))}
          style={{ width: `${index}%` }}
        />
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span className={cn(
          "w-1.5 h-1.5 rounded-full",
          trend === "Stable" ? "bg-emerald-500" : trend === "Rising" ? "bg-amber-500" : "bg-red-500"
        )} />
        <span className="text-text-muted">{trend}</span>
      </div>
    </WidgetContainer>
  )
}
