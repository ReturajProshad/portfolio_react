"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Phone, Mail, Building2, CheckCircle2 } from "lucide-react";
import { personal } from "@/data/portfolio";
import { useProfile } from "@/lib/roleLens";

const contacts = [
  { icon: Github, href: personal.github, label: "GitHub" },
  { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
  { icon: Phone, href: `tel:${personal.phone}`, label: personal.phone },
  { icon: Mail, href: `mailto:${personal.email}`, label: personal.email },
];

export default function QuickInfo() {
  const { experiences } = useProfile();
  const current = experiences.find(e => e.current) || experiences[0];
  const topHighlights = current.highlights.slice(0, 4);

  return (
    <motion.div
      className="quick-info"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
    >
      <div className="quick-info-contacts">
        {contacts.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="quick-info-link"
          >
            <Icon size={14} />
            <span>{label}</span>
          </a>
        ))}
      </div>

      <div className="quick-info-company">
        <Building2 size={14} />
        <span className="quick-info-company-name">
          {current.role} @ {current.company}
        </span>
      </div>

      <div className="quick-info-shipped">
        {topHighlights.map((h, i) => (
          <div key={i} className="quick-info-bullet">
            <CheckCircle2 size={12} />
            <span>{h}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
