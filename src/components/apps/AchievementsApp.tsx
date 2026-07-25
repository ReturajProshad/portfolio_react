"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import { achievements } from "@/data/portfolio";

export default function AchievementsApp() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-accent" />
          Achievements
        </span>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight">Numbers that matter</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <SpotlightCard className="glass rounded-2xl p-5 hover:border-accent/20 transition-all cursor-default h-full">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{a.icon}</span>
                <span className="tag text-[10px]">{a.tag}</span>
              </div>
              <h3 className="font-display font-semibold text-sm text-text mb-1">{a.title}</h3>
              <p className="text-xs text-subtle leading-relaxed">{a.detail}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 glass rounded-2xl p-5"
      >
        <h3 className="font-display font-semibold text-sm text-text mb-4 flex items-center gap-2">
          <span className="text-accent">{'</>'}</span>
          GitHub Activity
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl overflow-hidden bg-surface/60 border border-border/60 flex items-center justify-center p-3 min-h-[120px]">
            <img
              src="https://github-readme-stats.vercel.app/api?username=ReturajProshad&show_icons=true&theme=transparent&hide_border=true&title_color=4F8EF7&text_color=8A9BB8&icon_color=34D399"
              alt="GitHub Stats"
              className="w-full"
              loading="lazy"
            />
          </div>
          <div className="rounded-xl overflow-hidden bg-surface/60 border border-border/60 flex items-center justify-center p-3 min-h-[120px]">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=ReturajProshad&layout=compact&theme=transparent&hide_border=true&title_color=4F8EF7&text_color=8A9BB8"
              alt="Top Languages"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
