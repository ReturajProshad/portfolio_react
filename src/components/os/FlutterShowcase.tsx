"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Signal,
  Battery,
  Plus,
  CheckCircle,
  Home,
  Grid,
  Bell,
  User,
  Server,
} from "lucide-react";

type ScreenId = "splash" | "dashboard" | "form" | "stats";
type ParticlePhase = "idle" | "to-server" | "from-server";

const SCREEN_ORDER: ScreenId[] = ["splash", "dashboard", "form", "stats"];
const HOLD_MS = 1500;
const TRANSITION_MS = 350;

/**
 * Deliberately generic — the point is to read as "comfortable in any mobile
 * framework / any state-management approach", not locked to one brand.
 * Colors are pulled from the site's own theme tokens so they stay in sync
 * with light/dark mode automatically.
 */
const FLOATING_PILLS = [
  { label: "Mobile Framework", color: "rgb(var(--accent))" },
  { label: "State Management", color: "rgb(var(--emerald))" },
  { label: "Cross-Platform UI", color: "rgb(var(--amber))" },
];

const BACKEND_TAGS = ["Spring Boot", "Node.js", "PostgreSQL"];

function SplashScreen() {
  return (
    <div className="phone-screen-inner phone-screen-center">
      <div className="phone-splash-icon">
        <span>A</span>
      </div>
      <span className="phone-splash-title">AppFlow</span>
      <span className="phone-splash-sub">built for any stack</span>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="phone-screen-inner">
      <div className="phone-appbar">
        <span>Dashboard</span>
      </div>
      <div className="phone-content">
        <div className="phone-card phone-card-lg" />
        <div className="phone-card" style={{ width: "88%" }} />
        <div className="phone-card" style={{ width: "72%" }} />
      </div>
      <div className="phone-fab">
        <Plus size={13} color="white" />
      </div>
      <div className="phone-bottom-nav">
        {[Home, Grid, Bell, User].map((Icon, i) => (
          <Icon
            key={i}
            size={13}
            className={i === 0 ? "nav-active" : "nav-idle"}
          />
        ))}
      </div>
    </div>
  );
}

function FormScreen() {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCheck(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="phone-screen-inner">
      <div className="phone-appbar">
        <span>New Entry</span>
      </div>
      <div className="phone-content">
        <div className="phone-input" />
        <div className="phone-input phone-input-check">
          {showCheck && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="phone-check"
            >
              <CheckCircle size={13} />
            </motion.span>
          )}
        </div>
        <div className="phone-input" />
        <motion.div
          className="phone-submit-btn"
          animate={showCheck ? { opacity: 1 } : { opacity: 0.45 }}
        >
          Submit
        </motion.div>
      </div>
    </div>
  );
}

function StatsScreen() {
  const bars = [58, 40, 74, 50, 66, 44, 70, 52];

  return (
    <div className="phone-screen-inner">
      <div className="phone-appbar">
        <span>Analytics</span>
      </div>
      <div className="phone-content">
        <div className="phone-chart">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className={`phone-bar${i === 3 ? " phone-bar-active" : ""}`}
            />
          ))}
        </div>
        <div className="phone-stat-row">
          <span className="phone-stat-label">Downloads</span>
          <span className="phone-stat-value">50K+</span>
        </div>
        <div className="phone-stat-row">
          <span className="phone-stat-label">Rating</span>
          <span className="phone-stat-value">4.8 ★</span>
        </div>
        <div className="phone-stat-row">
          <span className="phone-stat-label">Uptime</span>
          <span className="phone-stat-value">99.9%</span>
        </div>
      </div>
    </div>
  );
}

const SCREEN_COMPONENTS: Record<ScreenId, typeof SplashScreen> = {
  splash: SplashScreen,
  dashboard: DashboardScreen,
  form: FormScreen,
  stats: StatsScreen,
};

function getTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function FlutterShowcase() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [particle, setParticle] = useState<ParticlePhase>("idle");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const serverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const updateCoords = useCallback(() => {
    if (!phoneRef.current || !serverRef.current || !containerRef.current)
      return;
    const cr = containerRef.current.getBoundingClientRect();
    const pr = phoneRef.current.getBoundingClientRect();
    const sr = serverRef.current.getBoundingClientRect();
    // NOTE: previously this mixed cr.left into the y1 calculation, which sent
    // the connector line to essentially a random point off-screen. Fixed to
    // consistently use cr.top for vertical offsets and cr.left for horizontal.
    setCoords({
      x1: pr.right - cr.left,
      y1: pr.top - cr.top + pr.height * 0.22,
      x2: sr.left - cr.left,
      y2: sr.top - cr.top + sr.height * 0.5,
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    updateCoords();
    // Re-measure once more after layout/fonts settle (avoids a stale line on first paint)
    const t = setTimeout(updateCoords, 60);
    window.addEventListener("resize", updateCoords);
    return () => {
      window.removeEventListener("resize", updateCoords);
      clearTimeout(t);
    };
  }, [updateCoords]);

  useEffect(() => {
    if (reduced || paused) return;
    const interval = setInterval(() => {
      setScreenIdx((prev) => (prev + 1) % SCREEN_ORDER.length);
    }, HOLD_MS + TRANSITION_MS);
    return () => clearInterval(interval);
  }, [reduced, paused]);

  useEffect(() => {
    if (reduced) return;
    if (SCREEN_ORDER[screenIdx] === "form") {
      const t1 = setTimeout(() => setParticle("to-server"), 800);
      const t2 = setTimeout(() => setParticle("from-server"), 1800);
      const t3 = setTimeout(() => setParticle("idle"), 2800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [screenIdx, reduced]);

  const currentScreen = SCREEN_ORDER[screenIdx];
  const ScreenComponent = SCREEN_COMPONENTS[currentScreen];
  const time = getTime();

  return (
    <div
      ref={containerRef}
      className="flutter-showcase"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Ambient glow grounding the whole composition as one element */}
      <div className="showcase-halo" />

      {/* Floating capability pills */}
      {FLOATING_PILLS.map((pill, i) => (
        <motion.div
          key={pill.label}
          className={`showcase-pill showcase-pill-${i}`}
          style={{ "--pill-color": pill.color } as React.CSSProperties}
          animate={
            reduced
              ? { opacity: 1, x: 0, y: 0 }
              : {
                  y: [0, -7 - i * 3, 0, 5 + i * 2, 0],
                  x: [0, 3 - i, -2 + i * 2, 1, 0],
                }
          }
          transition={{
            duration: 5.5 + i * 1.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {pill.label}
        </motion.div>
      ))}

      {/* Backend server card */}
      <div ref={serverRef} className="showcase-server">
        <div className="server-header">
          <div className="server-icon-wrap">
            <Server size={16} />
          </div>
          <span className="server-title">Backend</span>
        </div>
        <div className="server-tags">
          {BACKEND_TAGS.map((tag) => (
            <span key={tag} className="server-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Animated connector line */}
      {mounted && (
        <svg className="showcase-line" aria-hidden="true">
          <defs>
            <linearGradient
              id="showcaseLineGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="rgb(var(--accent))"
                stopOpacity="0.05"
              />
              <stop
                offset="50%"
                stopColor="rgb(var(--accent))"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="rgb(var(--accent))"
                stopOpacity="0.05"
              />
            </linearGradient>
          </defs>
          <path
            d={`M ${coords.x1} ${coords.y1} C ${coords.x1 + 40} ${coords.y1}, ${
              coords.x2 - 40
            } ${coords.y2}, ${coords.x2} ${coords.y2}`}
            fill="none"
            stroke="url(#showcaseLineGrad)"
            strokeWidth={1.5}
            strokeDasharray="3 5"
          />
          {!reduced && particle !== "idle" && (
            <motion.circle
              key={particle}
              r={3}
              fill="rgb(var(--accent))"
              initial={{
                cx: particle === "to-server" ? coords.x1 : coords.x2,
                cy: particle === "to-server" ? coords.y1 : coords.y2,
              }}
              animate={{
                cx: particle === "to-server" ? coords.x2 : coords.x1,
                cy: particle === "to-server" ? coords.y2 : coords.y1,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                filter: "drop-shadow(0 0 5px rgb(var(--accent) / 0.7))",
              }}
            />
          )}
        </svg>
      )}

      {/* Phone + progress dots + caption, laid out in normal flow */}
      <div className="showcase-stack">
        <div ref={phoneRef} className="showcase-phone">
          <div className="phone-camera" />
          <div className="phone-statusbar">
            <span className="phone-time">{time}</span>
            <div className="phone-status-icons">
              <Signal size={10} />
              <Wifi size={10} />
              <Battery size={12} />
            </div>
          </div>
          <div className="phone-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{
                  duration: TRANSITION_MS / 1000,
                  ease: "easeInOut",
                }}
                className="phone-screen-anim"
              >
                <ScreenComponent />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="phone-home-indicator" />
        </div>

        <div className="showcase-dots">
          {SCREEN_ORDER.map((_, i) => (
            <motion.span
              key={i}
              className="showcase-dot"
              animate={
                i === screenIdx
                  ? { scale: 1.3, opacity: 1 }
                  : { scale: 1, opacity: 0.35 }
              }
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        <div className="showcase-caption">
          Mobile-to-backend — built for any stack
        </div>
      </div>
    </div>
  );
}
