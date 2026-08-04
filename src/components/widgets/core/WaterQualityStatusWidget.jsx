// path: src/components/widgets/core/WaterQualityStatusWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function WaterQualityStatusWidget({
  status = "Good",
  description = "Water is safe for swimming and recreation.",
  className,
  ...props
}) {
  const statusConfig = {
    Good: { color: "text-emerald-500", bg: "bg-emerald-50", icon: "✅" },
    Moderate: { color: "text-amber-500", bg: "bg-amber-50", icon: "⚠️" },
    Poor: { color: "text-red-500", bg: "bg-red-50", icon: "🚫" },
  }

  const config = statusConfig[status] || statusConfig.Good

  return (
    <WidgetContainer title="Water Quality" icon="💧" className={className} {...props}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{config.icon}</span>
        <div>
          <span className={cn("text-2xl font-bold leading-none", config.color)}>
            {status}
          </span>
          <p className="text-xs text-text-muted mt-0.5">Water Quality</p>
        </div>
      </div>
      <p className="text-xs text-text-secondary mt-3 leading-relaxed">{description}</p>
    </WidgetContainer>
  )
}
