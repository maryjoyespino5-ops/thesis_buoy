// path: src/components/ui/WeatherCard.jsx
import React, { memo, useMemo } from "react";
import { cn } from "../../lib/utils";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Moon,
  Wind,
  Droplets,
  Gauge,
  Eye,
  Thermometer,
  RefreshCw,
  AlertCircle,
  Sunrise,
  Sunset,
  Clock,
  WifiOff,
} from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";

const conditionConfig = {
  Clear: { icon: Sun, color: "text-amber-500", bg: "bg-amber-50" },
  "Mainly Clear": { icon: Sun, color: "text-amber-400", bg: "bg-amber-50" },
  "Partly Cloudy": { icon: CloudSun, color: "text-sky-500", bg: "bg-sky-50" },
  Cloudy: { icon: Cloud, color: "text-gray-500", bg: "bg-gray-50" },
  Overcast: { icon: Cloud, color: "text-gray-600", bg: "bg-gray-50" },
  Fog: { icon: Cloud, color: "text-gray-400", bg: "bg-gray-50" },
  "Depositing Rime Fog": { icon: Cloud, color: "text-gray-400", bg: "bg-gray-50" },
  "Light Drizzle": { icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  "Moderate Drizzle": { icon: CloudRain, color: "text-blue-500", bg: "bg-blue-50" },
  "Dense Drizzle": { icon: CloudRain, color: "text-blue-600", bg: "bg-blue-50" },
  "Light Freezing Drizzle": { icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  "Dense Freezing Drizzle": { icon: CloudRain, color: "text-blue-600", bg: "bg-blue-50" },
  "Slight Rain": { icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  "Moderate Rain": { icon: CloudRain, color: "text-blue-500", bg: "bg-blue-50" },
  "Heavy Rain": { icon: CloudRain, color: "text-blue-600", bg: "bg-blue-50" },
  "Light Freezing Rain": { icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  "Heavy Freezing Rain": { icon: CloudRain, color: "text-blue-600", bg: "bg-blue-50" },
  "Slight Snow Fall": { icon: CloudRain, color: "text-indigo-400", bg: "bg-indigo-50" },
  "Moderate Snow Fall": { icon: CloudRain, color: "text-indigo-500", bg: "bg-indigo-50" },
  "Heavy Snow Fall": { icon: CloudRain, color: "text-indigo-600", bg: "bg-indigo-50" },
  "Snow Grains": { icon: CloudRain, color: "text-indigo-400", bg: "bg-indigo-50" },
  "Slight Rain Showers": { icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  "Moderate Rain Showers": { icon: CloudRain, color: "text-blue-500", bg: "bg-blue-50" },
  "Violent Rain Showers": { icon: CloudRain, color: "text-blue-600", bg: "bg-blue-50" },
  "Slight Snow Showers": { icon: CloudRain, color: "text-indigo-400", bg: "bg-indigo-50" },
  "Heavy Snow Showers": { icon: CloudRain, color: "text-indigo-600", bg: "bg-indigo-50" },
  Thunderstorm: { icon: CloudLightning, color: "text-purple-600", bg: "bg-purple-50" },
  "Thunderstorm with Slight Hail": { icon: CloudLightning, color: "text-purple-600", bg: "bg-purple-50" },
  "Thunderstorm with Heavy Hail": { icon: CloudLightning, color: "text-purple-700", bg: "bg-purple-50" },
};

function getConditionConfig(condition) {
  if (!condition) return conditionConfig["Partly Cloudy"];
  const exact = conditionConfig[condition];
  if (exact) return exact;
  const fallback = Object.entries(conditionConfig).find(([key]) =>
    condition.includes(key)
  );
  return fallback ? fallback[1] : conditionConfig["Partly Cloudy"];
}

const WeatherIcon = memo(function WeatherIcon({ condition, size = 32 }) {
  const config = getConditionConfig(condition);
  const Icon = config.icon;
  return (
    <div
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center",
        config.bg
      )}
    >
      <Icon size={size} className={config.color} />
    </div>
  );
});

const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="bg-surface rounded-lg border border-border/50 p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-muted animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-16 bg-surface-muted rounded animate-pulse" />
          <div className="h-3 w-24 bg-surface-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="h-8 w-20 bg-surface-muted rounded animate-pulse" />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 bg-surface-muted rounded-md animate-pulse" />
        ))}
      </div>
    </div>
  );
});

const ErrorCard = memo(function ErrorCard({ message, onRetry }) {
  return (
    <div className="bg-surface rounded-lg border border-border/50 p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={24} className="text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-primary leading-tight">
            Weather Unavailable
          </h3>
          <p className="text-xs text-text-muted mt-0.5 truncate">
            {message}
          </p>
        </div>
        {onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry}>
            <RefreshCw size={12} />
          </Button>
        )}
      </div>
    </div>
  );
});

