"use client";

import { motion } from "framer-motion";
import { useRoleLens } from "@/lib/roleLens";
import { lensOrder, lensProfiles } from "@/data/portfolio";

export default function RoleSwitch({ compact = false }: { compact?: boolean }) {
  const { lens, setLens } = useRoleLens();

  return (
    <div
      className={`role-switch${compact ? " role-switch-compact" : ""}`}
      role="radiogroup"
      aria-label="View portfolio as"
    >
      {lensOrder.map(id => {
        const active = lens === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`role-switch-btn${active ? " active" : ""}`}
            onClick={() => setLens(id)}
          >
            {active && (
              <motion.span
                layoutId={compact ? "role-pill-mobile" : "role-pill"}
                className="role-switch-pill"
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
              />
            )}
            <span className="role-switch-label">
              {compact ? lensProfiles[id].shortLabel : lensProfiles[id].label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
