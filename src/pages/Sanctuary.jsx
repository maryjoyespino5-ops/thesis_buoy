// path: src/pages/Sanctuary.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MetricCard } from "../components/ui/MetricCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SearchInput } from "../components/ui/SearchInput";
import {
  Mic,
  Volume2,
  Shield,
  Navigation,
  Sparkles,
  Waves,
  Radio,
  Ship,
  AlertTriangle,
  CheckCircle,
  Activity,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  Ear,
  Bell,
  Zap,
  Target,
  Eye,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Sanctuary() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const alerts = [
    {
      time: "14:20",
      event: "No unusual noise detected",
      status: "Normal",
      priority: "Low",
    },
    {
      time: "13:45",
      event: "Engine noise detected (low confidence)",
      status: "Info",
      priority: "Medium",
    },
    {
      time: "12:10",
      event: "Acoustic activity spike",
      status: "Resolved",
      priority: "High",
    },
    {
      time: "11:30",
      event: "Vessel detected at perimeter",
      status: "Warning",
      priority: "High",
    },
    {
      time: "10:15",
      event: "Whale song detected",
      status: "Info",
      priority: "Low",
    },
  ];

  const filteredAlerts = alerts.filter((a) => {
    const matchSearch = a.event.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: alerts.length,
    normal: alerts.filter((a) => a.status === "Normal").length,
    info: alerts.filter((a) => a.status === "Info").length,
    warning: alerts.filter((a) => a.status === "Warning").length,
    resolved: alerts.filter((a) => a.status === "Resolved").length,
  };

  const audioData = [
    20, 35, 15, 45, 25, 18, 30, 12, 40, 22, 28, 15, 35, 20, 42, 18,
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
          <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
            <Mic size={17} className="text-teal-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              Sanctuary Intelligence
            </h1>
            <p className="text-xs text-text-muted">
              {stats.normal} normal · {stats.info} info · {stats.warning}{" "}
              warnings
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">
            <Waves size={11} /> Sonar
          </Button>
          <Button variant="primary" size="sm" className="h-7 text-xs px-2.5">
            <Sparkles size={11} /> Analyze
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
            Total
          </div>
        </div>
        <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/30 p-2 text-center">
          <div className="text-base font-bold text-emerald-600">
            {stats.normal}
          </div>
          <div className="text-[7px] text-emerald-500 uppercase tracking-wide">
            Normal
          </div>
        </div>
        <div className="bg-sky-50/50 rounded-lg border border-sky-200/30 p-2 text-center">
          <div className="text-base font-bold text-sky-600">{stats.info}</div>
          <div className="text-[7px] text-sky-500 uppercase tracking-wide">
            Info
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
            {stats.resolved}
          </div>
          <div className="text-[7px] text-red-500 uppercase tracking-wide">
            Resolved
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <MetricCard
          value="Normal"
          label="Acoustic Activity"
          trend="Clear"
          up
          className="p-2.5"
        />
        <MetricCard
          value="None"
          label="Engine Noise"
          trend="Safe"
          up
          className="p-2.5"
        />
        <MetricCard
          value="2.4 km"
          label="Vessel Distance"
          trend="Stable"
          up
          className="p-2.5"
        />
        <MetricCard
          value="Low"
          label="Unauthorized Risk"
          trend="Minimal"
          up
          className="p-2.5"
        />
      </div>

      {/* Acoustic Timeline */}
      <Card>
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <Volume2 size={13} className="text-primary-500" />
            Acoustic Timeline
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm">
              Live
            </Badge>
            <span className="text-xs text-text-muted">Last hour</span>
          </div>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="h-20 bg-surface-muted/30 rounded-md p-2 flex items-end gap-1">
            {audioData.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
                className={cn(
                  "rounded-sm transition-all",
                  h > 35
                    ? "bg-amber-500"
                    : h > 25
                      ? "bg-emerald-500"
                      : "bg-emerald-400/60",
                )}
                style={{ width: "calc(100% / 16 - 2px)" }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[7px] text-text-muted">
            {["14:00", "14:15", "14:30", "14:45", "15:00"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="mt-2 p-1.5 bg-emerald-50/50 rounded-md border border-emerald-200/30">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={11} className="text-emerald-500" />
              <span className="text-sm text-text-secondary">
                AI: No unusual acoustic signatures detected in the last 2 hours.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchInput
          placeholder="Search alerts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-1">
          {["All", "Normal", "Info", "Warning", "Resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-all",
                filter === f
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
              )}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sanctuary Alerts */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2.5 flex items-center gap-1.5">
          <Bell size={14} className="text-amber-500" />
          Sanctuary Alerts
        </h2>
        <div className="space-y-2">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Bell
                  size={24}
                  className="text-text-muted mx-auto mb-1 opacity-30"
                />
                <div className="text-xs text-text-muted">No alerts found</div>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-sm transition-all">
                  <CardContent className="p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full flex-shrink-0",
                            a.status === "Normal"
                              ? "bg-emerald-500"
                              : a.status === "Info"
                                ? "bg-sky-500"
                                : a.status === "Warning"
                                  ? "bg-amber-500"
                                  : "bg-red-500",
                          )}
                        />
                        <div>
                          <span className="text-xs text-text-primary">
                            {a.event}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <Clock size={8} /> {a.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Badge
                          variant={
                            a.status === "Normal"
                              ? "success"
                              : a.status === "Info"
                                ? "info"
                                : a.status === "Warning"
                                  ? "warning"
                                  : "danger"
                          }
                          size="sm"
                          className="text-xs">
                          {a.status}
                        </Badge>
                        <Badge
                          variant={
                            a.priority === "High"
                              ? "danger"
                              : a.priority === "Medium"
                                ? "warning"
                                : "default"
                          }
                          size="sm"
                          className="text-xs">
                          {a.priority}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2">
                          <Eye size={10} /> Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-surface-muted/30 rounded-md p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <Radio size={12} className="text-primary-500" />
            <span className="text-xs font-medium text-text-primary">
              Acoustic
            </span>
          </div>
          <div className="text-xs text-text-muted mt-0.5">Normal</div>
        </div>
        <div className="bg-surface-muted/30 rounded-md p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <Ship size={12} className="text-amber-500" />
            <span className="text-xs font-medium text-text-primary">
              Vessel
            </span>
          </div>
          <div className="text-xs text-text-muted mt-0.5">No threats</div>
        </div>
        <div className="bg-surface-muted/30 rounded-md p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <Ear size={12} className="text-emerald-500" />
            <span className="text-xs font-medium text-text-primary">
              Hydrophone
            </span>
          </div>
          <div className="text-xs text-text-muted mt-0.5">Operational</div>
        </div>
        <div className="bg-surface-muted/30 rounded-md p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <Activity size={12} className="text-primary-500" />
            <span className="text-xs font-medium text-text-primary">
              Coverage
            </span>
          </div>
          <div className="text-xs text-text-muted mt-0.5">92%</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-text-muted pt-1">
        <span>Last updated: Today, 14:23</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <CheckCircle size={8} className="text-emerald-500" />
            System: Operational
          </span>
          <span className="flex items-center gap-0.5">
            <MapPin size={8} className="text-primary-500" />2 active zones
          </span>
        </div>
      </div>
    </motion.div>
  );
}
