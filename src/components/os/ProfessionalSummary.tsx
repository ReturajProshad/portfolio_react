"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/lib/roleLens";

interface Props {
  show: boolean;
}

export default function ProfessionalSummary({ show }: Props) {
  const { lens, headline, tagline, techStack } = useProfile();

  return (
    <motion.div
      className="professional-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={lens}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <p className="summary-headline">{headline}</p>
          <p className="summary-tagline">{tagline}</p>
          <div className="summary-badges">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech.label}
                className={`tech-badge${tech.primary ? " tech-badge-primary" : ""}`}
                style={
                  {
                    "--badge-color": tech.color,
                    "--badge-accent": tech.accent,
                  } as React.CSSProperties
                }
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.05 + i * 0.035 }}
              >
                {tech.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
