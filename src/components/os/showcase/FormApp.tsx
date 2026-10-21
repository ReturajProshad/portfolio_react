"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Loader2, Link2, AlertCircle } from "lucide-react";
import { emitRequest, setPhoneTree, useRebuildTracker } from "./store";

/* A miniature of rj_form_engine running in the browser: the form is rendered
   from a schema, so the Builder tab can add and remove fields live, the
   engine enforces dependencies, cascades async dropdowns, derives values,
   validates — and the Dart tab shows the real package code for exactly the
   fields that are switched on. */

/* ── Schema ── */

type FieldType = "text" | "number" | "dropdown" | "chip" | "slider" | "toggle" | "derived";
type Value = string | number | boolean | string[] | null;
type Values = Record<string, Value>;

type Validator = { dart: string; check: (v: Value) => string | null };

interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  validators?: Validator[];
  dependsOn?: string;
  load?: (parent: string | null) => string[];
  options?: string[];
  slider?: { min: number; max: number; step: number };
  derivesFrom?: string[];
  compute?: (v: Values) => number | null;
  format?: (n: number) => string;
}

const DISTRICTS = ["Dhaka", "Kushtia", "Rajshahi", "Chattogram"];
const UPAZILAS: Record<string, string[]> = {
  Dhaka: ["Savar", "Dhamrai", "Keraniganj"],
  Kushtia: ["Kumarkhali", "Bheramara", "Mirpur"],
  Rajshahi: ["Paba", "Godagari", "Bagha"],
  Chattogram: ["Hathazari", "Patiya", "Sitakunda"],
};

const num = (v: Value) => (typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN);

const CATALOG: FieldDef[] = [
  {
    key: "name",
    label: "Farmer name",
    type: "text",
    required: true,
    hint: "e.g. Rahim Uddin",
    validators: [{ dart: "RjValidators.minLength(2)", check: v => (String(v ?? "").trim().length < 2 ? "At least 2 characters" : null) }],
  },
  {
    key: "phone",
    label: "Phone",
    type: "text",
    hint: "01XXXXXXXXX",
    validators: [{ dart: "RjValidators.bdPhone()", check: v => (/^01[3-9]\d{8}$/.test(String(v ?? "")) ? null : "Not a Bangladeshi mobile number") }],
  },
  { key: "district", label: "District", type: "dropdown", required: true, load: () => DISTRICTS },
  { key: "upazila", label: "Upazila", type: "dropdown", required: true, dependsOn: "district", load: p => (p ? UPAZILAS[p] ?? [] : []) },
  {
    key: "breeds",
    label: "Breeds",
    type: "chip",
    options: ["Holstein", "Sahiwal", "Red Chittagong", "Local"],
    validators: [{ dart: "RjValidators.minSelect(1)", check: v => (Array.isArray(v) && v.length > 0 ? null : "Pick at least one") }],
  },
  {
    key: "herd",
    label: "Herd size",
    type: "number",
    required: true,
    hint: "cows",
    validators: [{ dart: "RjValidators.min(1)", check: v => (num(v) >= 1 ? null : "Must be at least 1") }],
  },
  { key: "price", label: "Milk price (৳/L)", type: "slider", slider: { min: 40, max: 90, step: 5 } },
  { key: "vaccinated", label: "Herd vaccinated", type: "toggle" },
  {
    key: "income",
    label: "Est. income / day",
    type: "derived",
    derivesFrom: ["herd", "price"],
    compute: v => {
      const herd = num(v.herd);
      const price = num(v.price);
      return Number.isFinite(herd) && herd > 0 && Number.isFinite(price) ? herd * 8 * price : null;
    },
    format: n => `৳ ${n.toLocaleString("en-US")}`,
  },
];

const BY_KEY = Object.fromEntries(CATALOG.map(f => [f.key, f])) as Record<string, FieldDef>;
const DEFAULT_ON = ["name", "district", "upazila", "herd", "price", "income"];
const INITIAL: Values = { price: 60, vaccinated: false, breeds: [] };

