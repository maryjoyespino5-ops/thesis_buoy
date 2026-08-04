// path: src/pages/UserManagement.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Users } from "lucide-react";

export default function UserManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
      <p className="text-text-muted">Manage user accounts and permissions.</p>
      <Card>
        <CardContent className="p-6">
          <p className="text-text-secondary">User management interface will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
