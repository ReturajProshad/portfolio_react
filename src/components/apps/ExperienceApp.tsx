"use client";

import { motion } from "framer-motion";
import { useProfile } from "@/lib/roleLens";

export default function ExperienceApp() {
  const { experiences } = useProfile();

  return (
    <div className="p-6 overflow-y-auto h-full">
      <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-4">
        <span className="w-6 h-px bg-accent" />
        Experience
      </span>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight mb-6">
        Where I&apos;ve built
      </h2>

      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />
        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative pl-12 md:pl-20"
            >
              <div
                className={`absolute left-2 md:left-5 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  exp.current ? "border-accent bg-accent/20" : "border-border bg-surface"
                }`}
              >
                {exp.current && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
              </div>
              <div className="glass rounded-2xl p-5 hover:border-accent/20 transition-all group">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-base text-text">{exp.company}</h3>
                      {exp.current && <span className="tag-emerald text-[10px]">Current</span>}
                      <span className="tag text-[10px]">{exp.type}</span>
                    </div>
                    <p className="text-accent font-mono text-sm mt-0.5">{exp.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-subtle">{exp.period}</p>
                    <p className="font-mono text-xs text-muted mt-0.5">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 mb-3">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-subtle">
                      <span className="text-accent mt-1.5 shrink-0">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                  {exp.tags.map(tag => (
                    <span key={tag} className="tag text-[11px]">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
