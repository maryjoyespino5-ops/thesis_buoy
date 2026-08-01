// path: src/pages/InteractiveMap.jsx
import React, { useState, useRef, useEffect } from "react";
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
import { SearchInput } from "../components/ui/SearchInput";
import { BuoyCard } from "../components/ui/BuoyCard";
import { buoyData } from "../api/sampleData";
import {
  MapPin,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize,
  Layers,
  Filter,
  Crosshair,
  Circle,
  Radio,
  Activity,
  Wifi,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function InteractiveMap() {
  const navigate = useNavigate();
  const [selectedBuoy, setSelectedBuoy] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [showRadius, setShowRadius] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredBuoys = buoyData.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || b.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.6));
  const handleReset = () => {
    setZoom(1);
    setMapCenter({ x: 50, y: 50 });
  };

  const statusColors = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-red-500",
  };

  const getCoverageRadius = (status) => {
    switch (status) {
      case "green":
        return "2.4 km";
      case "yellow":
        return "1.8 km";
      case "red":
        return "1.2 km";
      default:
        return "2.0 km";
    }
  };

  // Buoy positions on the map (percentage-based)
  const buoyPositions = [
    { x: 25, y: 30 },
    { x: 55, y: 45 },
    { x: 75, y: 25 },
    { x: 35, y: 70 },
    { x: 65, y: 65 },
    { x: 45, y: 50 },
    { x: 85, y: 55 },
    { x: 15, y: 55 },
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
            <Navigation size={17} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary tracking-tight">
              Interactive Map
            </h1>
            <p className="text-[10px] text-text-muted">
              {buoyData.length} buoys deployed ·{" "}
              {buoyData.filter((b) => b.status === "green").length} online
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-[9px] px-2.5">
            <Layers size={11} /> Layers
          </Button>
          <Button variant="primary" size="sm" className="h-7 text-[9px] px-2.5">
            <Crosshair size={11} /> Locate Me
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden">
        <div className="relative bg-slate-900 h-[400px] lg:h-[480px] overflow-hidden">
          {/* Map Background with Grid */}
          <div
            className="absolute inset-0 transition-transform duration-300"
            style={{
              transform: `scale(${zoom}) translate(${(mapCenter.x - 50) * 0.5}%, ${(mapCenter.y - 50) * 0.5}%)`,
              transformOrigin: "center center",
            }}>
            {/* Ocean Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Coastline Simulation */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-emerald-900/20 rounded-t-full blur-2xl" />
              <div className="absolute top-0 right-0 w-1/4 h-1/2 bg-emerald-900/10 rounded-bl-full blur-2xl" />

              {/* Water Ripples */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute w-full h-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.05) 0%, transparent 40%)",
                  }}
                />
              </div>
            </div>

            {/* Coverage Radius Indicators */}
            {showRadius &&
              buoyData.map((buoy, index) => {
                const pos = buoyPositions[index % buoyPositions.length];
                const radius =
                  buoy.status === "green"
                    ? 80
                    : buoy.status === "yellow"
                      ? 60
                      : 40;
                return (
                  <div
                    key={`radius-${buoy.id}`}
                    className="absolute rounded-full border-2 border-primary-400/30 animate-pulse"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      width: `${radius}px`,
                      height: `${radius}px`,
                      transform: "translate(-50%, -50%)",
                      borderColor:
                        buoy.status === "green"
                          ? "rgba(16,185,129,0.3)"
                          : buoy.status === "yellow"
                            ? "rgba(245,158,11,0.3)"
                            : "rgba(239,68,68,0.3)",
                      background: `radial-gradient(circle, ${
                        buoy.status === "green"
                          ? "rgba(16,185,129,0.05)"
                          : buoy.status === "yellow"
                            ? "rgba(245,158,11,0.05)"
                            : "rgba(239,68,68,0.05)"
                      }, transparent)`,
                    }}
                  />
                );
              })}

            {/* Buoy Markers */}
            {buoyData.map((buoy, index) => {
              const pos = buoyPositions[index % buoyPositions.length];
              const isSelected = selectedBuoy?.id === buoy.id;
              const statusColor = statusColors[buoy.status] || "bg-emerald-500";

              return (
                <div
                  key={buoy.id}
                  className="absolute cursor-pointer transition-all duration-300 group"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isSelected ? 20 : 10,
                  }}
                  onClick={() =>
                    setSelectedBuoy(selectedBuoy?.id === buoy.id ? null : buoy)
                  }>
                  {/* Pulsing Ring */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full animate-ping opacity-75",
                      buoy.status === "green"
                        ? "bg-emerald-400"
                        : buoy.status === "yellow"
                          ? "bg-amber-400"
                          : "bg-red-400",
                    )}
                    style={{
                      width: "32px",
                      height: "32px",
                      left: "-12px",
                      top: "-12px",
                    }}
                  />

                  {/* Main Marker */}
                  <div
                    className={cn(
                      "relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                      buoy.status === "green"
                        ? "bg-emerald-500"
                        : buoy.status === "yellow"
                          ? "bg-amber-500"
                          : "bg-red-500",
                    )}>
                    <MapPin size={14} className="text-white" />
                    {isSelected && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-surface text-text-primary text-[8px] font-medium px-1.5 py-0.5 rounded shadow-lg border border-border/50">
                        {buoy.name}
                      </div>
                    )}
                  </div>

                  {/* Coverage Radius Label on Hover */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface/90 text-[7px] text-text-muted px-1.5 py-0.5 rounded whitespace-nowrap">
                    {getCoverageRadius(buoy.status)}
                  </div>
                </div>
              );
            })}

            {/* Map Controls - Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-1">
              <button
                onClick={handleZoomIn}
                className="w-7 h-7 rounded-md bg-surface/90 backdrop-blur-sm border border-border/50 text-text-secondary hover:bg-surface transition-colors flex items-center justify-center">
                <Plus size={14} />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-7 h-7 rounded-md bg-surface/90 backdrop-blur-sm border border-border/50 text-text-secondary hover:bg-surface transition-colors flex items-center justify-center">
                <Minus size={14} />
              </button>
              <button
                onClick={handleReset}
                className="w-7 h-7 rounded-md bg-surface/90 backdrop-blur-sm border border-border/50 text-text-secondary hover:bg-surface transition-colors flex items-center justify-center">
                <Maximize size={13} />
              </button>
            </div>

            {/* Map Legend - Bottom Left */}
            <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm rounded-lg border border-border/50 p-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[8px] text-text-muted">Healthy</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[8px] text-text-muted">Warning</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-[8px] text-text-muted">Critical</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 pt-1 border-t border-border/30">
                <button
                  onClick={() => setShowRadius(!showRadius)}
                  className={cn(
                    "text-[7px] font-medium px-1.5 py-0.5 rounded transition-colors",
                    showRadius
                      ? "bg-primary-500 text-white"
                      : "bg-surface-muted text-text-muted",
                  )}>
                  {showRadius ? "Hide" : "Show"} Radius
                </button>
                <span className="text-[7px] text-text-muted">
                  Zoom: {Math.round(zoom * 100)}%
                </span>
              </div>
            </div>

            {/* Selected Buoy Info - Overlay */}
            {selectedBuoy && (
              <div className="absolute top-4 left-4 bg-surface/95 backdrop-blur-sm rounded-lg border border-border/50 p-3 max-w-[200px] shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-text-primary">
                    {selectedBuoy.name}
                  </span>
                  <Badge
                    variant={
                      selectedBuoy.status === "green"
                        ? "success"
                        : selectedBuoy.status === "yellow"
                          ? "warning"
                          : "danger"
                    }
                    size="sm">
                    {selectedBuoy.status}
                  </Badge>
                </div>
                <p className="text-[9px] text-text-muted">
                  {selectedBuoy.coords}
                </p>
                <div className="grid grid-cols-2 gap-1 mt-1.5 text-[8px]">
                  <span>
                    Temp: <strong>{selectedBuoy.temp}</strong>
                  </span>
                  <span>
                    pH: <strong>{selectedBuoy.ph}</strong>
                  </span>
                  <span>
                    DO: <strong>{selectedBuoy.do}</strong>
                  </span>
                  <span>
                    Fish: <strong>{selectedBuoy.fishActivity}</strong>
                  </span>
                </div>
                <div className="flex gap-1 mt-1.5 pt-1.5 border-t border-border/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[8px] px-2 flex-1"
                    onClick={() => navigate("/buoys")}>
                    View <ArrowRight size={8} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[8px] px-2 flex-1"
                    onClick={() => setSelectedBuoy(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}

            {/* Map Stats - Top Left */}
            <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-sm rounded-lg border border-border/50 px-2.5 py-1.5">
              <div className="flex items-center gap-3">
                <span className="text-[8px] text-text-muted flex items-center gap-0.5">
                  <Activity size={10} className="text-emerald-500" />
                  {buoyData.filter((b) => b.status === "green").length} Online
                </span>
                <span className="text-[8px] text-text-muted flex items-center gap-0.5">
                  <Radio size={10} className="text-primary-500" />
                  {buoyData.length} Total
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Footer Controls */}
        <CardContent className="p-3 flex flex-col sm:flex-row gap-2 items-center justify-between border-t border-border/30">
          <div className="flex items-center gap-2 w-full sm:w-auto">
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
                    "px-2 py-1 rounded-md text-[8px] font-medium transition-all whitespace-nowrap",
                    filter === f
                      ? "bg-primary-500 text-white shadow-sm"
                      : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
                  )}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <span className="text-[8px] text-text-muted whitespace-nowrap">
            {filteredBuoys.length} buoys shown · Coverage area: 12.4 km²
          </span>
        </CardContent>
      </Card>

      {/* Buoy List */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
            <MapPin size={14} className="text-primary-500" />
            Buoy Details
          </h2>
          <Badge variant="info" size="sm">
            {filteredBuoys.length} buoys
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {filteredBuoys.map((buoy) => (
            <BuoyCard
              key={buoy.id}
              buoy={buoy}
              onView={(b) => setSelectedBuoy(b)}
              onFish={() => navigate("/fish")}
              compact
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
