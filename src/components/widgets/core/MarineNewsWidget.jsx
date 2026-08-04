// path: src/components/widgets/core/MarineNewsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function MarineNewsWidget({
  news = [
    { id: 1, title: "New marine sanctuary announced", time: "2h ago", type: "info" },
    { id: 2, title: "Beach cleanup event this Saturday", time: "5h ago", type: "success" },
    { id: 3, title: "Water quality improved in Zone A", time: "1d ago", type: "info" },
  ],
  className,
  ...props
}) {
  const typeConfig = {
    info: { color: "text-sky-500", bg: "bg-sky-50" },
    success: { color: "text-emerald-500", bg: "bg-emerald-50" },
    warning: { color: "text-amber-500", bg: "bg-amber-50" },
  }

  return (
    <WidgetContainer title="Marine News" icon="📰" className={className} {...props}>
      <div className="space-y-2">
        {news.map((item) => {
          const cfg = typeConfig[item.type] || typeConfig.info
          return (
            <div
              key={item.id}
              className="flex items-start gap-2 p-2 bg-surface-muted/30 rounded-md"
            >
              <span className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-1.5", cfg.color)} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text-primary leading-tight">
                  {item.title}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">{item.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </WidgetContainer>
  )
}
