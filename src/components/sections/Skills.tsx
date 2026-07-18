"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import SpotlightCard from "@/components/SpotlightCard";
import { skills } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
  Languages: "tag-accent",
  "Backend & APIs": "tag-emerald",
  "Frontend & Mobile": "tag-amber",
  Databases: "tag",
  "Architecture & Systems": "tag",
  "Tools & Workflow": "tag",
};

const categoryIcons: Record<string, string> = {
  Languages: "{ }",
  "Backend & APIs": "☁️",
  "Frontend & Mobile": "📱",
  Databases: "🗄️",
  "Architecture & Systems": "🏗️",
  "Tools & Workflow": "🛠️",
};

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-12">
        <SectionLabel>Skills</SectionLabel>
        <SectionHeading>Tools of the trade</SectionHeading>
        <p className="text-subtle text-sm mt-2 max-w-md mx-auto">
          The stack I use to build scalable, production-grade systems — mobile, backend, and web.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(skills).map(([category, items], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.08, duration: 0.5 }}
          >
            <SpotlightCard className="glass rounded-2xl p-5 hover:border-accent/20 transition-colors group h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">{categoryIcons[category]}</span>
                <span className="font-display font-semibold text-sm text-text">{category}</span>
                <span className="ml-auto font-mono text-xs text-muted">{items.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span key={skill} className={categoryColors[category] || "tag"}>
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
