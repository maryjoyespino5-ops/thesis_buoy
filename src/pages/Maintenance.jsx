// path: src/pages/Maintenance.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { SearchInput } from "../components/ui/SearchInput";
import { MetricCard } from "../components/ui/MetricCard";
import {
  Wrench,
  Clock,
  CheckCircle,
  Calendar,
  Filter,
  Plus,
  AlertTriangle,
  Check,
  X,
  ArrowRight,
  RefreshCw,
  Clipboard,
  Settings,
  Zap,
  Target,
  Activity,
  // Remove Tool from here - it doesn't exist in lucide-react
} from "lucide-react";
import { cn } from "../lib/utils";

const maintenanceData = [
  {
    id: 1,
    buoy: "Buoy 04",
    task: "Battery replacement",
    due: "2026-08-02",
    status: "Pending",
    priority: "High",
  },
  {
    id: 2,
    buoy: "Buoy 02",
    task: "Sensor calibration",
    due: "2026-07-30",
    status: "Scheduled",
    priority: "Medium",
  },
  {
    id: 3,
    buoy: "Buoy 01",
    task: "Firmware update",
    due: "2026-07-28",
    status: "Completed",
    priority: "Low",
  },
  {
    id: 4,
    buoy: "Buoy 03",
    task: "Propeller inspection",
    due: "2026-08-05",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 5,
    buoy: "Buoy 05",
    task: "Solar panel cleaning",
    due: "2026-08-10",
    status: "Scheduled",
    priority: "Low",
  },
];

const statusConfig = {
  Pending: { variant: "warning", icon: Clock, color: "bg-amber-500" },
  Scheduled: { variant: "info", icon: Calendar, color: "bg-sky-500" },
  Completed: { variant: "success", icon: CheckCircle, color: "bg-emerald-500" },
};

const priorityConfig = {
  High: { variant: "danger", color: "text-red-600" },
  Medium: { variant: "warning", color: "text-amber-600" },
  Low: { variant: "default", color: "text-text-muted" },
};

