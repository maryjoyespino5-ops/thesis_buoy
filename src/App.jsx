// path: src/App.jsx
// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
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
import { Toaster } from "react-hot-toast";
import { useRole } from "./hooks/useRole";

function ProtectedRoute({ children }) {
  return children;
}

function App() {
  const { currentRole } = useRole();

  return (
    <HelmetProvider>
      <>
      <Routes>
        {/* 🆕 Landing Page as default route */}
        <Route path="/" element={<LandingPage />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* All protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  {/* Remove the old redirect since '/' is now landing page */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
      <a href="/dashboard" className="btn btn-primary px-6 py-3">
        Back to Dashboard
      </a>
    </div>
  );
}

export default App;
