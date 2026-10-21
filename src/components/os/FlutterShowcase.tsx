"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Wifi, Signal, Battery, Gauge } from "lucide-react";
import { useRoleLens } from "@/lib/roleLens";
import { HomeScreen, PHONE_APPS, type PhoneAppId } from "./showcase/PhoneApps";
import FormApp from "./showcase/FormApp";
import SyncApp from "./showcase/SyncApp";
import BabyApp from "./showcase/BabyApp";
import { DevToolsPanel, FrameGraph, TracePanel } from "./showcase/Panels";

/* An interactive phone running small, real versions of the work in the
   portfolio, next to a panel that changes with the link the visitor came
   from: a backend request trace for Software Engineer readers, a Flutter
   DevTools inspector for Flutter readers. */

const APP_COMPONENTS = { form: FormApp, sync: SyncApp, baby: BabyApp };

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const t = setInterval(update, 15000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function FlutterShowcase() {
  const lens = useRoleLens();
  const time = useClock();
  const [app, setApp] = useState<PhoneAppId>("home");
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.5 });
  const [touched, setTouched] = useState(false);
  const [overlay, setOverlay] = useState(false);

  // Flutter readers start with the performance overlay on
  useEffect(() => setOverlay(lens === "flutter"), [lens]);

  // Subtle 3D tilt toward the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Apps zoom out of their icon, iOS-style
  const openApp = useCallback((id: PhoneAppId, index: number) => {
    setOrigin({ x: 0.2 + index * 0.3, y: 0.6 });
    setApp(id);
    setTouched(true);
  }, []);
  const goHome = useCallback(() => setApp("home"), []);

  const AppComponent = app === "home" ? null : APP_COMPONENTS[app];
  const appMeta = PHONE_APPS.find(a => a.id === app);

  return (
    <div className="flutter-showcase sc">
      <div className="sc-stage">
        <div className="sc-phone-col">
          <motion.div
            className="sc-tilt"
            style={{ rotateX, rotateY }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className={`ph${overlay ? " ph-rb" : ""}`}>
              <div className="ph-island" />
              <div className="ph-status">
                <span>{time}</span>
                <span className="ph-status-icons">
                  <Signal size={10} />
                  <Wifi size={10} />
                  <Battery size={12} />
                </span>
              </div>

              <div className="ph-screen">
                <AnimatePresence initial={false}>
                  {AppComponent ? (
                    <motion.div
                      key={app}
                      className="ph-layer"
                      style={{ originX: origin.x, originY: origin.y }}
                      initial={{ scale: 0.2, opacity: 0, borderRadius: 40 }}
                      animate={{ scale: 1, opacity: 1, borderRadius: 0 }}
                      exit={{ scale: 0.2, opacity: 0, borderRadius: 40 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    >
                      <AppComponent />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="home"
                      className="ph-layer"
                      initial={{ scale: 1.08, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.08, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <HomeScreen onOpen={openApp} hint={!touched} />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              <button className="ph-home-bar" onClick={goHome} aria-label="Go to home screen" disabled={app === "home"} />
            </div>
          </motion.div>

          <div className="sc-controls">
            {overlay && <FrameGraph className="sc-perf" label={false} />}
            <button
              className={`sc-toggle${overlay ? " on" : ""}`}
              onClick={() => setOverlay(o => !o)}
              aria-pressed={overlay}
            >
              <Gauge size={11} />
              Performance overlay
            </button>
            <span className="sc-crumb">{appMeta ? `${appMeta.name} · ${appMeta.tag}` : "Home"}</span>
          </div>
        </div>

        <div className="sc-panel">{lens === "flutter" ? <DevToolsPanel app={app} /> : <TracePanel />}</div>
      </div>
    </div>
  );
}
