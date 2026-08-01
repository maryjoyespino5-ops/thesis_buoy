// path: src/pages/AICommandCenter.jsx
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
import { RadarChartWidget } from "../components/charts/RadarChart";
import {
  buoyData,
  riskData,
  predictions,
  recommendations,
  sensorData,
} from "../api/sampleData";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronRight,
  ChevronDown,
  Zap,
  Target,
  Lightbulb,
  Activity,
  Download,
  FileText,
  Filter,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "../lib/utils";

const statusColors = {
  healthy: "#10b981",
  warning: "#f59e0b",
  critical: "#ef4444",
};

export default function AICommandCenter() {
  const navigate = useNavigate();
  const [expandedRisk, setExpandedRisk] = useState(null);
  const [expandedRec, setExpandedRec] = useState(null);
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredRisks =
    riskFilter === "All"
      ? riskData
      : riskData.filter(
          (r) => r.level.toLowerCase() === riskFilter.toLowerCase(),
        );

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
            <Brain size={18} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              AI Command Center
            </h1>
            <p className="text-sm text-text-muted">
              Real-time intelligence · Risk assessment · Predictive analytics
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-sm px-3">
            <FileText size={12} /> Report
          </Button>
          <Button variant="primary" size="sm" className="h-7 text-sm px-3">
            <Sparkles size={12} /> Analyze
          </Button>
        </div>
      </div>

      {/* Compact Metrics - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <MetricCard
          value="96%"
          label="Health Score"
          trend="+2%"
          up
          className="p-3"
        />
        <MetricCard
          value="Good"
          label="Water Quality"
          trend="Stable"
          up
          className="p-3"
        />
        <MetricCard
          value="97.8%"
          label="AI Confidence"
          trend="+0.3%"
          up
          className="p-3"
        />
      </div>

      {/* Executive Summary */}
      <Card className="border-l-2 border-l-primary-500">
        <CardContent className="p-3.5">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-md bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-primary-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-text-primary mb-0.5">
                AI Summary
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Conditions stable across all buoys. Water quality:{" "}
                <strong className="text-text-primary">Good</strong>. Slight
                turbidity increase at Buoy 03 within limits.
              </p>
            </div>
            <Badge variant="primary" size="sm">
              97.8%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
          <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-1.5">
            <Target size={14} className="text-primary-500" />
            Risk Assessment
          </h2>
          <div className="flex gap-1">
            {["All", "Low", "Moderate", "High"].map((f) => (
              <button
                key={f}
                onClick={() => setRiskFilter(f)}
                className={cn(
                  "px-2 py-0.5 rounded text-sm font-medium transition-colors",
                  riskFilter === f
                    ? "bg-primary-500 text-white"
                    : "bg-surface border border-border/50 text-text-secondary hover:bg-surface-muted",
                )}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredRisks.map((r, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:shadow-sm transition-all"
              onClick={() => setExpandedRisk(expandedRisk === i ? null : i)}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-text-primary text-sm">
                    {r.label}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: r.color }}>
                    ● {r.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted mb-1.5">
                  <span>Confidence {r.confidence}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    {r.trend === "Rising" ? (
                      <ArrowUp size={9} className="text-red-400" />
                    ) : (
                      <ArrowDown size={9} className="text-emerald-400" />
                    )}
                    {r.trend}
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {r.desc}
                </p>
                {expandedRisk === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 pt-2 border-t border-border/30">
                    <p className="text-xs text-text-muted mb-1.5">
                      Based on 12 sensors, historical patterns, and
                      environmental models.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-sm px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/reports");
                      }}>
                      Full Report <ChevronRight size={10} />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2.5 flex items-center gap-1.5">
          <TrendingUp size={14} className="text-primary-500" />
          Predictions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {predictions.map((p, i) => (
            <Card key={i} className="text-center">
              <CardContent className="p-3">
                <div className="text-xs text-text-muted uppercase tracking-wide">
                  {p.label}
                </div>
                <div className="text-base font-bold text-text-primary mt-0.5">
                  {p.val}
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  {p.desc}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2.5 flex items-center gap-1.5">
          <Lightbulb size={14} className="text-amber-500" />
          Recommendations
        </h2>
        <div className="space-y-2">
          {recommendations.map((r, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:shadow-sm transition-all"
              onClick={() => setExpandedRec(expandedRec === i ? null : i)}>
              <CardContent className="p-3">
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                      r.priority === "High" ? "bg-red-500" : "bg-amber-500",
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span className="font-medium text-text-primary text-sm">
                        {r.text}
                      </span>
                      <Badge
                        variant={r.priority === "High" ? "danger" : "warning"}
                        size="sm">
                        {r.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-muted">
                      Reason: {r.reason}
                    </p>
                    {expandedRec === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 flex gap-1.5">
                        <Button
                          variant="primary"
                          size="sm"
                          className="h-6 text-sm px-2.5">
                          Schedule
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-sm px-2.5">
                          Dismiss
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sensor Contribution */}
      <Card>
        <CardHeader className="px-3.5 py-2.5">
          <CardTitle className="text-lg font-semibold">Sensor AI Contribution</CardTitle>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
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
                className="p-0 border-0"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {sensorData.map((s, i) => (
                <div key={i} className="bg-surface-muted/30 rounded-md p-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    {s.label}
                  </div>
                  <div className="text-sm font-semibold text-text-primary">
                    {s.value}
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-text-muted">
                      {s.range}
                    </span>
                    <span className="text-xs font-medium text-primary-500">
                      {s.contrib}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Explainability - Compact */}
      <Card>
        <CardHeader className="px-3.5 py-2.5">
          <CardTitle className="text-lg font-semibold">AI Explainability</CardTitle>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5 space-y-2">
          <div className="flex items-start gap-2.5">
            <CheckCircle
              size={13}
              className="text-emerald-500 mt-0.5 flex-shrink-0"
            />
            <div className="text-sm">
              <strong>Detected:</strong> Turbidity increase (3.1 NTU) at Buoy 02
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Info size={13} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <strong>Why:</strong> Sediment disturbance from recent rainfall.
              Sensor contribution: Turbidity (34%), DO (22%), pH (18%).
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Zap size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <strong>Confidence:</strong> 94% · <strong>Impact:</strong>{" "}
              Moderate — monitor for algal bloom risk.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Target
              size={13}
              className="text-primary-500 mt-0.5 flex-shrink-0"
            />
            <div className="text-sm">
              <strong>Recommendation:</strong> Inspect Buoy 02 within 48 hours.
            </div>
          </div>
          <div className="pt-2 flex gap-1.5">
            <Button
              variant="primary"
              size="sm"
              className="h-7 text-sm px-3">
              <Download size={12} /> Report
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-sm px-3">
              Methodology
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
