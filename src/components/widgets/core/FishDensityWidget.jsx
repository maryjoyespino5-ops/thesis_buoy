// path: src/components/widgets/core/FishDensityWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function FishDensityWidget({
  density = "Medium",
  count = "200-400",
  label = "Estimated School Size",
  className,
  ...props
}) {
  const densityConfig = {
    Low: { color: "text-amber-500", bg: "bg-amber-50", bar: "w-1/3" },
    Medium: { color: "text-primary-500", bg: "bg-primary-50", bar: "w-2/3" },
    High: { color: "text-emerald-500", bg: "bg-emerald-50", bar: "w-full" },
  }

  const config = densityConfig[density] || densityConfig.Medium

  return (
    <WidgetContainer title="Fish Density" icon="🐟" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-4xl font-bold leading-none", config.color)}>
          {density}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <p className="text-sm text-text-secondary mt-2">{count} individuals</p>
      <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full bg-primary-500 transition-all duration-500", config.bar)} />
      </div>
    </WidgetContainer>
  )
}
