"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { Pen } from "lucide-react";
import Image from "next/image";
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
const PIC_SIZE_AVATAR = 36;
const MOBILE_BREAKPOINT = 768;

function isMobileViewport() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

// The picture is scaled around its centre, so offset by half the shrink
// to land the visible (scaled) image exactly where we want it.
function getCornerPos() {
  if (isMobileViewport()) {
    const shrink = (PIC_SIZE - PIC_SIZE_AVATAR) / 2;
    return { x: 12 - shrink, y: 8 - shrink, size: PIC_SIZE_AVATAR };
  }
  const shrink = (PIC_SIZE - PIC_SIZE_CORNER) / 2;
  return {
    x: window.innerWidth - PIC_SIZE_CORNER - 24 - shrink,
    y: window.innerHeight - PIC_SIZE_CORNER - 76 - shrink,
    size: PIC_SIZE_CORNER,
  };
}

// The pen traces glyph outlines measured on a canvas, so the handwriting
// font must be loaded first or the path follows the fallback font.
async function waitForHandwritingFont(timeoutMs = 1500) {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  await Promise.race([
    Promise.all([
      document.fonts.load("700 56px Caveat"),
      document.fonts.load("600 32px Caveat"),
    ]),
    new Promise((resolve) => setTimeout(resolve, timeoutMs)),
  ]).catch(() => undefined);
}

export default function WritingReveal({ onPicClick, onDone }: { onPicClick?: () => void; onDone?: () => void }) {
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
  const cornerRef = useRef({ x: 0, y: 0, size: PIC_SIZE_CORNER });

  const penX = useMotionValue(0);
  const penY = useMotionValue(2);
  const penRotate = useMotionValue(-4);
  const penOpacity = useMotionValue(0);

  const picLeft = useMotionValue(0);
  const picTop = useMotionValue(0);
  const picScale = useMotionValue(0.5);
  const picOpacity = useMotionValue(0);

  useEffect(() => {
    cornerRef.current = getCornerPos();
    const onResize = () => { cornerRef.current = getCornerPos(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
    // No cancel flag: the `started` guard already prevents a second run under
    // StrictMode, and a cancel would leave the animation stuck in dev.
    waitForHandwritingFont().then(() => {
      c1Ref.current = extractContour(personal.fullName, 56);
      c2Ref.current = extractContour(personal.role, 32);
      setPhase(Phase.FadeIn);
    });
  }, []);

  useEffect(() => {
    if (phase !== Phase.FadeIn) return;
    const t = setTimeout(() => setPhase(Phase.PenShow), 250);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== Phase.PenShow) return;
    const t = setTimeout(() => {
      penOpacity.set(1);
      setPhase(Phase.Write1);
    }, 150);
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
      duration: 1.0,
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
    const stopX = animate(penX, ox2, { duration: 0.2, ease: "easeInOut" });
    const stopY = animate(penY, targetY, { duration: 0.2, ease: "easeInOut" });
    const stopRot = animate(penRotate, -4, { duration: 0.1 });
    const t = setTimeout(() => setPhase(Phase.Write2), 250);
    return () => { stopX.stop(); stopY.stop(); stopRot.stop(); clearTimeout(t); };
  }, [phase, penX, penY, penRotate, getTransform]);

  useEffect(() => {
    if (phase !== Phase.Write2) return;
    const contour = c2Ref.current;
    if (!contour) return;
    const c = animate(0, 1, {
      duration: 0.8,
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
    const stopRot = animate(penRotate, [6, -3, 4, 0], {
      duration: 0.3,
      ease: "easeInOut",
    });
    const t = setTimeout(() => {
      const stopOp = animate(penOpacity, 0, { duration: 0.3 });
      const t2 = setTimeout(() => setPhase(Phase.Done), 400);
      return () => { stopOp.stop(); clearTimeout(t2); };
    }, 200);
    return () => { stopRot.stop(); clearTimeout(t); };
  }, [phase, penRotate, penOpacity]);

  useEffect(() => {
    if (phase !== Phase.Done) return;
    onDone?.();
  }, [phase, onDone]);

  // Picture: start appearing during Write1, slide to corner during Write2
  useEffect(() => {
    if (phase !== Phase.Write1) return;
    const t = setTimeout(() => {
      setPicPhase('appear');
      const el = textColRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        animate(picLeft, r.right + 32, { duration: 0.3, ease: "easeOut" });
        animate(picTop, r.top + (r.height - PIC_SIZE) / 2, { duration: 0.3, ease: "easeOut" });
      }
      animate(picOpacity, 1, { duration: 0.3, ease: "easeOut" });
      animate(picScale, 1, { duration: 0.3, ease: "easeOut" });
    }, 300);
    return () => clearTimeout(t);
  }, [phase, picLeft, picTop, picScale, picOpacity]);

  useEffect(() => {
    if (phase !== Phase.Write2) return;
    const t = setTimeout(() => {
      setPicPhase('move');
      const cp = cornerRef.current;
      animate(picLeft, cp.x, { duration: 0.7, ease: "easeInOut" });
      animate(picTop, cp.y, { duration: 0.7, ease: "easeInOut" });
      animate(picScale, cp.size / PIC_SIZE, { duration: 0.7, ease: "easeInOut" });
    }, 100);
    return () => clearTimeout(t);
  }, [phase, picLeft, picTop, picScale, picOpacity]);

  return (
    <>
      <motion.div
        className="writing-reveal"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= Phase.FadeIn ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="writing-reveal-body">
          <div ref={textColRef} className="writing-reveal-text">
            <div className="reveal-line">
              <span ref={line1SizerRef} className="reveal-text-sizer" aria-hidden>
                {personal.fullName}
              </span>
              <div
                className="reveal-overlay"
                style={{
                  width: phase >= Phase.Write1
                    ? phase < Phase.MoveTo2 ? `${line1Prog * 100}%` : "100%"
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
                  width: phase >= Phase.Write2
                    ? phase < Phase.PenFadeOut ? `${line2Prog * 100}%` : "100%"
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
            <Pen size={24} />
          </div>
        </motion.div>
      </motion.div>

      {picPhase !== 'hidden' && (
        <motion.div
          className="writing-reveal-pic writing-reveal-pic-fixed"
          style={{
            left: picLeft,
            top: picTop,
            opacity: picOpacity,
            scale: picScale,
            cursor: 'pointer',
          }}
          onClick={onPicClick}
          role="button"
          tabIndex={0}
          aria-label={`Open photo of ${personal.fullName}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPicClick?.();
            }
          }}
        >
          <Image
            src={profilePic}
            alt={personal.fullName}
            width={PIC_SIZE * 2}
            height={PIC_SIZE * 2}
            sizes="100px"
            priority
          />
        </motion.div>
      )}
    </>
  );
}
