"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type WindowState = {
  id: string;
  title: string;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

type WindowManagerContextType = {
  windows: WindowState[];
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

const defaultWindows: WindowState[] = [
  { id: "about", title: "About Me", isOpen: false, zIndex: 1, position: { x: 100, y: 60 }, size: { width: 720, height: 520 } },
  { id: "experience", title: "Experience", isOpen: false, zIndex: 1, position: { x: 120, y: 80 }, size: { width: 720, height: 520 } },
  { id: "skills", title: "Skills & Expertise", isOpen: false, zIndex: 1, position: { x: 140, y: 100 }, size: { width: 720, height: 520 } },
  { id: "projects", title: "Projects", isOpen: false, zIndex: 1, position: { x: 160, y: 120 }, size: { width: 840, height: 560 } },
  { id: "opensource", title: "rj_form_engine", isOpen: false, zIndex: 1, position: { x: 180, y: 140 }, size: { width: 780, height: 540 } },
  { id: "achievements", title: "Achievements", isOpen: false, zIndex: 1, position: { x: 200, y: 160 }, size: { width: 720, height: 520 } },
  { id: "contact", title: "Contact Me", isOpen: false, zIndex: 1, position: { x: 220, y: 180 }, size: { width: 600, height: 480 } },
];

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [nextZIndex, setNextZIndex] = useState(10);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const openApp = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id
        ? { ...w, isOpen: true, zIndex: nextZIndex }
        : w
    ));
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const closeApp = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  }, []);

  const focusApp = useCallback((id: string) => {
    bringToFront(id);
  }, [bringToFront]);

  return (
    <WindowManagerContext.Provider value={{ windows, openApp, closeApp, focusApp }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
