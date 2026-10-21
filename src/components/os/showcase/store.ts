"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/* A tiny external store shared by the phone and the side panels. Phone
   widgets report their *real* React re-renders here; the panels subscribe
   without re-rendering the phone, so measuring never feeds back into what
   is measured. */

type Listener = () => void;

function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<Listener>();
  return {
    get: () => state,
    set: (next: T) => {
      state = next;
      listeners.forEach(l => l());
    },
    subscribe: (l: Listener) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
  };
}

/* ── Widget rebuilds ── */

export type RebuildState = { counts: Record<string, number>; last: string | null; tick: number };

const rebuilds = createStore<RebuildState>({ counts: {}, last: null, tick: 0 });

// Notify after the commit, outside React's render phase
let pending: string[] = [];
let scheduled = false;
function flushRebuilds() {
  scheduled = false;
  const s = rebuilds.get();
  const counts = { ...s.counts };
  for (const name of pending) counts[name] = (counts[name] ?? 0) + 1;
  const last = pending[pending.length - 1] ?? s.last;
  pending = [];
  rebuilds.set({ counts, last, tick: s.tick + 1 });
}

const RAINBOW = [0, 50, 120, 190, 260, 320];
let hueIdx = 0;

/** Counts every render of a phone widget and, while the performance overlay
 *  is on, flashes a "repaint rainbow" outline on it. The flash uses the Web
 *  Animations API, so it never forces a synchronous layout. */
export function useRebuildTracker<T extends HTMLElement>(name: string) {
  const ref = useRef<T>(null);
  useEffect(() => {
    pending.push(name);
    if (!scheduled) {
      scheduled = true;
      queueMicrotask(flushRebuilds);
    }
    const el = ref.current;
    if (!el || !el.closest(".ph-rb") || typeof el.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hue = RAINBOW[hueIdx++ % RAINBOW.length];
    el.animate(
      [
        { boxShadow: `0 0 0 2px hsl(${hue} 90% 60%), 0 0 12px hsl(${hue} 90% 60% / 0.6)` },
        { boxShadow: `0 0 0 2px hsl(${hue} 90% 60% / 0), 0 0 12px hsl(${hue} 90% 60% / 0)` },
      ],
      { duration: 500, easing: "ease-out" }
    );
  });
  return ref;
}

/* ── Frame sampler ──
   One requestAnimationFrame loop shared by every graph. For each frame it
   records how long the main thread was busy: from the frame's rAF callback
   until a message posted from it runs, which is after style, layout and
   paint for that frame. That is the browser's equivalent of Flutter's UI
   thread time. The loop runs only while a graph is mounted. */

export type FrameSample = { work: number; interval: number };
type FrameListener = (samples: FrameSample[]) => void;

const frameListeners = new Set<FrameListener>();
const frameSamples: FrameSample[] = [];
let frameRaf = 0;
let frameLast = 0;

function startSampler() {
  const channel = new MessageChannel();
  let frameStart = 0;
  let interval = 0;
  channel.port1.onmessage = () => {
    frameSamples.push({ work: performance.now() - frameStart, interval });
    if (frameSamples.length > 48) frameSamples.shift();
    frameListeners.forEach(l => l(frameSamples));
  };
  const tick = (now: number) => {
    interval = frameLast ? Math.min(now - frameLast, 100) : 16.7;
    frameLast = now;
    frameStart = performance.now();
    channel.port2.postMessage(0);
    frameRaf = requestAnimationFrame(tick);
  };
  frameRaf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frameRaf);
    channel.port1.close();
    frameLast = 0;
  };
}

let stopSampler: (() => void) | null = null;

export function subscribeFrames(listener: FrameListener) {
  frameListeners.add(listener);
  if (!stopSampler) stopSampler = startSampler();
  return () => {
    frameListeners.delete(listener);
    if (frameListeners.size === 0 && stopSampler) {
      stopSampler();
      stopSampler = null;
    }
  };
}

export function useRebuilds() {
  return useSyncExternalStore(rebuilds.subscribe, rebuilds.get, rebuilds.get);
}

export function resetRebuilds() {
  rebuilds.set({ counts: {}, last: null, tick: rebuilds.get().tick + 1 });
}

/* ── Widget tree of the open app, when it is built at runtime (the form's
   fields come from its schema, so its tree changes with the builder) ── */

const phoneTree = createStore<string[] | null>(null);

export function setPhoneTree(names: string[] | null) {
  phoneTree.set(names);
}

export function usePhoneTree() {
  return useSyncExternalStore(phoneTree.subscribe, phoneTree.get, () => null);
}

/* ── Requests leaving the phone (for the backend trace) ── */

export type PhoneRequest = {
  id: number;
  method: "POST" | "PUT";
  path: string;
  kind: "form" | "sync";
  summary: string;
  ok: boolean;
};

const requests = createStore<PhoneRequest | null>(null);
let requestId = 0;

export function emitRequest(req: Omit<PhoneRequest, "id">) {
  requests.set({ ...req, id: ++requestId });
}

export function useLastRequest() {
  return useSyncExternalStore(requests.subscribe, requests.get, () => null);
}
