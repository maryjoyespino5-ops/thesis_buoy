// path: src/components/widgets/core/PublicAdvisoriesWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function PublicAdvisoriesWidget({
  advisories = [
    { id: 1, text: "Swimming recommended at North Beach", type: "info" },
    { id: 2, text: "Avoid South Cove — high bacteria levels", type: "warning" },
    { id: 3, text: "Fishing allowed in all zones today", type: "success" },
  ],
  className,
  ...props
}) {
  const typeConfig = {
    info: { color: "text-sky-500", bg: "bg-sky-50", icon: "ℹ️" },
    warning: { color: "text-amber-500", bg: "bg-amber-50", icon: "⚠️" },
    success: { color: "text-emerald-500", bg: "bg-emerald-50", icon: "✅" },
  }

  return (
    <WidgetContainer title="Public Advisories" icon="📢" className={className} {...props}>
      <div className="space-y-2">
        {advisories.map((adv) => {
          const cfg = typeConfig[adv.type] || typeConfig.info
          return (
            <div
              key={adv.id}
              className="flex items-start gap-2 p-2 bg-surface-muted/30 rounded-md"
            >
              <span className="text-sm flex-shrink-0">{cfg.icon}</span>
              <p className="text-xs text-text-secondary leading-relaxed">{adv.text}</p>
            </div>
          )
        })}
      </div>
    </WidgetContainer>
  )
}
