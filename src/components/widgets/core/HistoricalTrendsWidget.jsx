// path: src/components/widgets/core/HistoricalTrendsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function HistoricalTrendsWidget({
  data = [
    { month: "Jan", quality: 88 },
    { month: "Feb", quality: 91 },
    { month: "Mar", quality: 89 },
    { month: "Apr", quality: 94 },
    { month: "May", quality: 93 },
    { month: "Jun", quality: 96 },
  ],
  label = "Water Quality Trend",
  color = "#10b981",
  className,
  ...props
}) {
  const max = Math.max(...data.map((d) => d.quality))
  const min = Math.min(...data.map((d) => d.quality))

  return (
    <WidgetContainer title="Historical Trends" icon="📈" className={className} {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">{label}</span>
          <span className="font-medium text-text-primary">{data[data.length - 1]?.quality}%</span>
        </div>
        <div className="h-24 flex items-end gap-1">
          {data.map((d, i) => {
            const height = ((d.quality - min) / (max - min || 1)) * 80 + 20
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-t transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    backgroundColor: color,
                    opacity: 0.7,
                  }}
                />
                <span className="text-[9px] text-text-muted">{d.month}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between text-[10px] text-text-muted">
          <span>Min: {min}%</span>
          <span>Max: {max}%</span>
        </div>
      </div>
    </WidgetContainer>
  )
}
