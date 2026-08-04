// path: src/components/widgets/core/AIAnalysisWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function AIAnalysisWidget({
  confidence = 97,
  summary = "All sensors operating within normal parameters. Slight turbidity increase detected at Buoy 03. No anomalies found in the last 24 hours.",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="AI Analysis" icon="🤖" className={className} {...props}>
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
            All Normal
          </span>
          <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded font-medium">
            97.8% Confidence
          </span>
        </div>
      </div>
    </WidgetContainer>
  )
}
