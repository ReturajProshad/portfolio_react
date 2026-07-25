"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useWindowManager } from "@/lib/windowManager";
import type { AppDefinition } from "@/config/apps";

export default function DesktopIcon({ app }: { app: AppDefinition }) {
  const [selected, setSelected] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openApp, closeApp, windows } = useWindowManager();
  const Icon = app.icon;

  const win = windows.find(w => w.id === app.id);
  const isOpen = win?.isOpen ?? false;

  const handleClick = useCallback(() => {
    setSelected(true);
  }, []);

  const handleDoubleClick = useCallback(() => {
    openApp(app.id);
    setSelected(false);
  }, [openApp, app.id]);

  const handleBlur = useCallback(() => {
    if (!ctxMenu) setSelected(false);
  }, [ctxMenu]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
    setSelected(true);
  }, []);

  const dismissCtxMenu = useCallback(() => {
    setCtxMenu(null);
    setSelected(false);
  }, []);

  useEffect(() => {
    if (!ctxMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        dismissCtxMenu();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissCtxMenu();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [ctxMenu, dismissCtxMenu]);

  return (
    <>
      <button
        className={`desktop-icon${selected ? " selected" : ""}${isOpen ? " app-open" : ""}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onBlur={handleBlur}
        tabIndex={0}
        aria-label={`Open ${app.title}`}
      >
        <div className="desktop-icon-image">
          <Icon size={40} />
        </div>
        <span className="desktop-icon-label">{app.title}</span>
      </button>
      {ctxMenu && (
        <div className="ctx-menu-backdrop" onClick={dismissCtxMenu} onContextMenu={e => { e.preventDefault(); dismissCtxMenu(); }} />
      )}
      {ctxMenu && (
        <div
          ref={menuRef}
          className="ctx-menu"
          style={{ left: ctxMenu.x, top: ctxMenu.y }}
        >
          {isOpen && (
            <button
              className="ctx-menu-item"
              onClick={() => { closeApp(app.id); dismissCtxMenu(); }}
            >
              Close
            </button>
          )}
          {!isOpen && (
            <button
              className="ctx-menu-item"
              onClick={() => { openApp(app.id); dismissCtxMenu(); }}
            >
              Open
            </button>
          )}
        </div>
      )}
    </>
  );
}
