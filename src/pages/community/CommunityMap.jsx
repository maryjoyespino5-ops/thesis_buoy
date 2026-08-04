// path: src/pages/community/CommunityMap.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { InteractiveMapWidget } from "../../components/widgets/core/InteractiveMapWidget";
import { MapWidget } from "../../components/widgets/core/MapWidget";
import { WaterQualityStatusWidget } from "../../components/widgets/core/WaterQualityStatusWidget";
import { FishProbabilityWidget } from "../../components/widgets/core/FishProbabilityWidget";
import { AIEnvironmentalSummaryWidget } from "../../components/widgets/core/AIEnvironmentalSummaryWidget";
import { CoralHealthIndexWidget } from "../../components/widgets/core/CoralHealthIndexWidget";
import { MarineHealthWidget } from "../../components/widgets/core/MarineHealthWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { MapPin, Droplets, Thermometer, Fish, Waves, Shield, Clock, Navigation } from "lucide-react";
import { cn } from "../../lib/utils";

// Map markers data
const mapMarkers = [
  { id: 1, type: "fishery", name: "Buoy 01", coords: "14.62°N, 120.97°E", lat: 14.62, lon: 120.97, status: "green", detail: "Fish Activity: Moderate | Temp: 28.6°C | DO: 6.7 mg/L" },
  { id: 2, type: "fishery", name: "Buoy 02", coords: "14.58°N, 121.02°E", lat: 14.58, lon: 121.02, status: "yellow", detail: "Fish Activity: High | Temp: 29.1°C | DO: 5.9 mg/L" },
  { id: 3, type: "beach", name: "North Beach", coords: "14.65°N, 120.95°E", lat: 14.65, lon: 120.95, status: "green", detail: "Safety: Safe | Water: Good | UV: 7 | Visitors: 245" },
  { id: 4, type: "beach", name: "Central Cove", coords: "14.60°N, 121.00°E", lat: 14.60, lon: 121.00, status: "green", detail: "Safety: Safe | Water: Good | UV: 8 | Visitors: 180" },
  { id: 5, type: "coral", name: "Reef Alpha", coords: "14.68°N, 120.92°E", lat: 14.68, lon: 120.92, status: "green", detail: "Health: 92% | Bleaching: None | Biodiversity: 88" },
  { id: 6, type: "coral", name: "Reef Delta", coords: "14.55°N, 121.05°E", lat: 14.55, lon: 121.05, status: "red", detail: "Health: 65% | Bleaching: Moderate | Biodiversity: 58" },
  { id: 7, type: "water", name: "WQ Station 01", coords: "14.63°N, 120.98°E", lat: 14.63, lon: 120.98, status: "green", detail: "WQI: 96 | Temp: 28.6°C | pH: 8.1 | DO: 6.7 mg/L" },
  { id: 8, type: "water", name: "WQ Station 02", coords: "14.59°N, 121.01°E", lat: 14.59, lon: 121.01, status: "yellow", detail: "WQI: 82 | Temp: 29.1°C | pH: 8.0 | DO: 5.9 mg/L" },
  { id: 9, type: "weather", name: "Weather Station Alpha", coords: "14.62°N, 120.97°E", lat: 14.62, lon: 120.97, status: "green", detail: "Temp: 28.4°C | Humidity: 72% | Wind: 12 km/h | Pressure: 1013 hPa" },
  { id: 10, type: "weather", name: "Weather Station Beta", coords: "14.58°N, 121.02°E", lat: 14.58, lon: 121.02, status: "yellow", detail: "Temp: 29.1°C | Humidity: 68% | Wind: 18 km/h | Pressure: 1011 hPa" },
];

const markerTypeConfig = {
  fishery: { icon: "🎣", color: "text-emerald-500", bg: "bg-emerald-50" },
  beach: { icon: "🏖️", color: "text-sky-500", bg: "bg-sky-50" },
  coral: { icon: "🪸", color: "text-purple-500", bg: "bg-purple-50" },
  water: { icon: "💧", color: "text-cyan-500", bg: "bg-cyan-50" },
  weather: { icon: "🌤️", color: "text-amber-500", bg: "bg-amber-50" },
};

const communityBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}));

const markerStats = [
  { label: "Fisheries", value: "2", icon: Fish },
  { label: "Beaches", value: "2", icon: Waves },
  { label: "Coral Reefs", value: "2", icon: Shield },
  { label: "WQ Stations", value: "2", icon: Droplets },
  { label: "Weather", value: "2", icon: Thermometer },
];

export function CommunityMap() {
  const [selectedZone, setSelectedZone] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const selectedBuoy = buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Map</h1>
        <p className="text-sm text-text-muted mt-1">
          Interactive community map with live buoy data
        </p>
      </div>

      {/* Map Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {markerStats.map((s, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-primary-500" />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-text-primary">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Interactive Map */}
      <WidgetGrid columns={1}>
        <InteractiveMapWidget
          zones={communityBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>

      {/* Map Markers Table */}
      <Card className="bg-surface rounded-lg border border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Navigation size={14} className="text-primary-500" />
            Map Markers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Type</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Name</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Coordinates</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Status</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {mapMarkers.map((marker) => {
                  const cfg = markerTypeConfig[marker.type] || markerTypeConfig.fishery;
                  return (
                    <tr key={marker.id} className="border-b border-border/10 hover:bg-surface-muted/30 transition-colors cursor-pointer" onClick={() => setSelectedMarker(marker)}>
                      <td className="px-3 py-2">
                        <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", cfg.bg, cfg.color)}>{cfg.icon} {marker.type}</span>
                      </td>
                      <td className="px-3 py-2 text-text-primary font-medium">{marker.name}</td>
                      <td className="px-3 py-2 text-text-secondary">{marker.coords}</td>
                      <td className="px-3 py-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full inline-block",
                          marker.status === "green" ? "bg-emerald-500" : marker.status === "yellow" ? "bg-amber-500" : "bg-red-500"
                        )} />
                      </td>
                      <td className="px-3 py-2 text-text-muted text-[10px]">{marker.detail}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Selected Marker Detail */}
      {selectedMarker && (
        <Card className="bg-surface rounded-lg border border-border/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <MapPin size={14} className="text-primary-500" />
              {selectedMarker.name}
            </h3>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-text-muted hover:text-text-primary text-xs"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Navigation size={12} /> Type: {selectedMarker.type}
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <MapPin size={12} /> {selectedMarker.coords}
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Clock size={12} /> Status: {selectedMarker.status}
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Shield size={12} /> {selectedMarker.detail}
            </div>
          </div>
        </Card>
      )}

      {/* Current Buoy + Weather Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <WaterQualityStatusWidget
          status={ai?.waterQualityIndex >= 85 ? "Good" : "Moderate"}
          description={
            ai?.waterQualityIndex >= 85
              ? "Water quality is within safe limits."
              : "Water quality is moderate. Monitor conditions."
          }
        />
      </WidgetGrid>

      {/* Fish Probability + Coral Health Row */}
      <WidgetGrid columns={2}>
        <FishProbabilityWidget
          probability={ai?.fishProbability ?? 70}
          confidence={ai?.confidence ?? 94}
        />
        <CoralHealthIndexWidget
          index={ai?.marineHealthIndex ?? 85}
          confidence={ai?.confidence ?? 94}
        />
      </WidgetGrid>

      {/* Marine Health + AI Summary Row */}
      <WidgetGrid columns={2}>
        <MarineHealthWidget
          health={ai?.marineHealthIndex ?? 85}
          confidence={ai?.confidence ?? 94}
        />
        <AIEnvironmentalSummaryWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Overall environmental conditions are good."}
        />
      </WidgetGrid>

      {/* Map Widget */}
      <WidgetGrid columns={1}>
        <MapWidget />
      </WidgetGrid>
    </motion.div>
  );
}