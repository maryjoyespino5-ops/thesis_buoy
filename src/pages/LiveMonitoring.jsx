// path: src/pages/LiveMonitoring.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BuoyCard } from "../components/ui/BuoyCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SearchInput } from "../components/ui/SearchInput";
import { MetricCard } from "../components/ui/MetricCard";
import { buoyData } from "../api/sampleData";
import {
  Satellite,
  Activity,
  Wifi,
  Signal,
  Radio,
  RefreshCw,
  Bell,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Filter,
  Clock,
  Zap,
  Cpu,
  TrendingUp,
  BarChart3,
  Eye,
  MapPin,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function LiveMonitoring() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [buoys, setBuoys] = useState(buoyData);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Randomly update a buoy's status for demo
      const randomIndex = Math.floor(Math.random() * buoys.length);
      const updatedBuoys = [...buoys];
      const statuses = ["green", "yellow", "red"];
      const currentStatus = updatedBuoys[randomIndex].status;
      let newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      while (newStatus === currentStatus) {
        newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      }
      updatedBuoys[randomIndex] = {
        ...updatedBuoys[randomIndex],
        status: newStatus,
      };
      setBuoys(updatedBuoys);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLastUpdate(new Date());
    setIsLive(false);
    setTimeout(() => setIsLive(true), 500);
  };

  const filteredBuoys = buoys.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || b.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const stats = {
    total: buoys.length,
    online: buoys.filter((b) => b.status === "green").length,
    warning: buoys.filter((b) => b.status === "yellow").length,
    critical: buoys.filter((b) => b.status === "red").length,
    uptime: 99.8,
    dataPoints: 12400,
  };

  const recentActivities = [
    {
      time: "14:32",
      buoy: "Buoy 04",
      event: "Data sync completed",
      status: "success",
    },
    {
      time: "14:28",
      buoy: "Buoy 02",
      event: "Battery level 67%",
      status: "warning",
    },
    {
      time: "14:15",
      buoy: "Buoy 01",
      event: "Temperature reading 28.6°C",
      status: "info",
    },
    {
      time: "14:02",
      buoy: "Buoy 03",
      event: "DO dropped to 5.9 mg/L",
      status: "critical",
    },
    {
      time: "13:45",
      buoy: "Buoy 05",
      event: "Calibration completed",
      status: "success",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
            <Satellite size={17} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary tracking-tight">
              Live Monitoring
            </h1>
            <p className="text-[10px] text-text-muted">
              {stats.online} online · {stats.warning} warning · {stats.critical}{" "}
              critical
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors",
                isLive ? "bg-emerald-500 animate-pulse" : "bg-gray-400",
              )}
            />
            <span className="text-[9px] font-medium text-text-muted">
              {isLive ? "LIVE" : "Paused"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[9px] px-2.5"
            onClick={handleRefresh}>
            <RefreshCw size={11} className={cn(!isLive && "animate-spin")} />
          </Button>
          <Button variant="primary" size="sm" className="h-7 text-[9px] px-2.5">
            <Zap size={11} /> Connect All
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <div className="bg-surface rounded-lg border border-border/50 p-2 text-center">
          <div className="text-base font-bold text-text-primary">
            {stats.total}
          </div>
          <div className="text-[7px] text-text-muted uppercase tracking-wide">
            Total Buoys
          </div>
        </div>
        <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/30 p-2 text-center">
          <div className="text-base font-bold text-emerald-600">
            {stats.online}
          </div>
          <div className="text-[7px] text-emerald-500 uppercase tracking-wide">
            Online
          </div>
        </div>
        <div className="bg-amber-50/50 rounded-lg border border-amber-200/30 p-2 text-center">
          <div className="text-base font-bold text-amber-600">
            {stats.warning}
          </div>
          <div className="text-[7px] text-amber-500 uppercase tracking-wide">
            Warning
          </div>
        </div>
        <div className="bg-red-50/50 rounded-lg border border-red-200/30 p-2 text-center">
          <div className="text-base font-bold text-red-600">
            {stats.critical}
          </div>
          <div className="text-[7px] text-red-500 uppercase tracking-wide">
            Critical
          </div>
        </div>
        <div className="bg-sky-50/50 rounded-lg border border-sky-200/30 p-2 text-center">
          <div className="text-base font-bold text-sky-600">
            {stats.uptime}%
          </div>
          <div className="text-[7px] text-sky-500 uppercase tracking-wide">
            Uptime
          </div>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <MetricCard
          value="12.4K"
          label="Data Points"
          trend="+234"
          up
          className="p-2.5"
        />
        <MetricCard
          value="28.6°C"
          label="Avg Temp"
          trend="+0.8"
          up
          className="p-2.5"
        />
        <MetricCard
          value="6.4 mg/L"
          label="DO Level"
          trend="Stable"
          up
          className="p-2.5"
        />
        <MetricCard
          value="87%"
          label="Fish Activity"
          trend="High"
          up
          className="p-2.5"
        />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchInput
          placeholder="Search buoys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-1">
          {["All", "Online", "Warning", "Critical"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[9px] font-medium transition-all",
                filter === f
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
              )}>
              {f}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-[9px] px-2.5 sm:ml-auto">
          <Filter size={11} /> More
        </Button>
      </div>

      {/* Buoy Grid */}
      {filteredBuoys.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Satellite
              size={32}
              className="text-text-muted mx-auto mb-2 opacity-30"
            />
            <div className="text-sm text-text-muted">No buoys found</div>
            <p className="text-sm text-text-muted mt-1">
              Try adjusting your search or filter
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {filteredBuoys.map((buoy, index) => (
            <motion.div
              key={buoy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}>
              <BuoyCard
                buoy={buoy}
                onView={(b) => {}}
                onFish={(b) => navigate("/fish")}
                compact
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Recent Activity & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
              <Activity size={13} className="text-primary-500" />
              Recent Activity
            </CardTitle>
            <span className="text-[8px] text-text-muted">
              Last {recentActivities.length} events
            </span>
          </CardHeader>
          <CardContent className="px-3.5 pb-3.5">
            <div className="space-y-1.5">
              {recentActivities.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1.5 border-b border-border/30 last:border-0">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full flex-shrink-0",
                      a.status === "success"
                        ? "bg-emerald-500"
                        : a.status === "warning"
                          ? "bg-amber-500"
                          : a.status === "critical"
                            ? "bg-red-500"
                            : "bg-sky-500",
                    )}
                  />
                  <span className="text-[8px] text-text-muted w-12 flex-shrink-0">
                    {a.time}
                  </span>
                  <span className="text-[9px] font-medium text-text-primary w-14 flex-shrink-0">
                    {a.buoy}
                  </span>
                  <span className="text-[9px] text-text-secondary flex-1 truncate">
                    {a.event}
                  </span>
                  <Badge
                    variant={
                      a.status === "success"
                        ? "success"
                        : a.status === "warning"
                          ? "warning"
                          : a.status === "critical"
                            ? "danger"
                            : "info"
                    }
                    size="sm"
                    className="text-[7px]">
                    {a.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
              <Cpu size={13} className="text-primary-500" />
              System Status
            </CardTitle>
            <Badge variant="success" size="sm">
              All Systems Go
            </Badge>
          </CardHeader>
          <CardContent className="px-3.5 pb-3.5">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-[9px] text-text-muted flex items-center gap-1.5">
                  <Wifi size={10} className="text-emerald-500" />
                  Network Connection
                </span>
                <span className="text-[9px] font-medium text-emerald-600">
                  Stable
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-[9px] text-text-muted flex items-center gap-1.5">
                  <Signal size={10} className="text-emerald-500" />
                  Data Sync
                </span>
                <span className="text-[9px] font-medium text-emerald-600">
                  99.8%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-[9px] text-text-muted flex items-center gap-1.5">
                  <Radio size={10} className="text-amber-500" />
                  Sensor Health
                </span>
                <span className="text-[9px] font-medium text-amber-600">
                  3 warnings
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <span className="text-[9px] text-text-muted flex items-center gap-1.5">
                  <Clock size={10} className="text-primary-500" />
                  Last Update
                </span>
                <span className="text-[9px] font-medium text-text-primary">
                  {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[8px] text-text-muted pt-1">
        <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <CheckCircle size={8} className="text-emerald-500" />
            {stats.online}/{stats.total} connected
          </span>
          <span className="flex items-center gap-0.5">
            <BarChart3 size={8} className="text-primary-500" />
            {stats.dataPoints.toLocaleString()} data points
          </span>
          <span className="flex items-center gap-0.5">
            <Eye size={8} className="text-text-muted" />
            Live View
          </span>
        </div>
      </div>
    </motion.div>
  );
}
