"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { Pen } from "lucide-react";
import { personal } from "@/data/portfolio";
import profilePic from "@/assets/Returaj_Proshad.png";

enum Phase {
  Hidden,
  FadeIn,
  PenShow,
  Write1,
  MoveTo2,
  Write2,
  PenFadeOut,
  Done,
}

interface ContourData {
  points: { x: number; y: number }[];
  canvasW: number;
  canvasMinY: number;
  canvasMaxY: number;
}

function extractContour(text: string, fontSize: number): ContourData | null {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.font = `700 ${fontSize}px Caveat`;
  const metrics = ctx.measureText(text);
  const w = Math.ceil(metrics.width) + 4;
  const h = Math.ceil(fontSize * 2);
  canvas.width = w;
  canvas.height = h;

  ctx.font = `700 ${fontSize}px Caveat`;
  ctx.textBaseline = "bottom";
  ctx.fillText(text, 0, h - 6);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const raw: { x: number; y: number }[] = [];
  let minY = h;
  let maxY = 0;

  for (let x = 0; x < w; x++) {
    let y = -1;
    for (let j = h - 1; j >= 0; j--) {
      if (data[(j * w + x) * 4 + 3] > 30) {
        y = j;
        break;
      }
    }
    if (y >= 0) {
      raw.push({ x, y });
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else if (raw.length > 0) {
      raw.push({ x, y: raw[raw.length - 1].y });
    }
  }
  if (raw.length < 4) return null;

  const win = 4;
  const smoothed: { x: number; y: number }[] = [];
  for (let i = 0; i < raw.length; i++) {
    let sy = 0;
    let n = 0;
    for (let j = Math.max(0, i - win); j <= Math.min(raw.length - 1, i + win); j++) {
      sy += raw[j].y;
      n++;
    }
    smoothed.push({ x: raw[i].x, y: sy / n });
  }

  const step = 3;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < smoothed.length; i += step) points.push(smoothed[i]);
  const last = smoothed[smoothed.length - 1];
  if (points[points.length - 1] !== last) points.push(last);

  return { points, canvasW: w, canvasMinY: minY, canvasMaxY: maxY };
}

function lerpPoint(
  points: { x: number; y: number }[],
  t: number
): { x: number; y: number } {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0];
  const idx = t * (points.length - 1);
  const i0 = Math.floor(idx);
  const i1 = Math.min(i0 + 1, points.length - 1);
  const f = idx - i0;
  return {
    x: points[i0].x + (points[i1].x - points[i0].x) * f,
    y: points[i0].y + (points[i1].y - points[i0].y) * f,
  };
}

const PIC_SIZE = 100;
const PIC_SIZE_CORNER = 70;

