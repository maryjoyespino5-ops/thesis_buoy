// path: src/components/widgets/AISuggestionCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Sparkles, ArrowRight } from "lucide-react";

export function AISuggestionCard() {
  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <Sparkles size={14} className="text-primary-500" />
          AI Insights
        </CardTitle>
        <Badge variant="primary" size="sm">AI</Badge>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-2">
          <div className="p-2 bg-surface-muted/30 rounded-md">
            <p className="text-sm font-medium text-text-primary">
              Buoy 04 battery low
            </p>
            <p className="text-xs text-text-muted">Replace within 48h</p>
          </div>
          <div className="p-2 bg-surface-muted/30 rounded-md">
            <p className="text-sm font-medium text-text-primary">
              DO decreasing at Buoy 02
            </p>
            <p className="text-xs text-text-muted">Increase monitoring frequency</p>
          </div>
          <div className="p-2 bg-surface-muted/30 rounded-md">
            <p className="text-sm font-medium text-text-primary">
              Calibration due for Buoy 01
            </p>
            <p className="text-xs text-text-muted">Schedule within 3 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
