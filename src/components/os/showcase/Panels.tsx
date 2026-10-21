"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, RotateCcw, Server, Database, Shield, Smartphone, Globe } from "lucide-react";
import { useLastRequest, useRebuilds, resetRebuilds, type PhoneRequest } from "./store";
import type { PhoneAppId } from "./PhoneApps";

/* ── Real frame timing: requestAnimationFrame deltas drawn like Flutter's
   performance overlay (bars over the 16.7 ms budget turn red). ── */

export function FrameGraph({ className, label = true }: { className?: string; label?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const samples: number[] = [];
    let last = performance.now();
    let lastText = last;
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 66);
      last = now;
      samples.push(dt);
      if (samples.length > 48) samples.shift();

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const barW = w / 48;
      samples.forEach((s, i) => {
        const bh = Math.max(1, (s / 33) * h);
        ctx.fillStyle = s > 17.5 ? "rgba(248,113,113,0.95)" : "rgba(52,211,153,0.85)";
        ctx.fillRect(i * barW, h - bh, Math.max(1, barW - 1), bh);
      });
      // 16.7 ms budget line
      const y = h - (16.7 / 33) * h;
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(0, y, w, 1);

      if (fpsRef.current && now - lastText > 400) {
        lastText = now;
        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        fpsRef.current.textContent = `${Math.round(1000 / avg)} fps · ${avg.toFixed(1)} ms`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`fg ${className ?? ""}`}>
      {label && (
        <div className="fg-head">
          <span>UI thread</span>
          <span ref={fpsRef} className="fg-fps">— fps</span>
        </div>
      )}
      <canvas ref={canvasRef} className="fg-canvas" />
    </div>
  );
}

/* ── Flutter lens: DevTools-style inspector ── */

const TREES: Record<PhoneAppId, { name: string; depth: number }[]> = {
  home: [{ name: "Launcher", depth: 0 }],
  form: [
    { name: "RjForm", depth: 0 },
    { name: "TextField(Farmer name)", depth: 1 },
    { name: "Dropdown(District)", depth: 1 },
    { name: "Dropdown(Upazila)", depth: 1 },
    { name: "TextField(Herd size)", depth: 1 },
    { name: "Derived(Daily milk)", depth: 1 },
  ],
  sync: [
    { name: "FieldOpsApp", depth: 0 },
    { name: "SyncBadge", depth: 1 },
    { name: "FieldRow(status)", depth: 1 },
    { name: "FieldRow(note)", depth: 1 },
    { name: "SyncLog", depth: 1 },
  ],
  baby: [
    { name: "AmarBabuApp", depth: 0 },
    { name: "WeekTracker", depth: 1 },
    { name: "TalkingBaby", depth: 1 },
  ],
};

// Each claim matches what the counters show: siblings are memoized with stable callbacks
const NOTES: Record<PhoneAppId, string> = {
  home: "Open an app on the phone. Counts are real re-renders of each widget.",
  form: "Type in one field: only that field and RjForm rebuild — memoized siblings keep their count.",
  sync: "New log lines rebuild only SyncLog; a row rebuilds only when its own value changes.",
  baby: "Tapping the baby rebuilds only TalkingBaby; the week tracker stays put.",
};

export function DevToolsPanel({ app }: { app: PhoneAppId }) {
  const { counts, last, tick } = useRebuilds();
  const tree = TREES[app];

  return (
    <div className="sp sp-devtools">
      <div className="sp-head">
        <Activity size={13} />
        <span className="sp-title">Flutter DevTools</span>
        <span className="sp-badge">inspector</span>
      </div>

      <FrameGraph className="sp-frames" />

      <div className="sp-section-head">
        <span>Widget rebuilds</span>
        <button className="sp-reset" onClick={resetRebuilds} aria-label="Reset rebuild counts">
          <RotateCcw size={10} />
        </button>
      </div>
      <div className="sp-tree">
        {tree.map(node => {
          const count = counts[node.name] ?? 0;
          const hot = node.name === last;
          return (
            <div key={node.name} className={`sp-node${hot ? " hot" : ""}`} style={{ paddingLeft: 6 + node.depth * 12 }}>
              <span className="sp-node-name">{node.depth ? "└ " : ""}{node.name}</span>
              <motion.span key={`${node.name}-${hot ? tick : 0}`} className="sp-node-count" initial={hot ? { scale: 1.5 } : false} animate={{ scale: 1 }}>
                {count}
              </motion.span>
            </div>
          );
        })}
      </div>
      <p className="sp-note">{NOTES[app]}</p>
    </div>
  );
}

/* ── Software Engineer lens: the request's path through the backend ── */

type Span = { label: string; detail: string; icon: typeof Server; ms: number; color: string };

