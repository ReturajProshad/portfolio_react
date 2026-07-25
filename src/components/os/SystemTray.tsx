"use client";

import { useOsTheme } from "./OsThemeProvider";
import { Monitor, Terminal } from "lucide-react";

export default function SystemTray() {
  const { osTheme, toggleOsTheme } = useOsTheme();

  return (
    <div className="system-tray">
      <button
        onClick={toggleOsTheme}
        className="system-tray-btn"
        aria-label={`Switch to ${osTheme === "windows" ? "Linux" : "Windows"} theme`}
      >
        {osTheme === "windows" ? <Monitor size={16} /> : <Terminal size={16} />}
      </button>
    </div>
  );
}
