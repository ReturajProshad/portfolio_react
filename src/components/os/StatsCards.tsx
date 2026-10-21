"use client";

import { motion } from "framer-motion";
import { useProfile } from "@/lib/roleLens";
import AnimatedNumber from "./AnimatedNumber";

export default function StatsCards() {
  const { stats } = useProfile();

  return (
    <motion.div
      className="stats-cards"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="stat-card"
          style={{ "--stat-color": stat.color } as React.CSSProperties}
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -3, scale: 1.04 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 24,
            delay: 0.25 + i * 0.06,
          }}
        >
          <span className="stat-value">
            <AnimatedNumber value={stat.value} delay={0.3 + i * 0.06} />
          </span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
