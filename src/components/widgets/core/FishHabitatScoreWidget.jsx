// path: src/components/widgets/core/FishHabitatScoreWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function FishHabitatScoreWidget({
  score = 82,
  label = "Fish Habitat Score",
  trend = "up",
  factors = ["Temperature: Good", "DO: Normal", "pH: Stable", "Salinity: Optimal"],
  className,
  ...props
}) {
  const getColor = (s) => {
    if (s >= 80) return "text-emerald-500"
    if (s >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getBg = (s) => {
    if (s >= 80) return "bg-emerald-50"
    if (s >= 60) return "bg-amber-50"
    return "bg-red-50"
  }

  return (
    <WidgetContainer title="Fish Habitat Score" icon="🏠" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className={cn("text-4xl font-bold leading-none", getColor(score))}>
          {score}
        </span>
        <span className="text-xs font-medium text-text-muted mb-1">/ 100</span>
      </div>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <div className="mt-3 h-2 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getBg(score))}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="mt-3 space-y-1">
        {factors.map((factor, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            {factor}
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}
