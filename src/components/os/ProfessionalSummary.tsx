"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";

interface Props {
  show: boolean;
}

const techStack = [
  { label: "Flutter", primary: true, color: "#02569B", accent: "#13B9FD" },
  { label: "Spring Boot", color: "#6DB33F", accent: "#8BC84B" },
  { label: "Java", color: "#ED8B00", accent: "#FFB347" },
  { label: "C++", color: "#00599C", accent: "#004482" },
  { label: "DSA", color: "#FF6F00", accent: "#FFA040" },
  { label: "Node.js", color: "#339933", accent: "#5CBF5C" },
  { label: "React", color: "#61DAFB", accent: "#00D8FF" },
  { label: "TypeScript", color: "#3178C6", accent: "#5BA3E6" },
  { label: "PostgreSQL", color: "#4169E1", accent: "#6B8FE3" },
  { label: "MySQL", color: "#4479A1", accent: "#6B9DC1" },
];

export default function ProfessionalSummary({ show }: Props) {
  return (
    <motion.div
      className="professional-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="summary-headline">
        {personal.headline}
      </p>
      <p className="summary-tagline">{personal.tagline}</p>
      <div className="summary-badges">
        {techStack.map((tech) => (
          <span
            key={tech.label}
            className={`tech-badge${tech.primary ? " tech-badge-primary" : ""}`}
            style={
              {
                "--badge-color": tech.color,
                "--badge-accent": tech.accent,
              } as React.CSSProperties
            }
          >
            {tech.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
