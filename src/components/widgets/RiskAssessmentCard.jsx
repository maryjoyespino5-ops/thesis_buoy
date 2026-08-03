// path: src/components/widgets/RiskAssessmentCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { AlertTriangle } from "lucide-react";
import { Badge } from "../ui/Badge";

export function RiskAssessmentCard() {
  const risks = [
    { label: "Fish Kill", level: "Low", color: "#10b981" },
    { label: "Algal Bloom", level: "Moderate", color: "#f59e0b" },
    { label: "Pollution", level: "Low", color: "#10b981" },
    { label: "Low Oxygen", level: "Moderate", color: "#f59e0b" },
  ];

  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <AlertTriangle size={14} className="text-amber-500" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-2">
          {risks.map((risk, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
              <span className="text-xs text-text-muted">{risk.label}</span>
              <Badge
                variant={
                  risk.level === "Low" ? "success" : "warning"
                }
                size="sm">
                {risk.level}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
