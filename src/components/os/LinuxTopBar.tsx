"use client";

import { useState, useEffect } from "react";
import SystemTray from "./SystemTray";

export default function LinuxTopBar() {
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
    <div className="topbar topbar-linux">
      <div className="topbar-left">
        <span className="topbar-activities">Activities</span>
      </div>
      <div className="topbar-center">
        <span className="topbar-clock">{time}</span>
      </div>
      <div className="topbar-right">
        <SystemTray />
      </div>
    </div>
  );
}
