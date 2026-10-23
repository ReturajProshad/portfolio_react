"use client";

import { useCallback, useRef, useState } from "react";
import { motion, type TargetAndTransition, type Variants } from "framer-motion";
import { useWindowManager, type WindowState } from "@/lib/windowManager";
import { X, Minus, Square } from "lucide-react";

const RESIZE_HANDLES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const;
const MIN_W = 400;
const MIN_H = 300;

export type WindowExitReason = "close" | "minimize";

const MINIMIZE_EASE: [number, number, number, number] = [0.55, 0, 0.75, 0.2];

// Open grows out of the launcher icon; minimize shrinks back into it (macOS
// "scale" effect); close is a quick fade in place.
const windowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.1 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 34, mass: 0.9 },
  },
  exit: (reason: WindowExitReason): TargetAndTransition =>
    reason === "minimize"
      ? { opacity: 0, scale: 0.06, transition: { duration: 0.34, ease: MINIMIZE_EASE } }
      : { opacity: 0, scale: 0.94, transition: { duration: 0.16, ease: "easeIn" } },
};

function launcherCenter(id: string): { x: number; y: number } | null {
  const el = document.querySelector<HTMLElement>(`[data-launcher="${id}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export default function Window({
  windowState,
  children,
}: {
  windowState: WindowState;
  children: React.ReactNode;
}) {
  const { focusedId, focusApp, closeApp, minimizeApp, toggleMaximize, updatePosition, updateSize } = useWindowManager();
  const posRef = useRef(windowState.position);
  const sizeRef = useRef(windowState.size);

  posRef.current = windowState.position;
  sizeRef.current = windowState.size;

  // Docks don't move, so the launcher position is read once per mount
  const [launcher] = useState(() => launcherCenter(windowState.id));

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
    const w = sizeRef.current.width;
    const h = sizeRef.current.height;

    const handleMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      updatePosition(windowState.id, {
        x: Math.max(-w + 100, Math.min(window.innerWidth - 80, startPos.x + dx)),
        y: Math.max(-h + 48, Math.min(window.innerHeight - 60, startPos.y + dy)),
      });
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [windowState.id, windowState.isMaximized, updatePosition]);

  const handleResizeStart = useCallback((e: React.PointerEvent, dir: string) => {
    if (windowState.isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...posRef.current };
    const startSize = { ...sizeRef.current };

    const handleMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let x = startPos.x, y = startPos.y;
      let w = startSize.width, h = startSize.height;

      if (dir.includes("e")) w = Math.max(MIN_W, startSize.width + dx);
      if (dir.includes("w")) { w = Math.max(MIN_W, startSize.width - dx); x = startPos.x + (startSize.width - w); }
      if (dir.includes("s")) h = Math.max(MIN_H, startSize.height + dy);
      if (dir.includes("n")) { h = Math.max(MIN_H, startSize.height - dy); y = startPos.y + (startSize.height - h); }

      updatePosition(windowState.id, { x, y });
      updateSize(windowState.id, { width: w, height: h });
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [windowState.id, windowState.isMaximized, updatePosition, updateSize]);

  const windowStyle: React.CSSProperties = windowState.isMaximized
    ? { zIndex: 99999 }
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      };

  // Scale toward the launcher icon. Framer's layout projection expects the
  // origin as fractions of the box (they may fall outside 0–1).
  let originX = 0.5;
  let originY = 0.5;
  if (launcher) {
    let box = { x: windowState.position.x, y: windowState.position.y, w: windowState.size.width, h: windowState.size.height };
    if (windowState.isMaximized) {
      const linux = document.documentElement.dataset.os === "linux";
      const x = linux ? 64 : 0;
      const y = linux ? 32 : 0;
      box = { x, y, w: window.innerWidth - x, h: window.innerHeight - y - (linux ? 0 : 56) };
    }
    originX = (launcher.x - box.x) / box.w;
    originY = (launcher.y - box.y) / box.h;
  }

  return (
    <motion.div
      className={`window${!isFocused ? " window-blurred" : ""}${windowState.isMaximized ? " window-maximized" : ""}`}
      style={{ ...windowStyle, originX, originY }}
      variants={windowVariants}
      initial="hidden"
      animate="shown"
      exit="exit"
      // Animate maximize/restore only; dragging and resizing stay 1:1
      layout
      layoutDependency={windowState.isMaximized}
      transition={{ layout: { type: "spring", stiffness: 380, damping: 36 } }}
      onClick={handleFocus}
      role="dialog"
      aria-label={windowState.title}
      aria-modal="true"
    >
      <div className="window-titlebar" onPointerDown={handlePointerDown}>
        <div className="window-titlebar-controls window-titlebar-controls-left">
          <button className="window-btn window-btn-close" onClick={handleClose} aria-label="Close window">
            <X size={12} />
          </button>
          <button className="window-btn window-btn-minimize" onClick={handleMinimize} aria-label="Minimize window">
            <Minus size={12} />
          </button>
          <button className="window-btn window-btn-maximize" onClick={handleMaximize} aria-label={windowState.isMaximized ? "Restore window" : "Maximize window"}>
            <Square size={10} />
          </button>
        </div>
        <span className="window-title">{windowState.title}</span>
        <div className="window-titlebar-controls window-titlebar-controls-right" />
      </div>
      <div className="window-content">
        {children}
      </div>
      {RESIZE_HANDLES.map(dir => (
        <div
          key={dir}
          className={`resize-handle resize-handle-${dir}`}
          onPointerDown={e => handleResizeStart(e, dir)}
          aria-hidden="true"
        />
      ))}
    </motion.div>
  );
}
