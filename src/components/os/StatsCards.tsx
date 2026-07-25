"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2+", label: "Years of Experience", color: "rgb(var(--accent))" },
  { value: "50K+", label: "App Downloads", color: "rgb(var(--emerald))" },
  { value: "3", label: "Production Systems", color: "#8B5CF6" },
  { value: "90+", label: "Forms Shipped", color: "#F59E0B" },
  { value: "30+", label: "Feature Modules", color: "#EC4899" },
  { value: "1", label: "Open-Source Package", color: "#06B6D4" },
];

export default function StatsCards() {
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 + i * 0.06, ease: "easeOut" }}
        >
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
