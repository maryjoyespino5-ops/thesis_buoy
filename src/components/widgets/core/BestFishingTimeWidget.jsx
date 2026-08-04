// path: src/components/widgets/core/BestFishingTimeWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function BestFishingTimeWidget({
  bestTime = "05:00 - 08:00",
  activity = "High",
  nextBest = "17:00 - 20:00",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Best Fishing Time" icon="🕐" className={className} {...props}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌅</span>
          <div>
            <p className="text-xs text-text-muted">Morning Bite</p>
            <p className="text-sm font-semibold text-text-primary">{bestTime}</p>
          </div>
          <span className="ml-auto text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
            {activity}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌇</span>
          <div>
            <p className="text-xs text-text-muted">Evening Bite</p>
            <p className="text-sm font-semibold text-text-primary">{nextBest}</p>
          </div>
        </div>
        <div className="mt-2 h-8 bg-surface-muted/30 rounded-md relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-emerald-500/20 rounded-l-md flex items-center justify-center">
            <span className="text-[10px] font-medium text-emerald-700">Morning</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-amber-500/20 rounded-r-md flex items-center justify-center">
            <span className="text-[10px] font-medium text-amber-700">Evening</span>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
