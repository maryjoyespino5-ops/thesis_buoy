// path: src/components/widgets/core/SwimmingSafetyWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function SwimmingSafetyWidget({
  safety = "Safe",
  risk = "Low",
  label = "Swimming Safety",
  className,
  ...props
}) {
  const safetyConfig = {
    Safe: { color: "text-emerald-500", bg: "bg-emerald-50", icon: "✅" },
    Caution: { color: "text-amber-500", bg: "bg-amber-50", icon: "⚠️" },
    Unsafe: { color: "text-red-500", bg: "bg-red-50", icon: "🚫" },
  }

  const config = safetyConfig[safety] || safetyConfig.Safe

  return (
    <WidgetContainer title="Swimming Safety" icon="🏊" className={className} {...props}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{config.icon}</span>
        <div>
          <span className={cn("text-2xl font-bold leading-none", config.color)}>
            {safety}
          </span>
          <p className="text-xs text-text-muted mt-0.5">Risk: {risk}</p>
        </div>
      </div>
      <p className="text-xs text-text-secondary mt-2">{label}</p>
      <div className="mt-3 h-1.5 bg-surface-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", config.bg.replace("bg-", "bg-"))}
          style={{ width: safety === "Safe" ? "85%" : safety === "Caution" ? "50%" : "20%" }}
        />
      </div>
    </WidgetContainer>
  )
}
