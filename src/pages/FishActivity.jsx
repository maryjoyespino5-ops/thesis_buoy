// path: src/pages/FishActivity.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import "leaflet-measure/dist/leaflet-measure.css";
import "leaflet-measure/dist/leaflet-measure.js";
import "leaflet-compass/dist/leaflet-compass.min.css";
import "leaflet-compass/dist/leaflet-compass.min.js";
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
import { buoyData } from "../api/sampleData";
import {
  Activity,
  MapPin,
  TrendingUp,
  Target,
  Fish,
  Waves,
  Clock,
  BarChart3,
  Radar,
  ArrowRight,
  Filter,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  Calendar,
  Compass,
  Maximize,
  Crosshair,
  Ruler,
  Layers,
  RefreshCw,
  Zap,
} from "lucide-react";
import { cn } from "../lib/utils";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Fish probability color mapping
const getFishColor = (probability) => {
  if (probability >= 90) return "#7c3aed"; // Dark Violet
  if (probability >= 75) return "#8b5cf6"; // Purple
  if (probability >= 50) return "#3b82f6"; // Blue
  if (probability >= 30) return "#22c55e"; // Green
  if (probability >= 10) return "#eab308"; // Yellow
  return "#9ca3af"; // Gray
};

const getFishColorHex = (probability) => {
  if (probability >= 90) return "#7c3aed";
  if (probability >= 75) return "#8b5cf6";
  if (probability >= 50) return "#3b82f6";
  if (probability >= 30) return "#22c55e";
  if (probability >= 10) return "#eab308";
  return "#9ca3af";
};

const getFishLabel = (probability) => {
  if (probability >= 90) return "Extremely High";
  if (probability >= 75) return "High";
  if (probability >= 50) return "Moderate";
  if (probability >= 30) return "Low";
  if (probability >= 10) return "Very Low";
  return "None";
};

const getHeatRadius = (probability) => {
  return 50 + (probability / 100) * 150;
};

// Radar/heatmap intensity colormap - mimics a weather radar (green -> yellow -> orange -> red)
const getRadarColor = (intensity) => {
  // intensity 0-1
  if (intensity >= 0.85) return { r: 220, g: 38, b: 38 }; // red-600 (extreme)
  if (intensity >= 0.65) return { r: 249, g: 115, b: 22 }; // orange-500
  if (intensity >= 0.45) return { r: 250, g: 204, b: 21 }; // yellow-400
  if (intensity >= 0.25) return { r: 132, g: 204, b: 22 }; // lime-500
  return { r: 34, g: 197, b: 94 }; // green-500 (light activity)
};

// One-time injection of custom marker / radar animation styles
let __fishActivityStylesInjected = false;
function injectFishActivityStyles() {
  if (__fishActivityStylesInjected || typeof document === "undefined") return;
  __fishActivityStylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-fish-activity-styles", "true");
  style.innerHTML = `
    @keyframes buoyPulseRing {
      0% { transform: scale(0.6); opacity: 0.55; }
      70% { opacity: 0.08; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    @keyframes buoyBob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-1.5px); }
    }
    .buoy-marker-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .buoy-marker-ring {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      border: 2px solid rgba(234, 179, 8, 0.75);
      background: radial-gradient(circle, rgba(250, 204, 21, 0.25) 0%, rgba(250, 204, 21, 0) 70%);
      animation: buoyPulseRing 2.4s ease-out infinite;
    }
    .buoy-marker-ring.ring-delay {
      animation-delay: 1.2s;
    }
    .buoy-marker-dot {
      position: relative;
      z-index: 2;
      width: 12px;
      height: 12px;
      border-radius: 9999px;
      background: radial-gradient(circle at 35% 30%, #fef9c3 0%, #facc15 45%, #ca8a04 100%);
      border: 1.5px solid #854d0e;
      box-shadow: 0 0 6px rgba(250, 204, 21, 0.9), 0 1px 2px rgba(0,0,0,0.35);
      animation: buoyBob 2.6s ease-in-out infinite;
    }
    .buoy-marker-dot.selected {
      width: 15px;
      height: 15px;
      box-shadow: 0 0 10px rgba(250, 204, 21, 1), 0 1px 3px rgba(0,0,0,0.4);
    }
    .sonar-sweep-canvas {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 350;
    }
  `;
  document.head.appendChild(style);
}

