// path: src/components/widgets/core/SonarWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function SonarWidget({
  depth = "6.4m",
  bottomType = "Sandy",
  coverage = "Good",
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Sonar" icon="📡" className={className} {...props}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Depth</span>
          <span className="text-sm font-semibold text-text-primary">{depth}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Bottom Type</span>
          <span className="text-sm font-semibold text-text-primary">{bottomType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">Coverage</span>
          <span className="text-sm font-semibold text-text-primary">{coverage}</span>
        </div>
        <div className="mt-2 h-24 bg-surface-muted/30 rounded-md flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-primary-500/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary-500">SONAR</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-primary-500/10 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
