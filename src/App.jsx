// path: src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import { CommunityLayout } from "./components/layout/CommunityLayout";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import { AdminDashboard } from "./components/dashboards/AdminDashboard";
import AICommandCenter from "./pages/AICommandCenter";
import FishActivity from "./pages/FishActivity";
import Sanctuary from "./pages/Sanctuary";
import LiveMonitoring from "./pages/LiveMonitoring";
import InteractiveMap from "./pages/InteractiveMap";
import BuoyManagement from "./pages/BuoyManagement";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Maintenance from "./pages/Maintenance";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import WaterQuality from "./pages/WaterQuality";
import UserManagement from "./pages/UserManagement";
import { Toaster } from "react-hot-toast";
import { useRole } from "./hooks/useRole";

// Community pages (public, sidebar layout)
import { CommunityDashboard } from "./pages/community/CommunityDashboard";
import { CommunityFisheries } from "./pages/community/CommunityFisheries";
import { CommunityBeaches } from "./pages/community/CommunityBeaches";
import { CommunityCoral } from "./pages/community/CommunityCoral";
import { CommunityWaterQuality } from "./pages/community/CommunityWaterQuality";
import { CommunityWeather } from "./pages/community/CommunityWeather";
import { CommunityAdvisories } from "./pages/community/CommunityAdvisories";
import { CommunityMap } from "./pages/community/CommunityMap";
import { CommunityAbout } from "./pages/community/CommunityAbout";

function ProtectedRoute({ children }) {
  return children;
}

function App() {
  const { currentRole } = useRole();

  return (
    <HelmetProvider>
      <>
        <Routes>
          {/* ═══════════════════════════════════════
              Public Routes — no auth, no sidebar
              ═══════════════════════════════════════ */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Community Portal — public, uses CommunityLayout with sidebar */}
          <Route path="/community" element={<CommunityLayout />}>
            <Route index element={<CommunityDashboard />} />
            <Route path="" element={<CommunityDashboard />} />
            <Route path="fisheries" element={<CommunityFisheries />} />
            <Route path="beaches" element={<CommunityBeaches />} />
            <Route path="coral" element={<CommunityCoral />} />
            <Route path="water-quality" element={<CommunityWaterQuality />} />
            <Route path="weather" element={<CommunityWeather />} />
            <Route path="advisories" element={<CommunityAdvisories />} />
            <Route path="map" element={<CommunityMap />} />
            <Route path="about" element={<CommunityAbout />} />
          </Route>

          {/* ═══════════════════════════════════════
              Protected Admin Routes — auth + sidebar
              ═══════════════════════════════════════ */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>

                    {/* Admin sub-routes */}
                    <Route path="/admin/*" element={<AdminDashboard />} />

                    {/* Feature pages */}
                    <Route path="/ai" element={<AICommandCenter />} />
                    <Route path="/fish" element={<FishActivity />} />
                    <Route path="/sanctuary" element={<Sanctuary />} />
                    <Route path="/monitoring" element={<LiveMonitoring />} />
                    <Route path="/map" element={<InteractiveMap />} />
                    <Route path="/buoys" element={<BuoyManagement />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/water-quality" element={<WaterQuality />} />
                    <Route path="/users" element={<UserManagement />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1a2a3a",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </>
    </HelmetProvider>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-4xl">🔍</span>
      </div>
      <h1 className="text-5xl font-bold text-text-primary mb-3">404</h1>
      <p className="text-text-muted text-lg mb-2">Page not found</p>
      <p className="text-text-muted text-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/community" className="btn btn-primary px-6 py-3">
        Back to Dashboard
      </a>
    </div>
  );
}

export default App;
