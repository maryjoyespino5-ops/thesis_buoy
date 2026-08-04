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
import { TemperatureChart } from "../../components/charts/TemperatureChart";
import { DOChart } from "../../components/charts/DOChart";
import { HistoryChart } from "../../components/charts/HistoryChart";
import { RadarChartWidget } from "../../components/charts/RadarChart";
import { buoyData, alerts, tempSalData, doPhData, historyData, radarData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import {
  Users,
  Wifi,
  AlertTriangle,
  Bell,
  Anchor,
  TrendingUp,
  Activity,
  Clock,
  MapPin,
  Droplets,
  Thermometer,
  Fish,
  Waves,
  Shield,
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

  // Recent activities derived from existing data
  const recentActivities = [
    { time: "14:22", icon: AlertTriangle, color: "text-amber-500", text: "Buoy 04 battery low (67%)" },
    { time: "13:10", icon: Droplets, color: "text-sky-500", text: "DO dropped to 5.9 mg/L at Buoy 02" },
    { time: "11:45", icon: Activity, color: "text-emerald-500", text: "Firmware update available for Buoy 03" },
    { time: "09:30", icon: Clock, color: "text-primary-500", text: "Calibration due in 3 days for Buoy 01" },
    { time: "08:15", icon: Fish, color: "text-emerald-500", text: "High fish activity detected at Buoy 02" },
    { time: "07:00", icon: Waves, color: "text-sky-500", text: "Beach safety check: North Beach clear" },
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
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Clock size={14} />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
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

      {/* Charts Row */}
      <WidgetGrid columns={2}>
        <TemperatureChart />
        <DOChart />
      </WidgetGrid>

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

      {/* Water Quality Index + Coral Health Row */}
      <WidgetGrid columns={2}>
        <WaterQualityStatusWidget
          status={ai?.waterQualityIndex >= 85 ? "Good" : "Moderate"}
          description={
            ai?.waterQualityIndex >= 85
              ? "Water quality is within safe limits."
              : "Water quality is moderate. Monitor conditions."
          }
        />
        <Card className="bg-surface rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-primary-500" />
            <h3 className="text-sm font-semibold text-text-primary">Marine Health</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-emerald-500 leading-none">
              {ai?.marineHealthIndex ?? 85}
            </span>
            <span className="text-xs font-medium text-text-muted mb-1">/ 100</span>
          </div>
          <div className="mt-2 h-2 bg-surface-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${ai?.marineHealthIndex ?? 85}%` }}
            />
          </div>
          <p className="text-xs text-text-muted mt-2">Overall marine ecosystem health score</p>
        </Card>
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

      {/* Recent Activities + Radar Chart Row */}
      <WidgetGrid columns={2}>
        <Card className="bg-surface rounded-lg border border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Activity size={14} className="text-primary-500" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <activity.icon size={14} className={cn("mt-0.5 flex-shrink-0", activity.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-text-secondary leading-relaxed">{activity.text}</p>
                    <p className="text-text-muted mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <RadarChartWidget data={radarData} />
      </WidgetGrid>

      {/* Historical Trends + Fish Activity Row */}
      <WidgetGrid columns={2}>
        <HistoryChart data={historyData} label="Water Quality" color="#10b981" />
        <Card className="bg-surface rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Fish size={16} className="text-primary-500" />
            <h3 className="text-sm font-semibold text-text-primary">Fish Activity</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-surface-muted/30 rounded-lg">
              <p className="text-lg font-bold text-emerald-500">High</p>
              <p className="text-[10px] text-text-muted">Buoy 02</p>
            </div>
            <div className="text-center p-2 bg-surface-muted/30 rounded-lg">
              <p className="text-lg font-bold text-primary-500">Moderate</p>
              <p className="text-[10px] text-text-muted">Buoy 01</p>
            </div>
            <div className="text-center p-2 bg-surface-muted/30 rounded-lg">
              <p className="text-lg font-bold text-primary-500">Moderate</p>
              <p className="text-[10px] text-text-muted">Buoy 03</p>
            </div>
            <div className="text-center p-2 bg-surface-muted/30 rounded-lg">
              <p className="text-lg font-bold text-amber-500">Low</p>
              <p className="text-[10px] text-text-muted">Buoy 04</p>
            </div>
          </div>
        </Card>
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