export default function Maintenance() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filtered = maintenanceData.filter((m) => {
    const matchSearch =
      m.buoy.toLowerCase().includes(search.toLowerCase()) ||
      m.task.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    const matchPriority =
      priorityFilter === "All" || m.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const stats = {
    total: maintenanceData.length,
    pending: maintenanceData.filter((m) => m.status === "Pending").length,
    scheduled: maintenanceData.filter((m) => m.status === "Scheduled").length,
    completed: maintenanceData.filter((m) => m.status === "Completed").length,
    high: maintenanceData.filter((m) => m.priority === "High").length,
  };

  const handleComplete = (id) => {
    alert(`Task ${id} marked as completed`);
  };

  const handleSchedule = (id) => {
    alert(`Task ${id} scheduled`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
            <Wrench size={17} className="text-amber-500" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary tracking-tight">
              Maintenance
            </h1>
            <p className="text-[10px] text-text-muted">
              {stats.pending} pending · {stats.scheduled} scheduled ·{" "}
              {stats.completed} completed
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-[9px] px-2.5">
            <RefreshCw size={11} /> Sync
          </Button>
          <Button variant="primary" size="sm" className="h-7 text-[9px] px-2.5">
            <Plus size={11} /> New Task
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
        <div className="bg-amber-50/50 rounded-lg border border-amber-200/30 p-2 text-center">
          <div className="text-base font-bold text-amber-600">
            {stats.pending}
          </div>
          <div className="text-[7px] text-amber-500 uppercase tracking-wide">
            Pending
          </div>
        </div>
        <div className="bg-sky-50/50 rounded-lg border border-sky-200/30 p-2 text-center">
          <div className="text-base font-bold text-sky-600">
            {stats.scheduled}
          </div>
          <div className="text-[7px] text-sky-500 uppercase tracking-wide">
            Scheduled
          </div>
        </div>
        <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/30 p-2 text-center">
          <div className="text-base font-bold text-emerald-600">
            {stats.completed}
          </div>
          <div className="text-[7px] text-emerald-500 uppercase tracking-wide">
            Completed
          </div>
        </div>
        <div className="bg-red-50/50 rounded-lg border border-red-200/30 p-2 text-center">
          <div className="text-base font-bold text-red-600">{stats.high}</div>
          <div className="text-[7px] text-red-500 uppercase tracking-wide">
            High Priority
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <MetricCard
          value="3"
          label="Overdue Tasks"
          trend="-1"
          up={false}
          className="p-2.5"
        />
        <MetricCard
          value="92%"
          label="Completion Rate"
          trend="+5%"
          up
          className="p-2.5"
        />
        <MetricCard
          value="2.3d"
          label="Avg Resolution Time"
          trend="-0.5d"
          up
          className="p-2.5"
        />
        <MetricCard
          value="4"
          label="AI Predicted Issues"
          trend="New"
          up={false}
          className="p-2.5"
        />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchInput
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs"
        />
        <div className="flex flex-wrap gap-1">
          {["All", "Pending", "Scheduled", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[9px] font-medium transition-all",
                statusFilter === f
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
              )}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {["All", "High", "Medium", "Low"].map((f) => (
            <button
              key={f}
              onClick={() => setPriorityFilter(f)}
              className={cn(
                "px-2 py-1 rounded-md text-[8px] font-medium transition-all",
                priorityFilter === f
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
              )}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Wrench
              size={32}
              className="text-text-muted mx-auto mb-2 opacity-30"
            />
            <div className="text-sm text-text-muted">
              No maintenance tasks found
            </div>
            <p className="text-xs text-text-muted mt-1">
              Try adjusting your filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filtered.map((m, i) => {
            const s = statusConfig[m.status] || statusConfig.Pending;
            const p = priorityConfig[m.priority] || priorityConfig.Low;
            const Icon = s.icon;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-sm transition-all">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-text-primary">
                          {m.buoy}
                        </span>
                        <div
                          className={cn("w-1.5 h-1.5 rounded-full", s.color)}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant={s.variant}
                          size="sm"
                          className="text-[8px]">
                          <Icon size={8} className="mr-0.5" />
                          {m.status}
                        </Badge>
                        <Badge
                          variant={p.variant}
                          size="sm"
                          className="text-[8px]">
                          {m.priority}
                        </Badge>
                      </div>
                    </div>

                    {/* Use Wrench instead of Tool */}
                    <div className="flex items-center gap-1.5 text-[10px] text-text-secondary mb-1">
                      <Wrench
                        size={10}
                        className="text-text-muted flex-shrink-0"
                      />
                      <span className="truncate">{m.task}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] text-text-muted">
                      <Calendar size={9} className="flex-shrink-0" />
                      Due: {m.due}
                    </div>

                    {m.status !== "Completed" && (
                      <div className="flex gap-1 mt-2 pt-2 border-t border-border/30">
                        <Button
                          variant="primary"
                          size="sm"
                          className="h-6 text-[8px] px-2 flex-1"
                          onClick={() => handleComplete(m.id)}>
                          <Check size={8} /> Complete
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[8px] px-2 flex-1"
                          onClick={() => handleSchedule(m.id)}>
                          <Calendar size={8} /> Schedule
                        </Button>
                      </div>
                    )}
                    {m.status === "Completed" && (
                      <div className="flex gap-1 mt-2 pt-2 border-t border-border/30">
                        <Badge
                          variant="success"
                          size="sm"
                          className="text-[8px] w-full justify-center">
                          <CheckCircle size={8} className="mr-0.5" />
                          Completed
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* AI Insights */}
      <Card>
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-xs flex items-center gap-1.5">
            <Zap size={13} className="text-amber-500" />
            AI Maintenance Insights
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-6 text-[8px] px-2">
            View All <ArrowRight size={10} />
          </Button>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-start gap-2.5 p-2 bg-amber-50/50 rounded-md border border-amber-200/30">
              <AlertTriangle
                size={12}
                className="text-amber-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-[10px] font-medium text-text-primary">
                  Battery replacement due
                </p>
                <p className="text-[8px] text-text-muted">
                  Buoy 04 · 2 days remaining
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2 bg-sky-50/50 rounded-md border border-sky-200/30">
              <Target size={12} className="text-sky-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-medium text-text-primary">
                  Sensor calibration predicted
                </p>
                <p className="text-[8px] text-text-muted">
                  Buoy 02 · 7 days from now
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between text-[8px] text-text-muted pt-1">
        <span>
          Showing {filtered.length} of {maintenanceData.length} tasks
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <Activity size={8} className="text-primary-500" />
            {stats.pending} pending
          </span>
          <span className="flex items-center gap-0.5">
            <Clock size={8} className="text-amber-500" />
            {stats.high} high priority
          </span>
        </div>
      </div>
    </motion.div>
  );
}
