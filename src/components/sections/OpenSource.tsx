"use client";

import { motion } from "framer-motion";
import { Package, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import { personal } from "@/data/portfolio";

const features = [
  {
    title: "13 Field Types",
    desc: "Text, select, multi-select, date, file, checkbox, radio, and more — all rendered from JSON.",
  },
  {
    title: "25+ Validation Rules",
    desc: "Composable validation library covering required, email, min/max, regex, and custom async validators.",
  },
  {
    title: "Async Data Loading",
    desc: "Parent-child dependency tracking with async option loading for cascading selects and dynamic fields.",
  },
  {
    title: "State-Agnostic",
    desc: "FormController works with Provider, Riverpod, Bloc, and GetX — no lock-in.",
  },
  {
    title: "Comprehensive Tests",
    desc: "Widget tests for conditional visibility, unit tests for dependency resolution and input masking.",
  },
  {
    title: "Production-Proven",
    desc: "Powers 90+ complex forms across 3 enterprise systems at ODCL.",
  },
];

export default function OpenSource() {
  return (
    <SectionWrapper id="opensource">
      <div className="mb-12">
        <SectionLabel>Open Source</SectionLabel>
        <SectionHeading>rj form engine</SectionHeading>
        <p className="text-subtle text-sm mt-2 max-w-lg">
          A schema-driven Flutter form library. Born from enterprise pain, shipped to the community.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Story */}
        <div>
          {/* Problem statement */}
          <div className="glass rounded-2xl p-6 mb-4 border-l-2 border-l-accent">
            <h4 className="font-display font-semibold text-sm text-accent mb-2 uppercase tracking-wider">The Problem</h4>
            <p className="text-subtle text-sm leading-relaxed">
              Building 90+ complex enterprise forms manually means 90x the boilerplate, 90x the bugs, and 90x the time.
              Each field requires layout code, validation logic, state wiring, and dependency tracking.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 mb-4 border-l-2 border-l-emerald-400">
            <h4 className="font-display font-semibold text-sm text-emerald-400 mb-2 uppercase tracking-wider">The Solution</h4>
            <p className="text-subtle text-sm leading-relaxed">
              Define your entire form in JSON. rj form engine handles rendering, validation, state, and dependencies automatically.
              One JSON config → fully functional, validated, accessible form widget.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border-l-2 border-l-amber-400">
            <h4 className="font-display font-semibold text-sm text-amber-400 mb-2 uppercase tracking-wider">The Impact</h4>
            <p className="text-subtle text-sm leading-relaxed">
              ~90% reduction in UI development effort across 3 enterprise production systems. Later extracted
              from internal use and published to pub.dev for the Flutter community.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-6">
            <a
              href={personal.pubdev}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all"
            >
              <Package size={14} />
              View on pub.dev
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/80 text-subtle hover:text-text text-sm font-medium transition-all"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </div>

        {/* Right: Features grid */}
        <div>
          {/* Sample JSON snippet */}
          <div className="glass rounded-2xl p-5 mb-4 font-mono text-xs overflow-auto">
            <p className="text-muted mb-3">// Define a form in JSON</p>
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-4 hover:border-accent/20 transition-colors"
              >
                <CheckCircle2 size={14} className="text-accent mb-2" />
                <h5 className="font-display font-semibold text-sm text-text mb-1">{f.title}</h5>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
