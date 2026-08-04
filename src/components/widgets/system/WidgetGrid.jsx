// path: src/components/widgets/system/WidgetGrid.jsx
import React from "react"
import { cn } from "../../../lib/utils"

const gridTemplates = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
}

export function WidgetGrid({
  columns = 2,
  gap = "gap-3",
  className,
  children,
  ...props
}) {
  const gridClass = gridTemplates[columns] || gridTemplates[2]

  return (
    <div
      className={cn("grid bg-background", gridClass, gap, className)}
      {...props}
    >
      {children}
    </div>
  )
}
