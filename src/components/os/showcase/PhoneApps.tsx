"use client";

import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { ClipboardList, RefreshCw, Github, Linkedin, Mail, ChevronLeft } from "lucide-react";
import { personal } from "@/data/portfolio";
import { useRebuildTracker } from "./store";

export type PhoneAppId = "home" | "form" | "sync" | "baby";

/** Returns to the phone's home screen; provided by FlutterShowcase. */
export const PhoneBackContext = createContext<() => void>(() => {});

/** In-app back button, placed at the start of each app's top bar. */
export function BackButton({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const goBack = useContext(PhoneBackContext);
  return (
    <motion.button
      type="button"
      className={`ph-back ph-back-${tone}`}
      onClick={goBack}
      whileTap={{ scale: 0.88 }}
      aria-label="Back to home screen"
    >
      <ChevronLeft size={15} />
    </motion.button>
  );
}

export const PHONE_APPS = [
  { id: "form" as const, name: "Forms", tag: "rj_form_engine", icon: ClipboardList, color: "#4F8EF7" },
  { id: "sync" as const, name: "FieldOps", tag: "offline sync", icon: RefreshCw, color: "#10B981" },
  { id: "baby" as const, name: "Amar Babu", tag: "live app", icon: null, color: "#EC4899" },
];

const DOCK = [
  { href: personal.github, label: "GitHub", icon: Github, color: "#24292f" },
  { href: personal.linkedin, label: "LinkedIn", icon: Linkedin, color: "#0a66c2" },
  { href: `mailto:${personal.email}`, label: "Email", icon: Mail, color: "#f43f5e" },
];

export function HomeScreen({ onOpen, hint }: { onOpen: (id: PhoneAppId, index: number) => void; hint: boolean }) {
  const ref = useRebuildTracker<HTMLDivElement>("Launcher");
  const now = new Date();

  return (
    <div ref={ref} className="ph-home">
      <div className="ph-home-clock">
        <span className="ph-home-date">{now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}</span>
        <span className="ph-home-time">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).replace(/\s?[AP]M$/i, "")}</span>
      </div>

      {/* iOS-style widget: what shipped */}
      <motion.button
        className="ph-widget"
        onClick={() => onOpen("baby", 2)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="ph-widget-kicker">
          <span className="ph-widget-dot" /> Live on Google Play
        </span>
        <span className="ph-widget-title">Amar Babu</span>
        <span className="ph-widget-stats">
          <span><b>127</b> tests</span>
          <span><b>12</b> migrations</span>
          <span><b>6</b> games</span>
        </span>
      </motion.button>

      <div className="ph-home-grid">
        {PHONE_APPS.map((app, i) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.id}
              className="ph-icon"
              onClick={() => onOpen(app.id, i)}
              initial={{ opacity: 0, y: 14, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 24, delay: 0.1 + 0.06 * i }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.88 }}
            >
              <span className="ph-icon-tile" style={{ "--app-color": app.color } as React.CSSProperties}>
                {Icon ? <Icon size={20} /> : <span className="ph-icon-emoji">👶</span>}
                {hint && i === 0 && <span className="ph-icon-pulse" aria-hidden="true" />}
              </span>
              <span className="ph-icon-name">{app.name}</span>
              <span className="ph-icon-tag">{app.tag}</span>
            </motion.button>
          );
        })}
      </div>

      {hint && (
        <motion.div className="ph-hint" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          It&apos;s live — tap an app
        </motion.div>
      )}

      <div className="ph-dock">
        {DOCK.map(({ href, label, icon: Icon, color }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="ph-dock-icon"
            style={{ "--app-color": color } as React.CSSProperties}
            aria-label={label}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon size={16} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
