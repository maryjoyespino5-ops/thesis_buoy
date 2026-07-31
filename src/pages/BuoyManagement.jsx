// path: src/pages/BuoyManagement.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BuoyCard } from "../components/ui/BuoyCard";
import { SearchInput } from "../components/ui/SearchInput";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { buoyData } from "../api/sampleData";
import {
  Ship,
  Plus,
  Filter,
  MapPin,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Activity,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function BuoyManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [buoys] = useState(buoyData);

  const filtered = buoys.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || b.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const stats = {
    total: buoys.length,
    healthy: buoys.filter((b) => b.status === "green").length,
    warning: buoys.filter((b) => b.status === "yellow").length,
    critical: buoys.filter((b) => b.status === "red").length,
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
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
            <Ship size={17} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary tracking-tight">
              Buoy Management
            </h1>
            <p className="text-[10px] text-text-muted">
              {stats.healthy} healthy · {stats.warning} warning ·{" "}
              {stats.critical} critical
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="primary" size="sm" className="h-7 text-[10px] px-3">
            <Plus size={12} /> Add Buoy
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-[10px] px-3">
            <Filter size={12} /> Filter
          </Button>
        </div>
      </div>

      {/* Compact Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-surface rounded-lg border border-border/50 p-2 text-center">
          <div className="text-base font-bold text-text-primary">
            {stats.total}
          </div>
          <div className="text-[8px] text-text-muted uppercase tracking-wide">
            Total
          </div>
        </div>
        <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/30 p-2 text-center">
          <div className="text-base font-bold text-emerald-600">
            {stats.healthy}
          </div>
          <div className="text-[8px] text-emerald-500 uppercase tracking-wide">
            Healthy
          </div>
        </div>
        <div className="bg-amber-50/50 rounded-lg border border-amber-200/30 p-2 text-center">
          <div className="text-base font-bold text-amber-600">
            {stats.warning}
          </div>
          <div className="text-[8px] text-amber-500 uppercase tracking-wide">
            Warning
          </div>
        </div>
        <div className="bg-red-50/50 rounded-lg border border-red-200/30 p-2 text-center">
          <div className="text-base font-bold text-red-600">
            {stats.critical}
          </div>
          <div className="text-[8px] text-red-500 uppercase tracking-wide">
            Critical
          </div>
        </div>
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
          {["All", "Healthy", "Warning", "Critical"].map((f) => (
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
      </div>

      {/* Buoy Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Ship
              size={32}
              className="text-text-muted mx-auto mb-2 opacity-30"
            />
            <div className="text-sm text-text-muted">No buoys found</div>
            <p className="text-xs text-text-muted mt-1">
              Try adjusting your search or filter
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {filtered.map((buoy, index) => (
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

      {/* Footer */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-[9px] text-text-muted pt-1">
          <span>
            Showing {filtered.length} of {buoys.length} buoys
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-0.5">
              <Activity size={9} className="text-emerald-500" />
              {stats.healthy} online
            </span>
            <span className="flex items-center gap-0.5">
              <Wifi size={9} className="text-text-muted" />
              {Math.round((stats.healthy / stats.total) * 100)}% coverage
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
