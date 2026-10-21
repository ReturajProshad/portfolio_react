"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, Smartphone } from "lucide-react";
import { emitRequest, useRebuildTracker } from "./store";

/* FieldOps in miniature: edits made offline stay Pending; going online
   pulls the server copy and merges per field against the last-synced
   baseline, so edits to different fields both survive and only a true
   same-field conflict falls back to last-write-wins. */

type Field = "status" | "note";
type Values = Record<Field, string>;
type Stamps = Record<Field, number>;
type SyncState = "synced" | "pending" | "resolved";

const STATUSES = ["Scheduled", "On site", "Completed"];
const NOTES = ["Replace pump valve", "Valve replaced, pressure OK", "Needs a second visit"];
const FIELDS: Field[] = ["status", "note"];
const INITIAL: Values = { status: "Scheduled", note: "Replace pump valve" };

function next<T>(list: T[], current: T) {
  return list[(list.indexOf(current) + 1) % list.length];
}

const Row = memo(function Row({ field, label, value, changed, onTap }: { field: Field; label: string; value: string; changed: boolean; onTap: () => void }) {
  const ref = useRebuildTracker<HTMLButtonElement>(`FieldRow(${field})`);
  return (
    <button ref={ref} className="sy-row" onClick={onTap}>
      <span className="sy-row-label">{label}</span>
      <motion.span key={value} className="sy-row-value" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}>
        {value}
      </motion.span>
      {changed && <span className="sy-dot" title="Edited since last sync" />}
    </button>
  );
});

const SyncBadge = memo(function SyncBadge({ state, syncing }: { state: SyncState; syncing: boolean }) {
  const ref = useRebuildTracker<HTMLSpanElement>("SyncBadge");
  const label = syncing ? "Syncing…" : state === "pending" ? "Pending" : state === "resolved" ? "Conflict resolved" : "Synced";
  return (
    <span ref={ref} className={`sy-badge sy-badge-${syncing ? "syncing" : state}`}>
      {label}
    </span>
  );
});

const SyncLog = memo(function SyncLog({ lines }: { lines: string[] }) {
  const ref = useRebuildTracker<HTMLDivElement>("SyncLog");
  return (
    <div ref={ref} className="sy-log">
      <AnimatePresence initial={false}>
        {lines.slice(-6).map((l, i) => (
          <motion.div
            key={`${lines.length - Math.min(lines.length, 6) + i}-${l}`}
            className="sy-log-line"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {l}
          </motion.div>
        ))}
      </AnimatePresence>
      {lines.length === 0 && <div className="sy-log-hint">Go offline, edit, let Device B edit, then go online.</div>}
    </div>
  );
});

