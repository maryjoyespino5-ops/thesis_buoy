// path: src/pages/community/CommunityWeather.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { WindWidget } from "../../components/widgets/core/WindWidget";
import { WaveForecastWidget } from "../../components/widgets/core/WaveForecastWidget";
import { buoyData, weatherData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { CloudRain, Wind, Thermometer, Droplets, Gauge, Sun, Clock, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

// Weather station data
const weatherStations = [
  {
    id: 1, name: "Station Alpha", location: "North Zone",
    temperature: "28.4°C", humidity: "72%", windSpeed: "12 km/h",
    rainfall: "0.0 mm", pressure: "1013 hPa", uvIndex: 7,
    tide: "Low", condition: "Sunny",
  },
  {
    id: 2, name: "Station Beta", location: "Central Zone",
    temperature: "29.1°C", humidity: "68%", windSpeed: "18 km/h",
    rainfall: "0.2 mm", pressure: "1011 hPa", uvIndex: 8,
    tide: "Medium", condition: "Partly Cloudy",
  },
  {
    id: 3, name: "Station Gamma", location: "South Zone",
    temperature: "30.2°C", humidity: "65%", windSpeed: "22 km/h",
    rainfall: "1.5 mm", pressure: "1010 hPa", uvIndex: 9,
    tide: "High", condition: "Cloudy",
  },
  {
    id: 4, name: "Station Delta", location: "East Zone",
    temperature: "28.2°C", humidity: "70%", windSpeed: "10 km/h",
    rainfall: "0.0 mm", pressure: "1013 hPa", uvIndex: 7,
    tide: "Low", condition: "Sunny",
  },
  {
    id: 5, name: "Station Epsilon", location: "West Zone",
    temperature: "27.9°C", humidity: "75%", windSpeed: "8 km/h",
    rainfall: "0.0 mm", pressure: "1014 hPa", uvIndex: 6,
    tide: "Low", condition: "Clear",
  },
];

// Historical weather data
const tempHistory = [
  { day: "Mon", temp: 27.2 }, { day: "Tue", temp: 28.1 },
  { day: "Wed", temp: 28.6 }, { day: "Thu", temp: 29.0 },
  { day: "Fri", temp: 28.8 }, { day: "Sat", temp: 28.2 },
  { day: "Sun", temp: 28.6 },
];

const humidityHistory = [
  { day: "Mon", humidity: 75 }, { day: "Tue", humidity: 72 },
  { day: "Wed", humidity: 70 }, { day: "Thu", humidity: 68 },
  { day: "Fri", humidity: 65 }, { day: "Sat", humidity: 70 },
  { day: "Sun", humidity: 72 },
];

const windHistory = [
  { day: "Mon", wind: 10 }, { day: "Tue", wind: 14 },
  { day: "Wed", wind: 12 }, { day: "Thu", wind: 18 },
  { day: "Fri", wind: 15 }, { day: "Sat", wind: 11 },
  { day: "Sun", wind: 12 },
];

export function CommunityWeather() {
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [stationFilter, setStationFilter] = useState("All");
  const selectedBuoy = buoyData.find((b) => b.id === selectedBuoyId) || buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  const filteredStations = stationFilter === "All" ? weatherStations : weatherStations.filter((s) => s.condition === stationFilter);

  const conditions = ["All", "Sunny", "Partly Cloudy", "Cloudy", "Clear"];

  const weatherStats = [
    { label: "Avg Temp", value: "28.7°C", icon: Thermometer },
    { label: "Avg Humidity", value: "70%", icon: Droplets },
    { label: "Avg Wind", value: "14 km/h", icon: Wind },
    { label: "Avg Pressure", value: "1012 hPa", icon: Gauge },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Weather</h1>
        <p className="text-sm text-text-muted mt-1">
          Current conditions and forecasts
        </p>
      </div>

      {/* Weather Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherStats.map((s, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-primary-500" />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-text-primary">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Temperature + Weather Condition Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <WindWidget />
      </WidgetGrid>

      {/* Wind + Wave Forecast Row */}
      <WidgetGrid columns={2}>
        <WindWidget />
        <WaveForecastWidget />
      </WidgetGrid>

      {/* Weather Stations Table */}
      <Card className="bg-surface rounded-lg border border-border/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <CloudRain size={14} className="text-primary-500" />
            Weather Stations
          </CardTitle>
          <div className="flex gap-1">
            {conditions.map((c) => (
              <button
                key={c}
                onClick={() => setStationFilter(c)}
                className={cn(
                  "text-[10px] px-2 py-1 rounded-md transition-colors",
                  stationFilter === c
                    ? "bg-primary-500 text-white"
                    : "bg-surface-muted/50 text-text-muted hover:text-text-primary"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Station</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Location</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Temp</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Humidity</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Wind</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Rainfall</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Pressure</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">UV</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Condition</th>
                </tr>
              </thead>
              <tbody>
                {filteredStations.map((station) => (
                  <tr key={station.id} className="border-b border-border/10 hover:bg-surface-muted/30 transition-colors">
                    <td className="px-3 py-2 text-text-primary font-medium">{station.name}</td>
                    <td className="px-3 py-2 text-text-secondary">{station.location}</td>
                    <td className="px-3 py-2 text-text-secondary">{station.temperature}</td>
                    <td className="px-3 py-2 text-text-secondary">{station.humidity}</td>
                    <td className="px-3 py-2 text-text-secondary">{station.windSpeed}</td>
                    <td className="px-3 py-2 text-text-secondary">{station.rainfall}</td>
                    <td className="px-3 py-2 text-text-secondary">{station.pressure}</td>
                    <td className="px-3 py-2 text-text-secondary">{station.uvIndex}</td>
                    <td className="px-3 py-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700">{station.condition}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weather Station Detail Cards */}
      <WidgetGrid columns={2}>
        {weatherStations.slice(0, 4).map((station) => (
          <Card key={station.id} className="bg-surface rounded-lg border border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <CloudRain size={14} className="text-primary-500" />
                {station.name}
              </h3>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-700">{station.condition}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <MapPin size={12} /> {station.location}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Thermometer size={12} /> {station.temperature}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Droplets size={12} /> {station.humidity}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Wind size={12} /> {station.windSpeed}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Gauge size={12} /> {station.pressure}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Sun size={12} /> UV {station.uvIndex}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Droplets size={12} /> Rain: {station.rainfall}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Clock size={12} /> Tide: {station.tide}
              </div>
            </div>
          </Card>
        ))}
      </WidgetGrid>
    </motion.div>
  );
}
