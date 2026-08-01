// path: src/pages/Alerts.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SearchInput } from "../components/ui/SearchInput";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Filter,
  Check,
  X,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "../lib/utils";

const alertsData = [
  {
    id: 1,
    time: "14:22",
    buoy: "Buoy 04",
    desc: "Battery low (67%)",
    priority: "Warning",
    acknowledged: false,
  },
  {
    id: 2,
    time: "13:10",
    buoy: "Buoy 02",
    desc: "Dissolved oxygen dropped to 5.9 mg/L",
    priority: "Critical",
    acknowledged: false,
  },
  {
    id: 3,
    time: "11:45",
    buoy: "Buoy 03",
    desc: "Firmware update available",
    priority: "Info",
    acknowledged: true,
  },
  {
    id: 4,
    time: "09:30",
    buoy: "Buoy 01",
    desc: "Calibration due in 3 days",
    priority: "Info",
    acknowledged: false,
  },
];

const priorityConfig = {
  Critical: {
    color: "bg-red-500",
    border: "border-red-200",
    bg: "bg-red-50",
    badge: "danger",
    icon: AlertTriangle,
    label: "Critical",
  },
  Warning: {
    color: "bg-amber-500",
    border: "border-amber-200",
    bg: "bg-amber-50",
    badge: "warning",
    icon: AlertTriangle,
    label: "Warning",
  },
  Info: {
    color: "bg-emerald-500",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    badge: "success",
    icon: Info,
    label: "Info",
  },
};

export default function Alerts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [alerts, setAlerts] = useState(alertsData);

  const filtered = alerts.filter((a) => {
    const matchSearch =
      a.buoy.toLowerCase().includes(search.toLowerCase()) ||
      a.desc.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.priority === filter;
    return matchSearch && matchFilter;
  });

  const activeCount = alerts.filter((a) => !a.acknowledged).length;
  const criticalCount = alerts.filter(
    (a) => a.priority === "Critical" && !a.acknowledged,
  ).length;

  const handleAcknowledge = (id) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    );
  };

  const handleResolve = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
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
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
            <Bell size={17} className="text-red-500" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary tracking-tight">
              Alerts
            </h1>
            <p className="text-[11px] text-text-muted">
              {activeCount} active · {criticalCount} critical
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-[11px] px-3">
            <Check size={12} /> Acknowledge All
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-[11px] px-3">
            <Filter size={12} /> Filter
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
          <div className="text-sm font-bold text-text-primary leading-tight">12</div>
          <div className="text-[10px] text-text-muted uppercase tracking-wide">
            Total
          </div>
        </div>
        <div className="bg-red-50/50 rounded-lg border border-red-200/30 p-2.5 text-center">
          <div className="text-sm font-bold text-red-600 leading-tight">{criticalCount}</div>
          <div className="text-[10px] text-red-500 uppercase tracking-wide">
            Critical
          </div>
        </div>
        <div className="bg-amber-50/50 rounded-lg border border-amber-200/30 p-2.5 text-center">
          <div className="text-sm font-bold text-amber-600 leading-tight">3</div>
          <div className="text-[10px] text-amber-500 uppercase tracking-wide">
            Warning
          </div>
        </div>
        <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/30 p-2.5 text-center">
          <div className="text-sm font-bold text-emerald-600 leading-tight">5</div>
          <div className="text-[10px] text-emerald-500 uppercase tracking-wide">
            Info
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchInput
          placeholder="Search alerts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-1">
          {["All", "Critical", "Warning", "Info"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-medium transition-all",
                filter === f
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
              )}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-text-muted text-sm">No alerts found</div>
            </CardContent>
          </Card>
        ) : (
          filtered.map((a) => {
            const p = priorityConfig[a.priority];
            const Icon = p.icon;
            return (
              <Card
                key={a.id}
                className={cn(
                  "hover:shadow-sm transition-all border-l-2",
                  a.acknowledged && "opacity-50",
                  !a.acknowledged && p.border,
                )}
                style={{
                  borderLeftColor: a.acknowledged ? "#e2e8f0" : undefined,
                }}>
                <CardContent className="p-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                          p.color,
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-medium text-text-primary text-xs">
                            {a.buoy}
                          </span>
                          <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                            <Clock size={9} /> {a.time}
                          </span>
                          {a.acknowledged && (
                            <Badge variant="success" size="sm">
                              ✓ Acknowledged
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                          {a.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Badge
                        variant={p.badge}
                        size="sm"
                        className="flex items-center gap-0.5">
                        <Icon size={9} /> {p.label}
                      </Badge>
                      {!a.acknowledged && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handleAcknowledge(a.id)}>
                            <Check size={10} /> Acknowledge
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleResolve(a.id)}>
                            <X size={10} /> Resolve
                          </Button>
                        </>
                      )}
                      {a.acknowledged && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px] px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleResolve(a.id)}>
                          <X size={10} /> Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Footer Stats */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-[10px] text-text-muted pt-1">
          <span>
            Showing {filtered.length} of {alerts.length} alerts
          </span>
          <span>
            {alerts.filter((a) => !a.acknowledged).length} unacknowledged
          </span>
        </div>
      )}
    </motion.div>
  );
}
