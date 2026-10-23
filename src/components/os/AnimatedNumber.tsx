"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";

/** Counts up the leading number of a stat like "50K+" or "1100+". */
export default function AnimatedNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || reduced) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: Math.min(1.6, 0.6 + target / 400),
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => {
        el.textContent = `${Math.round(v).toLocaleString("en-US")}${suffix}`;
      },
    });
    return () => controls.stop();
    // Re-run only when the displayed value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced]);

  if (!match) return <span>{value}</span>;
  const final = `${Number(match[1]).toLocaleString("en-US")}${match[2]}`;
  // Keyed by value: the effect writes textContent directly, so give React a
  // fresh node rather than one it no longer owns.
  return <span key={value} ref={ref}>{reduced ? final : `0${match[2]}`}</span>;
}
