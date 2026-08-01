// path: src/pages/Reports.jsx
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
import { SearchInput } from "../components/ui/SearchInput";
import {
  FileText,
  Download,
  Eye,
  Sparkles,
  TrendingUp,
  Activity,
  Calendar,
  Filter,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Zap,
  RefreshCw,
  File,
  FileCheck,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "../lib/utils";

const reports = [
  {
    id: 1,
    title: "Weekly Water Quality Report",
    date: "2026-07-28",
    type: "AI-Generated",
    status: "Ready",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Monthly Environmental Summary",
    date: "2026-07-01",
    type: "AI-Generated",
    status: "Ready",
    size: "4.8 MB",
  },
  {
    id: 3,
    title: "Buoy 04 Maintenance Report",
    date: "2026-07-15",
    type: "System",
    status: "Ready",
    size: "1.2 MB",
  },
  {
    id: 4,
    title: "Fish Activity Analysis",
    date: "2026-07-10",
    type: "AI-Generated",
    status: "Ready",
    size: "3.1 MB",
  },
  {
    id: 5,
    title: "Coral Health Assessment",
    date: "2026-07-05",
    type: "AI-Generated",
    status: "Processing",
    size: "—",
  },
];

const stats = {
  total: reports.length,
  ready: reports.filter((r) => r.status === "Ready").length,
  processing: reports.filter((r) => r.status === "Processing").length,
  totalSize: "11.5 MB",
};

export default function Reports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  const filtered = reports.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || r.type === typeFilter;
    return matchSearch && matchType;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ready":
        return CheckCircle;
      case "Processing":
        return RefreshCw;
      default:
        return FileText;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Ready":
        return "success";
      case "Processing":
        return "warning";
      default:
        return "default";
    }
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
            <FileText size={17} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary tracking-tight">
              Reports
            </h1>
            <p className="text-[11px] text-text-muted">
              {stats.ready} ready · {stats.processing} processing ·{" "}
              {stats.totalSize} total
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2.5">
            <PieChart size={11} /> Analytics
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="h-7 text-[10px] px-2.5"
            loading={generating}
            onClick={handleGenerate}>
            <Sparkles size={11} /> {generating ? "Generating..." : "New Report"}
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-surface rounded-lg border border-border/50 p-2 text-center">
          <div className="text-base font-bold text-text-primary">
            {stats.total}
          </div>
          <div className="text-[9px] text-text-muted uppercase tracking-wide">
          Total Reports
          </div>
        </div>
        <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/30 p-2 text-center">
          <div className="text-base font-bold text-emerald-600">
            {stats.ready}
          </div>
          <div className="text-[9px] text-emerald-500 uppercase tracking-wide">
        Ready
        </div>
        </div>
        <div className="bg-amber-50/50 rounded-lg border border-amber-200/30 p-2 text-center">
          <div className="text-base font-bold text-amber-600">
            {stats.processing}
          </div>
          <div className="text-[9px] text-amber-500 uppercase tracking-wide">
        Processing
        </div>
        </div>
        <div className="bg-sky-50/50 rounded-lg border border-sky-200/30 p-2 text-center">
          <div className="text-base font-bold text-sky-600">
            {stats.totalSize}
          </div>
          <div className="text-[9px] text-sky-500 uppercase tracking-wide">
        Total Size
        </div>
        </div>
      </div>

      {/* AI Summary */}
      <Card className="border-l-2 border-l-primary-500">
        <CardContent className="p-3.5">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-md bg-primary-50 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={14} className="text-primary-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[11px] font-semibold text-text-primary mb-0.5 leading-tight">
                AI Executive Summary
              </h3>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Water quality stable · 2 alerts active · AI confidence 97% ·
                Recommend routine monitoring.
              </p>
            </div>
            <Badge variant="primary" size="sm">
              AI Generated
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchInput
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-1">
          {["All", "AI-Generated", "System"].map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-medium transition-all",
                typeFilter === f
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
          className="h-7 text-[10px] px-2.5 sm:ml-auto">
          <Filter size={11} /> Sort
        </Button>
      </div>

      {/* Report List */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText
              size={32}
              className="text-text-muted mx-auto mb-2 opacity-30"
            />
            <div className="text-sm text-text-muted">No reports found</div>
            <p className="text-xs text-text-muted mt-1">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((report, i) => {
            const StatusIcon = getStatusIcon(report.status);
            const statusVariant = getStatusVariant(report.status);

            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-sm transition-all">
                  <CardContent className="p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
                            report.type === "AI-Generated"
                              ? "bg-primary-50"
                              : "bg-surface-muted",
                          )}>
                          {report.type === "AI-Generated" ? (
                            <Sparkles size={14} className="text-primary-500" />
                          ) : (
                            <File size={14} className="text-text-muted" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-medium text-text-primary truncate leading-tight">
                              {report.title}
                            </span>
                            <Badge
                              variant={
                                report.type === "AI-Generated"
                                  ? "primary"
                                  : "default"
                              }
                              size="sm"
                              className="text-[9px]">
                              {report.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-text-muted">
                            <span className="flex items-center gap-0.5">
                              <Calendar size={8} /> {report.date}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-0.5">
                              <FileCheck size={8} /> {report.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Badge
                          variant={statusVariant}
                          size="sm"
                          className="text-[9px] flex items-center gap-0.5">
                          <StatusIcon
                            size={8}
                            className={
                              report.status === "Processing"
                                ? "animate-spin"
                                : ""
                            }
                          />
                          {report.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[9px] px-2">
                          <Eye size={10} /> View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[9px] px-2">
                          <Download size={10} /> PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader className="px-3.5 py-2.5">
          <CardTitle className="text-[11px] flex items-center gap-1.5">
            <Zap size={13} className="text-amber-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button className="p-2.5 bg-surface-muted/30 rounded-md text-center hover:bg-surface-muted transition-colors">
              <FileSpreadsheet
                size={16}
                className="text-primary-500 mx-auto mb-1"
              />
              <div className="text-[10px] font-medium text-text-primary">
                Export CSV
              </div>
            </button>
            <button className="p-2.5 bg-surface-muted/30 rounded-md text-center hover:bg-surface-muted transition-colors">
              <BarChart3 size={16} className="text-primary-500 mx-auto mb-1" />
              <div className="text-[10px] font-medium text-text-primary">
                Analytics
              </div>
            </button>
            <button className="p-2.5 bg-surface-muted/30 rounded-md text-center hover:bg-surface-muted transition-colors">
              <Calendar size={16} className="text-primary-500 mx-auto mb-1" />
              <div className="text-[10px] font-medium text-text-primary">
                Schedule
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-text-muted pt-1">
        <span>
          Showing {filtered.length} of {reports.length} reports
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <CheckCircle size={8} className="text-emerald-500" />
            {stats.ready} ready for download
          </span>
          <span className="flex items-center gap-0.5">
            <Clock size={8} className="text-amber-500" />
            {stats.processing} processing
          </span>
        </div>
      </div>
    </motion.div>
  );
}
