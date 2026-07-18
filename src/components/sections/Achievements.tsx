"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import SpotlightCard from "@/components/SpotlightCard";
import { achievements } from "@/data/portfolio";

export default function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <div className="text-center mb-12">
        <SectionLabel>Achievements</SectionLabel>
        <SectionHeading>Numbers that matter</SectionHeading>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <SpotlightCard className="glass rounded-2xl p-6 hover:border-accent/20 transition-all cursor-default h-full">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{a.icon}</span>
                <span className="tag text-[10px]">{a.tag}</span>
              </div>
              <h3 className="font-display font-semibold text-base text-text mb-1">{a.title}</h3>
              <p className="text-xs text-subtle leading-relaxed">{a.detail}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* GitHub Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 glass rounded-2xl p-6"
      >
        <h3 className="font-display font-semibold text-base text-text mb-6 flex items-center gap-2">
          <span className="text-accent">{'</>'}</span>
          GitHub Activity
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden bg-surface/60 border border-border/60 flex items-center justify-center p-4 min-h-[140px]">
            <img
              src="https://github-readme-stats.vercel.app/api?username=ReturajProshad&show_icons=true&theme=transparent&hide_border=true&title_color=4F8EF7&text_color=8A9BB8&icon_color=34D399"
              alt="GitHub Stats"
              className="w-full"
              loading="lazy"
            />
          </div>
          <div className="rounded-xl overflow-hidden bg-surface/60 border border-border/60 flex items-center justify-center p-4 min-h-[140px]">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=ReturajProshad&layout=compact&theme=transparent&hide_border=true&title_color=4F8EF7&text_color=8A9BB8"
              alt="Top Languages"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
