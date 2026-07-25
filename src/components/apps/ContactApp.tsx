"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight, MapPin, Phone, Code2, Trophy } from "lucide-react";
import { personal } from "@/data/portfolio";

const links = [
  { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}`, color: "text-accent" },
  { icon: Github, label: "GitHub", value: "github.com/ReturajProshad", href: personal.github, color: "text-text" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/returaj-proshad", href: personal.linkedin, color: "text-accent" },
  { icon: Trophy, label: "Codeforces", value: "returaj0808 · Max 1235", href: personal.codeforces, color: "text-amber-400" },
  { icon: Code2, label: "LeetCode", value: "60+ problems solved", href: personal.leetcode, color: "text-emerald-400" },
];

export default function ContactApp() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-lg mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-accent" />
          Contact
        </span>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight mb-2">
          Let&apos;s build something{" "}
          <span className="text-gradient-accent">great</span>
        </h2>
        <p className="text-subtle text-sm mb-8">
          I&apos;m open to full-time roles, contract work, and interesting open-source collaborations.
        </p>

        <div className="flex flex-col gap-2 mb-8">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 6 }}
              className="group glass rounded-xl px-4 py-3 flex items-center gap-3 hover:border-accent/30 transition-all text-left"
            >
              <div className={`w-8 h-8 rounded-lg bg-surface/80 border border-border/60 flex items-center justify-center ${link.color}`}>
                <link.icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted font-mono mb-0.5">{link.label}</p>
                <p className="text-sm text-text truncate">{link.value}</p>
              </div>
              <ArrowRight size={13} className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
            </motion.a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-subtle">
          <span className="flex items-center gap-1.5"><MapPin size={12} className="text-muted" /> Dhaka, Bangladesh</span>
          <span className="flex items-center gap-1.5"><Phone size={12} className="text-muted" /> {personal.phone}</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open to work</span>
        </div>
      </div>
    </div>
  );
}
