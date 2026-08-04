// path: src/components/widgets/core/BeachSafetyWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function BeachSafetyWidget({
  safety = "Safe",
  description = "Conditions are safe for beach activities.",
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
    <WidgetContainer title="Beach Safety" icon="🏖️" className={className} {...props}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{config.icon}</span>
        <div>
          <span className={cn("text-2xl font-bold leading-none", config.color)}>
            {safety}
          </span>
          <p className="text-xs text-text-muted mt-0.5">Beach Safety</p>
        </div>
      </div>
      <p className="text-xs text-text-secondary mt-3 leading-relaxed">{description}</p>
    </WidgetContainer>
  )
}
