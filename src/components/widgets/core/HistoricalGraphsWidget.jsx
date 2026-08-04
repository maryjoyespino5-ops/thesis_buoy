// path: src/components/widgets/core/HistoricalGraphsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function HistoricalGraphsWidget({
  data = [
    { month: "Jan", wqi: 88, temp: 27.2, do: 6.8 },
    { month: "Feb", wqi: 91, temp: 28.1, do: 6.5 },
    { month: "Mar", wqi: 89, temp: 28.6, do: 6.2 },
    { month: "Apr", wqi: 94, temp: 29.0, do: 5.9 },
    { month: "May", wqi: 93, temp: 28.8, do: 6.3 },
    { month: "Jun", wqi: 96, temp: 28.2, do: 6.7 },
  ],
  metric = "wqi",
  className,
  ...props
}) {
  const metricConfig = {
    wqi: { color: "#10b981", label: "WQI" },
    temp: { color: "#f59e0b", label: "Temp" },
    do: { color: "#0ea5e9", label: "DO" },
  }

  const config = metricConfig[metric] || metricConfig.wqi
  const values = data.map((d) => d[metric])
  const max = Math.max(...values)
  const min = Math.min(...values)

  return (
    <WidgetContainer title="Historical Graphs" icon="📈" className={className} {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">{config.label} Trend</span>
          <span className="font-medium text-text-primary">
            {data[data.length - 1]?.[metric]}
          </span>
        </div>
        <div className="h-24 flex items-end gap-1">
          {data.map((d, i) => {
            const height = ((d[metric] - min) / (max - min || 1)) * 80 + 20
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    backgroundColor: config.color,
                    opacity: 0.7,
                  }}
                />
                <span className="text-[9px] text-text-muted">{d.month}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between text-[10px] text-text-muted">
          <span>Min: {min}</span>
          <span>Max: {max}</span>
        </div>
      </div>
    </WidgetContainer>
  )
}
