"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";

const bullets = [
  { emoji: "⚡", text: "Clean Architecture advocate — I build for maintainability, not just deadlines." },
  { emoji: "🔩", text: "Systems thinker — from form engines to cross-platform POS, I build reusable abstractions." },
  { emoji: "📦", text: "Open-source contributor — rj form engine ships to production, not just GitHub." },
  { emoji: "🏆", text: "1100+ DSA problems, ICPC regional — algorithmic thinking applied to real engineering." },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          <SectionLabel>About</SectionLabel>
          <SectionHeading>
            Engineering depth,<br />
            <span className="text-gradient-accent">not just code output.</span>
          </SectionHeading>
          <p className="text-subtle text-base leading-relaxed mt-4 mb-8">
            I'm a Flutter engineer based in Bangladesh with experience building enterprise-grade production systems.
            My focus is on architecture that <span className="text-text">scales beyond the feature</span> — reusable
            systems, type-safe APIs, and UI that performs.
          </p>

          <ul className="flex flex-col gap-4">
            {bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <span className="text-lg mt-0.5">{b.emoji}</span>
                <p className="text-subtle text-sm leading-relaxed">{b.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: Card */}
        <div className="relative">
          <div className="glass rounded-2xl p-8 border-gradient">
            {/* Code-style bio card */}
            <p className="font-mono text-xs text-muted mb-6">// returaj.config.ts</p>
            <div className="space-y-3 font-mono text-sm">
              <div>
                <span className="text-accent">const</span>{" "}
                <span className="text-text">engineer</span>{" "}
                <span className="text-subtle">= {"{"}</span>
              </div>
              <div className="pl-4 space-y-2 text-subtle">
                <div><span className="text-amber-400">role</span>: <span className="text-emerald-400">"Flutter & Mobile"</span>,</div>
                <div><span className="text-amber-400">location</span>: <span className="text-emerald-400">"Dhaka, BD"</span>,</div>
                <div><span className="text-amber-400">focus</span>: <span className="text-emerald-400">"Systems & Architecture"</span>,</div>
                <div><span className="text-amber-400">openSource</span>: <span className="text-accent">true</span>,</div>
                <div><span className="text-amber-400">available</span>: <span className="text-accent">true</span>,</div>
                <div>
                  <span className="text-amber-400">thesis</span>:{" "}
                  <span className="text-emerald-400">"NeuroTransMir"</span>,
                </div>
              </div>
              <div className="text-subtle">{"}"}</div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Experience", value: "1+ yr" },
                { label: "Projects", value: "10+" },
                { label: "CGPA", value: "3.63" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-xl text-text">{s.value}</div>
                  <div className="text-xs text-muted font-mono mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-2xl bg-accent pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-10 blur-xl bg-emerald-400 pointer-events-none" />
        </div>
      </div>
    </SectionWrapper>
  );
}
