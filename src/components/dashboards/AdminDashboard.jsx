// path: src/components/dashboards/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";
import { MetricCard } from "../../components/ui/MetricCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { WeatherCard } from "../../components/ui/WeatherCard";
import { BuoySelector } from "../../components/widgets/BuoySelector";
import { AISuggestionCard } from "../../components/widgets/AISuggestionCard";
import { AlertFeed } from "../../components/widgets/AlertFeed";
import { MaintenanceTracker } from "../../components/widgets/MaintenanceTracker";
import { MapWidget } from "../../components/widgets/MapWidget";
import { ForecastChart } from "../../components/widgets/ForecastChart";
import { WaterQualityCard } from "../../components/widgets/WaterQualityCard";
import { FishActivityCard } from "../../components/widgets/FishActivityCard";
import { RiskAssessmentCard } from "../../components/widgets/RiskAssessmentCard";
import { CommunityFeedCard } from "../../components/widgets/CommunityFeedCard";
import {
  buoyData,
  stats,
  heroStats,
  sensorData,
  alerts,
  maintenanceData,
} from "../../api/sampleData";
import {
  Sparkles,
  Ship,
  Wifi,
  AlertTriangle,
  Thermometer,
  Droplets,
  Zap,
  Eye,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
  Shield,
  Settings,
  Users,
  FileText,
  Wrench,
  Bell,
  Menu,
  X,
  ChevronRight,
  Check,
} from "lucide-react";

export function AdminDashboard() {
  const { user } = useAuth();
  const { currentRole, hasPermission } = useRole();
  const navigate = useNavigate();
  const [buoys, setBuoys] = useState([]);
  const [alertFilter, setAlertFilter] = useState("All");
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);

  useEffect(() => {
    setBuoys(buoyData);
  }, []);

  const filteredAlerts =
    alertFilter === "All"
      ? alerts
      : alerts.filter((a) => a.priority === alertFilter);

  const selectedBuoy = buoys.find((b) => b.id === selectedBuoyId) || buoys[0];
  const defaultLat = selectedBuoy?.lat ?? 14.62;
  const defaultLon = selectedBuoy?.lon ?? 120.97;

  const adminStats = [
    { icon: "Users", value: "6", label: "Users", trend: "+2", up: true },
    { icon: "Shield", value: "14", label: "Buoys", trend: "+2", up: true },
    { icon: "Wifi", value: "12", label: "Online", trend: "92%", up: true },
    {
      icon: "AlertTriangle",
      value: "2",
      label: "Offline",
      trend: "-1",
      up: false,
    },
    { icon: "Bell", value: "4", label: "Alerts", trend: "+1", up: false },
    {
      icon: "Wrench",
      value: "3",
      label: "Maintenance",
      trend: "+1",
      up: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4">
      {/* Compact Hero */}
      <Card className="border-l-2 border-l-primary-500 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                  Good morning, {user?.name?.split(" ")[0] || "John"}
                </h1>
                <p className="text-sm text-text-muted">
                  {buoys.filter((b) => b.status === "green").length} healthy ·{" "}
                  {alerts.filter((a) => a.priority === "Critical").length}{" "}
                  critical alerts
                </p>
              </div>
              <div className="flex gap-1.5">
                <Badge
                  variant="primary"
                  className="bg-primary-50 text-primary-600 text-xs">
                  <Sparkles size={10} /> AI
                </Badge>
                <Badge
                  variant="info"
                  className="bg-sky-50 text-sky-600 text-xs">
                  <Shield size={10} /> Admin
                </Badge>
              </div>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/alerts")}>
                <Bell size={12} /> Alerts
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/buoys")}>
                <Ship size={12} /> Buoys
              </Button>
            </div>
          </div>

          {/* Compact Hero Stats */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {heroStats.map((s, i) => (
              <div
                key={i}
                className="bg-surface-muted/50 rounded-md px-3 py-1.5 text-center">
                <div className="text-xl font-bold text-text-primary leading-tight">
                  {s.num}
                </div>
                <div className="text-xs text-text-muted uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compact Stats Grid - 6 columns */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {adminStats.map((s, i) => (
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

      {/* Compact Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            icon: Ship,
            label: "Buoy Management",
            desc: `${buoys.length} buoys`,
            path: "/buoys",
            color: "primary",
          },
          {
            icon: Bell,
            label: "Alerts",
            desc: `${alerts.length} alerts`,
            path: "/alerts",
            color: "amber",
          },
          {
            icon: Wrench,
            label: "Maintenance",
            desc: `${maintenanceData.length} tasks`,
            path: "/maintenance",
            color: "teal",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="cursor-pointer hover:shadow-sm transition-all group"
            onClick={() => navigate(item.path)}>
            <CardContent className="p-3 flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-md bg-${item.color}-50 flex items-center justify-center group-hover:bg-${item.color}-100 transition-colors`}>
                <item.icon size={16} className={`text-${item.color}-500`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary leading-tight">
                  {item.label}
                </p>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-text-muted group-hover:text-primary-500 transition-colors flex-shrink-0"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weather + Buoy Selector Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <WeatherCard
            buoyName={selectedBuoy?.name}
          />
        </div>
        <div>
          <BuoySelector
            buoys={buoys}
            selectedBuoyId={selectedBuoyId}
            onSelect={setSelectedBuoyId}
          />
        </div>
      </div>

      {/* Compact Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="p-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
                <Thermometer size={14} className="text-amber-500" />
                Temperature Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="h-48">
                <p className="text-xs text-text-muted text-center py-8">
                  TemperatureChart component placeholder
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="p-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
                <Droplets size={14} className="text-blue-500" />
                DO Levels
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="h-48">
                <p className="text-xs text-text-muted text-center py-8">
                  DOChart component placeholder
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Suggestion + Alert Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <AISuggestionCard />
        <AlertFeed
          alerts={filteredAlerts.slice(0, 4)}
          alertFilter={alertFilter}
          setAlertFilter={setAlertFilter}
        />
      </div>

      {/* Maintenance + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <MaintenanceTracker
          maintenanceData={maintenanceData.slice(0, 4)}
          onViewAll={() => navigate("/maintenance")}
        />
        <MapWidget />
      </div>

      {/* Water Quality + Fish Activity + Risk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <WaterQualityCard />
        <FishActivityCard />
        <RiskAssessmentCard />
      </div>

      {/* Community Feed */}
      <CommunityFeedCard />
    </motion.div>
  );
}
