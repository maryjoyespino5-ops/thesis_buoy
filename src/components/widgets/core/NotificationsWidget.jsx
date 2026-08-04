// path: src/components/widgets/core/NotificationsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function NotificationsWidget({
  notifications = [
    { id: 1, title: "Buoy 04 battery low", time: "14:22", type: "warning", read: false },
    { id: 2, title: "DO dropped at Buoy 02", time: "13:10", type: "critical", read: false },
    { id: 3, title: "Firmware update available", time: "11:45", type: "info", read: true },
    { id: 4, title: "Calibration due in 3 days", time: "09:30", type: "info", read: false },
  ],
  className,
  ...props
}) {
  const typeConfig = {
    critical: { color: "bg-red-500", bg: "bg-red-50", badge: "danger" },
    warning: { color: "bg-amber-500", bg: "bg-amber-50", badge: "warning" },
    info: { color: "bg-sky-500", bg: "bg-sky-50", badge: "info" },
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <WidgetContainer title="Notifications" icon="🔔" className={className} {...props}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-text-muted">{unreadCount} unread</span>
      </div>
      <div className="space-y-1.5">
        {notifications.map((notif) => {
          const cfg = typeConfig[notif.type] || typeConfig.info
          return (
            <div
              key={notif.id}
              className={cn(
                "flex items-start gap-2 p-2 rounded-md transition-colors",
                notif.read ? "opacity-60" : "bg-surface-muted/30",
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5", cfg.color)} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text-primary leading-tight">{notif.title}</p>
                <p className="text-[10px] text-text-muted mt-0.5">{notif.time}</p>
              </div>
              {!notif.read && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
              )}
            </div>
          )
        })}
      </div>
    </WidgetContainer>
  )
}
