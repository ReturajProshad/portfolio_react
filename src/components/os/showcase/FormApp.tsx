"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Loader2 } from "lucide-react";
import { emitRequest, useRebuildTracker } from "./store";

/* A miniature of rj_form_engine's behaviour: async data sources, a
   dependent field that reloads and clears when its parent changes, a
   derived field, and validation — the same rules the package implements. */

const DISTRICTS = ["Dhaka", "Kushtia", "Rajshahi", "Chattogram"];
const UPAZILAS: Record<string, string[]> = {
  Dhaka: ["Savar", "Dhamrai", "Keraniganj"],
  Kushtia: ["Kumarkhali", "Bheramara", "Mirpur"],
  Rajshahi: ["Paba", "Godagari", "Bagha"],
  Chattogram: ["Hathazari", "Patiya", "Sitakunda"],
};
const LITRES_PER_COW = 8;

function fakeFetch<T>(value: T, ms = 450) {
  return new Promise<T>(resolve => setTimeout(() => resolve(value), ms));
}

type Errors = Partial<Record<"name" | "district" | "upazila" | "herd", string>>;

const TextField = memo(function TextField({
  label,
  value,
  onChange,
  error,
  inputMode,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  inputMode?: "text" | "numeric";
  placeholder?: string;
}) {
  const ref = useRebuildTracker<HTMLLabelElement>(`TextField(${label})`);
  return (
    <label ref={ref} className={`fx-field${error ? " fx-field-error" : ""}`}>
      <span className="fx-label">{label}</span>
      <input
        className="fx-input"
        value={value}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
      {error && <span className="fx-error">{error}</span>}
    </label>
  );
});

const DropdownField = memo(function DropdownField({
  label,
  value,
  loading,
  disabled,
  error,
  onOpen,
}: {
  label: string;
  value: string | null;
  loading: boolean;
  disabled: boolean;
  error?: string;
  onOpen: () => void;
}) {
  const ref = useRebuildTracker<HTMLDivElement>(`Dropdown(${label})`);
  return (
    <div ref={ref} className={`fx-field${error ? " fx-field-error" : ""}`}>
      <span className="fx-label">{label}</span>
      <button type="button" className="fx-select" disabled={disabled || loading} onClick={onOpen}>
        <span className={value ? "" : "fx-placeholder"}>
          {loading ? "Loading…" : value ?? (disabled ? "Pick a district first" : "Select")}
        </span>
        {loading ? <Loader2 size={12} className="fx-spin" /> : <ChevronDown size={12} />}
      </button>
      {error && <span className="fx-error">{error}</span>}
    </div>
  );
});

const DerivedField = memo(function DerivedField({ herd }: { herd: string }) {
  const ref = useRebuildTracker<HTMLDivElement>("Derived(Daily milk)");
  const n = Number(herd);
  const value = herd && Number.isFinite(n) && n > 0 ? `${Math.round(n * LITRES_PER_COW)} L / day` : "—";
  return (
    <div ref={ref} className="fx-field fx-derived">
      <span className="fx-label">Est. daily milk · derived</span>
      <motion.span key={value} className="fx-derived-value" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
        {value}
      </motion.span>
    </div>
  );
});

// The real rj_form_engine schema for the form on the other tab
const SCHEMA = `RjForm(fields: [
  FieldMeta.text(key: 'name',
    label: 'Farmer name',
    required: true),
  FieldMeta.dropdown(key: 'district',
    label: 'District', required: true,
    dropdownSource: DropdownSource.async(
      ({parentValue}) async =>
        fetchDistricts())),
  FieldMeta.dropdown(key: 'upazila',
    label: 'Upazila', required: true,
    // reloads & clears on change
    dependency: FieldDependency(
      dependsOn: 'district'),
    dropdownSource: DropdownSource.async(
      ({parentValue}) async =>
        fetchUpazilas(parentValue))),
  FieldMeta.number(key: 'herd',
    label: 'Herd size', required: true,
    validators: [RjValidators.min(1)]),
  FieldMeta.number(key: 'milk',
    label: 'Est. daily milk',
    derivation: FieldDerivation(
      derivesFrom: ['herd'],
      compute: (s) =>
        ((s['herd'] as num?) ?? 0) * 8)),
], onSubmit: (r) async =>
     api.save(r.values))`;

