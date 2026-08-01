// path: src/pages/Profile.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Edit,
  Save,
  X,
  Camera,
  Activity,
  CheckCircle,
  Calendar,
  Building,
  Globe,
  Award,
  Star,
  Settings,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Dela Cruz",
    email: "john.d@Nuleus1 .ph",
    phone: "+63 912 345 6789",
    location: "Manila Bay, Philippines",
    role: "Administrator",
    department: "Coastal Monitoring",
    organization: "LGU Liaison",
    lastLogin: "Today 14:20",
    joinDate: "Jan 2026",
  });

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const stats = [
    { label: "Buoys Monitored", value: "12" },
    { label: "Alerts Responded", value: "47" },
    { label: "Reports Generated", value: "23" },
    { label: "Uptime Score", value: "99.8%" },
  ];

  const activities = [
    { time: "14:20", event: "Logged in", type: "login" },
    { time: "13:45", event: "Generated maintenance report", type: "action" },
    { time: "12:30", event: "Reviewed AI alerts", type: "review" },
    { time: "11:00", event: "Updated buoy settings", type: "action" },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 max-w-2xl mx-auto">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
            <User size={17} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              Profile
            </h1>
            <p className="text-[11px] text-text-muted">
              Manage your account settings
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {!isEditing ? (
            <Button
              variant="primary"
              size="sm"
              className="h-7 text-sm px-2.5"
              onClick={() => setIsEditing(true)}>
              <Edit size={11} /> Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-sm px-2.5"
                onClick={handleCancel}>
                <X size={11} /> Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-sm px-2.5"
                onClick={handleSave}>
                <Save size={11} /> Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                {getInitials(userData.name)}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface border border-border/50 flex items-center justify-center hover:bg-surface-muted transition-colors">
                <Camera size={10} className="text-text-muted" />
              </button>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                <h2 className="text-base font-bold text-text-primary">
                  {userData.name}
                </h2>
                <Badge variant="primary" size="sm" className="w-fit">
                  Admin
                </Badge>
                <Badge variant="success" size="sm" className="w-fit">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-text-muted">
                {userData.department} · {userData.organization}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-border/30">
            {[
              {
                icon: Mail,
                label: "Email",
                value: userData.email,
                field: "email",
              },
              {
                icon: Phone,
                label: "Phone",
                value: userData.phone,
                field: "phone",
              },
              {
                icon: MapPin,
                label: "Location",
                value: userData.location,
                field: "location",
              },
              {
                icon: Shield,
                label: "Role",
                value: userData.role,
                field: "role",
              },
              {
                icon: Building,
                label: "Department",
                value: userData.department,
                field: "department",
              },
              {
                icon: Globe,
                label: "Organization",
                value: userData.organization,
                field: "organization",
              },
            ].map((item) => (
              <div key={item.field} className="flex items-center gap-2.5">
                <item.icon
                  size={13}
                  className="text-text-muted flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-text-muted uppercase tracking-wide">
                    {item.label}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData[item.field]}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          [item.field]: e.target.value,
                        })
                      }
                      className="w-full text-xs bg-surface-muted/50 border border-border/30 rounded px-1.5 py-0.5 text-text-primary outline-none focus:border-primary-400"
                    />
                  ) : (
                    <div className="text-sm text-text-primary truncate">
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
            <div className="text-base font-bold text-text-primary">
              {stat.value}
            </div>
            <div className="text-[7px] text-text-muted uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          {
            icon: Settings,
            label: "Settings",
            path: "/settings",
            color: "primary",
          },
          {
            icon: Bell,
            label: "Notifications",
            path: "/alerts",
            color: "amber",
          },
          {
            icon: Lock,
            label: "Security",
            path: "/security",
            color: "emerald",
          },
          { icon: LogOut, label: "Sign Out", path: "/login", color: "red" },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className={`bg-${item.color}-50 rounded-lg border border-${item.color}-200/30 p-2.5 text-center hover:bg-${item.color}-100 transition-colors`}>
            <item.icon
              size={14}
              className={`text-${item.color}-500 mx-auto mb-0.5`}
            />
            <div className="text-xs font-medium text-text-secondary">
              {item.label}
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <Activity size={13} className="text-primary-500" />
            Recent Activity
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">Last 24h</span>
            <Button variant="ghost" size="sm" className="h-6 text-sm px-2">
              View All <ChevronRight size={10} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="space-y-1.5">
            {activities.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-1.5 border-b border-border/30 last:border-0">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    a.type === "login"
                      ? "bg-emerald-500"
                      : a.type === "action"
                        ? "bg-primary-500"
                        : "bg-amber-500",
                  )}
                />
                <span className="text-xs text-text-muted w-12 flex-shrink-0">
                  {a.time}
                </span>
                <span className="text-sm text-text-secondary flex-1">
                  {a.event}
                </span>
                <Badge
                  variant={
                    a.type === "login"
                      ? "success"
                      : a.type === "action"
                        ? "primary"
                        : "warning"
                  }
                  size="sm"
                  className="text-[7px]">
                  {a.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Info */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Clock size={12} className="text-text-muted" />
            <span className="text-xs text-text-primary">Last Login</span>
          </div>
          <div className="text-sm font-medium text-text-primary mt-0.5">
            {userData.lastLogin}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border/50 p-2.5 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Calendar size={12} className="text-text-muted" />
            <span className="text-xs text-text-primary">Member Since</span>
          </div>
          <div className="text-sm font-medium text-text-primary mt-0.5">
            {userData.joinDate}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-text-muted pt-1">
        <span>Profile last updated: Today, 14:20</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <CheckCircle size={8} className="text-emerald-500" />
            Account verified
          </span>
          <span className="flex items-center gap-0.5">
            <Shield size={8} className="text-primary-500" />
            {userData.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
