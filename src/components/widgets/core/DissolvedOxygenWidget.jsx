// path: src/components/widgets/core/DissolvedOxygenWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function DissolvedOxygenWidget({
  doLevel = "6.7 mg/L",
  range = ">5 mg/L",
  status = "Normal",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Dissolved Oxygen" icon="🫧" className={className} {...props}>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-text-primary leading-none">
          {doLevel}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">Normal range: {range}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className={cn(
          "w-2 h-2 rounded-full",
          status === "Normal" ? "bg-emerald-500" : status === "Low" ? "bg-amber-500" : "bg-red-500"
        )} />
        <span className="text-xs font-medium text-text-secondary">{status}</span>
      </div>
      <div className="mt-2 h-1.5 bg-surface-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{ width: `${Math.min((parseFloat(doLevel) / 10) * 100, 100)}%` }}
        />
      </div>
    </WidgetContainer>
  )
}
