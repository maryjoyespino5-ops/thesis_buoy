// path: src/pages/WaterQuality.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Droplets } from "lucide-react";

export default function WaterQuality() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Water Quality</h1>
      <p className="text-text-muted">Water quality monitoring and metrics.</p>
      <Card>
        <CardContent className="p-6">
          <p className="text-text-secondary">Water quality data will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
