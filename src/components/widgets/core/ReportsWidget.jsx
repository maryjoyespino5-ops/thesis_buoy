// path: src/components/widgets/core/ReportsWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function ReportsWidget({
  reports = [
    { id: 1, title: "Weekly Water Quality", date: "2026-07-28", type: "AI-Generated", status: "Ready" },
    { id: 2, title: "Monthly Environmental Summary", date: "2026-07-01", type: "AI-Generated", status: "Ready" },
    { id: 3, title: "Buoy 04 Maintenance", date: "2026-07-15", type: "System", status: "Ready" },
  ],
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Reports" icon="📄" className={className} {...props}>
      <div className="space-y-2">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md hover:bg-surface-muted/50 transition-colors cursor-pointer"
          >
            <span className="text-lg">{report.type === "AI-Generated" ? "🤖" : "📋"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">{report.title}</p>
              <p className="text-[10px] text-text-muted">{report.date}</p>
            </div>
            <span className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded",
              report.status === "Ready"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            )}>
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}
