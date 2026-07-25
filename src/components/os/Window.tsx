"use client";

import { useCallback, useRef, useEffect } from "react";
import { useWindowManager, type WindowState } from "@/lib/windowManager";
import { X, Minus, Square } from "lucide-react";

export default function Window({
  windowState,
  children,
}: {
  windowState: WindowState;
  children: React.ReactNode;
}) {
  const { focusedId, focusApp, closeApp, minimizeApp, toggleMaximize, updatePosition } = useWindowManager();
  const posRef = useRef(windowState.position);

  posRef.current = windowState.position;

  const isFocused = focusedId === windowState.id;

  const handleFocus = useCallback(() => {
    focusApp(windowState.id);
  }, [focusApp, windowState.id]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    closeApp(windowState.id);
  }, [closeApp, windowState.id]);

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeApp(windowState.id);
  }, [minimizeApp, windowState.id]);

  const handleMaximize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMaximize(windowState.id);
  }, [toggleMaximize, windowState.id]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (windowState.isMaximized) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...posRef.current };
    const w = windowState.size.width;
    const h = windowState.size.height;

    const handleMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      updatePosition(windowState.id, {
        x: Math.max(-w + 100, Math.min(window.innerWidth - 80, startPos.x + dx)),
        y: Math.max(-h + 48, Math.min(window.innerHeight - 40, startPos.y + dy)),
      });
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [windowState.id, windowState.isMaximized, windowState.size.width, updatePosition]);

  const windowStyle: React.CSSProperties = windowState.isMaximized
    ? { zIndex: windowState.zIndex }
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      className={`window${!isFocused ? " window-blurred" : ""}${windowState.isMaximized ? " window-maximized" : ""}`}
      style={windowStyle}
      onClick={handleFocus}
    >
      <div className="window-titlebar" onPointerDown={handlePointerDown}>
        <div className="window-titlebar-controls window-titlebar-controls-left">
          <button className="window-btn window-btn-close" onClick={handleClose} aria-label="Close">
            <X size={12} />
          </button>
          <button className="window-btn window-btn-minimize" onClick={handleMinimize} aria-label="Minimize">
            <Minus size={12} />
          </button>
          <button className="window-btn window-btn-maximize" onClick={handleMaximize} aria-label={windowState.isMaximized ? "Restore" : "Maximize"}>
            <Square size={10} />
          </button>
        </div>
        <span className="window-title">{windowState.title}</span>
        <div className="window-titlebar-controls window-titlebar-controls-right" />
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}
