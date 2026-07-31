// path: src/components/layout/Layout.jsx
import React from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
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
