"use client";

import { motion } from "framer-motion";
import { Github, CheckCircle2, PackageSearch } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { openSource } from "@/data/portfolio";

/**
 * Shared body for the rj_form_engine window (desktop/mobile app view)
 * and the open-source section of List View, so both stay in sync.
 */
export default function OpenSourceContent({ compact = false }: { compact?: boolean }) {
  const story = [
    { label: "The Problem", text: openSource.problem, border: "border-l-accent", color: "text-accent" },
    { label: "The Solution", text: openSource.solution, border: "border-l-emerald-400", color: "text-emerald-400" },
    { label: "The Impact", text: openSource.impact, border: "border-l-amber-400", color: "text-amber-400" },
  ];

  return (
    <div className={`grid lg:grid-cols-2 items-start ${compact ? "gap-6" : "gap-8"}`}>
      <div>
        {story.map((item) => (
          <div
            key={item.label}
            className={`glass rounded-2xl border-l-2 ${item.border} ${compact ? "p-5 mb-3" : "p-6 mb-4"}`}
          >
            <h3 className={`font-display font-semibold text-xs ${item.color} mb-2 uppercase tracking-wider`}>
              {item.label}
            </h3>
            <p className="text-subtle text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}

        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href={openSource.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all"
          >
            <Github size={14} /> View source on GitHub
          </a>
          <a
            href={openSource.pubdev}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/40 text-accent text-sm font-medium hover:bg-accent/10 transition-all"
          >
            <PackageSearch size={14} /> Install from pub.dev
          </a>
        </div>
      </div>

      <div>
        <SpotlightCard className="glass rounded-2xl p-4 mb-4 font-mono text-xs overflow-auto" tilt={false}>
          <p className="text-muted mb-2">{"// A cascading form, declared — not hand-wired"}</p>
          <pre className="text-subtle leading-relaxed whitespace-pre-wrap break-words">{openSource.snippet}</pre>
        </SpotlightCard>

        <h3 className="font-display font-semibold text-xs text-text uppercase tracking-wider mb-2">
          Design decisions
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {openSource.design.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <SpotlightCard className="glass rounded-xl p-3 hover:border-accent/20 transition-colors h-full">
                <CheckCircle2 size={13} className="text-accent mb-1.5" />
                <h4 className="font-display font-semibold text-xs text-text mb-1">{f.title}</h4>
                <p className="text-[11px] text-muted leading-relaxed">{f.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
