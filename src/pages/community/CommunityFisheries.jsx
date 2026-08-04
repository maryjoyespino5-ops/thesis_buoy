// path: src/pages/community/CommunityFisheries.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { FishProbabilityWidget } from "../../components/widgets/core/FishProbabilityWidget";
import { FishDensityWidget } from "../../components/widgets/core/FishDensityWidget";
import { FishHabitatScoreWidget } from "../../components/widgets/core/FishHabitatScoreWidget";
import { BestFishingTimeWidget } from "../../components/widgets/core/BestFishingTimeWidget";
import { WindWidget } from "../../components/widgets/core/WindWidget";
import { InteractiveMapWidget } from "../../components/widgets/core/InteractiveMapWidget";
import { AIFishingAnalysisWidget } from "../../components/widgets/core/AIFishingAnalysisWidget";
import { FishPopulationTrendsWidget } from "../../components/widgets/core/FishPopulationTrendsWidget";
import { HistoricalFishActivityWidget } from "../../components/widgets/core/HistoricalFishActivityWidget";
import { SonarWidget } from "../../components/widgets/core/SonarWidget";
import { buoyData, tempSalData, doPhData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { Fish, MapPin, Clock, Droplets, Thermometer, Activity, TrendingUp, Anchor } from "lucide-react";
import { cn } from "../../lib/utils";

const communityBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}));

// Realistic fish catch report data
const fishCatchReports = [
  { id: 1, zone: "Northwest", species: "Tilapia", weight: "2.4 kg", count: 15, method: "Net", date: "2026-08-03", status: "Active" },
  { id: 2, zone: "Northwest", species: "Milkfish", weight: "1.8 kg", count: 8, method: "Line", date: "2026-08-03", status: "Active" },
  { id: 3, zone: "Central", species: "Mackerel", weight: "3.1 kg", count: 12, method: "Net", date: "2026-08-02", status: "Active" },
  { id: 4, zone: "Central", species: "Tilapia", weight: "1.5 kg", count: 20, method: "Line", date: "2026-08-02", status: "Active" },
  { id: 5, zone: "South", species: "Bangus", weight: "2.0 kg", count: 10, method: "Net", date: "2026-08-01", status: "Completed" },
  { id: 6, zone: "South", species: "Sardines", weight: "0.9 kg", count: 35, method: "Line", date: "2026-08-01", status: "Completed" },
  { id: 7, zone: "East", species: "Tilapia", weight: "1.2 kg", count: 18, method: "Net", date: "2026-07-31", status: "Completed" },
  { id: 8, zone: "East", species: "Mackerel", weight: "2.7 kg", count: 9, method: "Line", date: "2026-07-31", status: "Completed" },
];

// Fishery statistics
const fisheryStats = [
  { label: "Total Catch Today", value: "127 kg", trend: "+12%", up: true, icon: Anchor },
  { label: "Active Zones", value: "4", trend: "+1", up: true, icon: MapPin },
  { label: "Avg Catch per Trip", value: "15.9 kg", trend: "+3.2", up: true, icon: TrendingUp },
  { label: "Species Count", value: "6", trend: "+2", up: true, icon: Fish },
];

export function CommunityFisheries() {
  const [buoys, setBuoys] = useState([]);
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [selectedZone, setSelectedZone] = useState(1);
  const [catchFilter, setCatchFilter] = useState("All");

  useEffect(() => {
    setBuoys(buoyData);
  }, []);

  const selectedBuoy = buoys.find((b) => b.id === selectedBuoyId) || buoys[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  const filteredCatches = catchFilter === "All" ? fishCatchReports : fishCatchReports.filter((c) => c.zone === catchFilter);

  const zones = ["All", "Northwest", "Central", "South", "East"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fisheries</h1>
          <p className="text-sm text-text-muted mt-1">
            Fishing conditions, fish probability, and AI recommendations
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Fish size={16} />
          <span>{selectedBuoy?.name || "Buoy"}</span>
        </div>
      </div>

      {/* Fishery Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {fisheryStats.map((s, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-primary-500" />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-text-primary">{s.value}</span>
              <span className={cn("text-xs font-medium", s.up ? "text-emerald-500" : "text-red-500")}>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fish Probability + Fish Density Row */}
      <WidgetGrid columns={2}>
        <FishProbabilityWidget
          probability={ai?.fishProbability ?? 70}
          confidence={ai?.confidence ?? 94}
        />
        <FishDensityWidget />
      </WidgetGrid>

      {/* Fish Habitat + Best Fishing Time Row */}
      <WidgetGrid columns={2}>
        <FishHabitatScoreWidget
          score={ai?.fishHabitatScore ?? 75}
          confidence={ai?.confidence ?? 94}
        />
        <BestFishingTimeWidget />
      </WidgetGrid>

      {/* Fish Population Trends + Historical Activity Row */}
      <WidgetGrid columns={2}>
        <FishPopulationTrendsWidget />
        <HistoricalFishActivityWidget />
      </WidgetGrid>

      {/* Weather + Wind Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay
          lat={selectedBuoy?.lat || 14.62}
          lon={selectedBuoy?.lon || 120.97}
        />
        <WindWidget />
      </WidgetGrid>

      {/* Sonar + AI Analysis Row */}
      <WidgetGrid columns={2}>
        <SonarWidget />
        <AIFishingAnalysisWidget
          confidence={ai?.confidence ?? 91}
          summary={ai?.dailySummary ?? "High fish activity detected in the Northwest zone. Water conditions are favorable."}
        />
      </WidgetGrid>

      {/* Fish Catch Report Table */}
      <Card className="bg-surface rounded-lg border border-border/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Activity size={14} className="text-primary-500" />
            Fish Catch Reports
          </CardTitle>
          <div className="flex gap-1">
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => setCatchFilter(z)}
                className={cn(
                  "text-[10px] px-2 py-1 rounded-md transition-colors",
                  catchFilter === z
                    ? "bg-primary-500 text-white"
                    : "bg-surface-muted/50 text-text-muted hover:text-text-primary"
                )}
              >
                {z}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Zone</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Species</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Weight</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Count</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Method</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Date</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCatches.map((report) => (
                  <tr key={report.id} className="border-b border-border/10 hover:bg-surface-muted/30 transition-colors">
                    <td className="px-3 py-2 text-text-primary">{report.zone}</td>
                    <td className="px-3 py-2 text-text-secondary">{report.species}</td>
                    <td className="px-3 py-2 text-text-secondary">{report.weight}</td>
                    <td className="px-3 py-2 text-text-secondary">{report.count}</td>
                    <td className="px-3 py-2 text-text-secondary">{report.method}</td>
                    <td className="px-3 py-2 text-text-muted">{report.date}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        report.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-sky-50 text-sky-700"
                      )}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <WidgetGrid columns={1}>
        <InteractiveMapWidget
          zones={communityBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>
    </motion.div>
  );
}
