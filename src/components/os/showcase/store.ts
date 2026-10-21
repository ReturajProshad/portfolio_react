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

/** Counts every render of a phone widget and flashes a "repaint rainbow" outline on it. */
export function useRebuildTracker<T extends HTMLElement>(name: string) {
  const ref = useRef<T>(null);
  useEffect(() => {
    pending.push(name);
    if (!scheduled) {
      scheduled = true;
      queueMicrotask(flushRebuilds);
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rb-hue", String(RAINBOW[hueIdx++ % RAINBOW.length]));
    el.classList.remove("rb-flash");
    void el.offsetWidth; // restart the flash animation
    el.classList.add("rb-flash");
  });
  return ref;
}

export function useRebuilds() {
  return useSyncExternalStore(rebuilds.subscribe, rebuilds.get, rebuilds.get);
}

export function resetRebuilds() {
  rebuilds.set({ counts: {}, last: null, tick: rebuilds.get().tick + 1 });
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