function spansFor(req: PhoneRequest): Span[] {
  const jitter = (base: number) => Math.round(base * (0.8 + Math.random() * 0.4));
  if (!req.ok) {
    return [{ label: "Flutter client", detail: "validation failed — request never sent", icon: Smartphone, ms: jitter(2), color: "rgb(var(--accent))" }];
  }
  if (req.kind === "form") {
    return [
      { label: "Flutter client", detail: "validate · serialize typed result", icon: Smartphone, ms: jitter(4), color: "rgb(var(--accent))" },
      { label: "HTTPS", detail: `${req.method} ${req.path}`, icon: Globe, ms: jitter(38), color: "#94a3b8" },
      { label: "Spring Security", detail: "JWT filter · role check", icon: Shield, ms: jitter(3), color: "#a78bfa" },
      { label: "FarmService", detail: "@Transactional · Jakarta validation", icon: Server, ms: jitter(6), color: "#6DB33F" },
      { label: "PostgreSQL", detail: "INSERT INTO farms … RETURNING id", icon: Database, ms: jitter(9), color: "#6B8FE3" },
    ];
  }
  return [
    { label: "Flutter client", detail: "diff vs baseline snapshot", icon: Smartphone, ms: jitter(3), color: "rgb(var(--accent))" },
    { label: "HTTPS", detail: `${req.method} ${req.path}`, icon: Globe, ms: jitter(41), color: "#94a3b8" },
    { label: "Spring Security", detail: "JWT filter · refresh if expired", icon: Shield, ms: jitter(3), color: "#a78bfa" },
    { label: "SyncService", detail: "per-field merge · LWW on conflict", icon: Server, ms: jitter(7), color: "#6DB33F" },
    { label: "PostgreSQL", detail: "UPDATE visits … WHERE version = ?", icon: Database, ms: jitter(8), color: "#6B8FE3" },
  ];
}

export function TracePanel() {
  const req = useLastRequest();
  const spans = useMemo(() => (req ? spansFor(req) : []), [req]);
  const total = spans.reduce((a, s) => a + s.ms, 0);
  const [shown, setShown] = useState(0);

  // Reveal spans one after another, like a trace filling in
  useEffect(() => {
    setShown(0);
    if (!spans.length) return;
    const timers = spans.map((_, i) => setTimeout(() => setShown(i + 1), 180 * (i + 1)));
    return () => timers.forEach(clearTimeout);
  }, [spans]);

  let offset = 0;

  return (
    <div className="sp sp-trace">
      <div className="sp-head">
        <Server size={13} />
        <span className="sp-title">Request trace</span>
        <span className="sp-badge">simulated</span>
      </div>

      {!req ? (
        <div className="sp-idle">
          <div className="sp-stack">
            {[
              { icon: Smartphone, label: "Flutter app", sub: "Riverpod · typed models" },
              { icon: Shield, label: "Spring Security", sub: "JWT access + refresh" },
              { icon: Server, label: "Spring Boot 3", sub: "REST · Clean layers" },
              { icon: Database, label: "PostgreSQL", sub: "Flyway · indexes" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                className="sp-stack-row"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Icon size={12} />
                <span className="sp-stack-label">{label}</span>
                <span className="sp-stack-sub">{sub}</span>
              </motion.div>
            ))}
          </div>
          <p className="sp-note">Submit the form or sync a visit on the phone to watch the request travel the stack.</p>
        </div>
      ) : (
        <>
          <div className="sp-req">
            <span className={`sp-method sp-method-${req.method.toLowerCase()}`}>{req.ok ? req.method : "—"}</span>
            <span className="sp-path">{req.ok ? req.path : "blocked on device"}</span>
          </div>
          <div className="sp-spans">
            <AnimatePresence initial={false}>
              {spans.slice(0, shown).map((s, i) => {
                const left = (offset / total) * 100;
                const width = Math.max(3, (s.ms / total) * 100);
                offset += s.ms;
                const Icon = s.icon;
                return (
                  <motion.div key={`${req.id}-${i}`} className="sp-span" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="sp-span-top">
                      <Icon size={11} />
                      <span className="sp-span-label">{s.label}</span>
                      <span className="sp-span-ms">{s.ms} ms</span>
                    </div>
                    <div className="sp-span-track">
                      <motion.div
                        className="sp-span-bar"
                        style={{ left: `${left}%`, background: s.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span className="sp-span-detail">{s.detail}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {shown === spans.length && (
            <motion.div className={`sp-result${req.ok ? "" : " sp-result-warn"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {req.ok
                ? `${req.kind === "form" ? "201 Created" : "200 OK"} · ${total} ms · ${req.summary}`
                : "Invalid input caught on the device — no wasted round trip"}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
