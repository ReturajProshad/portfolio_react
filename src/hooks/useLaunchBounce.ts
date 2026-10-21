"use client";

import { useEffect, useRef, useState } from "react";

/** True for a moment after an app goes from not running to running — drives the macOS-style launch bounce. */
export function useLaunchBounce(isRunning: boolean, durationMs = 900) {
  const [bouncing, setBouncing] = useState(false);
  const wasRunning = useRef(isRunning);

  useEffect(() => {
    if (isRunning && !wasRunning.current) {
      setBouncing(true);
      const t = setTimeout(() => setBouncing(false), durationMs);
      wasRunning.current = isRunning;
      return () => clearTimeout(t);
    }
    wasRunning.current = isRunning;
  }, [isRunning, durationMs]);

  return bouncing;
}
