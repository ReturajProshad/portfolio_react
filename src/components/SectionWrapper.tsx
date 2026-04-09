"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-6xl mx-auto px-6 py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-4">
      <span className="w-6 h-px bg-accent" />
      {children}
    </span>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-bold text-3xl md:text-4xl text-text tracking-tight mb-2">
      {children}
    </h2>
  );
}
