"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { Lock, Play } from "lucide-react";
import { useRebuildTracker } from "./store";
import { BackButton } from "./PhoneApps";

/* A small, working copy of Amar Babu's home screen (the real app is Flutter
   + Flame). Same layout and Bangla copy: week chips with locked future weeks,
   the talking baby in its bubble, this week's size card, and a mini-game. */

const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.returaj.amarBabu";
const CURRENT_WEEK = 30;
const UNLOCKED_UNTIL = 32;
const WEEKS = [24, 26, 28, 30, 32, 34, 36, 38, 40];

// Size comparisons for the unlocked weeks
const SIZES: Record<number, { name: string; emoji: string }> = {
  24: { name: "ভুট্টা", emoji: "🌽" },
  26: { name: "লেটুস", emoji: "🥬" },
  28: { name: "বেগুন", emoji: "🍆" },
  30: { name: "বাঁধাকপি", emoji: "🥦" },
  32: { name: "আনারস", emoji: "🍍" },
};

const LINES = ["হ্যালো আম্মু! 👋", "আমি বড় হচ্ছি!", "আজ পানি খেয়েছ?", "হি হি! কাতুকুতু লাগে 😄", "তোমাকে ভালোবাসি ❤️"];

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bn = (n: number) => String(n).replace(/\d/g, d => BN_DIGITS[Number(d)]);

/* ── Week chips ── */

