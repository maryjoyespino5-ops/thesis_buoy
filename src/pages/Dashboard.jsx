// path: src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
import { HistoryChart } from "../components/charts/HistoryChart";
import {
  buoyData,
  stats,
  heroStats,
  sensorData,
  alerts,
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
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Download,
  Calendar,
  BarChart3,
  Users,
  Shield,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [buoys, setBuoys] = useState([]);
  const [selectedBuoy, setSelectedBuoy] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    setBuoys(buoyData);
  }, []);

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In real app, would refetch data
  };

  const criticalAlerts = alerts.filter(
    (a) => a.priority === "Critical" && !a.acknowledged,
  );
  const healthyCount = buoys.filter((b) => b.status === "green").length;

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
              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                <Sparkles size={16} className="text-primary-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                  Good {new Date().getHours() < 12 ? "morning" : "afternoon"},{" "}
                  {user?.name?.split(" ")[0] || "John"}
                </h1>
                <p className="text-[11px] text-text-muted">
                  Health{" "}
                  <span className="font-semibold text-emerald-600">96%</span> ·
                  {healthyCount} buoys online ·{criticalAlerts.length} critical
                  alerts
                </p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-sm px-2.5"
                onClick={handleRefresh}>
                <RefreshCw size={11} /> Refresh
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-sm px-2.5"
                onClick={() => navigate("/ai")}>
                <Sparkles size={11} /> Analyze
              </Button>
            </div>
          </div>

          {/* Compact Hero Stats */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {heroStats.map((s, i) => (
              <div
                key={i}
                className="bg-surface-muted/30 rounded-md px-2.5 py-1.5 text-center">
                <div className="text-sm font-bold text-text-primary leading-tight">
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

      {/* Compact Stats Grid - 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {stats.slice(0, 4).map((s, i) => (
          <MetricCard
            key={i}
            value={s.value}
            label={s.label}
            trend={s.trend}
            up={s.up}
            className="p-2.5"
          />
        ))}
      </div>

      {/* Quick Actions - 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          {
            icon: Sparkles,
            label: "AI Command",
            desc: "3 insights",
            path: "/ai",
            color: "primary",
          },
          {
            icon: Activity,
            label: "Fish Activity",
            desc: "87% active",
            path: "/fish",
            color: "emerald",
          },
          {
            icon: Eye,
            label: "Sanctuary",
            desc: "No threats",
            path: "/sanctuary",
            color: "teal",
          },
          {
            icon: Bell,
            label: "Alerts",
            desc: `${criticalAlerts.length} critical`,
            path: "/alerts",
            color: "red",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="cursor-pointer hover:shadow-sm transition-all group"
            onClick={() => navigate(item.path)}>
            <CardContent className="p-2.5 flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-md bg-${item.color}-50 flex items-center justify-center group-hover:bg-${item.color}-100 transition-colors flex-shrink-0`}>
                <item.icon size={14} className={`text-${item.color}-500`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-text-primary leading-tight">
                  {item.label}
                </p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
              <ArrowRight
                size={11}
                className="text-text-muted group-hover:text-primary-500 transition-colors flex-shrink-0"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <TemperatureChart className="p-3" />
        </div>
        <div className="lg:col-span-1">
          <DOChart className="p-3" />
        </div>
      </div>

      {/* Sensor Contribution & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Sensor AI Contribution</CardTitle>
              <Badge variant="info" size="sm">
                {sensorData.length} sensors
              </Badge>
            </CardHeader>
            <CardContent className="px-3.5 pb-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-40">
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
                    className="p-0 border-0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {sensorData.slice(0, 6).map((s, i) => (
                    <div
                      key={i}
                      className="bg-surface-muted/30 rounded-md p-2 text-center">
                      <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        {s.label}
                      </div>
                      <div className="text-sm font-bold text-text-primary leading-tight">
                        {s.value}
                      </div>
                      <div className="text-xs text-text-muted">
                        AI {s.contrib}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="px-3.5 py-2.5">
              <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="px-3.5 pb-3.5 space-y-2">
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-xs text-text-muted">Total Users</span>
                <span className="text-sm font-bold text-text-primary">24</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-xs text-text-muted">
                  Active Sessions
                </span>
                <span className="text-sm font-bold text-text-primary">8</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-xs text-text-muted">Data Points</span>
                <span className="text-sm font-bold text-text-primary">
                  12.4K
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-xs text-text-muted">Uptime</span>
                <span className="text-sm font-bold text-emerald-600">
                  99.8%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Buoy Status - Compact */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-1.5">
            <Activity size={14} className="text-primary-500" />
            Buoy Status
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm">
              {healthyCount} online
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-sm px-2"
              onClick={() => navigate("/buoys")}>
              View All <ArrowRight size={10} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
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

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
              <Clock size={13} className="text-text-muted" />
              Recent Activity
            </CardTitle>
            <span className="text-xs text-text-muted">Last 24h</span>
          </CardHeader>
          <CardContent className="px-3.5 pb-3.5">
            <div className="space-y-1.5">
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
                  className="flex items-center gap-2 py-1.5 border-b border-border/30 last:border-0">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full flex-shrink-0",
                      a.type === "critical"
                        ? "bg-red-500"
                        : a.type === "warning"
                          ? "bg-amber-500"
                          : "bg-emerald-500",
                    )}
                  />
                  <span className="text-xs text-text-muted w-12 flex-shrink-0">
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

        {/* Quick Alerts */}
        <Card>
          <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
              <Bell size={13} className="text-amber-500" />
              Quick Alerts
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-sm px-2"
              onClick={() => navigate("/alerts")}>
              View All <ArrowRight size={10} />
            </Button>
          </CardHeader>
          <CardContent className="px-3.5 pb-3.5">
            {criticalAlerts.length > 0 ? (
              <div className="space-y-1.5">
                {criticalAlerts.slice(0, 3).map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-1.5 border-b border-border/30 last:border-0">
                    <AlertTriangle
                      size={12}
                      className="text-red-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-text-primary truncate leading-tight">
                        {a.buoy}
                      </p>
                      <p className="text-xs text-text-muted truncate">
                        {a.desc}
                      </p>
                    </div>
                    <Badge variant="danger" size="sm">
                      {a.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle
                  size={20}
                  className="text-emerald-500 mx-auto mb-1"
                />
                <p className="text-[11px] text-text-muted">
                  No critical alerts
                </p>
                <p className="text-xs text-text-muted">
                  All systems operational
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between text-xs text-text-muted pt-1">
        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <Shield size={8} className="text-emerald-500" />
            System: Operational
          </span>
          <span className="flex items-center gap-0.5">
            <Wifi size={8} className="text-emerald-500" />
            {healthyCount}/{buoys.length} connected
          </span>
        </div>
      </div>
    </motion.div>
  );
}
