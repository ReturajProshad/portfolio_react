"use client";

import { useCallback, useEffect, useState } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { appDefinitions } from "@/config/apps";
import { Search } from "lucide-react";

export default function ActivitiesOverview({ onClose }: { onClose: () => void }) {
  const { openApp } = useWindowManager();
  const [query, setQuery] = useState("");

  const filtered = query
    ? appDefinitions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()))
    : appDefinitions;

  const handleAppClick = useCallback((id: string) => {
    openApp(id);
    onClose();
  }, [openApp, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="activities-backdrop" onClick={onClose}>
      <div className="activities" onClick={e => e.stopPropagation()}>
        <div className="activities-search">
          <Search size={16} className="activities-search-icon" />
          <input
            type="text"
            className="activities-search-input"
            placeholder="Type to search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="activities-grid">
          {filtered.map(app => {
            const Icon = app.icon;
            return (
              <button key={app.id} className="activities-app" onClick={() => handleAppClick(app.id)}>
                <div className="activities-app-icon">
                  <Icon size={36} />
                </div>
                <span className="activities-app-title">{app.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
