// path: src/components/widgets/core/TurbidityWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function TurbidityWidget({
  turbidity = "2.3 NTU",
  range = "<5 NTU",
  status = "Normal",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Turbidity" icon="🔍" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-text-primary leading-none">
          {turbidity}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">Normal range: {range}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className={cn(
          "w-2 h-2 rounded-full",
          status === "Normal" ? "bg-emerald-500" : "bg-amber-500"
        )} />
        <span className="text-xs font-medium text-text-secondary">{status}</span>
      </div>
      <div className="mt-2 h-1.5 bg-surface-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-500 rounded-full"
          style={{ width: `${Math.min((parseFloat(turbidity) / 5) * 100, 100)}%` }}
        />
      </div>
    </WidgetContainer>
  )
}
