// path: src/pages/community/CommunityCoral.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { CoralHealthIndexWidget } from "../../components/widgets/core/CoralHealthIndexWidget";
import { MarineHealthWidget } from "../../components/widgets/core/MarineHealthWidget";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { PHWidget } from "../../components/widgets/core/PHWidget";
import { DissolvedOxygenWidget } from "../../components/widgets/core/DissolvedOxygenWidget";
import { SalinityWidget } from "../../components/widgets/core/SalinityWidget";
import { PollutionRiskWidget } from "../../components/widgets/core/PollutionRiskWidget";
import { AICoralAssessmentWidget } from "../../components/widgets/core/AICoralAssessmentWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { Waves, Thermometer, Droplets, AlertTriangle, Shield, MapPin, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

// Coral reef monitoring data
const coralReefs = [
  {
    id: 1, name: "Reef Alpha", location: "North Zone",
    health: 92, bleaching: "None", biodiversity: 88,
    lastMonitoring: "2026-08-03", temperature: "28.1°C",
    ph: 8.1, do: "6.8 mg/L", status: "Healthy",
  },
  {
    id: 2, name: "Reef Beta", location: "Central Zone",
    health: 78, bleaching: "Minor", biodiversity: 72,
    lastMonitoring: "2026-08-02", temperature: "29.0°C",
    ph: 7.9, do: "6.2 mg/L", status: "Warning",
  },
  {
    id: 3, name: "Reef Gamma", location: "South Zone",
    health: 85, bleaching: "None", biodiversity: 81,
    lastMonitoring: "2026-08-01", temperature: "28.6°C",
    ph: 8.0, do: "6.5 mg/L", status: "Healthy",
  },
  {
    id: 4, name: "Reef Delta", location: "East Zone",
    health: 65, bleaching: "Moderate", biodiversity: 58,
    lastMonitoring: "2026-07-30", temperature: "30.2°C",
    ph: 7.7, do: "5.4 mg/L", status: "Critical",
  },
  {
    id: 5, name: "Reef Epsilon", location: "West Zone",
    health: 90, bleaching: "None", biodiversity: 85,
    lastMonitoring: "2026-08-03", temperature: "27.9°C",
    ph: 8.2, do: "7.0 mg/L", status: "Healthy",
  },
];

// Reef health trend data
const reefHealthTrend = [
  { month: "Jan", health: 88 }, { month: "Feb", health: 86 },
  { month: "Mar", health: 87 }, { month: "Apr", health: 89 },
  { month: "May", health: 88 }, { month: "Jun", health: 90 },
];

// Biodiversity score data
const biodiversityData = [
  { reef: "Alpha", score: 88 }, { reef: "Beta", score: 72 },
  { reef: "Gamma", score: 81 }, { reef: "Delta", score: 58 },
  { reef: "Epsilon", score: 85 },
];

export function CommunityCoral() {
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [reefFilter, setReefFilter] = useState("All");
  const selectedBuoy = buoyData.find((b) => b.id === selectedBuoyId) || buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  const filteredReefs = reefFilter === "All" ? coralReefs : coralReefs.filter((r) => r.status === reefFilter);

  const statusColors = {
    Healthy: "text-emerald-500 bg-emerald-50",
    Warning: "text-amber-500 bg-amber-50",
    Critical: "text-red-500 bg-red-50",
  };

  const coralStats = [
    { label: "Total Reefs", value: "5", icon: Waves },
    { label: "Healthy", value: "3", icon: Shield },
    { label: "Warning", value: "1", icon: AlertTriangle },
    { label: "Critical", value: "1", icon: AlertTriangle },
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
        <h1 className="text-2xl font-bold text-text-primary">Coral Reef</h1>
        <p className="text-sm text-text-muted mt-1">
          Coral reef health monitoring and assessment
        </p>
      </div>

      {/* Coral Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {coralStats.map((s, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-primary-500" />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-text-primary">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Coral Health + Marine Health Row */}
      <WidgetGrid columns={2}>
        <CoralHealthIndexWidget
          index={ai?.marineHealthIndex ?? 85}
          confidence={ai?.confidence ?? 94}
        />
        <MarineHealthWidget
          health={ai?.marineHealthIndex ?? 85}
          confidence={ai?.confidence ?? 94}
        />
      </WidgetGrid>

      {/* Temperature + pH Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <PHWidget />
      </WidgetGrid>

      {/* Dissolved Oxygen + Salinity Row */}
      <WidgetGrid columns={2}>
        <DissolvedOxygenWidget />
        <SalinityWidget />
      </WidgetGrid>

      {/* Pollution Risk + AI Assessment Row */}
      <WidgetGrid columns={2}>
        <PollutionRiskWidget
          risk={ai?.pollutionRisk?.risk ?? "Low"}
          confidence={ai?.pollutionRisk?.confidence ?? 95}
        />
        <AICoralAssessmentWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Coral reef conditions are stable. No significant threats detected."}
        />
      </WidgetGrid>

      {/* Reef Monitoring Table */}
      <Card className="bg-surface rounded-lg border border-border/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Waves size={14} className="text-primary-500" />
            Reef Monitoring Data
          </CardTitle>
          <div className="flex gap-1">
            {["All", "Healthy", "Warning", "Critical"].map((f) => (
              <button
                key={f}
                onClick={() => setReefFilter(f)}
                className={cn(
                  "text-[10px] px-2 py-1 rounded-md transition-colors",
                  reefFilter === f
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
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Reef</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Location</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Health</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Bleaching</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Biodiversity</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Temp</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReefs.map((reef) => (
                  <tr key={reef.id} className="border-b border-border/10 hover:bg-surface-muted/30 transition-colors">
                    <td className="px-3 py-2 text-text-primary font-medium">{reef.name}</td>
                    <td className="px-3 py-2 text-text-secondary">{reef.location}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "font-medium",
                        reef.health >= 85 ? "text-emerald-500" : reef.health >= 70 ? "text-amber-500" : "text-red-500"
                      )}>{reef.health}</span>
                    </td>
                    <td className="px-3 py-2 text-text-secondary">{reef.bleaching}</td>
                    <td className="px-3 py-2 text-text-secondary">{reef.biodiversity}</td>
                    <td className="px-3 py-2 text-text-secondary">{reef.temperature}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        statusColors[reef.status] || "bg-sky-50 text-sky-700"
                      )}>{reef.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reef Detail Cards */}
      <WidgetGrid columns={2}>
        {coralReefs.slice(0, 4).map((reef) => (
          <Card key={reef.id} className="bg-surface rounded-lg border border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Waves size={14} className="text-primary-500" />
                {reef.name}
              </h3>
              <span className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded",
                statusColors[reef.status] || "bg-sky-50 text-sky-700"
              )}>{reef.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <MapPin size={12} /> {reef.location}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Thermometer size={12} /> {reef.temperature}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Droplets size={12} /> pH {reef.ph}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Droplets size={12} /> DO {reef.do}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Shield size={12} /> Health: {reef.health}%
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Clock size={12} /> {reef.lastMonitoring}
              </div>
            </div>
          </Card>
        ))}
      </WidgetGrid>
    </motion.div>
  );
}
