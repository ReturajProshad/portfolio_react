"use client";

import { appDefinitions } from "@/config/apps";

export default function MobileNav({ onAppSelect }: { onAppSelect: (id: string) => void }) {
  return (
    <nav className="mobile-nav" role="tablist" aria-label="Applications">
      {appDefinitions.map(app => {
        const Icon = app.icon;
        return (
          <button
            key={app.id}
            className="mobile-nav-btn"
            onClick={() => onAppSelect(app.id)}
            aria-label={`Open ${app.title}`}
            role="tab"
          >
            <Icon size={20} />
            <span className="mobile-nav-label">{app.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
