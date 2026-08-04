// path: src/components/widgets/core/WeatherDisplay.jsx
import React from "react";
import { useWeather } from "../../../hooks/useWeather";
import { WidgetContainer } from "../system/WidgetContainer";
import { Button } from "../../ui/Button";
import { RefreshCw, Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer } from "lucide-react";
import { cn } from "../../../lib/utils";

const conditionIcons = {
  Clear: "☀️",
  "Mainly Clear": "⛅",
  "Partly Cloudy": "⛅",
  Overcast: "☁️",
  Fog: "🌫️",
  "Depositing Rime Fog": "🌫️",
  "Light Drizzle": "🌦",
  "Moderate Drizzle": "🌧",
  "Dense Drizzle": "🌧",
  "Light Freezing Drizzle": "🌧",
  "Dense Freezing Drizzle": "🌧",
  "Slight Rain": "🌦",
  "Moderate Rain": "🌧",
  "Heavy Rain": "🌧",
  "Light Freezing Rain": "🌧",
  "Heavy Freezing Rain": "🌧",
  "Slight Snow Fall": "🌨",
  "Moderate Snow Fall": "🌨",
  "Heavy Snow Fall": "🌨",
  "Snow Grains": "🌨",
  "Slight Rain Showers": "🌦",
  "Moderate Rain Showers": "🌧",
  "Violent Rain Showers": "⛈",
  "Slight Snow Showers": "🌨",
  "Heavy Snow Showers": "🌨",
  Thunderstorm: "⛈",
  "Thunderstorm with Slight Hail": "⛈",
  "Thunderstorm with Heavy Hail": "⛈",
};

function getConditionIcon(condition) {
  if (!condition) return "🌤️";
  const match = Object.entries(conditionIcons).find(([key]) =>
    condition.toLowerCase().includes(key.toLowerCase())
  );
  return match ? match[1] : "🌤️";
}

function formatWindDirection(degrees) {
  if (degrees === null || degrees === undefined) return "N";
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const idx = Math.round(degrees / 45) % 8;
  return dirs[idx];
}

function formatPressure(hPa) {
  if (hPa === null || hPa === undefined) return "—";
  return `${hPa} hPa`;
}

function formatVisibility(m) {
  if (m === null || m === undefined) return "—";
  if (m >= 1000) return `${(m / 1000).toFixed(1)} km`;
  return `${Math.round(m)} m`;
}

export function WeatherDisplay({ lat, lon, className, showForecast = true }) {
  const { weather, loading, error, isOnline, refresh } = useWeather(lat, lon, {
    enabled: true,
    refreshInterval: 5 * 60 * 1000, // 5 minutes
  });

  if (loading && !weather) {
    return (
      <WidgetContainer title="Weather" icon="🌤️" className={className}>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-text-muted">
            <RefreshCw size={16} className="animate-spin" />
            <span className="text-sm">Loading weather...</span>
          </div>
        </div>
      </WidgetContainer>
    );
  }

  if (error && !weather) {
    return (
      <WidgetContainer title="Weather" icon="🌤️" className={className}>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="text-3xl mb-2">⚠️</span>
          <p className="text-sm text-text-muted mb-3">
            {error.message || "Failed to load weather data"}
          </p>
          <Button variant="secondary" size="sm" onClick={refresh}>
            <RefreshCw size={14} className="mr-1" /> Retry
          </Button>
        </div>
      </WidgetContainer>
    );
  }

  if (!weather) {
    return null;
  }

  const current = weather.current;
  const icon = getConditionIcon(current.condition);

  return (
    <WidgetContainer
      title="Weather"
      icon={icon}
      className={className}
      action={
        <Button
          variant="ghost"
          size="sm"
          onClick={refresh}
          disabled={loading}
          className="h-7 px-2 text-text-muted hover:text-text-primary"
          aria-label="Refresh weather"
        >
          <RefreshCw
            size={14}
            className={cn(loading && "animate-spin")}
          />
        </Button>
      }
    >
      {/* Offline indicator */}
      {!isOnline && (
        <div className="mb-2 px-2 py-1 rounded bg-amber-50 text-amber-700 text-[10px] font-medium">
          Offline — showing cached data
        </div>
      )}

      {/* Temperature */}
      <div className="flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-2xl font-bold text-text-primary leading-none">
            {current.temperature !== null ? `${current.temperature}°C` : "—"}
          </p>
          <p className="text-xs text-text-muted mt-0.5">
            Feels like{" "}
            {current.feelsLike !== null ? `${current.feelsLike}°C` : "—"}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Droplets size={12} /> Humidity:{" "}
          {current.humidity !== null ? `${current.humidity}%` : "—"}
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Wind size={12} /> {formatWindDirection(current.windDirection)}{" "}
          {current.windSpeed !== null ? `${current.windSpeed} km/h` : "—"}
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Thermometer size={12} /> Pressure:{" "}
          {formatPressure(current.pressure)}
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Eye size={12} /> Visibility: {formatVisibility(current.visibility)}
        </div>
      </div>

      {/* UV Index */}
      {current.uvIndex !== null && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-text-secondary">
          <Sun size={12} /> UV Index:{" "}
          <span
            className={cn(
              "font-medium",
              current.uvIndex <= 2
                ? "text-emerald-600"
                : current.uvIndex <= 5
                  ? "text-amber-600"
                  : "text-red-600"
            )}
          >
            {current.uvIndex}
          </span>
        </div>
      )}

      {/* Daily Forecast */}
      {showForecast && weather.daily && weather.daily.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Forecast
          </p>
          <div className="flex gap-2 overflow-x-auto">
            {weather.daily.slice(0, 5).map((day, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 px-2 py-1.5 rounded bg-surface-muted/50 min-w-[52px]"
              >
                <span className="text-[10px] text-text-muted">
                  {day.date
                    ? new Date(day.date).toLocaleDateString("en", {
                        weekday: "short",
                      })
                    : "—"}
                </span>
                <span className="text-base">
                  {getConditionIcon(day.condition)}
                </span>
                <span className="text-[10px] font-medium text-text-primary">
                  {day.tempMax !== null ? `${day.tempMax}°` : "—"}
                </span>
                <span className="text-[10px] text-text-muted">
                  {day.tempMin !== null ? `${day.tempMin}°` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sunrise / Sunset */}
      {weather.daily && weather.daily.length > 0 && (
        <div className="mt-2 flex items-center gap-4 text-xs text-text-secondary">
          <span>
            🌅 {weather.daily[0]?.sunrise
              ? new Date(weather.daily[0].sunrise).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </span>
          <span>
            🌇 {weather.daily[0]?.sunset
              ? new Date(weather.daily[0].sunset).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </span>
        </div>
      )}
    </WidgetContainer>
  );
}
