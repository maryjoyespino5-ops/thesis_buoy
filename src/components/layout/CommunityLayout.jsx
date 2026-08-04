// path: src/components/layout/CommunityLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";
import { CommunitySidebar } from "./CommunitySidebar";

export function CommunityLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <CommunitySidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopNav />
        <main
          className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full"
          role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
