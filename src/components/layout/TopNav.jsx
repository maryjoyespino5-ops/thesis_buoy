// path: src/components/layout/TopNav.jsx
import React, { useState } from "react";
import {
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  Settings,
  User,
  Shield,
  LogOut,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/utils";
import { Dropdown } from "../ui/Dropdown";

export function TopNav() {
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header
      className="h-11 px-4 flex items-center justify-between bg-surface/90 backdrop-blur-sm border-b border-border/50"
      role="banner">
      {/* Left */}
      <div className="flex items-center gap-2.5">
        <button
          className="lg:hidden p-1 rounded hover:bg-surface-muted transition-colors"
          onClick={() =>
            document.querySelector(".sidebar")?.classList.toggle("open")
          }
          aria-label="Open sidebar">
          <Menu size={17} className="text-text-secondary" />
        </button>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-text-primary">
            Dashboard
          </span>
          <span className="text-text-muted text-[10px]">/</span>
          <span className="text-[11px] text-text-muted">Overview</span>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-muted/50 border border-border/30 focus-within:border-primary-400 focus-within:bg-surface transition-all">
          <Search size={13} className="text-text-placeholder flex-shrink-0" />
          <input
            placeholder="Search..."
            aria-label="Search"
            className="bg-transparent border-none outline-none text-[11px] w-28 focus:w-36 transition-all placeholder:text-text-placeholder text-text-primary"
          />
          <kbd className="text-[8px] text-text-placeholder bg-surface/60 px-1 rounded">
            ⌘K
          </kbd>
        </div>

        {/* Mobile Search */}
        <button className="sm:hidden p-1 rounded hover:bg-surface-muted transition-colors">
          <Search size={15} className="text-text-secondary" />
        </button>

        {/* Actions */}
        <button
          className="relative p-1 rounded hover:bg-surface-muted transition-colors"
          onClick={() => setNotifOpen(!notifOpen)}
          aria-label="Notifications">
          <Bell size={16} className="text-text-secondary" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-surface" />
        </button>

        <button
          className="p-1 rounded hover:bg-surface-muted transition-colors"
          onClick={toggleTheme}
          aria-label={darkMode ? "Light mode" : "Dark mode"}>
          {darkMode ? (
            <Sun size={15} className="text-amber-400" />
          ) : (
            <Moon size={15} className="text-slate-600" />
          )}
        </button>

        {/* User */}
        <Dropdown
          trigger={
            <div
              className="flex items-center gap-1.5 cursor-pointer p-0.5 pl-1 rounded hover:bg-surface-muted transition-colors"
              role="button"
              aria-label="User menu">
              <div className="w-6 h-6 rounded-full bg-primary-500/10 text-primary-600 text-[10px] font-semibold flex items-center justify-center ring-1 ring-primary-500/20">
                {user?.name?.charAt(0) || "J"}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[11px] font-medium text-text-primary leading-none">
                  {user?.name?.split(" ")[0] || "John"}
                </p>
                <p className="text-[9px] text-text-muted leading-none mt-0.5">
                  {user?.role || "Admin"}
                </p>
              </div>
              <ChevronDown
                size={11}
                className="text-text-muted hidden sm:block"
              />
            </div>
          }
          items={[
            {
              label: "Profile",
              icon: <User size={12} />,
              onClick: () => {},
            },
            {
              label: "Settings",
              icon: <Settings size={12} />,
              onClick: () => {},
            },
            {
              label: "Sign Out",
              icon: <LogOut size={12} />,
              danger: true,
              onClick: () => {},
            },
          ]}
          className="w-36"
        />
      </div>
    </header>
  );
}
