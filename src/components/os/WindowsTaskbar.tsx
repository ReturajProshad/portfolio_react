"use client";

import { useCallback, useState, useEffect } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { useLaunchBounce } from "@/hooks/useLaunchBounce";
import { appDefinitions, type AppDefinition } from "@/config/apps";
import SystemTray from "./SystemTray";

function TaskbarApp({
  app,
  isActive,
  isRunning,
  onClick,
}: {
  app: AppDefinition;
  isActive: boolean;
  isRunning: boolean;
  onClick: () => void;
}) {
  const bouncing = useLaunchBounce(isRunning);
  return (
    <button
      className={`taskbar-app${isActive ? " active" : ""}${isRunning ? " running" : ""}${bouncing ? " taskbar-app-bounce" : ""}`}
      onClick={onClick}
      aria-label={app.title}
      data-launcher={app.id}
    >
      <app.icon size={24} />
      <span className="taskbar-app-label">{app.title}</span>
    </button>
  );
}

export default function WindowsTaskbar({ onStartClick }: { onStartClick: () => void }) {
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
      <button className="taskbar-start" onClick={onStartClick} aria-label="Start">
        <span className="taskbar-start-icon">⊞</span>
      </button>
      <div className="taskbar-apps">
        {appDefinitions.map(app => {
          const win = windows.find(w => w.id === app.id);
          const isActive = win?.isOpen && !win?.isMinimized && focusedId === app.id;
          const isRunning = win?.isOpen;
          return (
            <TaskbarApp
              key={app.id}
              app={app}
              isActive={Boolean(isActive)}
              isRunning={Boolean(isRunning)}
              onClick={() => handleAppClick(app.id)}
            />
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
