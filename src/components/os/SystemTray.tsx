"use client";

import { useState, useEffect } from "react";
import { useOsTheme } from "./OsThemeProvider";
import { Monitor, Terminal } from "lucide-react";

export default function SystemTray() {
  const { osTheme, toggleOsTheme } = useOsTheme();
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

  return (
    <div className="system-tray">
      <button
        onClick={toggleOsTheme}
        className="system-tray-btn"
        aria-label={`Switch to ${osTheme === "windows" ? "Linux" : "Windows"} theme`}
      >
        {osTheme === "windows" ? <Monitor size={16} /> : <Terminal size={16} />}
      </button>
      <span className="system-tray-clock">{time}</span>
    </div>
  );
}
