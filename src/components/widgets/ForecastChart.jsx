// path: src/components/widgets/ForecastChart.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Clock } from "lucide-react";

export function ForecastChart() {
  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <Clock size={14} className="text-sky-500" />
          5-Hour Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="h-48 bg-surface-muted/30 rounded-md flex items-center justify-center">
          <p className="text-xs text-text-muted">
            Forecast chart — connect to weather service
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
