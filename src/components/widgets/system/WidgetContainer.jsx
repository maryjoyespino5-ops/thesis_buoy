// path: src/components/widgets/system/WidgetContainer.jsx
import React from "react"
import { cn } from "../../../lib/utils"

export function WidgetContainer({
  title,
  icon,
  className,
  children,
  loading,
  error,
  onRefresh,
  ...props
}) {
  if (loading) {
    return (
      <div
        className={cn(
          "bg-background rounded-lg border border-border/50 shadow-soft p-4 animate-pulse",
          className,
        )}
        {...props}
      >
        <div className="h-4 bg-surface-muted rounded w-24 mb-3" />
        <div className="h-24 bg-surface-muted rounded" />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={cn(
          "bg-background rounded-lg border border-border/50 shadow-soft p-4",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <span>⚠️</span>
          <span>{error}</span>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="ml-auto text-xs text-primary-500 hover:text-primary-600"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "bg-background rounded-lg border border-border/50 shadow-soft hover:shadow-sm transition-all",
        className,
      )}
      {...props}
    >
      {(title || icon) && (
        <div className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            {title && (
              <h3 className="text-sm font-semibold text-text-primary leading-tight">
                {title}
              </h3>
            )}
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-text-muted hover:text-primary-500 transition-colors"
              aria-label="Refresh widget"
            >
              ↻
            </button>
          )}
        </div>
      )}
      <div className={cn(title || icon ? "p-4" : "")}>{children}</div>
    </div>
  )
}