export default function WritingReveal() {
  const [phase, setPhase] = useState(Phase.Hidden);
  const [line1Prog, setLine1Prog] = useState(0);
  const [line2Prog, setLine2Prog] = useState(0);
  const [picPhase, setPicPhase] = useState<'hidden' | 'appear' | 'move'>('hidden');

  const line1SizerRef = useRef<HTMLSpanElement>(null);
  const line2SizerRef = useRef<HTMLSpanElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const c1Ref = useRef<ContourData | null>(null);
  const c2Ref = useRef<ContourData | null>(null);

  const penX = useMotionValue(0);
  const penY = useMotionValue(2);
  const penRotate = useMotionValue(-4);
  const penOpacity = useMotionValue(0);

  const picLeft = useMotionValue(0);
  const picTop = useMotionValue(0);
  const picScale = useMotionValue(0.5);
  const picOpacity = useMotionValue(0);

  useEffect(() => {
    c1Ref.current = extractContour(personal.fullName, 56);
    c2Ref.current = extractContour(personal.role, 32);
  }, []);

  const getTransform = useCallback(
    (sizerRef: React.RefObject<HTMLSpanElement | null>, canvasW: number) => {
      const el = sizerRef.current;
      if (!el || !canvasW) return { scale: 1, ox: 0, oy: 0, domH: 1 };
      const rect = el.getBoundingClientRect();
      const parent = el.closest(".writing-reveal");
      const pRect = parent?.getBoundingClientRect();
      const ox = rect.left - (pRect?.left ?? 0);
      const oy = rect.top - (pRect?.top ?? 0);
      return { scale: rect.width / canvasW, ox, oy, domH: rect.height };
    },
    []
  );

  const updatePen = useCallback(
    (
      progress: number,
      contour: ContourData | null,
      sizerRef: React.RefObject<HTMLSpanElement | null>
    ) => {
      if (!contour || !contour.points.length) return;
      const { scale, ox, oy, domH } = getTransform(sizerRef, contour.canvasW);
      const pt = lerpPoint(contour.points, progress);
      const yRange = contour.canvasMaxY - contour.canvasMinY;
      const yNorm = yRange > 0 ? (pt.y - contour.canvasMinY) / yRange : 0.5;
      penX.set(pt.x * scale + ox);
      penY.set(oy + yNorm * domH);
    },
    [penX, penY, getTransform]
  );

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    setPhase(Phase.FadeIn);
  }, []);

  useEffect(() => {
    if (phase !== Phase.FadeIn) return;
    const t = setTimeout(() => setPhase(Phase.PenShow), 600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== Phase.PenShow) return;
    const t = setTimeout(() => {
      penOpacity.set(1);
      setPhase(Phase.Write1);
    }, 300);
    return () => clearTimeout(t);
  }, [phase, penOpacity]);

  useEffect(() => {
    if (phase !== Phase.Write1 && phase !== Phase.Write2) return;
    const c = animate(penRotate, [-8, -2], {
      duration: 0.35,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });
    return () => c.stop();
  }, [phase, penRotate]);

  useEffect(() => {
    if (phase !== Phase.Write1) return;
    const contour = c1Ref.current;
    if (!contour) return;
    const c = animate(0, 1, {
      duration: 2.2,
      ease: "easeInOut",
      onUpdate: (v) => {
        setLine1Prog(v);
        updatePen(v, contour, line1SizerRef);
      },
      onComplete: () => setPhase(Phase.MoveTo2),
    });
    return () => c.stop();
  }, [phase, updatePen]);

  useEffect(() => {
    if (phase !== Phase.MoveTo2) return;
    const contour = c1Ref.current;
    if (contour && contour.points.length > 0) {
      const { scale, ox } = getTransform(line1SizerRef, contour.canvasW);
      const last = contour.points[contour.points.length - 1];
      penX.set(last.x * scale + ox);
    }
    const targetY =
      (line2SizerRef.current?.getBoundingClientRect().top ?? 0) -
      (line1SizerRef.current?.closest(".writing-reveal")?.getBoundingClientRect().top ?? 0);
    const c2 = c2Ref.current;
    const { ox: ox2 } = getTransform(line2SizerRef, c2?.canvasW ?? 0);
    const stopX = animate(penX, ox2, { duration: 0.35, ease: "easeInOut" });
    const stopY = animate(penY, targetY, { duration: 0.35, ease: "easeInOut" });
    const stopRot = animate(penRotate, -4, { duration: 0.15 });
    const t = setTimeout(() => setPhase(Phase.Write2), 400);
    return () => { stopX.stop(); stopY.stop(); stopRot.stop(); clearTimeout(t); };
  }, [phase, penX, penY, penRotate, getTransform]);

  useEffect(() => {
    if (phase !== Phase.Write2) return;
    const contour = c2Ref.current;
    if (!contour) return;
    const c = animate(0, 1, {
      duration: 1.6,
      ease: "easeInOut",
      onUpdate: (v) => {
        setLine2Prog(v);
        updatePen(v, contour, line2SizerRef);
      },
      onComplete: () => setPhase(Phase.PenFadeOut),
    });
    return () => c.stop();
  }, [phase, updatePen]);

  useEffect(() => {
    if (phase !== Phase.PenFadeOut) return;
    const stopRot = animate(penRotate, [8, -4, 6, 0], {
      duration: 0.5,
      ease: "easeInOut",
    });
    const t = setTimeout(() => {
      const stopOp = animate(penOpacity, 0, { duration: 0.6 });
      const t2 = setTimeout(() => setPhase(Phase.Done), 700);
      return () => { stopOp.stop(); clearTimeout(t2); };
    }, 400);
    return () => { stopRot.stop(); clearTimeout(t); };
  }, [phase, penRotate, penOpacity]);

  // Picture sequence: appear next to text, then slide to corner
  useEffect(() => {
    if (phase !== Phase.Done) return;
    const t1 = setTimeout(() => {
      setPicPhase('appear');
      // Position next to text
      const el = textColRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        animate(picLeft, r.right + 32, { duration: 0.4, ease: "easeOut" });
        animate(picTop, r.top + (r.height - PIC_SIZE) / 2, { duration: 0.4, ease: "easeOut" });
      }
      animate(picOpacity, 1, { duration: 0.4, ease: "easeOut" });
      animate(picScale, 1, { duration: 0.4, ease: "easeOut" });
    }, 500);

    const t2 = setTimeout(() => {
      setPicPhase('move');
      const cX = window.innerWidth - PIC_SIZE_CORNER - 24;
      const cY = window.innerHeight - PIC_SIZE_CORNER - 76;
      animate(picLeft, cX, { duration: 0.8, ease: "easeInOut" });
      animate(picTop, cY, { duration: 0.8, ease: "easeInOut" });
      animate(picScale, PIC_SIZE_CORNER / PIC_SIZE, { duration: 0.8, ease: "easeInOut" });
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, picLeft, picTop, picScale, picOpacity]);

  const penSize = 24;

  return (
    <motion.div
      className="writing-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase >= Phase.FadeIn ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="writing-reveal-body">
        {/* Text column */}
        <div ref={textColRef} className="writing-reveal-text">
          <div className="reveal-line">
            <span ref={line1SizerRef} className="reveal-text-sizer" aria-hidden>
              {personal.fullName}
            </span>
            <div
              className="reveal-overlay"
              style={{
                width:
                  phase >= Phase.Write1
                    ? phase < Phase.MoveTo2
                      ? `${line1Prog * 100}%`
                      : "100%"
                    : "0%",
              }}
            >
              <span className="reveal-text-bright">{personal.fullName}</span>
            </div>
          </div>

          <div className="reveal-line">
            <span ref={line2SizerRef} className="reveal-text-sizer reveal-text-sizer-sub" aria-hidden>
              {personal.role}
            </span>
            <div
              className="reveal-overlay"
              style={{
                width:
                  phase >= Phase.Write2
                    ? phase < Phase.PenFadeOut
                      ? `${line2Prog * 100}%`
                      : "100%"
                    : "0%",
              }}
            >
              <span className="reveal-text-bright reveal-text-bright-sub">
                {personal.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {phase >= Phase.Write1 && phase < Phase.PenFadeOut && (
        <motion.div
          className="reveal-ink"
          style={{ left: penX, top: penY }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        className="reveal-pen"
        style={{
          left: penX,
          top: penY,
          opacity: penOpacity,
          rotate: penRotate,
        }}
      >
        <div className="reveal-pen-inner">
          <Pen size={penSize} />
        </div>
      </motion.div>

      {/* Profile picture — fixed position, slides from inline to corner */}
      {picPhase !== 'hidden' && (
        <motion.div
          className="writing-reveal-pic writing-reveal-pic-fixed"
          style={{
            left: picLeft,
            top: picTop,
            opacity: picOpacity,
            scale: picScale,
          }}
        >
          <img src={profilePic.src} alt={personal.fullName} />
        </motion.div>
      )}
    </motion.div>
  );
}
