// path: src/components/widgets/core/ExportPDFWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function ExportPDFWidget({
  onExport,
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Export PDF" icon="📕" className={className} {...props}>
      <div className="space-y-2">
        <p className="text-xs text-text-secondary">
          Generate and download a PDF report of the current dashboard view.
        </p>
        <Button
          variant="primary"
          size="sm"
          className="w-full h-8 text-sm"
          onClick={onExport}
        >
          📥 Export PDF
        </Button>
        <div className="text-[10px] text-text-muted text-center">
          Last export: Today, 14:23
        </div>
      </div>
    </WidgetContainer>
  )
}
