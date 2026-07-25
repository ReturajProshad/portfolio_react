"use client";

import { useState, useCallback } from "react";
import { useWindowManager } from "@/lib/windowManager";
import type { AppDefinition } from "@/config/apps";

export default function DesktopIcon({ app }: { app: AppDefinition }) {
  const [selected, setSelected] = useState(false);
  const { openApp, windows } = useWindowManager();
  const Icon = app.icon;

  const win = windows.find(w => w.id === app.id);
  const isOpen = win?.isOpen ?? false;

  const handleClick = useCallback(() => {
    setSelected(true);
  }, []);

  const handleDoubleClick = useCallback(() => {
    openApp(app.id);
    setSelected(false);
  }, [openApp, app.id]);

  const handleBlur = useCallback(() => {
    setSelected(false);
  }, []);

  return (
    <button
      className={`desktop-icon${selected ? " selected" : ""}${isOpen ? " app-open" : ""}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      tabIndex={0}
      aria-label={`Open ${app.title}`}
    >
      <div className="desktop-icon-image">
        <Icon size={40} />
      </div>
      <span className="desktop-icon-label">{app.title}</span>
    </button>
  );
}
