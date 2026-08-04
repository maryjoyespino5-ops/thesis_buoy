// path: src/components/widgets/core/PollutionRiskWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function PollutionRiskWidget({
  level = "Low",
  confidence = "96%",
  trend = "Stable",
  desc = "No pollutants detected",
  className,
  ...props
}) {
  const riskConfig = {
    Low: { color: "text-emerald-500", bg: "bg-emerald-50", bar: "bg-emerald-500" },
    Moderate: { color: "text-amber-500", bg: "bg-amber-50", bar: "bg-amber-500" },
    High: { color: "text-red-500", bg: "bg-red-50", bar: "bg-red-500" },
  }

  const config = riskConfig[level] || riskConfig.Low

  return (
    <WidgetContainer title="Pollution Risk" icon="🏭" className={className} {...props}>
      <div className="flex items-center gap-2 mb-2">
        <span className={cn("text-lg font-bold", config.color)}>{level}</span>
        <span className="text-xs text-text-muted">Confidence: {confidence}</span>
      </div>
      <p className="text-xs text-text-secondary mb-3">{desc}</p>
      <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
        <span>Trend:</span>
        <span className={cn(
          "font-medium",
          trend === "Stable" ? "text-emerald-500" : trend === "Rising" ? "text-amber-500" : "text-red-500"
        )}>
          {trend}
        </span>
      </div>
      <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", config.bar)}
          style={{ width: level === "Low" ? "20%" : level === "Moderate" ? "50%" : "80%" }}
        />
      </div>
    </WidgetContainer>
  )
}
