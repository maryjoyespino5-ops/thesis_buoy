// path: src/components/widgets/core/WaveForecastWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function WaveForecastWidget({
  height = "1.2m",
  period = "8s",
  direction = "NE",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Wave Forecast" icon="🌊" className={className} {...props}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Height</span>
          <span className="text-sm font-semibold text-text-primary">{height}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Period</span>
          <span className="text-sm font-semibold text-text-primary">{period}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Direction</span>
          <span className="text-sm font-semibold text-text-primary">{direction}</span>
        </div>
        <div className="mt-2 h-16 bg-surface-muted/30 rounded-md flex items-end justify-center gap-1 px-2">
          {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.5, 0.7, 0.4, 0.6].map((h, i) => (
            <div
              key={i}
              className="w-2 bg-primary-500/60 rounded-t transition-all duration-300"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      </div>
    </WidgetContainer>
  )
}
