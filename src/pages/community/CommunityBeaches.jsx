// path: src/pages/community/CommunityBeaches.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { BeachSafetyWidget } from "../../components/widgets/core/BeachSafetyWidget";
import { BeachWaterQualityWidget } from "../../components/widgets/core/BeachWaterQualityWidget";
import { UVIndexWidget } from "../../components/widgets/core/UVIndexWidget";
import { TrashDensityWidget } from "../../components/widgets/core/TrashDensityWidget";
import { AIBeachAssessmentWidget } from "../../components/widgets/core/AIBeachAssessmentWidget";
import { BeachMapWidget } from "../../components/widgets/core/BeachMapWidget";
import { buoyData, weatherData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { Droplets, Sun, Wind, Users, Clock, Thermometer, Shield, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

const communityBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}));

// Beach information data
const beaches = [
  {
    id: 1, name: "North Beach", location: "Zone A",
    cleanliness: "Excellent", visitorCount: 245, waterCondition: "Good",
    facilities: "Restrooms, Showers, Parking", status: "Open",
    temperature: "28.4°C", humidity: "72%", windSpeed: "12 km/h",
    uvIndex: 7, tide: "Low", safetyLevel: "Safe",
  },
  {
    id: 2, name: "Central Cove", location: "Zone B",
    cleanliness: "Good", visitorCount: 180, waterCondition: "Good",
    facilities: "Restrooms, Parking", status: "Open",
    temperature: "29.1°C", humidity: "68%", windSpeed: "18 km/h",
    uvIndex: 8, tide: "Medium", safetyLevel: "Safe",
  },
  {
    id: 3, name: "South Cove", location: "Zone C",
    cleanliness: "Moderate", visitorCount: 95, waterCondition: "Moderate",
    facilities: "Restrooms", status: "Open",
    temperature: "30.2°C", humidity: "65%", windSpeed: "22 km/h",
    uvIndex: 9, tide: "High", safetyLevel: "Caution",
  },
  {
    id: 4, name: "East Shore", location: "Zone D",
    cleanliness: "Excellent", visitorCount: 310, waterCondition: "Good",
    facilities: "Restrooms, Showers, Parking, Lifeguard", status: "Open",
    temperature: "28.2°C", humidity: "70%", windSpeed: "10 km/h",
    uvIndex: 7, tide: "Low", safetyLevel: "Safe",
  },
  {
    id: 5, name: "West Bay", location: "Zone E",
    cleanliness: "Good", visitorCount: 150, waterCondition: "Good",
    facilities: "Parking", status: "Closed",
    temperature: "27.9°C", humidity: "75%", windSpeed: "8 km/h",
    uvIndex: 6, tide: "Low", safetyLevel: "Unsafe",
  },
];

// Beach visitor trend data
const visitorTrendData = [
  { day: "Mon", visitors: 180 }, { day: "Tue", visitors: 210 },
  { day: "Wed", visitors: 195 }, { day: "Thu", visitors: 245 },
  { day: "Fri", visitors: 280 }, { day: "Sat", visitors: 320 },
  { day: "Sun", visitors: 310 },
];

export function CommunityBeaches() {
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [beachFilter, setBeachFilter] = useState("All");
  const selectedBuoy = buoyData.find((b) => b.id === selectedBuoyId) || buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  const filteredBeaches = beachFilter === "All" ? beaches : beaches.filter((b) => b.status === beachFilter);

  const beachStats = [
    { label: "Total Beaches", value: "5", icon: MapPin },
    { label: "Open Now", value: "4", icon: Shield },
    { label: "Avg Visitors", value: "196", icon: Users },
    { label: "Water Quality", value: "Good", icon: Droplets },
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
        <h1 className="text-2xl font-bold text-text-primary">Beaches</h1>
        <p className="text-sm text-text-muted mt-1">
          Beach safety, water quality, and conditions
        </p>
      </div>

      {/* Beach Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {beachStats.map((s, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-primary-500" />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-text-primary">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Swimming Safety + Water Quality Row */}
      <WidgetGrid columns={2}>
        <BeachSafetyWidget
          safety={ai?.pollutionRisk?.risk === "High" ? "Caution" : "Safe"}
          description={
            ai?.pollutionRisk?.risk === "High"
              ? "Pollution risk detected. Exercise caution."
              : "Conditions are safe for beach activities."
          }
        />
        <BeachWaterQualityWidget />
      </WidgetGrid>

      {/* UV Index + Trash Detection Row */}
      <WidgetGrid columns={2}>
        <UVIndexWidget />
        <TrashDensityWidget
          level={ai?.trashDetection?.level ?? "Low"}
          items={ai?.trashDetection?.items ?? "0-2/100m"}
          confidence={ai?.trashDetection?.confidence ?? 91}
        />
      </WidgetGrid>

      {/* Weather + AI Assessment Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <AIBeachAssessmentWidget
          confidence={ai?.confidence ?? 92}
          summary={ai?.dailySummary ?? "Beach conditions are favorable for swimming. Water quality is within safe limits."}
        />
      </WidgetGrid>

      {/* Beach Table */}
      <Card className="bg-surface rounded-lg border border-border/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Beach size={14} className="text-primary-500" />
            Beach Information
          </CardTitle>
          <div className="flex gap-1">
            {["All", "Open", "Closed"].map((f) => (
              <button
                key={f}
                onClick={() => setBeachFilter(f)}
                className={cn(
                  "text-[10px] px-2 py-1 rounded-md transition-colors",
                  beachFilter === f
                    ? "bg-primary-500 text-white"
                    : "bg-surface-muted/50 text-text-muted hover:text-text-primary"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Beach</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Zone</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Cleanliness</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Visitors</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Water</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Facilities</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeaches.map((beach) => (
                  <tr key={beach.id} className="border-b border-border/10 hover:bg-surface-muted/30 transition-colors">
                    <td className="px-3 py-2 text-text-primary font-medium">{beach.name}</td>
                    <td className="px-3 py-2 text-text-secondary">{beach.location}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        beach.cleanliness === "Excellent" ? "bg-emerald-50 text-emerald-700" :
                        beach.cleanliness === "Good" ? "bg-sky-50 text-sky-700" :
                        "bg-amber-50 text-amber-700"
                      )}>{beach.cleanliness}</span>
                    </td>
                    <td className="px-3 py-2 text-text-secondary">{beach.visitorCount}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        beach.waterCondition === "Good" ? "bg-emerald-50 text-emerald-700" :
                        "bg-amber-50 text-amber-700"
                      )}>{beach.waterCondition}</span>
                    </td>
                    <td className="px-3 py-2 text-text-secondary text-[10px]">{beach.facilities}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        beach.status === "Open" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      )}>{beach.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Beach Details Cards */}
      <WidgetGrid columns={2}>
        {beaches.slice(0, 4).map((beach) => (
          <Card key={beach.id} className="bg-surface rounded-lg border border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Beach size={14} className="text-primary-500" />
                {beach.name}
              </h3>
              <span className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded",
                beach.status === "Open" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
              )}>{beach.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Thermometer size={12} /> {beach.temperature}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Droplets size={12} /> {beach.humidity}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Wind size={12} /> {beach.windSpeed}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Sun size={12} /> UV {beach.uvIndex}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Users size={12} /> {beach.visitorCount} visitors
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Clock size={12} /> Tide: {beach.tide}
              </div>
            </div>
          </Card>
        ))}
      </WidgetGrid>

      {/* Beach Map */}
      <WidgetGrid columns={1}>
        <BeachMapWidget />
      </WidgetGrid>
    </motion.div>
  );
}
