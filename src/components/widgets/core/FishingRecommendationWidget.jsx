// path: src/components/widgets/core/FishingRecommendationWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function FishingRecommendationWidget({
  zone = "Northwest",
  confidence = 91,
  reason = "Optimal temperature and DO levels",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Fishing Recommendation" icon="🧭" className={className} {...props}>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <div>
            <p className="text-sm font-semibold text-text-primary">Recommended Zone</p>
            <p className="text-lg font-bold text-primary-500">{zone}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">AI Confidence</span>
          <span className="font-semibold text-text-primary">{confidence}%</span>
        </div>
        <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">{reason}</p>
      </div>
    </WidgetContainer>
  )
}
