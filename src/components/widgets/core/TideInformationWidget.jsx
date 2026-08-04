// path: src/components/widgets/core/TideInformationWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function TideInformationWidget({
  highTide = "06:30",
  lowTide = "12:45",
  nextHigh = "18:50",
  tideState = "Rising",
  className,
  ...props
}) {
  const tideConfig = {
    Rising: { color: "text-sky-500", icon: "📈" },
    Falling: { color: "text-amber-500", icon: "📉" },
    Low: { color: "text-emerald-500", icon: "📉" },
    High: { color: "text-blue-500", icon: "📈" },
  }

  const config = tideConfig[tideState] || tideConfig.Rising

  return (
    <WidgetContainer title="Tide Information" icon="🌊" className={className} {...props}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Current State</span>
          <span className={cn("text-sm font-semibold", config.color)}>
            {config.icon} {tideState}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-surface-muted/30 rounded-md p-2">
            <span className="text-text-muted block">High Tide</span>
            <span className="font-semibold text-text-primary">{highTide}</span>
          </div>
          <div className="bg-surface-muted/30 rounded-md p-2">
            <span className="text-text-muted block">Low Tide</span>
            <span className="font-semibold text-text-primary">{lowTide}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>🔜 Next High:</span>
          <span className="font-semibold text-text-primary">{nextHigh}</span>
        </div>
        <div className="mt-2 h-16 bg-surface-muted/30 rounded-md relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-2">
            {[0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4, 0.6, 0.8, 0.5, 0.7, 0.9].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-sky-500/40 rounded-t"
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
          <div className="absolute top-1 left-1 text-[9px] text-text-muted">Tide Level</div>
        </div>
      </div>
    </WidgetContainer>
  )
}
