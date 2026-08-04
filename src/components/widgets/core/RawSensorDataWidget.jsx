// path: src/components/widgets/core/RawSensorDataWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function RawSensorDataWidget({
  sensors = [
    { label: "Temperature", value: "28.6°C", range: "25-30°C", status: "Normal" },
    { label: "Dissolved Oxygen", value: "6.7 mg/L", range: ">5 mg/L", status: "Normal" },
    { label: "pH", value: "8.1", range: "7.5-8.5", status: "Normal" },
    { label: "Salinity", value: "34.2 PSU", range: "30-35 PSU", status: "Normal" },
    { label: "Turbidity", value: "2.4 NTU", range: "<5 NTU", status: "Normal" },
    { label: "Weather", value: "Sunny", range: "-", status: "Normal" },
  ],
  className,
  ...props
}) {
  return (
    <WidgetContainer title="Raw Sensor Data" icon="📊" className={className} {...props}>
      <div className="space-y-1.5">
        {sensors.map((sensor, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-text-primary">{sensor.label}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-text-primary">{sensor.value}</span>
              <span className="text-text-muted">{sensor.range}</span>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                sensor.status === "Normal" ? "bg-emerald-500" : "bg-amber-500"
              )} />
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  )
}
