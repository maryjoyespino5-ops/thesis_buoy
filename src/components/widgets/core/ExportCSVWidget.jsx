// path: src/components/widgets/core/ExportCSVWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function ExportCSVWidget({
  onExport,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Export CSV" icon="📄" className={className} {...props}>
      <div className="space-y-2">
        <p className="text-xs text-text-secondary">
          Download raw sensor data as CSV file for offline analysis.
        </p>
        <Button
          variant="primary"
          size="sm"
          className="w-full h-8 text-sm"
          onClick={onExport}
        >
          📥 Export CSV
        </Button>
        <div className="text-[10px] text-text-muted text-center">
          Last export: Today, 14:23
        </div>
      </div>
    </WidgetContainer>
  )
}
