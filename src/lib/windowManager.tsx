"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export type WindowState = {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

type WindowManagerContextType = {
  windows: WindowState[];
  focusedId: string | null;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

const defaultWindows: WindowState[] = [
  { id: "about", title: "About Me", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 100, y: 60 }, size: { width: 720, height: 520 } },
  { id: "experience", title: "Experience", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 120, y: 80 }, size: { width: 720, height: 520 } },
  { id: "skills", title: "Skills & Expertise", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 140, y: 100 }, size: { width: 720, height: 520 } },
  { id: "projects", title: "Projects", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 160, y: 120 }, size: { width: 840, height: 560 } },
  { id: "opensource", title: "rj_form_engine", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 180, y: 140 }, size: { width: 780, height: 540 } },
  { id: "achievements", title: "Achievements", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 200, y: 160 }, size: { width: 720, height: 520 } },
  { id: "contact", title: "Contact Me", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 220, y: 180 }, size: { width: 600, height: 480 } },
];

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [nextZIndex, setNextZIndex] = useState(10);

  const focusedId = useMemo(() => {
    let maxZ = -1, id: string | null = null;
    const open = windows.filter(w => w.isOpen && !w.isMinimized);
    for (const w of open) {
      if (w.zIndex > maxZ) { maxZ = w.zIndex; id = w.id; }
    }
    return id;
  }, [windows]);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const openApp = useCallback((id: string) => {
    setWindows(prev => {
      const win = prev.find(w => w.id === id);
      if (win?.isOpen && !win?.isMinimized) {
        return prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w);
      }
      return prev.map(w =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex, isMaximized: false }
          : w
      );
    });
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const closeApp = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w));
  }, []);

  const focusApp = useCallback((id: string) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMinimized) {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w));
      setNextZIndex(z => z + 1);
    } else {
      bringToFront(id);
    }
  }, [windows, nextZIndex, bringToFront]);

  const minimizeApp = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: nextZIndex } : w));
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const updatePosition = useCallback((id: string, pos: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: pos } : w));
  }, []);

  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, size } : w));
  }, []);

  return (
    <WindowManagerContext.Provider value={{ windows, focusedId, openApp, closeApp, focusApp, minimizeApp, toggleMaximize, updatePosition, updateSize }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
