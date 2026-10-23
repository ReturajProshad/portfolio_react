"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import { useProfile } from "@/lib/roleLens";
import { skillIcon, skillTagClass } from "@/config/skillCategories";

export default function SkillsApp() {
  const { skills, skillsBlurb } = useProfile();

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-accent" />
          Skills
        </span>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight mb-2">
          Tools of the trade
        </h2>
        <p className="text-subtle text-sm max-w-md mx-auto">{skillsBlurb}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(skills).map(([category, items], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.08, duration: 0.5 }}
          >
            <SpotlightCard className="glass rounded-2xl p-4 hover:border-accent/20 transition-colors group h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">{skillIcon(category)}</span>
                <span className="font-display font-semibold text-sm text-text">{category}</span>
                <span className="ml-auto font-mono text-xs text-muted">{items.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className={skillTagClass(category)}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.08 + 0.15 + i * 0.025, duration: 0.25 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
