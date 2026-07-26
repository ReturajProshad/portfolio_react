"use client";

import { useEffect, useCallback } from "react";
import { appDefinitions } from "@/config/apps";
import { X } from "lucide-react";

export default function MobileDrawer({
  onSelect,
  onClose,
}: {
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="mobile-drawer-overlay" onClick={onClose}>
      <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">More Sections</span>
          <button className="mobile-drawer-close" onClick={onClose} aria-label="Close drawer">
            <X size={18} />
          </button>
        </div>
        <div className="mobile-drawer-grid">
          {appDefinitions.map(app => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                className="mobile-drawer-item"
                onClick={() => { onSelect(app.id); onClose(); }}
              >
                <div className="mobile-drawer-item-icon">
                  <Icon size={24} />
                </div>
                <span className="mobile-drawer-item-label">{app.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
