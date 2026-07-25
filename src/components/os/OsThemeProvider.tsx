"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type OsTheme = "windows" | "linux";

type OsThemeContextType = {
  osTheme: OsTheme;
  setOsTheme: (theme: OsTheme) => void;
  toggleOsTheme: () => void;
};

const OsThemeContext = createContext<OsThemeContextType | null>(null);

export function OsThemeProvider({ children }: { children: React.ReactNode }) {
  const [osTheme, setOsThemeState] = useState<OsTheme>("windows");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("osTheme") as OsTheme | null;
    if (stored === "windows" || stored === "linux") {
      setOsThemeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-os", osTheme);
      localStorage.setItem("osTheme", osTheme);
    }
  }, [osTheme, mounted]);

  const setOsTheme = useCallback((theme: OsTheme) => {
    setOsThemeState(theme);
  }, []);

  const toggleOsTheme = useCallback(() => {
    setOsThemeState(prev => prev === "windows" ? "linux" : "windows");
  }, []);

  return (
    <OsThemeContext.Provider value={{ osTheme, setOsTheme, toggleOsTheme }}>
      {children}
    </OsThemeContext.Provider>
  );
}

export function useOsTheme() {
  const ctx = useContext(OsThemeContext);
  if (!ctx) throw new Error("useOsTheme must be used within OsThemeProvider");
  return ctx;
}
