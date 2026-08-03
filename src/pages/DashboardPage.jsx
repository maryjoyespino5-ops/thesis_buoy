// path: src/pages/DashboardPage.jsx
import React from "react";
import { useRole } from "../hooks/useRole";
import { AdminDashboard } from "../components/dashboards/AdminDashboard";
import { FishermanDashboard } from "../components/dashboards/FishermanDashboard";
import { LGUDashboard } from "../components/dashboards/LGUDashboard";
import { BfarDashboard } from "../components/dashboards/BfarDashboard";
import { ResearchDashboard } from "../components/dashboards/ResearchDashboard";
import { CommunityDashboard } from "../components/dashboards/CommunityDashboard";
import { BeachMonitoringDashboard } from "../components/dashboards/BeachMonitoringDashboard";
import { CoralReefDashboard } from "../components/dashboards/CoralReefDashboard";

const dashboardMap = {
  admin: AdminDashboard,
  fisherman: FishermanDashboard,
  lgu: LGUDashboard,
  bfar: BfarDashboard,
  research: ResearchDashboard,
  community: CommunityDashboard,
  beach: BeachMonitoringDashboard,
  coral_reef: CoralReefDashboard,
};

export default function DashboardPage() {
  const { currentRole } = useRole();
  const DashboardComponent = dashboardMap[currentRole] || AdminDashboard;

  return <DashboardComponent />;
}
