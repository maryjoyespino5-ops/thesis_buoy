// path: src/components/widgets/core/FishPopulationTrendsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function FishPopulationTrendsWidget({
  data = [
    { month: "Jan", population: 420 },
    { month: "Feb", population: 380 },
    { month: "Mar", population: 450 },
    { month: "Apr", population: 510 },
    { month: "May", population: 480 },
    { month: "Jun", population: 530 },
  ],
  className,
  ...props
}) {
  const max = Math.max(...data.map((d) => d.population))
  const min = Math.min(...data.map((d) => d.population))

  return (
    <WidgetContainer title="Fish Population Trends" icon="📈" className={className} {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">Population</span>
          <span className="font-medium text-text-primary">
            {data[data.length - 1]?.population}
          </span>
        </div>
        <div className="h-24 flex items-end gap-1">
          {data.map((d, i) => {
            const height = ((d.population - min) / (max - min || 1)) * 80 + 20
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    backgroundColor: "#0ea5e9",
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