// Builds a divIcon that looks like a small yellow buoy marker with an animated sonar-ping radius
function createBuoyIcon(probability, isSelected) {
  const size = isSelected ? 34 : 28;
  const html = `
    <div class="buoy-marker-wrap">
      <div class="buoy-marker-ring"></div>
      <div class="buoy-marker-ring ring-delay"></div>
      <div class="buoy-marker-dot${isSelected ? " selected" : ""}"></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: "buoy-marker-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

// Map control components
function MapControls({ map }) {
  const [showSatellite, setShowSatellite] = useState(false);

  useEffect(() => {
    if (!map) return;

    // Add fullscreen control
    L.control
      .fullscreen({
        position: "topright",
      })
      .addTo(map);

    // Add measure control
    L.control
      .measure({
        position: "topright",
        primaryLengthUnit: "meters",
        secondaryLengthUnit: "kilometers",
        primaryAreaUnit: "sqmeters",
        secondaryAreaUnit: "hectares",
      })
      .addTo(map);

    // Add compass control
    L.control
      .compass({
        position: "topright",
        autoActive: true,
        showDigit: true,
      })
      .addTo(map);

    return () => {
      map.removeControl(map.fullscreenControl);
      map.removeControl(map.measureControl);
      map.removeControl(map.compassControl);
    };
  }, [map]);

  return null;
}

// Sonar Radar Overlay - draws a weather-radar-style composite (green -> yellow -> orange -> red)
// over the map based on each buoy's fish probability, like a storm intensity map.
function SonarRadarOverlay({ buoys }) {
  const map = useMap();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const sweepAngleRef = useRef(0);

  useEffect(() => {
    injectFishActivityStyles();
    if (!map) return;

    const canvas = document.createElement("canvas");
    canvas.className = "sonar-sweep-canvas";
    map.getPanes().overlayPane.appendChild(canvas);
    canvasRef.current = canvas;

    const resize = () => {
      const size = map.getSize();
      canvas.width = size.x;
      canvas.height = size.y;
      canvas.style.width = size.x + "px";
      canvas.style.height = size.y + "px";
      const topLeft = map.containerPointToLayerPoint([0, 0]);
      L.DomUtil.setPosition(canvas, topLeft);
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Composite radar blobs: additive blend so overlapping high-density
      // buoys build into a solid "storm core" like a weather radar map.
      ctx.globalCompositeOperation = "lighter";

      buoys.forEach((buoy) => {
        const lat = buoy.lat || 14.6;
        const lng = buoy.lng || 120.97;
        const probability =
          buoy.fishProbability != null ? buoy.fishProbability : 50;
        const intensity = Math.min(Math.max(probability / 100, 0), 1);

        const point = map.latLngToContainerPoint([lat, lng]);
        const zoom = map.getZoom();
        const baseRadius = 26 + intensity * 46;
        const radius = baseRadius * Math.pow(1.18, zoom - 10);

        const { r, g, b } = getRadarColor(intensity);
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius,
        );
        gradient.addColorStop(
          0,
          `rgba(${r}, ${g}, ${b}, ${0.55 * intensity + 0.15})`,
        );
        gradient.addColorStop(
          0.55,
          `rgba(${r}, ${g}, ${b}, ${0.28 * intensity + 0.05})`,
        );
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";

      // Rotating sonar sweep line (purely cosmetic "scanning" effect)
      if (buoys.length > 0) {
        const center = map.latLngToContainerPoint(map.getCenter());
        const sweepRadius = Math.max(canvas.width, canvas.height) * 0.6;
        sweepAngleRef.current += 0.01;
        const angle = sweepAngleRef.current;
        const sweepGradient = ctx.createConicGradient
          ? ctx.createConicGradient(angle, center.x, center.y)
          : null;
        if (sweepGradient) {
          sweepGradient.addColorStop(0, "rgba(74, 222, 128, 0.18)");
          sweepGradient.addColorStop(0.06, "rgba(74, 222, 128, 0)");
          sweepGradient.addColorStop(1, "rgba(74, 222, 128, 0)");
          ctx.fillStyle = sweepGradient;
          ctx.beginPath();
          ctx.arc(center.x, center.y, sweepRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      draw();
      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    map.on("move", resize);
    map.on("zoom", resize);
    map.on("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      map.off("move", resize);
      map.off("zoom", resize);
      map.off("resize", resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [map, buoys]);

  return null;
}

// Map content component
function MapContent({ buoys, setSelectedBuoy, selectedBuoy }) {
  const map = useMap();
  const [showSatellite, setShowSatellite] = useState(false);

  // Toggle satellite view
  const toggleSatellite = useCallback(() => {
    setShowSatellite((prev) => !prev);
  }, []);

  // Handle location button click
  const handleLocate = useCallback(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, [map]);

  // Handle reset view
  const handleReset = useCallback(() => {
    map.setView([14.6, 120.97], 10);
  }, [map]);

  // Handle measure tool
  const handleMeasure = useCallback(() => {
    // Measure is already added via control
  }, []);

  // Find high activity buoys for polygon
  const highActivityBuoys = buoys.filter((b) => (b.fishProbability || 0) >= 75);
  const polygonPoints = highActivityBuoys.map((b) => [
    b.lat || 14.6 + Math.random() * 0.2,
    b.lng || 120.97 + Math.random() * 0.2,
  ]);

  return (
    <>
      <TileLayer
        url={
          showSatellite
            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution={
          showSatellite
            ? "Tiles &copy; Esri"
            : "&copy; OpenStreetMap contributors"
        }
      />

      {/* Sonar radar composite - weather-radar style density overview (green -> red) */}
      <SonarRadarOverlay buoys={buoys} />

      {/* Render buoys */}
      {buoys.map((buoy) => {
        const probability = buoy.fishProbability || 50;
        const isSelected = selectedBuoy?.id === buoy.id;

        return (
          <React.Fragment key={buoy.id}>
            {/* Buoy marker - yellow dot with pulsing sonar-ping radius */}
            <Marker
              position={[
                buoy.lat || 14.6 + Math.random() * 0.2,
                buoy.lng || 120.97 + Math.random() * 0.2,
              ]}
              icon={createBuoyIcon(probability, isSelected)}
              eventHandlers={{
                click: () => setSelectedBuoy(buoy),
              }}>
              <Popup>
                <div className="max-w-xs p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-text-primary">
                      {buoy.name}
                    </h3>
                    <Badge
                      variant={
                        probability >= 75
                          ? "success"
                          : probability >= 50
                            ? "info"
                            : "warning"
                      }
                      size="sm"
                      className="text-xs">
                      {getFishLabel(probability)}
                    </Badge>
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Fish Probability</span>
                      <span className="font-bold text-text-primary">
                        {probability}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">
                        Estimated Fish Count
                      </span>
                      <span className="font-bold text-text-primary">
                        {buoy.fishCount || Math.floor(probability * 0.3 + 5)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Average Depth</span>
                      <span className="font-bold text-text-primary">
                        {buoy.depth || "6.3"} meters
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Water Temperature</span>
                      <span className="font-bold text-text-primary">
                        {buoy.temp || "28.9"}°C
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Dissolved Oxygen</span>
                      <span className="font-bold text-text-primary">
                        {buoy.do || "7.2"} mg/L
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Salinity</span>
                      <span className="font-bold text-text-primary">
                        {buoy.salinity || "34"} ppt
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">pH</span>
                      <span className="font-bold text-text-primary">
                        {buoy.ph || "8.1"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Sonar Confidence</span>
                      <span className="font-bold text-text-primary">
                        {buoy.sonarConfidence || "96"}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-border/30">
                    <p className="text-xs text-emerald-600 bg-emerald-50/50 p-2 rounded-md">
                      {probability >= 75
                        ? "🎣 Excellent fishing location. Multiple sonar echoes detected with optimal water quality."
                        : probability >= 50
                          ? "🐟 Good fishing potential. Active fish schools detected."
                          : "🌊 Moderate fish activity. Monitor for changes."}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}

      {/* AI Predicted Fishing Zone polygon */}
      {polygonPoints.length >= 3 && (
        <>
          <Polygon
            positions={polygonPoints}
            pathOptions={{
              fillColor: "#7c3aed",
              fillOpacity: 0.12,
              color: "#7c3aed",
              weight: 2,
              opacity: 0.4,
              dashArray: "5, 5",
              className: "fishing-zone",
            }}
          />
          {/* Migration arrows - simplified representation */}
          {polygonPoints.map((point, idx) => (
            <Circle
              key={`arrow-${idx}`}
              center={point}
              radius={10}
              pathOptions={{
                fillColor: "#8b5cf6",
                fillOpacity: 0.6,
                color: "#8b5cf6",
                weight: 2,
                opacity: 0.8,
                className: "migration-arrow",
              }}
            />
          ))}
        </>
      )}
    </>
  );
}

// Map Legend Component
function MapLegend() {
  const legendItems = [
    { label: "Extreme", color: "#dc2626", range: "85-100%" },
    { label: "High", color: "#f97316", range: "65-84%" },
    { label: "Moderate", color: "#facc15", range: "45-64%" },
    { label: "Light", color: "#84cc16", range: "25-44%" },
    { label: "Minimal", color: "#22c55e", range: "0-24%" },
  ];

  return (
    <div className="absolute bottom-6 right-4 z-[1000] bg-surface/90 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg min-w-[150px]">
      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1">
        <Radar size={10} className="text-red-500" /> Sonar Radar
      </div>
      {legendItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 py-1 border-b border-border/30 last:border-0">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <div className="flex-1">
            <div className="text-xs font-medium text-text-primary">
              {item.label}
            </div>
            <div className="text-[7px] text-text-muted">{item.range}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Bottom Panel Component
function BottomPanel({ buoys }) {
  const activeBuoys = buoys.filter((b) => (b.fishProbability || 0) >= 50);
  const highestZone =
    activeBuoys.length > 0
      ? activeBuoys.reduce((a, b) =>
          (a.fishProbability || 0) > (b.fishProbability || 0) ? a : b,
        )
      : null;

  const avgDepth =
    buoys.reduce((acc, b) => acc + (b.depth || 6.3), 0) / buoys.length;
  const totalFish = buoys.reduce(
    (acc, b) =>
      acc + (b.fishCount || Math.floor((b.fishProbability || 50) * 0.3 + 5)),
    0,
  );
  const avgConfidence =
    buoys.reduce((acc, b) => acc + (b.sonarConfidence || 90), 0) / buoys.length;

  return (
    <Card className="mt-4">
      <CardContent className="p-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
          <div>
            <div className="text-xs text-text-muted uppercase tracking-wide">
              Highest Fish Zone
            </div>
            <div className="text-sm font-bold text-primary-500">
              {highestZone?.name || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-muted uppercase tracking-wide">
              Best Fishing Time
            </div>
            <div className="text-sm font-bold text-text-primary">
              5:00-9:00 AM
            </div>
          </div>
          <div>
            <div className="text-xs text-text-muted uppercase tracking-wide">
              Avg Depth
            </div>
            <div className="text-sm font-bold text-text-primary">
              {avgDepth.toFixed(1)}m
            </div>
          </div>
          <div>
            <div className="text-xs text-text-muted uppercase tracking-wide">
              Est. Fish Count
            </div>
            <div className="text-sm font-bold text-emerald-600">
              {totalFish}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-muted uppercase tracking-wide">
              Most Active Buoy
            </div>
            <div className="text-sm font-bold text-primary-500">
              {activeBuoys.length > 0 ? activeBuoys[0]?.name : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-muted uppercase tracking-wide">
              Water Quality
            </div>
            <div className="text-sm font-bold text-emerald-600">Good</div>
          </div>
          <div>
            <div className="text-xs text-text-muted uppercase tracking-wide">
              AI Confidence
            </div>
            <div className="text-sm font-bold text-text-primary">
              {avgConfidence.toFixed(0)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Component
export default function FishActivity() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedBuoy, setSelectedBuoy] = useState(null);
  const [map, setMap] = useState(null);
  const [buoys, setBuoys] = useState([]);

  // Load buoy data with enhanced fish probability
  useEffect(() => {
    const enhancedBuoys = buoyData.map((b, index) => ({
      ...b,
      lat: 14.55 + index * 0.04 + Math.random() * 0.02,
      lng: 120.9 + index * 0.03 + Math.random() * 0.02,
      fishProbability: Math.floor(Math.random() * 40 + 40),
      fishCount: Math.floor(Math.random() * 30 + 5),
      depth: (Math.random() * 4 + 4).toFixed(1),
      sonarConfidence: Math.floor(Math.random() * 15 + 82),
    }));
    setBuoys(enhancedBuoys);
  }, []);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuoys((prev) =>
        prev.map((b) => ({
          ...b,
          fishProbability: Math.min(
            Math.max((b.fishProbability || 50) + (Math.random() * 10 - 5), 10),
            98,
          ),
          fishCount: Math.floor(Math.random() * 30 + 5),
        })),
      );
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const activityLevels = {
    High: {
      color: "bg-emerald-500",
      text: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    Moderate: {
      color: "bg-amber-500",
      text: "text-amber-600",
      bg: "bg-amber-50",
    },
    Low: { color: "bg-red-500", text: "text-red-600", bg: "bg-red-50" },
  };

  const filteredBuoys = buoys.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || b.fishActivity === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: buoys.length,
    high: buoys.filter((b) => (b.fishProbability || 50) >= 75).length,
    moderate: buoys.filter(
      (b) => (b.fishProbability || 50) >= 50 && (b.fishProbability || 50) < 75,
    ).length,
    low: buoys.filter((b) => (b.fishProbability || 50) < 50).length,
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
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Fish size={17} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              AI Fish Distribution Map
            </h1>
            <p className="text-xs text-text-muted">
              {stats.high} high · {stats.moderate} moderate · {stats.low} low
              activity zones · Live sonar data
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">
            <Download size={11} /> Export
          </Button>
          <Button variant="primary" size="sm" className="h-7 text-xs px-2.5">
            <Radar size={11} /> Scan
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-surface rounded-lg border border-border/50 p-2 text-center">
          <div className="text-xl font-bold text-text-primary">
            {stats.total}
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Total Buoys
          </div>
        </div>
        <div className="bg-purple-50/50 rounded-lg border border-purple-200/30 p-2 text-center">
          <div className="text-xl font-bold text-purple-600">
            {stats.high}
          </div>
          <div className="text-xs text-purple-500 uppercase tracking-wide">
            High Activity
          </div>
        </div>
        <div className="bg-blue-50/50 rounded-lg border border-blue-200/30 p-2 text-center">
          <div className="text-xl font-bold text-blue-600">
            {stats.moderate}
          </div>
          <div className="text-xs text-blue-500 uppercase tracking-wide">
            Moderate
          </div>
        </div>
        <div className="bg-yellow-50/50 rounded-lg border border-yellow-200/30 p-2 text-center">
          <div className="text-xl font-bold text-yellow-600">{stats.low}</div>
          <div className="text-xs text-yellow-500 uppercase tracking-wide">
            Low Activity
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <MetricCard
          value={`${Math.round(buoys.reduce((acc, b) => acc + (b.fishProbability || 50), 0) / buoys.length)}%`}
          label="Avg Fish Presence"
          trend="Active"
          up
          className="p-2.5"
        />
        <MetricCard
          value={buoys.filter((b) => (b.fishProbability || 50) >= 75).length}
          label="Active Hotspots"
          trend="Live"
          up
          className="p-2.5"
        />
        <MetricCard
          value={`${buoys.reduce((acc, b) => acc + (b.depth || 6.3), 0) / buoys.length}m`}
          label="Avg Depth"
          trend="Optimal"
          up
          className="p-2.5"
        />
        <MetricCard
          value={buoys.reduce((acc, b) => acc + (b.fishCount || 5), 0)}
          label="Total Fish Est."
          trend="+12"
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
          {["All", "High", "Moderate", "Low"].map((f) => (
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

      {/* Map */}
      <Card className="overflow-hidden">
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <MapPin size={13} className="text-primary-500" />
            Live Fish Distribution Map
            <Badge variant="success" size="sm">
              Real-time
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600" /> Extreme
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> High
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Light
            </span>
            <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
              <RefreshCw size={10} /> Update
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="relative h-[500px] w-full">
            <MapContainer
              center={[14.6, 120.97]}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
              className="rounded-b-lg"
              whenCreated={setMap}>
              <MapContent
                buoys={filteredBuoys}
                setSelectedBuoy={setSelectedBuoy}
                selectedBuoy={selectedBuoy}
              />
              <MapControls map={map} />
            </MapContainer>

            {/* Legend */}
            <MapLegend />
          </div>
        </CardContent>
      </Card>

      {/* Bottom Panel */}
      <BottomPanel buoys={filteredBuoys} />

      {/* Buoy Activity Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-1.5">
            <Activity size={14} className="text-primary-500" />
            Buoy Activity
          </h2>
          <Badge variant="info" size="sm">
            {filteredBuoys.length} buoys
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {filteredBuoys.slice(0, 4).map((b, i) => {
            const prob = b.fishProbability || 50;
            const level = prob >= 75 ? "High" : prob >= 50 ? "Moderate" : "Low";
            const levelConfig =
              activityLevels[level] || activityLevels.Moderate;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <Card
                  className="cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => navigate("/buoys")}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-primary">
                        {b.name}
                      </span>
                      <Badge
                        variant={
                          level === "High"
                            ? "success"
                            : level === "Moderate"
                              ? "warning"
                              : "danger"
                        }
                        size="sm">
                        {level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary">
                        {prob}%
                      </span>
                      <span className="text-xs text-text-muted">
                        probability
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-text-muted flex items-center gap-0.5">
                        <Fish size={8} /> {b.fishCount || 5} fish
                      </span>
                      <span className="text-xs text-text-muted flex items-center gap-0.5">
                        <Waves size={8} /> {b.depth || "6.3"}m
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-text-muted pt-1">
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <Radar size={8} className="text-emerald-500" />
            Sonar: Active
          </span>
          <span className="flex items-center gap-0.5">
            <BarChart3 size={8} className="text-primary-500" />
            {buoys.length} data points
          </span>
          <span className="flex items-center gap-0.5">
            <Zap size={8} className="text-purple-500" />
            AI:{" "}
            {Math.round(
              buoys.reduce((acc, b) => acc + (b.sonarConfidence || 90), 0) /
                buoys.length,
            )}
            % confidence
          </span>
        </div>
      </div>
    </motion.div>
  );
}
