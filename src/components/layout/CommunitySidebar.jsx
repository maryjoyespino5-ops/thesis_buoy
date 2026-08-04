// path: src/components/layout/CommunitySidebar.jsx
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Fish,
  Umbrella,
  Waves,
  Droplets,
  CloudRain,
  Megaphone,
  Map,
  Info,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { path: "/community", label: "Dashboard", icon: Home },
  { path: "/community/fisheries", label: "Fisheries", icon: Fish },
  { path: "/community/beaches", label: "Beaches", icon: Umbrella },
  { path: "/community/coral", label: "Coral Reef", icon: Waves },
  { path: "/community/water-quality", label: "Water Quality", icon: Droplets },
  { path: "/community/weather", label: "Weather", icon: CloudRain },
  { path: "/community/advisories", label: "Advisories", icon: Megaphone },
  { path: "/community/map", label: "Interactive Map", icon: Map },
  { path: "/community/about", label: "About", icon: Info },
];

export function CommunitySidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

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
          "community-sidebar fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40",
          "w-56 bg-surface border-r border-border/50 flex flex-col",
          open ? "open translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}>
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border/50">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
            <Home size={15} className="text-white" />
          </div>
          <span className="text-sm font-bold text-text-primary tracking-tight">
            Community
          </span>
          <span className="text-xs font-mono bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded ml-auto">
            v2.0
          </span>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4"
          aria-label="Community navigation">
          {renderNavItems(navItems)}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border/50 px-3 py-3">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors">
            <Home size={16} className="text-text-muted" />
            <span>Back to Site</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
