"use client";

import { motion } from "framer-motion";
import { Github, CheckCircle2, PackageSearch } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { personal } from "@/data/portfolio";

const features = [
  { title: "13+ Field Types", desc: "Text, select, multi-select, date, file, checkbox, radio, and more — all rendered from JSON." },
  { title: "25+ Validation Rules", desc: "Composable validation library covering required, email, min/max, regex, and custom async validators." },
  { title: "Async Data Loading", desc: "Parent-child dependency tracking with async option loading for cascading selects and dynamic fields." },
  { title: "State-Agnostic", desc: "FormController works with Provider, Riverpod, Bloc, and GetX — no lock-in." },
  { title: "Comprehensive Tests", desc: "Widget tests for conditional visibility, unit tests for dependency resolution and input masking." },
  { title: "Production-Proven", desc: "Powers 90+ complex forms across 3 enterprise systems at ODCL." },
];

export default function OpenSourceApp() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-3">
        <span className="w-6 h-px bg-accent" />
        Open Source
      </span>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight mb-1">rj_form_engine</h2>
      <p className="text-subtle text-sm mb-6">A schema-driven Flutter form library. Born from enterprise pain, shipped to the community.</p>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div>
          <div className="glass rounded-2xl p-5 mb-3 border-l-2 border-l-accent">
            <h4 className="font-display font-semibold text-xs text-accent mb-2 uppercase tracking-wider">The Problem</h4>
            <p className="text-subtle text-sm leading-relaxed">
              Building 90+ complex enterprise forms manually means 90x the boilerplate, 90x the bugs, and 90x the time.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 mb-3 border-l-2 border-l-emerald-400">
            <h4 className="font-display font-semibold text-xs text-emerald-400 mb-2 uppercase tracking-wider">The Solution</h4>
            <p className="text-subtle text-sm leading-relaxed">
              Define your entire form in JSON. rj_form_engine handles rendering, validation, state, and dependencies automatically.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 mb-4 border-l-2 border-l-amber-400">
            <h4 className="font-display font-semibold text-xs text-amber-400 mb-2 uppercase tracking-wider">The Impact</h4>
            <p className="text-subtle text-sm leading-relaxed">
              ~90% reduction in UI development effort across 3 enterprise production systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all"
            >
              <Github size={14} /> View on GitHub
            </a>
            <span className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/80 text-muted text-sm font-medium">
              <PackageSearch size={14} /> pub.dev listing pending
            </span>
          </div>
        </div>
        <div>
          <SpotlightCard className="glass rounded-2xl p-4 mb-4 font-mono text-xs overflow-auto" tilt={false}>
            <p className="text-muted mb-2">// Define a form in JSON</p>
            <pre className="text-subtle leading-relaxed whitespace-pre-wrap">{`{
  "fields": [
    {
      "id": "district",
      "type": "select",
      "label": "District",
      "required": true,
      "dataSource": "/api/districts"
    },
    {
      "id": "upazila",
      "type": "select",
      "label": "Upazila",
      "dependsOn": "district",
      "dataSource": "/api/upazilas/{district}"
    }
  ]
}`}</pre>
          </SpotlightCard>
          <div className="grid grid-cols-2 gap-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <SpotlightCard className="glass rounded-xl p-3 hover:border-accent/20 transition-colors h-full">
                  <CheckCircle2 size={13} className="text-accent mb-1.5" />
                  <h5 className="font-display font-semibold text-xs text-text mb-1">{f.title}</h5>
                  <p className="text-[11px] text-muted leading-relaxed">{f.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