// Turning a field on also turns on what it needs; turning it off removes what needs it
function withDependencies(on: Set<string>, key: string, enable: boolean) {
  const next = new Set(on);
  if (enable) {
    const add = (k: string) => {
      next.add(k);
      const f = BY_KEY[k];
      if (f.dependsOn) add(f.dependsOn);
      f.derivesFrom?.forEach(add);
    };
    add(key);
  } else {
    const remove = (k: string) => {
      next.delete(k);
      CATALOG.filter(f => f.dependsOn === k || f.derivesFrom?.includes(k)).forEach(f => remove(f.key));
    };
    remove(key);
  }
  return next;
}

function isEmpty(v: Value) {
  return v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0);
}

/* ── Generated Dart, for exactly the fields that are on ── */

function dartFor(fields: FieldDef[]) {
  const lines: string[] = ["RjForm(", "  fields: ["];
  for (const f of fields) {
    const head = `key: '${f.key}', label: '${f.label}'${f.required ? ", required: true" : ""}`;
    const extra: string[] = [];
    if (f.dependsOn) extra.push(`dependency: FieldDependency(dependsOn: '${f.dependsOn}'),`);
    if (f.type === "dropdown") {
      const fetch = f.dependsOn ? `fetch${cap(f.key)}s(parentValue: parentValue)` : `fetch${cap(f.key)}s()`;
      extra.push(`dropdownSource: DropdownSource.async(`, `  ({parentValue}) async => ${fetch}),`);
    }
    if (f.type === "chip") extra.push(`options: ${f.key}Options,`);
    if (f.type === "slider" && f.slider) {
      const divisions = (f.slider.max - f.slider.min) / f.slider.step;
      extra.push(`config: const SliderConfig(min: ${f.slider.min}, max: ${f.slider.max}, divisions: ${divisions}),`);
    }
    if (f.type === "derived" && f.derivesFrom) {
      extra.push(
        "derivation: FieldDerivation(",
        `  derivesFrom: [${f.derivesFrom.map(k => `'${k}'`).join(", ")}],`,
        "  compute: (s) => ((s['herd'] as num?) ?? 0) * 8 * ((s['price'] as num?) ?? 0)),"
      );
    }
    if (f.validators?.length) extra.push(`validators: [${f.validators.map(v => v.dart).join(", ")}],`);

    const ctor = f.type === "derived" ? "number" : f.type;
    if (extra.length === 0) {
      lines.push(`    FieldMeta.${ctor}(${head}),`);
    } else {
      lines.push(`    FieldMeta.${ctor}(${head},`);
      extra.forEach((e, i) => lines.push(`      ${e}${i === extra.length - 1 ? ")," : ""}`.replace(/,\),$/, "),")));
    }
  }
  lines.push("  ],", "  onSubmit: (result) async => api.save(result.values),", ")");
  return lines.join("\n");
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Minimal Dart highlighting: strings, numbers, engine types, keywords
function highlight(code: string) {
  const re = /('[^']*')|(\b(?:FieldMeta|RjForm|RjValidators|DropdownSource|FieldDependency|FieldDerivation|SliderConfig)\b)|(\b(?:async|const|true|false|as|num)\b)|(\b\d+\b)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1] ? "dk-str" : m[2] ? "dk-type" : m[3] ? "dk-kw" : "dk-num";
    out.push(<span key={i++} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
}

/* ── Field widgets ── */

type FieldProps = {
  def: FieldDef;
  value: Value;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  onChange: (key: string, v: Value) => void;
  onOpen: (key: string) => void;
};

const Field = memo(function Field({ def, value, error, loading, disabled, onChange, onOpen }: FieldProps) {
  const ref = useRebuildTracker<HTMLDivElement>(`Field(${def.label})`);

  let control: React.ReactNode = null;
  switch (def.type) {
    case "text":
    case "number":
      control = (
        <input
          className="fx-input"
          value={String(value ?? "")}
          inputMode={def.type === "number" ? "numeric" : "text"}
          placeholder={def.hint}
          onChange={e => onChange(def.key, def.type === "number" ? e.target.value.replace(/[^\d]/g, "").slice(0, 4) : e.target.value)}
        />
      );
      break;
    case "dropdown":
      control = (
        <button type="button" className="fx-select" disabled={disabled || loading} onClick={() => onOpen(def.key)}>
          <span className={value ? "" : "fx-placeholder"}>
            {loading ? "Loading…" : (value as string) ?? (disabled ? `Pick ${BY_KEY[def.dependsOn!].label.toLowerCase()} first` : "Select")}
          </span>
          {loading ? <Loader2 size={12} className="fx-spin" /> : <ChevronDown size={12} />}
        </button>
      );
      break;
    case "chip": {
      const selected = (value as string[]) ?? [];
      control = (
        <div className="fx-chips">
          {def.options!.map(o => {
            const on = selected.includes(o);
            return (
              <motion.button
                key={o}
                type="button"
                className={`fx-chip${on ? " on" : ""}`}
                whileTap={{ scale: 0.92 }}
                onClick={() => onChange(def.key, on ? selected.filter(s => s !== o) : [...selected, o])}
              >
                {on && <Check size={9} />}
                {o}
              </motion.button>
            );
          })}
        </div>
      );
      break;
    }
    case "slider": {
      const s = def.slider!;
      const n = num(value);
      control = (
        <div className="fx-slider">
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={Number.isFinite(n) ? n : s.min}
            onChange={e => onChange(def.key, Number(e.target.value))}
            style={{ "--fill": `${((n - s.min) / (s.max - s.min)) * 100}%` } as React.CSSProperties}
          />
          <span className="fx-slider-value">৳{n}</span>
        </div>
      );
      break;
    }
    case "toggle":
      control = (
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          className={`fx-switch${value ? " on" : ""}`}
          onClick={() => onChange(def.key, !value)}
        >
          <motion.span className="fx-switch-knob" layout transition={{ type: "spring", stiffness: 600, damping: 32 }} />
        </button>
      );
      break;
    case "derived":
      control = (
        <motion.span key={String(value)} className="fx-derived-value" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          {typeof value === "number" && def.format ? def.format(value) : "—"}
        </motion.span>
      );
      break;
  }

  return (
    <div
      ref={ref}
      className={`fx-field fx-field-${def.type}${error ? " fx-field-error" : ""}`}
    >
      <span className="fx-label">
        {def.label}
        {def.required && <span className="fx-req">*</span>}
        {def.type === "derived" && <span className="fx-tag">auto</span>}
      </span>
      {control}
      <AnimatePresence>
        {error && (
          <motion.span className="fx-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
});

/* ── Builder row ── */

const BuilderRow = memo(function BuilderRow({ def, on, onToggle }: { def: FieldDef; on: boolean; onToggle: (key: string) => void }) {
  const needs = def.dependsOn ? [def.dependsOn] : def.derivesFrom ?? [];
  return (
    <button className={`fx-b-row${on ? " on" : ""}`} onClick={() => onToggle(def.key)}>
      <span className={`fx-b-type fx-b-type-${def.type}`}>{def.type}</span>
      <span className="fx-b-label">
        {def.label}
        {needs.length > 0 && (
          <span className="fx-b-needs">
            <Link2 size={8} /> {needs.map(k => BY_KEY[k].label).join(" + ")}
          </span>
        )}
      </span>
      <span className={`fx-switch fx-switch-sm${on ? " on" : ""}`} aria-hidden="true">
        <motion.span className="fx-switch-knob" layout transition={{ type: "spring", stiffness: 600, damping: 32 }} />
      </span>
    </button>
  );
});

/* ── App ── */

export default function FormApp() {
  const ref = useRebuildTracker<HTMLDivElement>("RjForm");
  const [tab, setTab] = useState<"form" | "builder" | "dart">("form");
  const [enabled, setEnabled] = useState<Set<string>>(() => new Set(DEFAULT_ON));
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [options, setOptions] = useState<Record<string, string[] | null>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [sheet, setSheet] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Values | null>(null);
  const [shakes, setShakes] = useState(0);
  const loadSeq = useRef<Record<string, number>>({});

  const fields = useMemo(() => CATALOG.filter(f => enabled.has(f.key)), [enabled]);

  // Publish the live widget tree to the DevTools panel
  useEffect(() => {
    setPhoneTree(["RjForm", ...fields.map(f => `Field(${f.label})`)]);
    return () => setPhoneTree(null);
  }, [fields]);

  // Async data sources (simulated network latency)
  const load = useCallback((key: string, parent: string | null) => {
    const def = BY_KEY[key];
    if (!def.load) return;
    const seq = (loadSeq.current[key] ?? 0) + 1;
    loadSeq.current[key] = seq;
    setLoading(l => ({ ...l, [key]: true }));
    setTimeout(() => {
      if (loadSeq.current[key] !== seq) return; // a newer load won
      setOptions(o => ({ ...o, [key]: def.load!(parent) }));
      setLoading(l => ({ ...l, [key]: false }));
    }, def.dependsOn ? 450 : 650);
  }, []);

  useEffect(() => {
    CATALOG.filter(f => f.load && !f.dependsOn).forEach(f => load(f.key, null));
  }, [load]);

  // One stable change handler: sets the value, clears its error, and cascades
  // to dependents (clear + reload) — the engine's dependency rule
  const onChange = useCallback(
    (key: string, v: Value) => {
      setValues(prev => {
        const next = { ...prev, [key]: v };
        for (const dep of CATALOG.filter(f => f.dependsOn === key)) next[dep.key] = null;
        return next;
      });
      setErrors(e => (e[key] ? { ...e, [key]: undefined } : e));
      for (const dep of CATALOG.filter(f => f.dependsOn === key)) load(dep.key, typeof v === "string" ? v : null);
    },
    [load]
  );
  const onOpen = useCallback((key: string) => setSheet(key), []);

  const toggleField = useCallback((key: string) => {
    setEnabled(on => withDependencies(on, key, !on.has(key)));
  }, []);

  // Derived values recompute from the current state in one pass
  const derived = useMemo(() => {
    const out: Values = {};
    for (const f of fields) if (f.type === "derived" && f.compute) out[f.key] = f.compute({ ...values, ...out });
    return out;
  }, [fields, values]);

  const requiredKeys = fields.filter(f => f.required).map(f => f.key);
  const done = requiredKeys.filter(k => !isEmpty(values[k] ?? null)).length;
  const progress = requiredKeys.length ? done / requiredKeys.length : 1;

  const submit = () => {
    const next: Record<string, string> = {};
    for (const f of fields) {
      if (f.type === "derived") continue;
      const v = values[f.key] ?? null;
      if (f.required && isEmpty(v)) {
        next[f.key] = "Required";
        continue;
      }
      if (isEmpty(v) && f.type !== "chip") continue; // validators skip empty values
      for (const val of f.validators ?? []) {
        const msg = val.check(v);
        if (msg) {
          next[f.key] = msg;
          break;
        }
      }
    }
    setErrors(next);
    const ok = Object.keys(next).length === 0;
    if (!ok) setShakes(s => s + 1);
    emitRequest({
      method: "POST",
      path: "/api/v1/farms",
      kind: "form",
      summary: ok ? `${String(values.name ?? "").trim() || "farm"} · ${fields.length} fields` : "rejected by client validation",
      ok,
    });
    if (ok) {
      const result: Values = {};
      for (const f of fields) result[f.key] = f.type === "derived" ? derived[f.key] ?? null : values[f.key] ?? null;
      setSubmitted(result);
    }
  };

  const reset = () => {
    setSubmitted(null);
    setValues(INITIAL);
    setErrors({});
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const sheetDef = sheet ? BY_KEY[sheet] : null;
  const sheetOptions = sheet ? options[sheet] ?? [] : [];
  const dart = useMemo(() => dartFor(fields), [fields]);

  return (
    <div ref={ref} className="ph-app fx-app">
      <div className="ph-appbar fx-appbar">
        <div className="fx-appbar-title">
          <span className="fx-brand">Smart Gowala</span>
          <span className="ph-appbar-title">Farm registration</span>
        </div>
        <span className="fx-count">{fields.length} fields</span>
      </div>
      <div className="fx-tabs">
        {(["form", "builder", "dart"] as const).map(t => (
          <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
            {tab === t && <motion.span layoutId="fx-tab-pill" className="fx-tab-pill" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
            <span>{t === "form" ? "Form" : t === "builder" ? "Builder" : "Dart"}</span>
          </button>
        ))}
      </div>

      {tab === "form" && !submitted && (
        <div className="fx-progress" aria-hidden="true">
          <motion.div className="fx-progress-fill" animate={{ width: `${progress * 100}%` }} transition={{ type: "spring", stiffness: 220, damping: 28 }} />
        </div>
      )}

      {tab === "builder" && (
        <div className="fx-scroll fx-builder">
          <p className="fx-b-help">Switch fields on and off. The form re-renders from the schema; dependencies come along automatically.</p>
          {CATALOG.map(def => (
            <BuilderRow key={def.key} def={def} on={enabled.has(def.key)} onToggle={toggleField} />
          ))}
        </div>
      )}

      {tab === "dart" && (
        <div className="fx-scroll fx-dart">
          <span className="fx-dart-note">Generated for the {fields.length} fields that are on</span>
          <pre className="fx-code">{highlight(dart)}</pre>
        </div>
      )}

      {tab === "form" && submitted && (
        <motion.div className="fx-scroll fx-result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="fx-confetti" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                style={{ background: ["#60a5fa", "#34d399", "#f472b6", "#fbbf24"][i % 4] }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{ x: Math.cos((i / 14) * Math.PI * 2) * 70, y: Math.sin((i / 14) * Math.PI * 2) * 50 + 30, opacity: 0, rotate: 200 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            ))}
          </div>
          <motion.div className="fx-result-check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14 }}>
            <Check size={18} />
          </motion.div>
          <span className="fx-result-title">Saved · typed FormResult</span>
          <pre className="fx-result-json">{JSON.stringify(submitted, null, 1)}</pre>
          <button className="ph-btn ph-btn-ghost" onClick={reset}>New entry</button>
        </motion.div>
      )}

      {tab === "form" && !submitted && (
        <div className="fx-scroll fx-body">
          <AnimatePresence>
            {errorCount > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                {/* re-keyed on every failed save so it shakes each time */}
                <motion.div key={shakes} className="fx-summary" animate={{ x: [0, -6, 6, -4, 4, 0] }} transition={{ duration: 0.4 }}>
                  <AlertCircle size={11} /> Fix {errorCount} field{errorCount > 1 ? "s" : ""} before saving
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {fields.map(def => (
              <motion.div
                key={def.key}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="fx-slot"
              >
                <Field
                  def={def}
                  value={def.type === "derived" ? derived[def.key] ?? null : values[def.key] ?? null}
                  error={errors[def.key]}
                  loading={loading[def.key]}
                  disabled={def.dependsOn ? !values[def.dependsOn] : false}
                  onChange={onChange}
                  onOpen={onOpen}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button className="ph-btn fx-submit" onClick={submit} whileTap={{ scale: 0.97 }}>
            Save farm
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {sheetDef && (
          <>
            <motion.div className="ph-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(null)} />
            <motion.div
              className="ph-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 420, damping: 38 }}
            >
              <div className="ph-sheet-handle" />
              <span className="ph-sheet-title">
                {sheetDef.label}
                {sheetDef.dependsOn ? ` · ${values[sheetDef.dependsOn]}` : ""}
              </span>
              {sheetOptions.map((o, i) => {
                const selected = values[sheetDef.key] === o;
                return (
                  <motion.button
                    key={o}
                    className={`ph-sheet-item${selected ? " selected" : ""}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                    onClick={() => {
                      onChange(sheetDef.key, o);
                      setSheet(null);
                    }}
                  >
                    {o}
                    {selected && <Check size={12} />}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
