// path: src/components/widgets/core/AIRiskAssessmentWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function AIRiskAssessmentWidget({
  risks = [
    { label: "Fish Kill Risk", level: "Low", confidence: "94%", color: "#10b981" },
    { label: "Algal Bloom Risk", level: "Moderate", confidence: "88%", color: "#f59e0b" },
    { label: "Pollution Risk", level: "Low", confidence: "96%", color: "#10b981" },
    { label: "Low Oxygen Risk", level: "Moderate", confidence: "91%", color: "#f59e0b" },
  ],
  className,
  ...props
}) {
  const levelColors = {
    Low: "text-emerald-500",
    Moderate: "text-amber-500",
    High: "text-red-500",
  }

  return (
    <WidgetContainer title="AI Risk Assessment" icon="⚠️" className={className} {...props}>
      <div className="space-y-2">
        {risks.map((risk, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: risk.color }}
              />
              <span className="text-xs font-medium text-text-primary">{risk.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-medium", levelColors[risk.level] || "text-text-muted")}>
                {risk.level}
              </span>
              <span className="text-[10px] text-text-muted">{risk.confidence}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}
