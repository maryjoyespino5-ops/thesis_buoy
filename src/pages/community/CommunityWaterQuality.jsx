// path: src/pages/community/CommunityWaterQuality.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WaterQualityWidget } from "../../components/widgets/core/WaterQualityWidget";
import { PHWidget } from "../../components/widgets/core/PHWidget";
import { SalinityWidget } from "../../components/widgets/core/SalinityWidget";
import { DissolvedOxygenWidget } from "../../components/widgets/core/DissolvedOxygenWidget";
import { TurbidityWidget } from "../../components/widgets/core/TurbidityWidget";
import { WaterQualityIndexWidget } from "../../components/widgets/core/WaterQualityIndexWidget";
import { HistoricalTrendsWidget } from "../../components/widgets/core/HistoricalTrendsWidget";
import { AIAnalysisWidget } from "../../components/widgets/core/AIAnalysisWidget";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { buoyData, tempSalData, doPhData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { Droplets, Thermometer, Wind, Gauge, AlertTriangle, Clock, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

// Water quality sensor readings
const sensorReadings = [
  { id: 1, station: "Buoy 01", parameter: "Temperature", value: "28.6°C", range: "25-30°C", status: "Normal" },
  { id: 2, station: "Buoy 01", parameter: "pH", value: "8.1", range: "7.5-8.5", status: "Normal" },
  { id: 3, station: "Buoy 01", parameter: "Dissolved Oxygen", value: "6.7 mg/L", range: ">5 mg/L", status: "Normal" },
  { id: 4, station: "Buoy 01", parameter: "Salinity", value: "34.4 PSU", range: "30-35 PSU", status: "Normal" },
  { id: 5, station: "Buoy 01", parameter: "Turbidity", value: "2.3 NTU", range: "<5 NTU", status: "Normal" },
  { id: 6, station: "Buoy 01", parameter: "Conductivity", value: "48.2 mS/cm", range: "40-55 mS/cm", status: "Normal" },
  { id: 7, station: "Buoy 01", parameter: "Water Quality Index", value: "96", range: "80-100", status: "Excellent" },
];

// Historical water quality data
const wqiHistory = [
  { month: "Jan", wqi: 88 }, { month: "Feb", wqi: 91 },
  { month: "Mar", wqi: 89 }, { month: "Apr", wqi: 94 },
  { month: "May", wqi: 93 }, { month: "Jun", wqi: 96 },
];

// Sensor trend data
const tempTrend = [
  { day: "Mon", temp: 27.2 }, { day: "Tue", temp: 28.1 },
  { day: "Wed", temp: 28.6 }, { day: "Thu", temp: 29.0 },
  { day: "Fri", temp: 28.8 }, { day: "Sat", temp: 28.2 },
  { day: "Sun", temp: 28.6 },
];

const phTrend = [
  { day: "Mon", ph: 8.2 }, { day: "Tue", ph: 8.1 },
  { day: "Wed", ph: 8.0 }, { day: "Thu", ph: 7.9 },
  { day: "Fri", ph: 8.0 }, { day: "Sat", ph: 8.1 },
  { day: "Sun", ph: 8.1 },
];

const doTrend = [
  { day: "Mon", do: 6.8 }, { day: "Tue", do: 6.5 },
  { day: "Wed", do: 6.2 }, { day: "Thu", do: 5.9 },
  { day: "Fri", do: 6.3 }, { day: "Sat", do: 6.7 },
  { day: "Sun", do: 6.7 },
];

const salinityTrend = [
  { day: "Mon", salinity: 34.0 }, { day: "Tue", salinity: 34.2 },
  { day: "Wed", salinity: 34.4 }, { day: "Thu", salinity: 34.6 },
  { day: "Fri", salinity: 34.3 }, { day: "Sat", salinity: 34.1 },
  { day: "Sun", salinity: 34.2 },
];

export function CommunityWaterQuality() {
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [readingFilter, setReadingFilter] = useState("All");
  const selectedBuoy = buoyData.find((b) => b.id === selectedBuoyId) || buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  const filteredReadings = readingFilter === "All" ? sensorReadings : sensorReadings.filter((r) => r.status === readingFilter);

  const statusColors = {
    Normal: "text-emerald-500 bg-emerald-50",
    Excellent: "text-emerald-500 bg-emerald-50",
    Warning: "text-amber-500 bg-amber-50",
    Critical: "text-red-500 bg-red-50",
  };

  const wqStats = [
    { label: "Avg Temperature", value: "28.6°C", icon: Thermometer },
    { label: "Avg pH", value: "8.1", icon: Gauge },
    { label: "Avg DO", value: "6.7 mg/L", icon: Droplets },
    { label: "Avg Salinity", value: "34.2 PSU", icon: Wind },
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
        <h1 className="text-2xl font-bold text-text-primary">Water Quality</h1>
        <p className="text-sm text-text-muted mt-1">
          Water quality metrics, trends, and AI analysis
        </p>
      </div>

      {/* Water Quality Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {wqStats.map((s, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-primary-500" />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-text-primary">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Temperature + pH Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <PHWidget />
      </WidgetGrid>

      {/* Salinity + Dissolved Oxygen Row */}
      <WidgetGrid columns={2}>
        <SalinityWidget />
        <DissolvedOxygenWidget />
      </WidgetGrid>

      {/* Turbidity + Water Quality Index Row */}
      <WidgetGrid columns={2}>
        <TurbidityWidget />
        <WaterQualityIndexWidget
          wqi={ai?.waterQualityIndex ?? 80}
          confidence={ai?.confidence ?? 94}
        />
      </WidgetGrid>

      {/* Historical Trends + AI Analysis Row */}
      <WidgetGrid columns={2}>
        <HistoricalTrendsWidget data={wqiHistory} label="WQI Trend" color="#10b981" />
        <AIAnalysisWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Water quality conditions are stable. No anomalies detected."}
          recommendations={ai?.recommendations ?? []}
        />
      </WidgetGrid>

      {/* Sensor Readings Table */}
      <Card className="bg-surface rounded-lg border border-border/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Gauge size={14} className="text-primary-500" />
            Latest Sensor Readings
          </CardTitle>
          <div className="flex gap-1">
            {["All", "Normal", "Excellent"].map((f) => (
              <button
                key={f}
                onClick={() => setReadingFilter(f)}
                className={cn(
                  "text-[10px] px-2 py-1 rounded-md transition-colors",
                  readingFilter === f
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
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Station</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Parameter</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Value</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Range</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReadings.map((reading) => (
                  <tr key={reading.id} className="border-b border-border/10 hover:bg-surface-muted/30 transition-colors">
                    <td className="px-3 py-2 text-text-primary">{reading.station}</td>
                    <td className="px-3 py-2 text-text-secondary">{reading.parameter}</td>
                    <td className="px-3 py-2 text-text-secondary font-medium">{reading.value}</td>
                    <td className="px-3 py-2 text-text-muted">{reading.range}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        statusColors[reading.status] || "bg-sky-50 text-sky-700"
                      )}>{reading.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sensor Detail Cards */}
      <WidgetGrid columns={2}>
        {sensorReadings.slice(0, 4).map((reading) => (
          <Card key={reading.id} className="bg-surface rounded-lg border border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Droplets size={14} className="text-primary-500" />
                {reading.parameter}
              </h3>
              <span className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded",
                statusColors[reading.status] || "bg-sky-50 text-sky-700"
              )}>{reading.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <MapPin size={12} /> {reading.station}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Gauge size={12} /> {reading.value}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Clock size={12} /> Range: {reading.range}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <AlertTriangle size={12} /> {reading.status}
              </div>
            </div>
          </Card>
        ))}
      </WidgetGrid>
    </motion.div>
  );
}
