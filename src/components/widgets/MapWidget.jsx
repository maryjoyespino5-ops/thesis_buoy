// path: src/components/widgets/MapWidget.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { MapPin } from "lucide-react";

export function MapWidget() {
  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <MapPin size={14} className="text-primary-500" />
          Buoy Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="h-48 bg-surface-muted/30 rounded-md flex items-center justify-center">
          <p className="text-xs text-text-muted">
            Interactive map — navigate to /map for full view
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
