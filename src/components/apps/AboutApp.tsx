"use client";

import { motion } from "framer-motion";
import { summary, focusAreas } from "@/data/portfolio";

export default function AboutApp() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-4">
            <span className="w-6 h-px bg-accent" />
            About
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight mb-4">
            A generalist engineer,<br />
            <span className="text-gradient-accent">not a one-stack specialist.</span>
          </h2>
          <p className="text-subtle text-sm leading-relaxed mb-6">{summary}</p>
          <ul className="flex flex-col gap-3">
            {focusAreas.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
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
        <div className="relative">
          <div className="glass rounded-2xl p-6 border-gradient">
            <p className="font-mono text-xs text-muted mb-4">// returaj.config.ts</p>
            <div className="space-y-2 font-mono text-sm">
              <div><span className="text-accent">const</span> <span className="text-text">engineer</span> <span className="text-subtle">= {"{"}</span></div>
              <div className="pl-4 space-y-1.5 text-subtle">
                <div><span className="text-amber-400">role</span>: <span className="text-emerald-400">&quot;Software Engineer&quot;</span>,</div>
                <div><span className="text-amber-400">location</span>: <span className="text-emerald-400">&quot;Dhaka, BD&quot;</span>,</div>
                <div><span className="text-amber-400">focus</span>: <span className="text-emerald-400">&quot;Systems &amp; Architecture&quot;</span>,</div>
                <div><span className="text-amber-400">available</span>: <span className="text-accent">true</span>,</div>
              </div>
              <div className="text-subtle">{"}"}</div>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60 grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Since", value: "2024" },
                { label: "Systems Shipped", value: "6+" },
                { label: "CGPA", value: "3.63" },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-bold text-lg text-text">{s.value}</div>
                  <div className="text-xs text-muted font-mono mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
