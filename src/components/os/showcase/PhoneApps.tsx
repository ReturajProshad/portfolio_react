"use client";

import { motion } from "framer-motion";
import { ClipboardList, RefreshCw, Baby } from "lucide-react";
import { useRebuildTracker } from "./store";

export type PhoneAppId = "home" | "form" | "sync" | "baby";

export const PHONE_APPS = [
  { id: "form" as const, name: "Forms", tag: "rj_form_engine", icon: ClipboardList, color: "#4F8EF7" },
  { id: "sync" as const, name: "FieldOps", tag: "offline sync", icon: RefreshCw, color: "#10B981" },
  { id: "baby" as const, name: "Amar Babu", tag: "live app", icon: Baby, color: "#EC4899" },
];

export function HomeScreen({ onOpen, hint }: { onOpen: (id: PhoneAppId, index: number) => void; hint: boolean }) {
  const ref = useRebuildTracker<HTMLDivElement>("Launcher");
  const now = new Date();

  return (
    <div ref={ref} className="ph-home">
      <div className="ph-home-clock">
        <span className="ph-home-time">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        <span className="ph-home-date">{now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}</span>
      </div>

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
              transition={{ type: "spring", stiffness: 420, damping: 24, delay: 0.08 * i }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.88 }}
            >
              <span className="ph-icon-tile" style={{ "--app-color": app.color } as React.CSSProperties}>
                <Icon size={20} />
                {hint && i === 0 && <span className="ph-icon-pulse" aria-hidden="true" />}
              </span>
              <span className="ph-icon-name">{app.name}</span>
              <span className="ph-icon-tag">{app.tag}</span>
            </motion.button>
          );
        })}
      </div>

      {hint && (
        <motion.div
          className="ph-hint"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          It&apos;s live — tap an app
        </motion.div>
      )}
    </div>
  );
}
