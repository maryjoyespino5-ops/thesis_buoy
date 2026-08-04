// path: src/components/widgets/core/EnvironmentalTrendsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function EnvironmentalTrendsWidget({
  trends = [
    { label: "Temperature", value: "+0.8°C", trend: "up", color: "text-amber-500" },
    { label: "Dissolved Oxygen", value: "+12%", trend: "up", color: "text-emerald-500" },
    { label: "pH", value: "Stable", trend: "stable", color: "text-sky-500" },
    { label: "Salinity", value: "-0.1 PSU", trend: "down", color: "text-amber-500" },
    { label: "Turbidity", value: "+0.2 NTU", trend: "up", color: "text-amber-500" },
  ],
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Environmental Trends" icon="🌍" className={className} {...props}>
      <div className="space-y-2">
        {trends.map((trend, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md"
          >
            <span className="text-xs text-text-muted">{trend.label}</span>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-semibold", trend.color)}>
                {trend.trend === "up" ? "↑" : trend.trend === "down" ? "↓" : "→"}
              </span>
              <span className="text-xs font-medium text-text-primary">{trend.value}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}
