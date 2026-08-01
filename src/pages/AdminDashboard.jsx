// path: src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import { MetricCard } from "../components/ui/MetricCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { BuoyCard } from "../components/ui/BuoyCard";
import { TemperatureChart } from "../components/charts/TemperatureChart";
import { DOChart } from "../components/charts/DOChart";
import { RadarChartWidget } from "../components/charts/RadarChart";
import {
  buoyData,
  stats,
  heroStats,
  sensorData,
  alerts,
  maintenanceData,
} from "../api/sampleData";
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
  Activity,
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

export default function AdminDashboard() {
  const { user } = useAuth();
  const { currentRole, hasPermission } = useRole();
  const navigate = useNavigate();
  const [buoys, setBuoys] = useState([]);
  const [selectedBuoy, setSelectedBuoy] = useState(null);
  const [alertFilter, setAlertFilter] = useState("All");

  useEffect(() => {
    setBuoys(buoyData);
  }, []);

  const filteredAlerts =
    alertFilter === "All"
      ? alerts
      : alerts.filter((a) => a.priority === alertFilter);

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
                <h1 className="text-base font-bold text-text-primary tracking-tight">
                  Good morning, {user?.name?.split(" ")[0] || "John"}
                </h1>
                <p className="text-[11px] text-text-muted">
                  {buoys.filter((b) => b.status === "green").length} healthy ·{" "}
                  {alerts.filter((a) => a.priority === "Critical").length}{" "}
                  critical alerts
                </p>
              </div>
              <div className="flex gap-1.5">
                <Badge
                  variant="primary"
                  className="bg-primary-50 text-primary-600 text-[10px]">
                  <Sparkles size={10} /> AI
                </Badge>
                <Badge
                  variant="info"
                  className="bg-sky-50 text-sky-600 text-[10px]">
                  <Shield size={10} /> Admin
                </Badge>
              </div>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-xs px-3"
                onClick={() => navigate("/alerts")}>
                <Bell size={12} /> Alerts
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-xs px-3"
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
                <div className="text-sm font-bold text-text-primary leading-tight">
                  {s.num}
                </div>
                <div className="text-[10px] text-text-muted uppercase tracking-wide">
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
                <p className="text-[11px] font-medium text-text-primary leading-tight">
                  {item.label}
                </p>
                <p className="text-[11px] text-text-muted">{item.desc}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-text-muted group-hover:text-primary-500 transition-colors flex-shrink-0"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compact Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <TemperatureChart className="p-3" />
        </div>
        <div className="lg:col-span-1">
          <DOChart className="p-3" />
        </div>
      </div>

      {/* Compact Sensor Contribution */}
      <Card>
        <CardHeader className="p-3 flex flex-row items-center justify-between">
          <CardTitle className="text-[11px] font-semibold">
            Sensor AI Contribution
          </CardTitle>
          <Badge variant="info" className="text-[10px]">
            {sensorData.length} sensors
          </Badge>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-48">
              <RadarChartWidget
                data={{
                  labels: sensorData.map((s) => s.label),
                  datasets: [
                    {
                      label: "AI Contribution %",
                      data: sensorData.map((s) => parseInt(s.contrib)),
                    },
                  ],
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {sensorData.map((s, i) => (
                <div
                  key={i}
                  className="bg-surface-muted/50 rounded-md p-2 text-center">
                  <div className="text-[9px] font-medium uppercase tracking-wider text-text-muted">
                    {s.label}
                  </div>
                  <div className="text-xs font-bold text-text-primary leading-tight">
                    {s.value}
                  </div>
                  <div className="text-[9px] text-text-muted">{s.contrib}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Buoy Status */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-semibold text-text-primary flex items-center gap-1.5">
            <Activity size={14} className="text-ocean-500" />
            Buoy Status
          </h2>
          <Badge variant="success" className="text-[10px]">
            {buoys.filter((b) => b.status === "green").length} online
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {buoys.slice(0, 5).map((buoy) => (
            <BuoyCard
              key={buoy.id}
              buoy={buoy}
              onView={(b) => setSelectedBuoy(b)}
              onFish={(b) => navigate("/fish")}
              compact
            />
          ))}
        </div>
      </div>

      {/* Compact Alerts & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Alerts */}
        <Card>
          <CardHeader className="p-3 flex flex-row items-center justify-between">
            <CardTitle className="text-[11px] font-semibold flex items-center gap-1.5">
              <Bell size={14} className="text-amber-500" />
              Recent Alerts
            </CardTitle>
            <div className="flex gap-0.5">
              {["All", "Critical", "Warning", "Info"].map((f) => (
                <button
                  key={f}
                  onClick={() => setAlertFilter(f)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-colors ${
                    alertFilter === f
                      ? "bg-primary-500 text-white"
                      : "bg-surface-muted text-text-muted hover:bg-surface-muted/80"
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-1.5">
              {filteredAlerts.slice(0, 4).map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      a.priority === "Critical"
                        ? "bg-red-500"
                        : a.priority === "Warning"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-[10px] text-text-muted w-12 flex-shrink-0">
                    {a.time}
                  </span>
                  <span className="text-[11px] text-text-secondary flex-1 truncate">
                    {a.buoy} · {a.desc}
                  </span>
                  <Badge
                    variant={
                      a.priority === "Critical"
                        ? "danger"
                        : a.priority === "Warning"
                          ? "warning"
                          : "success"
                    }
                    className="text-[9px] px-1.5">
                  {a.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Tasks */}
        <Card>
          <CardHeader className="p-3 flex flex-row items-center justify-between">
            <CardTitle className="text-[11px] font-semibold flex items-center gap-1.5">
              <Wrench size={14} className="text-teal-500" />
              Maintenance
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[10px] px-2"
              onClick={() => navigate("/maintenance")}>
              View <ChevronRight size={10} />
            </Button>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-1.5">
              {maintenanceData.slice(0, 4).map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      m.status === "Completed"
                        ? "bg-emerald-500"
                        : m.status === "Scheduled"
                          ? "bg-sky-500"
                          : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-text-primary font-medium truncate leading-tight">
                      {m.task}
                    </p>
                    <p className="text-[10px] text-text-muted">{m.buoy}</p>
                  </div>
                  <Badge
                    variant={
                      m.status === "Completed"
                        ? "success"
                        : m.status === "Scheduled"
                          ? "info"
                          : "warning"
                    }
                    className="text-[9px] px-1.5">
                  {m.status === "Completed"
                    ? "✓"
                    : m.status === "Scheduled"
                      ? "📅"
                      : "⏳"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Recent Activity */}
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-[11px] font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {[
              {
                time: "14:22",
                event: "Buoy 04 battery low (67%)",
                type: "warning",
              },
              {
                time: "13:10",
                event: "DO decreased at Buoy 02",
                type: "critical",
              },
              {
                time: "11:45",
                event: "Firmware update for Buoy 03",
                type: "info",
              },
              {
                time: "09:30",
                event: "Calibration due for Buoy 01",
                type: "info",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    a.type === "critical"
                      ? "bg-red-500"
                      : a.type === "warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                />
                <span className="text-[10px] text-text-muted w-12 flex-shrink-0">
                  {a.time}
                </span>
                <span className="text-[11px] text-text-secondary flex-1 truncate">
                  {a.event}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
