// path: src/components/widgets/core/CurrentWeatherWidget.jsx
import React from "react"
import { WidgetContainer } from "../system/WidgetContainer"
import { cn } from "../../../lib/utils"

export function CurrentWeatherWidget({
  condition = "Sunny",
  temperature = "28.4°C",
  feelsLike = "31.2°C",
  humidity = "72%",
  windSpeed = "12 km/h",
  className,
  ...props
}) {
  const conditionIcons = {
    Sunny: "☀️",
    "Partly Cloudy": "⛅",
    Cloudy: "☁️",
    Rain: "🌧️",
    Thunderstorm: "⛈️",
    Fog: "🌫️",
  }

  const icon = conditionIcons[condition] || "🌤️"

  return (
    <WidgetContainer title="Current Weather" icon={icon} className={className} {...props}>
      <div className="flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-2xl font-bold text-text-primary leading-none">
            {temperature}
          </p>
          <p className="text-xs text-text-muted mt-0.5">Feels like {feelsLike}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span>💧</span> Humidity: {humidity}
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span>💨</span> Wind: {windSpeed}
        </div>
      </div>
    </WidgetContainer>
  )
}
