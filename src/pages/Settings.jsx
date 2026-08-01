// path: src/pages/Settings.jsx
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
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Clock,
  Sliders,
  Shield,
  Globe,
  Lock,
  User,
  Database,
  RefreshCw,
  Save,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Volume2,
  Eye,
  Palette,
  Zap,
  Cpu,
  ChevronRight,
  LogOut,
  Download,
  Upload,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [interval, setInterval] = useState("15 min");
  const [threshold, setThreshold] = useState(85);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const settingSections = [
    {
      icon: Palette,
      title: "Theme",
      description: darkMode ? "Dark mode" : "Light mode",
      control: (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-5 rounded-full transition-colors relative ${darkMode ? "bg-primary-500" : "bg-border"}`}
          role="switch"
          aria-checked={darkMode}>
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </button>
      ),
    },
    {
      icon: Bell,
      title: "AI Notifications",
      description: "Receive alerts and insights",
      control: (
        <button
          onClick={() => setNotifEnabled(!notifEnabled)}
          className={`w-10 h-5 rounded-full transition-colors relative ${notifEnabled ? "bg-primary-500" : "bg-border"}`}
          role="switch"
          aria-checked={notifEnabled}>
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifEnabled ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </button>
      ),
    },
    {
      icon: Clock,
      title: "AI Sampling Interval",
      description: "How often AI analyzes data",
      control: (
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="px-2.5 py-1 rounded-md border border-border/50 bg-surface text-[10px] text-text-primary outline-none focus:border-primary-400">
          <option>5 min</option>
          <option>15 min</option>
          <option>30 min</option>
          <option>1 hour</option>
        </select>
      ),
    },
    {
      icon: Sliders,
      title: "AI Confidence Threshold",
      description: "Minimum confidence for alerts",
      control: (
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-primary-500 w-8 text-right">
            {threshold}%
          </span>
          <input
            type="range"
            min="70"
            max="99"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-20 h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary-500"
          />
        </div>
      ),
    },
  ];

  const quickSettings = [
    { icon: Wifi, label: "Auto Sync", enabled: true, key: "autoSync" },
    {
      icon: Globe,
      label: "Data Sharing",
      enabled: dataSharing,
      key: "dataSharing",
    },
    {
      icon: Volume2,
      label: "Sound Alerts",
      enabled: soundEnabled,
      key: "soundEnabled",
    },
    {
      icon: RefreshCw,
      label: "Auto Update",
      enabled: autoUpdate,
      key: "autoUpdate",
    },
  ];

  const handleToggle = (key) => {
    switch (key) {
      case "autoUpdate":
        setAutoUpdate(!autoUpdate);
        break;
      case "dataSharing":
        setDataSharing(!dataSharing);
        break;
      case "soundEnabled":
        setSoundEnabled(!soundEnabled);
        break;
    }
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
            <SettingsIcon size={17} className="text-primary-500" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary tracking-tight">
              Settings
            </h1>
            <p className="text-[11px] text-text-muted">
              Configure your preferences
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="primary"
            size="sm"
            className="h-7 text-[10px] px-2.5"
            onClick={handleSave}>
            <Save size={11} /> Save Changes
          </Button>
        </div>
      </div>

      {/* Save Confirmation */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50/80 rounded-lg border border-emerald-200/30 p-2.5 flex items-center gap-2.5">
          <CheckCircle size={14} className="text-emerald-500" />
          <span className="text-[11px] text-text-secondary">
            Settings saved successfully!
          </span>
        </motion.div>
      )}

      {/* Main Settings */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {settingSections.map((section, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between py-1.5",
                  i < settingSections.length - 1 && "border-b border-border/30",
                )}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-surface-muted/50 flex items-center justify-center flex-shrink-0">
                    <section.icon size={14} className="text-text-muted" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-text-primary leading-tight">
                      {section.title}
                    </div>
                    <div className="text-[10px] text-text-muted">
                      {section.description}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">{section.control}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Settings */}
      <Card>
        <CardHeader className="px-3.5 py-2.5">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <Zap size={13} className="text-amber-500" />
            Quick Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5">
          <div className="grid grid-cols-2 gap-2">
            {quickSettings.map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
                <div className="flex items-center gap-1.5">
                  <setting.icon size={12} className="text-text-muted" />
                  <span className="text-[10px] text-text-primary">
                    {setting.label}
                  </span>
                </div>
                <button
                  onClick={() => handleToggle(setting.key)}
                  className={`w-8 h-4 rounded-full transition-colors relative ${setting.enabled ? "bg-primary-500" : "bg-border"}`}>
                  <span
                    className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${setting.enabled ? "translate-x-4" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <Cpu size={13} className="text-primary-500" />
            Advanced Settings
          </CardTitle>
          <Badge variant="info" size="sm">
            Pro
          </Badge>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5 space-y-2">
          <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
            <div>
              <span className="text-[10px] font-medium text-text-primary">
                Data Export
              </span>
              <span className="text-[9px] text-text-muted ml-2">
                JSON · CSV · PDF
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-[8px] px-2">
              <Download size={10} /> Export
            </Button>
          </div>
          <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
            <div>
              <span className="text-[10px] font-medium text-text-primary">
                Backup
              </span>
              <span className="text-[9px] text-text-muted ml-2">
                Last: Today 14:00
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-[8px] px-2">
              <Upload size={10} /> Backup
            </Button>
          </div>
          <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
            <div>
              <span className="text-[10px] font-medium text-text-primary">
                Reset to Default
              </span>
              <span className="text-[9px] text-text-muted ml-2">
                Restore all settings
              </span>
            </div>
            <Button variant="danger" size="sm" className="h-6 text-[8px] px-2">
              <AlertTriangle size={10} /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader className="px-3.5 py-2.5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
            <Lock size={13} className="text-red-500" />
            Security
          </CardTitle>
          <Badge variant="success" size="sm">
            Secure
          </Badge>
        </CardHeader>
        <CardContent className="px-3.5 pb-3.5 space-y-2">
          <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
            <div>
              <span className="text-[10px] font-medium text-text-primary">
                Two-Factor Auth
              </span>
              <span className="text-[9px] text-text-muted ml-2">
                Extra security layer
              </span>
            </div>
            <Button variant="primary" size="sm" className="h-6 text-[8px] px-2">
              <Shield size={10} /> Enable
            </Button>
          </div>
          <div className="flex items-center justify-between p-2 bg-surface-muted/30 rounded-md">
            <div>
              <span className="text-[10px] font-medium text-text-primary">
                Session Management
              </span>
              <span className="text-[9px] text-text-muted ml-2">
                2 active sessions
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-[8px] px-2">
              <Eye size={10} /> View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="p-2.5 bg-surface rounded-lg border border-border/50 text-center hover:bg-surface-muted transition-colors">
          <User size={14} className="text-primary-500 mx-auto mb-0.5" />
          <div className="text-[10px] font-medium text-text-primary">
            Account
          </div>
        </button>
        <button
          onClick={() => navigate("/login")}
          className="p-2.5 bg-red-50/50 rounded-lg border border-red-200/30 text-center hover:bg-red-50 transition-colors">
          <LogOut size={14} className="text-red-500 mx-auto mb-0.5" />
          <div className="text-[10px] font-medium text-red-600">Sign Out</div>
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-text-muted pt-1">
        <span>Version 2.4.1</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-0.5">
            <CheckCircle size={7} className="text-emerald-500" />
            All settings saved
          </span>
          <span>Last updated: Today, 14:23</span>
        </div>
      </div>
    </motion.div>
  );
}
