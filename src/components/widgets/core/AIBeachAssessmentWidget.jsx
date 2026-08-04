// path: src/components/widgets/core/AIBeachAssessmentWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function AIBeachAssessmentWidget({
  confidence = 92,
  summary = "Beach conditions are favorable for swimming. Water quality is within safe limits. No significant pollution detected.",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="AI Beach Assessment" icon="🤖" className={className} {...props}>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <div>
            <p className="text-sm font-semibold text-text-primary">AI Confidence</p>
            <p className="text-xl font-bold text-primary-500">{confidence}%</p>
          </div>
        </div>
        <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">{summary}</p>
        <div className="flex gap-1.5">
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium">
            Safe to Swim
          </span>
          <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded font-medium">
            Clean Beach
          </span>
        </div>
      </div>
    </WidgetContainer>
  )
}