export default function SyncApp() {
  const ref = useRebuildTracker<HTMLDivElement>("FieldOpsApp");
  const [online, setOnline] = useState(true);
  const [local, setLocal] = useState<Values>(INITIAL);
  const [localTs, setLocalTs] = useState<Stamps>({ status: 0, note: 0 });
  const [server, setServer] = useState<Values>(INITIAL);
  const [serverTs, setServerTs] = useState<Stamps>({ status: 0, note: 0 });
  const [base, setBase] = useState<Values>(INITIAL);
  const [syncState, setSyncState] = useState<SyncState>("synced");
  const [syncing, setSyncing] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  // pull → per-field three-way merge → push, as one step per record
  const sync = useCallback((l: Values, lt: Stamps, s: Values, st: Stamps, b: Values) => {
    const merged: Values = { ...b };
    const mergedTs: Stamps = { status: 0, note: 0 };
    const lines: string[] = ["pull  /visits/1042"];
    let conflict = false;
    const changed: string[] = [];

    for (const f of FIELDS) {
      const lc = l[f] !== b[f];
      const rc = s[f] !== b[f];
      if (lc && rc && l[f] !== s[f]) {
        conflict = true;
        const localWins = lt[f] >= st[f];
        merged[f] = localWins ? l[f] : s[f];
        mergedTs[f] = Math.max(lt[f], st[f]);
        lines.push(`${f}: both edited → LWW, ${localWins ? "yours" : "Device B"} is newer`);
        changed.push(`${f}=LWW`);
      } else if (lc) {
        merged[f] = l[f];
        mergedTs[f] = lt[f];
        lines.push(`${f}: your edit kept`);
        changed.push(`${f}=local`);
      } else if (rc) {
        merged[f] = s[f];
        mergedTs[f] = st[f];
        lines.push(`${f}: Device B's edit pulled`);
        changed.push(`${f}=remote`);
      }
    }
    if (changed.length === 0) return;

    lines.push(conflict ? "push  merged → conflict resolved" : "push  merged → both edits kept");
    setSyncing(true);
    setLog(prev => [...prev, "— sync —"]);
    lines.forEach((line, i) => later(260 * (i + 1), () => setLog(prev => [...prev, line])));
    later(260 * (lines.length + 1), () => {
      setLocal(merged);
      setLocalTs(mergedTs);
      setServer(merged);
      setServerTs(mergedTs);
      setBase(merged);
      setSyncing(false);
      setSyncState(conflict ? "resolved" : "synced");
    });
    emitRequest({ method: "PUT", path: "/api/v1/visits/1042/sync", kind: "sync", summary: changed.join(" · "), ok: true });
  }, [later]);

  const editLocal = (f: Field) => {
    if (syncing) return;
    const value = f === "status" ? next(STATUSES, local[f]) : next(NOTES, local[f]);
    const l = { ...local, [f]: value };
    const lt = { ...localTs, [f]: Date.now() };
    setLocal(l);
    setLocalTs(lt);
    if (online) sync(l, lt, server, serverTs, base);
    else setSyncState("pending");
  };

  const editRemote = (f: Field) => {
    if (syncing) return;
    const value = f === "status" ? "On hold" : "Customer asked for 4 pm";
    const s = { ...server, [f]: value === server[f] ? INITIAL[f] : value };
    const st = { ...serverTs, [f]: Date.now() };
    setServer(s);
    setServerTs(st);
    setLog(prev => [...prev, `Device B wrote ${f} on the server`]);
    if (online) sync(local, localTs, s, st, base);
  };

  // Stable tap handlers that always call the latest editLocal, so memoized
  // rows only rebuild when their own value changes
  const editRef = useRef(editLocal);
  editRef.current = editLocal;
  const tapStatus = useCallback(() => editRef.current("status"), []);
  const tapNote = useCallback(() => editRef.current("note"), []);

  const toggleOnline = () => {
    if (syncing) return;
    const going = !online;
    setOnline(going);
    setLog(prev => [...prev, going ? "online" : "offline — edits queue locally"]);
    if (going) sync(local, localTs, server, serverTs, base);
  };

  return (
    <div ref={ref} className="ph-app sy-app">
      <div className="ph-appbar">
        <span className="ph-appbar-title">FieldOps</span>
        <button className={`sy-net${online ? " on" : ""}`} onClick={toggleOnline} aria-pressed={online}>
          {online ? <Wifi size={11} /> : <WifiOff size={11} />}
          {online ? "Online" : "Offline"}
        </button>
      </div>

      <div className="sy-body">
        <div className="sy-card">
          <div className="sy-card-head">
            <span className="sy-card-title">Job #1042 · Pump repair</span>
            <SyncBadge state={syncState} syncing={syncing} />
          </div>
          <Row field="status" label="Status" value={local.status} changed={local.status !== base.status} onTap={tapStatus} />
          <Row field="note" label="Note" value={local.note} changed={local.note !== base.note} onTap={tapNote} />
          <span className="sy-tip">Tap a row to edit it</span>
        </div>

        <div className="sy-device-b">
          <span className="sy-device-b-title">
            <Smartphone size={11} /> Device B · server copy
          </span>
          <div className="sy-device-b-actions">
            <button className="ph-btn ph-btn-ghost" onClick={() => editRemote("note")}>Edit note</button>
            <button className="ph-btn ph-btn-ghost" onClick={() => editRemote("status")}>Edit status</button>
          </div>
        </div>

        <SyncLog lines={log} />
      </div>
    </div>
  );
}
