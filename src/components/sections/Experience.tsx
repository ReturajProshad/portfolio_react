"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import { useProfile } from "@/lib/roleLens";

export default function Experience() {
  const { experiences } = useProfile();

  return (
    <SectionWrapper id="experience">
      <div className="mb-12">
        <SectionLabel>Experience</SectionLabel>
        <SectionHeading>Where I've built</SectionHeading>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2 md:left-5 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  exp.current
                    ? "border-accent bg-accent/20"
                    : "border-border bg-surface"
                }`}
              >
                {exp.current && (
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                )}
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 hover:border-accent/20 transition-all group">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-lg text-text">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="tag-emerald text-[10px]">Current</span>
                      )}
                      <span className="tag text-[10px]">{exp.type}</span>
                    </div>
                    <p className="text-accent font-mono text-sm mt-0.5">{exp.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-subtle">{exp.period}</p>
                    <p className="font-mono text-xs text-muted mt-0.5">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-subtle">
                      <span className="text-accent mt-1.5 shrink-0">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
