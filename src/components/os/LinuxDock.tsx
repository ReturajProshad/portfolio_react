"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useWindowManager } from "@/lib/windowManager";
import { useLaunchBounce } from "@/hooks/useLaunchBounce";
import { appDefinitions, type AppDefinition } from "@/config/apps";

const BASE = 48;
const PEAK = 68;
const REACH = 130;

function DockIcon({
  app,
  mouseY,
  isActive,
  isRunning,
  onClick,
}: {
  app: AppDefinition;
  mouseY: MotionValue<number>;
  isActive: boolean;
  isRunning: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const bouncing = useLaunchBounce(isRunning);

  // macOS-style magnification: icons swell as the pointer gets close
  const distance = useTransform(mouseY, y => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return REACH;
    return y - (box.top + box.height / 2);
  });
  const target = useTransform(distance, [-REACH, 0, REACH], [BASE, PEAK, BASE]);
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });
  const iconScale = useTransform(size, s => s / BASE);

  return (
    <motion.button
      ref={ref}
      className={`dock-app${isActive ? " active" : ""}${isRunning ? " running" : ""}${bouncing ? " dock-app-bounce" : ""}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={app.title}
      data-launcher={app.id}
      data-label={app.title}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span className="dock-app-icon" style={{ scale: iconScale }}>
        <app.icon size={22} />
      </motion.span>
    </motion.button>
  );
}

export default function LinuxDock() {
  const { windows, focusedId, openApp, focusApp, minimizeApp } = useWindowManager();
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);

  const handleAppClick = useCallback((id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win?.isOpen) {
      openApp(id);
    } else if (win.isMinimized) {
      focusApp(id);
    } else if (focusedId === id) {
      minimizeApp(id);
    } else {
      focusApp(id);
    }
  }, [windows, focusedId, openApp, focusApp, minimizeApp]);

  return (
    <div
      className="dock dock-linux"
      onMouseMove={e => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(Number.POSITIVE_INFINITY)}
    >
      {appDefinitions.map(app => {
        const win = windows.find(w => w.id === app.id);
        return (
          <DockIcon
            key={app.id}
            app={app}
            mouseY={mouseY}
            isActive={Boolean(win?.isOpen && !win?.isMinimized && focusedId === app.id)}
            isRunning={Boolean(win?.isOpen)}
            onClick={() => handleAppClick(app.id)}
          />
        );
      })}
    </div>
  );
}
