// path: src/components/widgets/core/PollutionAlertsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function PollutionAlertsWidget({
  alerts = [],
  className,
  ...props
}) {
  const defaultAlerts = [
    { id: 1, type: "Oil Slick", location: "North Beach", severity: "Warning", time: "2h ago" },
    { id: 2, type: "Plastic Debris", location: "South Cove", severity: "Info", time: "5h ago" },
    { id: 3, type: "Algae Bloom", location: "East Shore", severity: "Critical", time: "1d ago" },
  ]

  const data = alerts.length > 0 ? alerts : defaultAlerts

  const severityConfig = {
    Critical: { color: "bg-red-500", badge: "danger" },
    Warning: { color: "bg-amber-500", badge: "warning" },
    Info: { color: "bg-sky-500", badge: "info" },
  }

  return (
    <WidgetContainer title="Pollution Alerts" icon="⚠️" className={className} {...props}>
      <div className="space-y-2">
        {data.map((alert) => {
          const cfg = severityConfig[alert.severity] || severityConfig.Info
          return (
            <div
              key={alert.id}
              className="flex items-center gap-2 text-xs"
            >
              <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.color)} />
              <span className="text-text-secondary flex-1 truncate">
                {alert.type} — {alert.location}
              </span>
              <span className="text-text-muted">{alert.time}</span>
            </div>
          )
        })}
      </div>
    </WidgetContainer>
  )
}
