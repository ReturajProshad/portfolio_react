"use client";

import { useCallback } from "react";
import { useWindowManager, type WindowState } from "@/lib/windowManager";
import { X } from "lucide-react";

export default function Window({
  windowState,
  children,
}: {
  windowState: WindowState;
  children: React.ReactNode;
}) {
  const { focusApp, closeApp } = useWindowManager();

  const handleFocus = useCallback(() => {
    focusApp(windowState.id);
  }, [focusApp, windowState.id]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    closeApp(windowState.id);
  }, [closeApp, windowState.id]);

  return (
    <div
      className="window"
      style={{
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      }}
      onClick={handleFocus}
    >
      <div className="window-titlebar">
        <span className="window-title">{windowState.title}</span>
        <button className="window-btn-close" onClick={handleClose} aria-label="Close">
          <X size={14} />
        </button>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}
