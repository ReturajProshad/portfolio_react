"use client";

import { useCallback, useState, useEffect } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { appDefinitions } from "@/config/apps";
import SystemTray from "./SystemTray";

export default function WindowsTaskbar() {
  const { windows, focusedId, openApp, focusApp, minimizeApp } = useWindowManager();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="taskbar taskbar-windows">
      <button className="taskbar-start" aria-label="Start">
        <span className="taskbar-start-icon">⊞</span>
      </button>
      <div className="taskbar-apps">
        {appDefinitions.map(app => {
          const win = windows.find(w => w.id === app.id);
          const isActive = win?.isOpen && !win?.isMinimized && focusedId === app.id;
          const isRunning = win?.isOpen;
          return (
            <button
              key={app.id}
              className={`taskbar-app${isActive ? " active" : ""}${isRunning ? " running" : ""}`}
              onClick={() => handleAppClick(app.id)}
              aria-label={app.title}
            >
              <app.icon size={18} />
            </button>
          );
        })}
      </div>
      <div className="system-tray">
        <SystemTray />
        <span className="system-tray-clock">{time}</span>
      </div>
    </div>
  );
}
