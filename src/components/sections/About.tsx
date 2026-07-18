"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import { summary, focusAreas } from "@/data/portfolio";

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Text */}
        <div>
          <SectionLabel>About</SectionLabel>
          <SectionHeading>
            A generalist engineer,<br />
            <span className="text-gradient-accent">not a one-stack specialist.</span>
          </SectionHeading>
          <p className="text-subtle text-base leading-relaxed mt-4 mb-8">{summary}</p>

          <ul className="flex flex-col gap-4">
            {focusAreas.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <span className="text-accent text-lg mt-0.5 font-mono shrink-0">{f.icon}</span>
                <p className="text-subtle text-sm leading-relaxed">
                  <span className="text-text font-medium">{f.title}.</span> {f.detail}
                </p>
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
                <div><span className="text-amber-400">role</span>: <span className="text-emerald-400">"Software Engineer"</span>,</div>
                <div><span className="text-amber-400">stacks</span>: [<span className="text-emerald-400">"Flutter"</span>, <span className="text-emerald-400">"Spring Boot"</span>, <span className="text-emerald-400">"Next.js"</span>],</div>
                <div><span className="text-amber-400">location</span>: <span className="text-emerald-400">"Dhaka, BD"</span>,</div>
                <div><span className="text-amber-400">focus</span>: <span className="text-emerald-400">"Systems & Architecture"</span>,</div>
                <div><span className="text-amber-400">openSource</span>: <span className="text-accent">true</span>,</div>
                <div><span className="text-amber-400">aiAssisted</span>: <span className="text-accent">true</span>,</div>
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
                { label: "Since", value: "2024" },
                { label: "Systems Shipped", value: "6+" },
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
