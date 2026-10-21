"use client";

import { useCallback, useEffect, useRef } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { appDefinitions } from "@/config/apps";
import { personal } from "@/data/portfolio";
import { useProfile } from "@/lib/roleLens";

export default function StartMenu({ onClose }: { onClose: () => void }) {
  const { openApp } = useWindowManager();
  const { role } = useProfile();
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div className="start-menu-backdrop" onClick={onClose}>
      <div className="start-menu" ref={menuRef} onClick={e => e.stopPropagation()}>
        <div className="start-menu-account">
          <div className="start-menu-avatar">
            {personal.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="start-menu-user">
            <span className="start-menu-name">{personal.name}</span>
            <span className="start-menu-role">{role}</span>
          </div>
        </div>
        <div className="start-menu-divider" />
        <div className="start-menu-apps">
          {appDefinitions.map(app => {
            const Icon = app.icon;
            return (
              <button key={app.id} className="start-menu-app" onClick={() => handleAppClick(app.id)}>
                <div className="start-menu-app-icon">
                  <Icon size={18} />
                </div>
                <span className="start-menu-app-title">{app.title}</span>
              </button>
            );
          })}
        </div>
        <div className="start-menu-divider" />
        <div className="start-menu-footer">
          <span className="start-menu-footer-text">Documents</span>
          <span className="start-menu-footer-text">Pictures</span>
          <span className="start-menu-footer-text">Settings</span>
        </div>
      </div>
    </div>
  );
}