function formatTime(isoString) {
  if (!isoString) return "—";
  try {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function formatVisibility(meters) {
  if (meters == null) return "—";
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${meters} m`;
}

function formatPressure(hPa) {
  if (hPa == null) return "—";
  return `${hPa} hPa`;
}

function formatLastUpdated(date) {
  if (!date) return "—";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const WeatherCard = memo(
  function WeatherCard({
    weather,
    buoyName,
    loading,
    error,
    isOnline,
    lastUpdated,
    onRefresh,
    className,
    ...props
  }) {
    // Show skeleton when loading with no data
    if (loading && !weather) {
      return <SkeletonCard />;
    }

    // Show error card when no data and error
    if (error && !weather) {
      return <ErrorCard message={error.message} onRetry={onRefresh} />;
    }

    // No data and not loading
    if (!weather) {
      return null;
    }

    const current = weather.current || {};
    const condition = current.condition || "Unknown";
    const config = getConditionConfig(condition);

    // Memoize the daily data access to avoid re-computation
    const dailyEntry = useMemo(() => {
      return weather.daily?.[0] ?? null;
    }, [weather.daily]);

    // Determine which timestamp to show for "last updated"
    const displayLastUpdated = useMemo(() => {
      if (lastUpdated) return lastUpdated;
      if (current.observedAt) return new Date(current.observedAt);
      return null;
    }, [lastUpdated, current.observedAt]);

    return (
      <div
        className={cn(
          "bg-surface rounded-lg border border-border/50 hover:shadow-sm transition-all",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WeatherIcon condition={condition} size={20} />
            <div>
              <h3 className="text-sm font-semibold text-text-primary leading-tight flex items-center gap-1.5">
                <Thermometer size={13} className="text-amber-500" />
                Weather
              </h3>
              {buoyName && (
                <p className="text-xs text-text-muted">{buoyName}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isOnline && (
              <Badge variant="warning" size="sm">
                <WifiOff size={10} className="mr-0.5" />
                Offline
              </Badge>
            )}
            <Badge variant="info" size="sm">
              {condition}
            </Badge>
            {onRefresh && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={onRefresh}
                aria-label="Refresh weather"
              >
                <RefreshCw size={12} />
              </Button>
            )}
          </div>
        </div>

        {/* Current Conditions */}
        <div className="p-4">
          {/* Temperature */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-text-primary leading-none">
              {current.temperature != null ? `${current.temperature}°C` : "—"}
            </span>
            {current.feelsLike != null && (
              <span className="text-sm text-text-muted">
                Feels like {current.feelsLike}°C
              </span>
            )}
          </div>

          {/* Grid: Wind, Humidity, Pressure, Visibility */}
          <div className="grid grid-cols-2 gap-2">
            {/* Wind */}
            <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
              <Wind size={14} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Wind</div>
                <div className="text-sm font-medium text-text-primary">
                  {current.windSpeed != null
                    ? `${current.windSpeed} km/h`
                    : "—"}{" "}
                  {current.windDirection != null && `· ${current.windDirection}°`}
                </div>
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
              <Droplets size={14} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Humidity</div>
                <div className="text-sm font-medium text-text-primary">
                  {current.humidity != null ? `${current.humidity}%` : "—"}
                </div>
              </div>
            </div>

            {/* Pressure */}
            <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
              <Gauge size={14} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Pressure</div>
                <div className="text-sm font-medium text-text-primary">
                  {formatPressure(current.pressure)}
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
              <Eye size={14} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Visibility</div>
                <div className="text-sm font-medium text-text-primary">
                  {formatVisibility(current.visibility)}
                </div>
              </div>
            </div>
          </div>

          {/* Sunrise / Sunset */}
          {dailyEntry && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
                <Sunrise size={14} className="text-amber-400" />
                <div>
                  <div className="text-xs text-text-muted">Sunrise</div>
                  <div className="text-sm font-medium text-text-primary">
                    {formatTime(dailyEntry.sunrise)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
                <Sunset size={14} className="text-orange-500" />
                <div>
                  <div className="text-xs text-text-muted">Sunset</div>
                  <div className="text-sm font-medium text-text-primary">
                    {formatTime(dailyEntry.sunset)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={10} />
            <span>Last updated: {formatLastUpdated(displayLastUpdated)}</span>
          </div>
        </div>

        {/* Error banner (non-fatal, data still present) */}
        {error && weather && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200/50 rounded-md">
              <AlertCircle size={12} className="text-amber-500 flex-shrink-0" />
              <span className="text-xs text-amber-700">{error.message}</span>
              {onRefresh && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 text-xs px-2 ml-auto"
                  onClick={onRefresh}
                >
                  Retry
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
