"use client";

import { useCallback } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { appDefinitions } from "@/config/apps";

export default function LinuxDock() {
  const { windows, focusedId, openApp, focusApp, minimizeApp } = useWindowManager();

  const handleAppClick = useCallback((id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win?.isOpen) {
      openApp(id);
    } else if (win.isMinimized) {
      focusApp(id);
    } else if (focusedId === id) {
      minimizeApp(id);
    } else {
      focusApp(id);
    }
  }, [windows, focusedId, openApp, focusApp, minimizeApp]);

  return (
    <div className="dock dock-linux">
      {appDefinitions.map(app => {
        const win = windows.find(w => w.id === app.id);
        const isActive = win?.isOpen && !win?.isMinimized && focusedId === app.id;
        const isRunning = win?.isOpen;
        return (
          <button
            key={app.id}
            className={`dock-app${isActive ? " active" : ""}${isRunning ? " running" : ""}`}
            onClick={() => handleAppClick(app.id)}
            aria-label={app.title}
            title={app.title}
          >
            <app.icon size={22} />
          </button>
        );
      })}
    </div>
  );
}
