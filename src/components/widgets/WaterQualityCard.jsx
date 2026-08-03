// path: src/components/widgets/WaterQualityCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Droplets, Thermometer, Gauge, Eye } from "lucide-react";

export function WaterQualityCard() {
  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <Droplets size={14} className="text-blue-500" />
          Water Quality
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
            <Thermometer size={14} className="text-text-muted" />
            <div>
              <div className="text-xs text-text-muted">Temp</div>
              <div className="text-sm font-medium text-text-primary">28.6°C</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
            <Gauge size={14} className="text-text-muted" />
            <div>
              <div className="text-xs text-text-muted">pH</div>
              <div className="text-sm font-medium text-text-primary">8.1</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
            <Droplets size={14} className="text-text-muted" />
            <div>
              <div className="text-xs text-text-muted">Salinity</div>
              <div className="text-sm font-medium text-text-primary">34.4 PSU</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-surface-muted/30 rounded-md">
            <Eye size={14} className="text-text-muted" />
            <div>
              <div className="text-xs text-text-muted">Turbidity</div>
              <div className="text-sm font-medium text-text-primary">2.3 NTU</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
