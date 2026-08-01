// path: src/pages/History.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { HistoryChart } from "../components/charts/HistoryChart";
import {
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  BarChart3,
  LineChart,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Activity,
  Droplets,
  Thermometer,
  Waves,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function History() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("6m");
  const [metric, setMetric] = useState("wqi");

  const periods = [
    { label: "3M", value: "3m" },
    { label: "6M", value: "6m" },
    { label: "1Y", value: "1y" },
    { label: "All", value: "all" },
  ];

  const metrics = [
    { label: "Water Quality", value: "wqi", icon: Droplets },
    { label: "Temperature", value: "temp", icon: Thermometer },
    { label: "DO Levels", value: "do", icon: Activity },
    { label: "Salinity", value: "sal", icon: Waves },
  ];

  const insights = [
    {
      label: "Water Quality Improvement",
      value: "+8%",
      trend: "up",
      desc: "Consistent improvement over 6 months",
      color: "emerald",
    },
    {
      label: "Temperature Stability",
      value: "±1.2°C",
      trend: "stable",
      desc: "Within normal range",
      color: "sky",
    },
    {
      label: "DO Levels",
      value: "6.4 mg/L",
      trend: "up",
      desc: "Increased by 12%",
      color: "primary",
    },
  ];

  const milestones = [
    {
      date: "Jan 2026",
      event: "Initial deployment of 5 buoys",
      type: "milestone",
    },
    { date: "Mar 2026", event: "AI model v2.0 deployed", type: "update" },
    {
      date: "May 2026",
      event: "Coverage expanded to 12 buoys",
      type: "milestone",
    },
    { date: "Jul 2026", event: "98.6% accuracy achieved", type: "achievement" },
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
            <Clock size={17} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              Historical Analytics
            </h1>
            <p className="text-sm text-text-muted">
              AI trend analysis · 6-month water quality
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-sm px-2.5">
            <Download size={11} /> Export
          </Button>
          <Button variant="primary" size="sm" className="h-7 text-sm px-2.5">
            <BarChart3 size={11} /> Full Report
          </Button>
        </div>
      </div>

      {/* Period & Metric Selectors */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-all",
                period === p.value
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
              )}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 sm:ml-auto">
          {metrics.map((m) => (
            <button
              key={m.value}
              onClick={() => setMetric(m.value)}
              className={cn(
                "px-2 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1",
                metric === m.value
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
              )}>
              <m.icon size={10} />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <LineChart size={13} className="text-primary-500" />
            {metrics.find((m) => m.value === metric)?.label ||
              "Water Quality"}{" "}
            Trend
          </CardTitle>
          <Badge
            variant={insights[0]?.trend === "up" ? "success" : "info"}
            size="sm">
            {insights[0]?.trend === "up" ? "↑ Improving" : "→ Stable"}
          </Badge>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="h-48">
            <HistoryChart
              color={
                metric === "temp"
                  ? "#f59e0b"
                  : metric === "do"
                    ? "#0ea5e9"
                    : "#10b981"
              }
              label={metrics.find((m) => m.value === metric)?.label || "Value"}
            />
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2.5 flex items-center gap-1.5">
          <TrendingUp size={14} className="text-emerald-500" />
          Key Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {insights.map((insight, i) => (
            <Card key={i}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-text-muted">
                    {insight.label}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      insight.trend === "up"
                        ? "text-emerald-600"
                        : "text-sky-600",
                    )}>
                    {insight.trend === "up" ? "↑" : "→"} {insight.value}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {insight.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
          <div className="text-xl font-bold text-emerald-600">+8%</div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Quality Improvement
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
          <div className="text-xl font-bold text-primary-500">96%</div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Current Score
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
          <div className="text-xl font-bold text-text-primary">6mo</div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Tracking Period
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
          <div className="text-xl font-bold text-sky-600">12</div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Active Buoys
          </div>
        </div>
      </div>

      {/* Milestones / Timeline */}
      <Card>
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <Calendar size={13} className="text-text-muted" />
            Milestones
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-6 text-sm px-2">
            View All <ArrowRight size={10} />
          </Button>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="space-y-1.5">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-1.5 border-b border-border/30 last:border-0">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    m.type === "milestone"
                      ? "bg-primary-500"
                      : m.type === "update"
                        ? "bg-amber-500"
                        : "bg-emerald-500",
                  )}
                />
                <span className="text-xs text-text-muted w-16 flex-shrink-0">
                  {m.date}
                </span>
                <span className="text-sm text-text-secondary flex-1">
                  {m.event}
                </span>
                <Badge
                  variant={
                    m.type === "milestone"
                      ? "primary"
                      : m.type === "update"
                        ? "warning"
                        : "success"
                  }
                  size="sm">
                  {m.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality */}
      <Card>
        <CardHeader className="px-3.5 py-2.5">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <Activity size={13} className="text-primary-500" />
            Data Quality Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-emerald-50/50 rounded-md p-2 text-center">
              <div className="text-sm font-bold text-emerald-600">99.8%</div>
              <div className="text-[7px] text-text-muted uppercase tracking-wide">
                Uptime
              </div>
            </div>
            <div className="bg-sky-50/50 rounded-md p-2 text-center">
              <div className="text-sm font-bold text-sky-600">12.4K</div>
              <div className="text-[7px] text-text-muted uppercase tracking-wide">
                Data Points
              </div>
            </div>
            <div className="bg-amber-50/50 rounded-md p-2 text-center">
              <div className="text-sm font-bold text-amber-600">98.6%</div>
              <div className="text-[7px] text-text-muted uppercase tracking-wide">
                Accuracy
              </div>
            </div>
            <div className="bg-primary-50/50 rounded-md p-2 text-center">
              <div className="text-sm font-bold text-primary-600">2.4M</div>
              <div className="text-[7px] text-text-muted uppercase tracking-wide">
                Records
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-text-muted pt-1">
        <span>Data updated: Today, 14:23</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <CheckCircle size={8} className="text-emerald-500" />
            Data quality: Excellent
          </span>
          <span className="flex items-center gap-0.5">
            <BarChart3 size={8} className="text-primary-500" />6 months tracked
          </span>
        </div>
      </div>
    </motion.div>
  );
}
