// path: src/pages/community/CommunityDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { WaterQualityStatusWidget } from "../../components/widgets/core/WaterQualityStatusWidget";
import { BeachSafetyWidget } from "../../components/widgets/core/BeachSafetyWidget";
import { MarineNewsWidget } from "../../components/widgets/core/MarineNewsWidget";
import { PublicAdvisoriesWidget } from "../../components/widgets/core/PublicAdvisoriesWidget";
import { AIEnvironmentalSummaryWidget } from "../../components/widgets/core/AIEnvironmentalSummaryWidget";
import { InteractiveMapWidget } from "../../components/widgets/core/InteractiveMapWidget";
import { MetricCard } from "../../components/ui/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { buoyData, alerts } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import {
  Users,
  Wifi,
  AlertTriangle,
  Bell,
  Anchor,
} from "lucide-react";
import { cn } from "../../lib/utils";

const communityBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}));

export function CommunityDashboard() {
  const [buoys, setBuoys] = useState([]);
  const [alertFilter, setAlertFilter] = useState("All");
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [selectedZone, setSelectedZone] = useState(1);

  useEffect(() => {
    setBuoys(buoyData);
  }, []);

  const filteredAlerts =
    alertFilter === "All"
      ? alerts
      : alerts.filter((a) => a.priority === alertFilter);

  const selectedBuoy = buoys.find((b) => b.id === selectedBuoyId) || buoys[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  const communityStats = [
    { icon: Users, value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: Wifi, value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: AlertTriangle,
      value: String(ai?.riskLevels?.filter((r) => r.level === "High").length || 2),
      label: "Alerts",
      trend: "+1",
      up: false,
    },
    { icon: Anchor, value: "8", label: "Posts", trend: "+2", up: true },
  ];

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
          <h1 className="text-2xl font-bold text-text-primary">
            Community Dashboard
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Overview of marine conditions and community activity
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {communityStats.map((s, i) => (
          <MetricCard
            key={i}
            value={s.value}
            label={s.label}
            trend={s.trend}
            up={s.up}
            className="p-3"
          />
        ))}
      </div>

      {/* AI Summary + Weather Row */}
      <WidgetGrid columns={2}>
        <AIEnvironmentalSummaryWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Overall environmental conditions are good. Water quality is safe for all beach activities."}
        />
        <WeatherDisplay
          lat={selectedBuoy?.lat || 14.62}
          lon={selectedBuoy?.lon || 120.97}
        />
      </WidgetGrid>

      {/* Beach Safety + Marine News Row */}
      <WidgetGrid columns={2}>
        <BeachSafetyWidget
          safety={ai?.pollutionRisk?.risk === "High" ? "Caution" : "Safe"}
          description={
            ai?.pollutionRisk?.risk === "High"
              ? "Pollution risk detected. Exercise caution."
              : "Conditions are safe for beach activities."
          }
        />
        <MarineNewsWidget />
      </WidgetGrid>

      {/* Public Advisories + AI Summary Row */}
      <WidgetGrid columns={2}>
        <PublicAdvisoriesWidget />
        <AIEnvironmentalSummaryWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Overall environmental conditions are good. Water quality is safe for all beach activities."}
        />
      </WidgetGrid>

      {/* Interactive Map Row */}
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
