// path: src/components/widgets/AlertFeed.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Bell } from "lucide-react";

export function AlertFeed({ alerts, alertFilter, setAlertFilter }) {
  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <Bell size={14} className="text-amber-500" />
          Recent Alerts
        </CardTitle>
        <div className="flex gap-0.5">
          {["All", "Critical", "Warning", "Info"].map((f) => (
            <button
              key={f}
              onClick={() => setAlertFilter(f)}
              className={`px-1.5 py-0.5 rounded text-sm font-medium transition-colors ${
                alertFilter === f
                  ? "bg-primary-500 text-white"
                  : "bg-surface-muted text-text-muted hover:bg-surface-muted/80"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-1.5">
          {alerts.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  a.priority === "Critical"
                    ? "bg-red-500"
                    : a.priority === "Warning"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />
              <span className="text-xs text-text-muted w-12 flex-shrink-0">
                {a.time}
              </span>
              <span className="text-xs text-text-secondary flex-1 truncate">
                {a.buoy} · {a.desc}
              </span>
              <Badge
                variant={
                  a.priority === "Critical"
                    ? "danger"
                    : a.priority === "Warning"
                      ? "warning"
                      : "success"
                }
                className="text-sm px-1.5">
                {a.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
