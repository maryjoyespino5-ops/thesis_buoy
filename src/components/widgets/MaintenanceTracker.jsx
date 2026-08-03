// path: src/components/widgets/MaintenanceTracker.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Wrench, ChevronRight } from "lucide-react";

export function MaintenanceTracker({ maintenanceData, onViewAll }) {
  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <Wrench size={14} className="text-teal-500" />
          Maintenance
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-sm px-2"
          onClick={onViewAll}>
          View <ChevronRight size={10} />
        </Button>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-1.5">
          {maintenanceData.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  m.status === "Completed"
                    ? "bg-emerald-500"
                    : m.status === "Scheduled"
                      ? "bg-sky-500"
                      : "bg-amber-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary font-medium truncate leading-tight">
                  {m.task}
                </p>
                <p className="text-sm text-text-muted">{m.buoy}</p>
              </div>
              <Badge
                variant={
                  m.status === "Completed"
                    ? "success"
                    : m.status === "Scheduled"
                      ? "info"
                      : "warning"
                }
                className="text-sm px-1.5">
                {m.status === "Completed"
                  ? "✓"
                  : m.status === "Scheduled"
                    ? "📅"
                    : "⏳"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
