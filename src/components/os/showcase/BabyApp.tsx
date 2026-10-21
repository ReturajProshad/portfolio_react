"use client";

import { memo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gamepad2, WifiOff, FlaskConical, ExternalLink } from "lucide-react";
import { useRebuildTracker } from "./store";

const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.returaj.amarBabu";

// Common size comparisons used by pregnancy trackers
const WEEKS = [
  { week: 16, fruit: "🥑", name: "অ্যাভোকাডো", trimester: 2 },
  { week: 20, fruit: "🍌", name: "কলা", trimester: 2 },
  { week: 24, fruit: "🌽", name: "ভুট্টা", trimester: 2 },
  { week: 28, fruit: "🍆", name: "বেগুন", trimester: 3 },
  { week: 40, fruit: "🍉", name: "তরমুজ", trimester: 3 },
];

const LINES = ["হ্যালো আম্মু! 👋", "আমি বড় হচ্ছি!", "আজ পানি খেয়েছ?", "হি হি! 😄"];

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bn = (n: number) => String(n).replace(/\d/g, d => BN_DIGITS[Number(d)]);

const WeekCard = memo(function WeekCard({ idx, onStep }: { idx: number; onStep: (d: number) => void }) {
  const ref = useRebuildTracker<HTMLDivElement>("WeekTracker");
  const w = WEEKS[idx];
  const progress = w.week / 40;
  return (
    <div ref={ref} className="bb-week">
      <button className="bb-step" onClick={() => onStep(-1)} disabled={idx === 0} aria-label="Previous week">
        <ChevronLeft size={12} />
      </button>
      <div className="bb-ring" style={{ "--p": progress } as React.CSSProperties}>
        <span className="bb-ring-week">সপ্তাহ {bn(w.week)}</span>
        <span className="bb-ring-sub">{w.trimester === 2 ? "দ্বিতীয়" : "তৃতীয়"} ত্রৈমাসিক</span>
      </div>
      <button className="bb-step" onClick={() => onStep(1)} disabled={idx === WEEKS.length - 1} aria-label="Next week">
        <ChevronRight size={12} />
      </button>
    </div>
  );
});

const TalkingBaby = memo(function TalkingBaby({ fruit, name }: { fruit: string; name: string }) {
  const ref = useRebuildTracker<HTMLDivElement>("TalkingBaby");
  const [line, setLine] = useState<string | null>(null);
  const [taps, setTaps] = useState(0);

  const tap = () => {
    setTaps(t => t + 1);
    setLine(LINES[taps % LINES.length]);
  };

  return (
    <div ref={ref} className="bb-baby-wrap">
      <AnimatePresence mode="wait">
        {line && (
          <motion.span
            key={`${line}-${taps}`}
            className="bb-bubble"
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            {line}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.button
        key={taps}
        className="bb-baby"
        onClick={tap}
        aria-label="Tap the baby"
        animate={taps ? { rotate: [0, -12, 10, -6, 0], scale: [1, 1.18, 0.95, 1.05, 1] } : {}}
        transition={{ duration: 0.6 }}
      >
        👶
      </motion.button>
      <span className="bb-size">
        এখন আকারে একটা <strong>{name}</strong> {fruit}
      </span>
    </div>
  );
});

export default function BabyApp() {
  const ref = useRebuildTracker<HTMLDivElement>("AmarBabuApp");
  const [idx, setIdx] = useState(2);
  const w = WEEKS[idx];
  const step = useCallback((d: number) => setIdx(i => Math.min(WEEKS.length - 1, Math.max(0, i + d))), []);

  return (
    <div ref={ref} className="ph-app bb-app">
      <div className="ph-appbar bb-appbar">
        <span className="ph-appbar-title bb-title">আমার বাবু</span>
        <span className="bb-live">Live on Play</span>
      </div>
      <div className="bb-body">
        <WeekCard idx={idx} onStep={step} />
        <TalkingBaby fruit={w.fruit} name={w.name} />
        <div className="bb-tiles">
          <span><Gamepad2 size={11} /> 6 Flame games</span>
          <span><WifiOff size={11} /> Offline-first</span>
          <span><FlaskConical size={11} /> 127 tests</span>
        </div>
        <a className="ph-btn bb-play" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">
          Get it on Google Play <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
