// path: src/components/widgets/core/BeachWaterQualityWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function BeachWaterQualityWidget({
  quality = "Good",
  bacteria = "Safe",
  label = "Beach Water Quality",
  className,
  ...props
}) {
  const qualityConfig = {
    Good: { color: "text-emerald-500", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    Moderate: { color: "text-amber-500", bg: "bg-amber-50", dot: "bg-amber-500" },
    Poor: { color: "text-red-500", bg: "bg-red-50", dot: "bg-red-500" },
  }

  const config = qualityConfig[quality] || qualityConfig.Good

  return (
    <WidgetContainer title="Beach Water Quality" icon="🏖️" className={className} {...props}>
      <div className="flex items-center gap-3">
        <span className={cn("w-3 h-3 rounded-full", config.dot)} />
        <span className={cn("text-2xl font-bold leading-none", config.color)}>
          {quality}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
        <span>🧫</span>
        <span>Bacteria: {bacteria}</span>
      </div>
      <div className="mt-2 h-1.5 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", config.dot.replace("bg-", "bg-"))}
          style={{ width: quality === "Good" ? "90%" : quality === "Moderate" ? "60%" : "30%" }}
        />
      </div>
    </WidgetContainer>
  )
}