const WeekChips = memo(function WeekChips({ week, onPick }: { week: number; onPick: (w: number) => void }) {
  const ref = useRebuildTracker<HTMLDivElement>("WeekChips");
  const [shake, setShake] = useState<number | null>(null);

  return (
    <div ref={ref} className="bb-chips">
      {WEEKS.map(w => {
        const locked = w > UNLOCKED_UNTIL;
        const selected = w === week;
        const next = w === UNLOCKED_UNTIL && !selected;
        return (
          <motion.button
            key={w}
            className={`bb-chip${selected ? " selected" : ""}${locked ? " locked" : ""}${next ? " next" : ""}`}
            onClick={() => (locked ? setShake(w) : onPick(w))}
            animate={shake === w ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
            onAnimationComplete={() => shake === w && setShake(null)}
            transition={{ duration: 0.35 }}
            whileTap={{ scale: 0.92 }}
            aria-label={locked ? `সপ্তাহ ${bn(w)} — লক করা` : `সপ্তাহ ${bn(w)}`}
          >
            {bn(w)}
            {locked && <span className="bb-chip-badge"><Lock size={7} /></span>}
            {next && <span className="bb-chip-badge bb-chip-play"><Play size={7} /></span>}
          </motion.button>
        );
      })}
    </div>
  );
});

/* ── Baby in a bubble ── */

const TalkingBaby = memo(function TalkingBaby() {
  const ref = useRebuildTracker<HTMLDivElement>("TalkingBaby");
  const controls = useAnimationControls();
  const [line, setLine] = useState<string | null>(null);
  const [taps, setTaps] = useState(0);
  const [hearts, setHearts] = useState<number[]>([]);
  const heartId = useRef(0);

  const tap = () => {
    setTaps(t => t + 1);
    setLine(LINES[taps % LINES.length]);
    controls.start({
      scale: [1, 1.12, 0.94, 1.04, 1],
      rotate: [0, -8, 7, -3, 0],
      transition: { duration: 0.6 },
    });
  };

  const love = () => {
    const ids = [1, 2, 3, 4, 5].map(() => ++heartId.current);
    setHearts(h => [...h, ...ids]);
    setTimeout(() => setHearts(h => h.filter(id => !ids.includes(id))), 1300);
  };

  useEffect(() => {
    if (!line) return;
    const t = setTimeout(() => setLine(null), 2200);
    return () => clearTimeout(t);
  }, [line, taps]);

  return (
    <div ref={ref} className="bb-stage">
      <AnimatePresence>
        {line && (
          <motion.span
            key={`${line}-${taps}`}
            className="bb-bubble"
            initial={{ opacity: 0, y: 8, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
          >
            {line}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        className="bb-orb"
        onClick={tap}
        aria-label="বাবুকে ট্যাপ করো"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg viewBox="0 0 100 100" className="bb-baby-svg" animate={controls} aria-hidden="true">
          {/* arms */}
          <ellipse cx="22" cy="56" rx="9" ry="5" transform="rotate(-30 22 56)" fill="#e5175f" />
          <ellipse cx="78" cy="56" rx="9" ry="5" transform="rotate(30 78 56)" fill="#e5175f" />
          <circle cx="15" cy="64" r="5" fill="#e5175f" />
          <circle cx="85" cy="64" r="5" fill="#e5175f" />
          {/* body + feet */}
          <ellipse cx="50" cy="66" rx="13" ry="14" fill="#e5175f" />
          <ellipse cx="43" cy="86" rx="5" ry="8" fill="#e5175f" />
          <ellipse cx="57" cy="86" rx="5" ry="8" fill="#e5175f" />
          <circle cx="50" cy="68" r="1.4" fill="#b80f4a" />
          {/* head */}
          <circle cx="29" cy="36" r="5" fill="#e5175f" />
          <circle cx="71" cy="36" r="5" fill="#e5175f" />
          <circle cx="50" cy="36" r="21" fill="#e5175f" />
          <circle cx="43" cy="27" r="5" fill="#ffffff" opacity="0.25" />
          <circle cx="36" cy="41" r="5" fill="#ff8fb5" opacity="0.6" />
          <circle cx="64" cy="41" r="5" fill="#ff8fb5" opacity="0.6" />
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] }}
            style={{ originY: "35px" }}
          >
            <circle cx="43" cy="35" r="3" fill="#ffffff" />
            <circle cx="57" cy="35" r="3" fill="#ffffff" />
            <circle cx="43.6" cy="35.5" r="1.7" fill="#2b0a16" />
            <circle cx="57.6" cy="35.5" r="1.7" fill="#2b0a16" />
          </motion.g>
          <path d="M44 44 Q50 49 56 44" stroke="#8a0c3a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M40 24 Q43 22 46 24 M54 24 Q57 22 60 24" stroke="#8a0c3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </motion.svg>
      </motion.button>

      <span className="bb-tap-chip">ট্যাপ করো 💬</span>

      <motion.button className="bb-heart" onClick={love} whileTap={{ scale: 0.85 }} aria-label="ভালোবাসা পাঠাও">
        ❤️
      </motion.button>
      <AnimatePresence>
        {hearts.map((id, i) => (
          <motion.span
            key={id}
            className="bb-float-heart"
            initial={{ opacity: 1, y: 0, x: 0, scale: 0.6 }}
            animate={{ opacity: 0, y: -90 - (i % 3) * 18, x: ((i % 5) - 2) * 14, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            ❤️
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
});

/* ── Size card ── */

const SizeCard = memo(function SizeCard({ week, onGame }: { week: number; onGame: () => void }) {
  const ref = useRebuildTracker<HTMLDivElement>("SizeCard");
  const size = SIZES[week];
  const left = 40 - week;
  return (
    <div ref={ref} className="bb-card">
      <div className="bb-card-top">
        <div>
          <span className="bb-card-kicker">এই সপ্তাহে তুমি</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={week}
              className="bb-card-size"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {size.name} {size.emoji}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="bb-card-left">
          <span className="bb-card-kicker">আর বাকি</span>
          <span className="bb-card-num">{bn(left)}</span>
          <span className="bb-card-kicker">সপ্তাহ</span>
        </div>
      </div>
      <div className="bb-card-actions">
        <button className="bb-btn-ghost">🗣️ বার্তা</button>
        <a className="bb-btn" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">
          📖 বাবুর গল্প পড়ুন
        </a>
      </div>
      <motion.button className="bb-game-fab" onClick={onGame} whileTap={{ scale: 0.9 }} aria-label="মিনি গেম খেলো">
        🎮
      </motion.button>
    </div>
  );
});

/* ── Mini-game: pop the balloons (the real app ships 6 Flame games) ── */

const BALLOONS = ["🎈", "🫧", "🎈", "⭐", "🎈", "🫧"];

function BalloonGame({ onClose }: { onClose: () => void }) {
  const ref = useRebuildTracker<HTMLDivElement>("BalloonGame");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [balloons, setBalloons] = useState<{ id: number; x: number; emoji: string; speed: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const spawn = setInterval(() => {
      const id = ++nextId.current;
      setBalloons(b => [
        ...b.slice(-7),
        { id, x: 8 + Math.random() * 74, emoji: BALLOONS[id % BALLOONS.length], speed: 2.4 + Math.random() * 1.4 },
      ]);
    }, 520);
    return () => clearInterval(spawn);
  }, [timeLeft]);

  const pop = (id: number) => {
    setBalloons(b => b.filter(x => x.id !== id));
    setScore(s => s + 1);
  };

  const over = timeLeft <= 0;

  return (
    <motion.div
      ref={ref}
      className="bb-game"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="bb-game-hud">
        <span>স্কোর {bn(score)}</span>
        <span>⏱ {bn(Math.max(0, timeLeft))}</span>
        <button onClick={onClose} aria-label="বন্ধ করো">✕</button>
      </div>
      {!over &&
        balloons.map(b => (
          <motion.button
            key={b.id}
            className="bb-balloon"
            style={{ left: `${b.x}%` }}
            initial={{ y: 260, opacity: 1 }}
            animate={{ y: -60 }}
            exit={{ scale: 1.8, opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: b.speed, ease: "linear" }}
            onPointerDown={() => pop(b.id)}
            aria-label="বেলুন ফাটাও"
          >
            {b.emoji}
          </motion.button>
        ))}
      {over && (
        <motion.div className="bb-game-over" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <span className="bb-game-score">{bn(score)}</span>
          <span>বেলুন ফাটিয়েছ! 🎉</span>
          <button className="bb-btn" onClick={() => { setScore(0); setBalloons([]); setTimeLeft(10); }}>
            আবার খেলো
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ── App ── */

const NAV = [
  { id: "home", icon: "🏠", label: "হোম" },
  { id: "mood", icon: "😊", label: "মন" },
  { id: "milestone", icon: "🌟", label: "মাইলস্টোন" },
  { id: "profile", icon: "👤", label: "প্রোফাইল" },
];

const MOODS = ["😄", "🙂", "😐", "😔", "😫"];

export default function BabyApp() {
  const ref = useRebuildTracker<HTMLDivElement>("AmarBabuApp");
  const [week, setWeek] = useState(CURRENT_WEEK);
  const [tab, setTab] = useState("home");
  const [game, setGame] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const pickWeek = useCallback((w: number) => setWeek(w), []);
  const openGame = useCallback(() => setGame(true), []);

  return (
    <div ref={ref} className="ph-app bb-app">
      <div className="bb-scroll">
        <div className="bb-header-row">
          <BackButton tone="light" />
          <div className="bb-header">
            <span className="bb-hi">হাই, আম্মু! 👋</span>
            <span className="bb-title">আমার বাবু</span>
          </div>
        </div>

        {tab === "home" && (
          <>
            <div className="bb-progress-head">
              <span>গর্ভাবস্থার সপ্তাহ</span>
              <span className="bb-pill">সপ্তাহ {bn(week)} / ৪০</span>
            </div>
            <div className="bb-progress">
              <motion.div className="bb-progress-fill" initial={false} animate={{ scaleX: week / 40 }} transition={{ type: "spring", stiffness: 200, damping: 26 }} />
            </div>
            <WeekChips week={week} onPick={pickWeek} />
            <span className="bb-trimester">
              {week >= 28 ? "৩য়" : "২য়"} ত্রৈমাসিক · {bn(40 - week)} সপ্তাহ বাকি
            </span>
            <TalkingBaby />
            <SizeCard week={week} onGame={openGame} />
          </>
        )}

        {tab === "mood" && (
          <motion.div className="bb-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bb-panel-title">আজ তোমার মন কেমন?</span>
            <div className="bb-moods">
              {MOODS.map(m => (
                <motion.button
                  key={m}
                  className={`bb-mood${mood === m ? " selected" : ""}`}
                  onClick={() => setMood(m)}
                  whileTap={{ scale: 0.85 }}
                  animate={mood === m ? { scale: 1.15 } : { scale: 1 }}
                >
                  {m}
                </motion.button>
              ))}
            </div>
            {mood && <span className="bb-panel-note">সেভ হয়েছে — অফলাইনেও থাকবে ✓</span>}
          </motion.div>
        )}

        {(tab === "milestone" || tab === "profile") && (
          <motion.div className="bb-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bb-panel-title">{tab === "milestone" ? "মাইলস্টোন" : "প্রোফাইল"}</span>
            <span className="bb-panel-note">পুরো ফিচার অ্যাপে আছে</span>
            <a className="bb-btn" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">Google Play-তে দেখো</a>
          </motion.div>
        )}
      </div>

      <nav className="bb-nav">
        {NAV.map(n => (
          <button key={n.id} className={`bb-nav-item${tab === n.id ? " active" : ""}`} onClick={() => setTab(n.id)}>
            {tab === n.id && <motion.span layoutId="bb-nav-pill" className="bb-nav-pill" />}
            <span className="bb-nav-icon">{n.icon}</span>
            <span className="bb-nav-label">{n.label}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence>{game && <BalloonGame onClose={() => setGame(false)} />}</AnimatePresence>
    </div>
  );
}
