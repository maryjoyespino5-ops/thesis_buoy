// path: src/components/widgets/core/WindWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function WindWidget({
  speed = "12 km/h",
  direction = "NE",
  gusts = "18 km/h",
  className,
  ...props
}) {
  const getDirectionArrow = (dir) => {
    const arrows = { N: "↑", NE: "↗", E: "→", SE: "↘", S: "↓", SW: "↙", W: "←", NW: "↖" }
    return arrows[dir] || "→"
  }

  return (
    <WidgetContainer title="Wind" icon="💨" className={className} {...props}>
      <div className="flex items-center gap-4">
        <span className="text-4xl">{getDirectionArrow(direction)}</span>
        <div>
          <p className="text-2xl font-bold text-text-primary leading-none">{speed}</p>
          <p className="text-xs text-text-muted mt-0.5">Direction: {direction}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
        <span>Gusts: {gusts}</span>
      </div>
      <div className="mt-2 h-1.5 bg-surface-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full"
          style={{ width: `${Math.min((parseInt(speed) / 50) * 100, 100)}%` }}
        />
      </div>
    </WidgetContainer>
  )
}
