"use client";

import { User, Briefcase, Wrench, Mail, Grid3X3 } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: typeof User;
  color: string;
}

const primaryItems: NavItem[] = [
  { id: "about", label: "About", icon: User, color: "var(--accent)" },
  { id: "experience", label: "Experience", icon: Briefcase, color: "#f59e0b" },
  { id: "skills", label: "Skills", icon: Wrench, color: "#10b981" },
  { id: "contact", label: "Contact", icon: Mail, color: "#ef4444" },
];

export default function MobileNav({
  onAppSelect,
  onDrawerToggle,
  drawerOpen,
}: {
  onAppSelect: (id: string) => void;
  onDrawerToggle: () => void;
  drawerOpen: boolean;
}) {
  return (
    <nav className="mobile-nav" role="tablist" aria-label="Applications">
      {primaryItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className="mobile-nav-btn"
            onClick={() => onAppSelect(item.id)}
            aria-label={`Open ${item.label}`}
            role="tab"
            style={{ "--nav-color": item.color } as React.CSSProperties}
          >
            <Icon size={20} />
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        );
      })}
      <button
        className={`mobile-nav-btn mobile-nav-drawer${drawerOpen ? " active" : ""}`}
        onClick={onDrawerToggle}
        aria-label="App drawer"
        role="tab"
      >
        <Grid3X3 size={20} />
        <span className="mobile-nav-label">Explore</span>
      </button>
    </nav>
  );
}