export default function FormApp() {
  const ref = useRebuildTracker<HTMLDivElement>("RjForm");
  const [tab, setTab] = useState<"form" | "schema">("form");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState<string | null>(null);
  const [upazila, setUpazila] = useState<string | null>(null);
  const [herd, setHerd] = useState("");
  const [districtOptions, setDistrictOptions] = useState<string[] | null>(null);
  const [upazilaOptions, setUpazilaOptions] = useState<string[] | null>(null);
  const [loadingUpazilas, setLoadingUpazilas] = useState(false);
  const [sheet, setSheet] = useState<"district" | "upazila" | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Record<string, string | number> | null>(null);

  useEffect(() => {
    let live = true;
    fakeFetch(DISTRICTS, 600).then(d => live && setDistrictOptions(d));
    return () => {
      live = false;
    };
  }, []);

  // Dependency: a new district clears the upazila and reloads its options
  useEffect(() => {
    if (!district) return;
    let live = true;
    setUpazila(null);
    setUpazilaOptions(null);
    setLoadingUpazilas(true);
    fakeFetch(UPAZILAS[district]).then(u => {
      if (!live) return;
      setUpazilaOptions(u);
      setLoadingUpazilas(false);
    });
    return () => {
      live = false;
    };
  }, [district]);

  // Stable handlers so memoized sibling fields don't rebuild on every keystroke
  const onName = useCallback((v: string) => {
    setName(v);
    setErrors(e => (e.name ? { ...e, name: undefined } : e));
  }, []);
  const onHerd = useCallback((v: string) => {
    setHerd(v.replace(/[^\d]/g, "").slice(0, 4));
    setErrors(e => (e.herd ? { ...e, herd: undefined } : e));
  }, []);
  const openDistrict = useCallback(() => setSheet("district"), []);
  const openUpazila = useCallback(() => setSheet("upazila"), []);

  const pick = (value: string) => {
    if (sheet === "district") setDistrict(value);
    if (sheet === "upazila") setUpazila(value);
    setErrors(e => ({ ...e, [sheet as string]: undefined }));
    setSheet(null);
  };

  const submit = () => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Required";
    if (!district) next.district = "Required";
    if (!upazila) next.upazila = "Required";
    const n = Number(herd);
    if (!herd || !Number.isInteger(n) || n < 1) next.herd = "Whole number ≥ 1";
    setErrors(next);
    const ok = Object.keys(next).length === 0;
    emitRequest({
      method: "POST",
      path: "/api/v1/farms",
      kind: "form",
      summary: ok ? `${name.trim()} · ${upazila}, ${district}` : "rejected by client validation",
      ok,
    });
    if (ok) setSubmitted({ name: name.trim(), district: district!, upazila: upazila!, herd: n, milk: n * LITRES_PER_COW });
  };

  const reset = () => {
    setSubmitted(null);
    setName("");
    setDistrict(null);
    setUpazila(null);
    setUpazilaOptions(null);
    setHerd("");
    setErrors({});
  };

  const options = sheet === "district" ? districtOptions ?? [] : upazilaOptions ?? [];

  return (
    <div ref={ref} className="ph-app fx-app">
      <div className="ph-appbar">
        <span className="ph-appbar-title">New Farm</span>
        <div className="ph-tabs">
          <button className={tab === "form" ? "active" : ""} onClick={() => setTab("form")}>Form</button>
          <button className={tab === "schema" ? "active" : ""} onClick={() => setTab("schema")}>Schema</button>
        </div>
      </div>

      {tab === "schema" ? (
        <pre className="fx-schema">{SCHEMA}</pre>
      ) : submitted ? (
        <motion.div className="fx-result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div
            className="fx-result-check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            <Check size={18} />
          </motion.div>
          <span className="fx-result-title">Saved · typed result</span>
          <pre className="fx-result-json">{JSON.stringify(submitted, null, 1)}</pre>
          <button className="ph-btn ph-btn-ghost" onClick={reset}>New entry</button>
        </motion.div>
      ) : (
        <div className="fx-body">
          <TextField
            label="Farmer name"
            value={name}
            placeholder="e.g. Rahim Uddin"
            error={errors.name}
            onChange={onName}
          />
          <DropdownField
            label="District"
            value={district}
            loading={!districtOptions}
            disabled={false}
            error={errors.district}
            onOpen={openDistrict}
          />
          <DropdownField
            label="Upazila"
            value={upazila}
            loading={loadingUpazilas}
            disabled={!district}
            error={errors.upazila}
            onOpen={openUpazila}
          />
          <TextField
            label="Herd size"
            value={herd}
            inputMode="numeric"
            placeholder="cows"
            error={errors.herd}
            onChange={onHerd}
          />
          <DerivedField herd={herd} />
          <button className="ph-btn" onClick={submit}>Submit</button>
        </div>
      )}

      <AnimatePresence>
        {sheet && (
          <>
            <motion.div
              className="ph-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheet(null)}
            />
            <motion.div
              className="ph-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 420, damping: 38 }}
            >
              <div className="ph-sheet-handle" />
              <span className="ph-sheet-title">{sheet === "district" ? "District" : `Upazila · ${district}`}</span>
              {options.map(o => {
                const selected = (sheet === "district" ? district : upazila) === o;
                return (
                  <button key={o} className={`ph-sheet-item${selected ? " selected" : ""}`} onClick={() => pick(o)}>
                    {o}
                    {selected && <Check size={12} />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
