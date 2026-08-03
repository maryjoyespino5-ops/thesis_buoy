// path: src/components/layout/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  Satellite,
  Map,
  Ship,
  Bell,
  FileText,
  Wrench,
  Clock,
  Settings,
  User,
  Menu,
  X,
  Shield,
  Building2,
  Fish,
  Mic,
  Microscope,
  Anchor,
  Sun,
  Users,
  Thermometer,
} from "lucide-react";
import { useRole } from "../../hooks/useRole";
import { cn } from "../../lib/utils";

const navGroups = [
  {
    section: "Overview",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/ai", label: "AI Command", icon: Brain },
    ],
  },
  {
    section: "Monitoring",
    items: [
      { path: "/monitoring", label: "Live Monitoring", icon: Satellite },
      { path: "/map", label: "Interactive Map", icon: Map },
      { path: "/buoys", label: "Buoy Management", icon: Ship },
      { path: "/fish", label: "Fish Activity", icon: Fish },
      { path: "/sanctuary", label: "Sanctuary", icon: Microscope },
    ],
  },
  {
    section: "Environment",
    items: [
      { path: "/weather", label: "Weather", icon: Thermometer },
      { path: "/community", label: "Community", icon: MessageSquare },
    ],
  },
  {
    section: "Reports",
    items: [
      { path: "/alerts", label: "Alerts", icon: Bell },
      { path: "/history", label: "History", icon: Clock },
      { path: "/reports", label: "Reports", icon: FileText },
      { path: "/maintenance", label: "Maintenance", icon: Wrench },
    ],
  },
  {
    section: "Account",
    items: [
      { path: "/settings", label: "Settings", icon: Settings },
      { path: "/profile", label: "Profile", icon: User },
    ],
  },
];

const roleSpecificNav = {
  beach: [
    {
      section: "Beach Monitoring",
      items: [
        { path: "/beach", label: "Beach Monitor", icon: Sun },
      ],
    },
  ],
  coral_reef: [
    {
      section: "Coral Reef",
      items: [
        { path: "/coral", label: "Coral Reef Monitor", icon: Coral },
      ],
    },
  ],
  community: [
    {
      section: "Community",
      items: [
        { path: "/community", label: "Community Feed", icon: Users },
      ],
    },
  ],
  lgu: [
    {
      section: "LGU",
      items: [
        { path: "/reports", label: "LGU Reports", icon: FileText },
      ],
    },
  ],
  bfar: [
    {
      section: "BFAR",
      items: [
        { path: "/fish", label: "Fishery Reports", icon: Fish },
      ],
    },
  ],
  fisherman: [
    {
      section: "Fishing",
      items: [
        { path: "/fish", label: "Fish Activity", icon: Fish },
      ],
    },
  ],
  research: [
    {
      section: "Research",
      items: [
        { path: "/history", label: "Research Data", icon: Clock },
      ],
    },
  ],
};

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const { hasPermission, currentRole, getRoleLabel } = useRole();
  const location = useLocation();

  const isActivePath = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const filteredGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => hasPermission(item.path)),
    }))
    .filter((group) => group.items.length > 0);

  const roleSpecificGroups = roleSpecificNav[currentRole] || [];
  const filteredRoleGroups = roleSpecificGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => hasPermission(item.path)),
    }))
    .filter((group) => group.items.length > 0);

  const renderNavItems = (items) => (
    <div className="space-y-0.5">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActivePath(item.path);
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "text-text-secondary hover:bg-surface-muted hover:text-text-primary",
              active && "bg-primary-50 text-primary-600 shadow-sm",
            )}>
            <Icon
              size={16}
              className={cn(
                "flex-shrink-0",
                active ? "text-primary-500" : "text-text-muted",
              )}
            />
            <span>{item.label}</span>
            {active && (
              <span className="ml-auto w-1 h-1 rounded-full bg-primary-500" />
            )}
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 bg-surface p-1.5 rounded-lg border border-border shadow-sm hover:bg-surface-muted transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "sidebar fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40",
          "w-56 bg-surface border-r border-border/50 flex flex-col",
          open ? "open translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}>
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border/50">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
            <Shield size={15} className="text-white" />
          </div>
          <span className="text-sm font-bold text-text-primary tracking-tight">
            Nuleus1
          </span>
          <span className="text-xs font-mono bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded ml-auto">
            v2.0
          </span>
        </div>

        {/* Role Badge */}
        <div className="px-4 py-2 border-b border-border/30">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Signed in as
          </span>
          <p className="text-xs font-medium text-text-primary truncate mt-0.5">
            {getRoleLabel()}
          </p>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4"
          aria-label="Main navigation">
          {filteredGroups.map((group, gi) => (
            <div key={gi} className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted px-1 mb-2">
                {group.section}
              </p>
              {renderNavItems(group.items)}
            </div>
          ))}
          {filteredRoleGroups.map((group, gi) => (
            <div key={gi} className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted px-1 mb-2">
                {group.section}
              </p>
              {renderNavItems(group.items)}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border/50 px-3 py-3 space-y-0.5">
          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors">
            <User size={16} className="text-text-muted" />
            <span>Profile</span>
          </NavLink>
          <button
            onClick={() => {
              /* handle sign out */
            }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors w-full">
            <Shield size={16} className="text-text-muted" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
