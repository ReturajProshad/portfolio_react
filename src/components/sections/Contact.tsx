"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight, MapPin, Phone, Code2, Trophy } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import { personal } from "@/data/portfolio";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: "text-accent",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ReturajProshad",
    href: personal.github,
    color: "text-text",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/returaj-proshad",
    href: personal.linkedin,
    color: "text-accent",
  },
  {
    icon: Trophy,
    label: "Codeforces",
    value: "returaj0808 · Max 1235",
    href: personal.codeforces,
    color: "text-amber-400",
  },
  {
    icon: Code2,
    label: "LeetCode",
    value: "60+ problems solved",
    href: personal.leetcode,
    color: "text-emerald-400",
  },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="max-w-3xl mx-auto text-center">
        <SectionLabel>Contact</SectionLabel>
        <SectionHeading>
          Let's build something{" "}
          <span className="text-gradient-accent">great</span>
        </SectionHeading>
        <p className="text-subtle text-base mt-4 mb-12 max-w-xl mx-auto">
          I'm open to full-time roles, contract work, and interesting open-source collaborations.
          If you're building something ambitious — reach out.
        </p>

        {/* Contact cards */}
        <div className="flex flex-col gap-3 max-w-md mx-auto mb-12">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 6 }}
              className="group glass rounded-xl px-5 py-4 flex items-center gap-4 hover:border-accent/30 transition-all text-left"
            >
              <div className={`w-9 h-9 rounded-lg bg-surface/80 border border-border/60 flex items-center justify-center ${link.color}`}>
                <link.icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted font-mono mb-0.5">{link.label}</p>
                <p className="text-sm text-text truncate">{link.value}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
              />
            </motion.a>
          ))}
        </div>

        {/* Location + availability */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-subtle">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-muted" />
            Dhaka, Bangladesh
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={13} className="text-muted" />
            {personal.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to work
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
