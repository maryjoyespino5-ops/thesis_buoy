// path: src/components/widgets/core/HistoricalFishActivityWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function HistoricalFishActivityWidget({
  data = [
    { month: "Jan", activity: "Moderate" },
    { month: "Feb", activity: "High" },
    { month: "Mar", activity: "High" },
    { month: "Apr", activity: "Low" },
    { month: "May", activity: "Moderate" },
    { month: "Jun", activity: "High" },
  ],
  className,
  ...props
}) {
  const activityLevels = { Low: 33, Moderate: 66, High: 100 }

  return (
    <WidgetContainer title="Historical Fish Activity" icon="🐟" className={className} {...props}>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-10 text-text-muted flex-shrink-0">{d.month}</span>
            <div className="flex-1 h-3 bg-surface-muted/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${activityLevels[d.activity] || 50}%`,
                  backgroundColor:
                    d.activity === "High"
                      ? "#10b981"
                      : d.activity === "Moderate"
                        ? "#0ea5e9"
                        : "#f59e0b",
                }}
              />
            </div>
            <span className="w-16 text-right text-text-secondary">{d.activity}</span>
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}
