// path: src/components/widgets/FishActivityCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Fish } from "lucide-react";
import { Badge } from "../ui/Badge";

export function FishActivityCard() {
  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <Fish size={14} className="text-emerald-500" />
          Fish Activity
        </CardTitle>
        <Badge variant="success" size="sm">High</Badge>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Presence</span>
            <span className="text-sm font-medium text-text-primary">87%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">School Size</span>
            <span className="text-sm font-medium text-text-primary">200-400</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Zone</span>
            <span className="text-sm font-medium text-text-primary">Northwest</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">AI Confidence</span>
            <span className="text-sm font-medium text-text-primary">91%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
