"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Package, Smartphone, Building2, ShoppingBag, Layers, Database } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { projects } from "@/data/portfolio";

const typeIcon: Record<string, React.ReactNode> = {
  opensource: <Package size={14} />,
  production: <Smartphone size={14} />,
  enterprise: <Building2 size={14} />,
  project: <ShoppingBag size={14} />,
  fullstack: <Layers size={14} />,
  backend: <Database size={14} />,
};

const typeColor: Record<string, string> = {
  opensource: "text-accent border-accent/30 bg-accent/10",
  production: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  enterprise: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  project: "text-subtle border-border bg-surface",
  fullstack: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  backend: "text-sky-400 border-sky-400/30 bg-sky-400/10",
};

export default function ProjectsApp() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <div className="p-6 overflow-y-auto h-full">
      <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-3">
        <span className="w-6 h-px bg-accent" />
        Projects
      </span>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight mb-1">
        Things I&apos;ve shipped
      </h2>
      <p className="text-subtle text-sm mb-6">From open-source libraries to enterprise production systems.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
          >
            <SpotlightCard className="glass rounded-2xl p-5 border-gradient hover:shadow-xl hover:shadow-accent/5 transition-all group cursor-default h-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${typeColor[project.type]}`}>
                      {typeIcon[project.type]}
                      {project.type.toUpperCase()}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-mono text-amber-400 border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 rounded-full">FEATURED</span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-text group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-xs font-mono text-muted mt-0.5">{project.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.links.github && (
                    <a href={project.links.github} aria-label={`${project.title} on GitHub`} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all"
                    ><Github size={13} /></a>
                  )}
                  {project.links.playstore && (
                    <a href={project.links.playstore} aria-label={`${project.title} on Google Play`} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all"
                    ><ExternalLink size={13} /></a>
                  )}
                  {project.links.pubdev && (
                    <a href={project.links.pubdev} aria-label={`${project.title} on pub.dev`} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all"
                    ><Package size={13} /></a>
                  )}
                </div>
              </div>
              <p className="text-subtle text-sm leading-relaxed mb-3">{project.description}</p>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-accent/5 border border-accent/15 mb-3">
                <span className="text-accent text-xs mt-0.5 shrink-0">✦</span>
                <p className="text-xs text-accent/80 font-medium">{project.achievement}</p>
              </div>
              {project.stats && (
                <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: `repeat(${project.stats.length}, minmax(0, 1fr))` }}>
                  {project.stats.map(s => (
                    <div key={s.label} className="text-center p-2 rounded-lg bg-surface/60 border border-border/60">
                      <div className="font-display font-bold text-sm text-text">{s.value}</div>
                      <div className="text-[10px] text-muted font-mono mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {project.details && (
                <ul className="space-y-1 mb-3">
                  {project.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-subtle">
                      <span className="text-accent mt-1 shrink-0">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                {project.tags.map(tag => (
                  <span key={tag} className="tag text-[11px]">{tag}</span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {rest.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <SpotlightCard className="glass rounded-xl p-4 hover:border-border/80 transition-all group h-full">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${typeColor[project.type]} mb-1.5`}>
                    {typeIcon[project.type]}
                    {project.type.toUpperCase()}
                  </span>
                  <h3 className="font-display font-semibold text-sm text-text group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-[11px] font-mono text-muted">{project.subtitle}</p>
                </div>
                {project.links.github && (
                  <a href={project.links.github} aria-label={`${project.title} on GitHub`} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors shrink-0">
                    <Github size={13} />
                  </a>
                )}
              </div>
              <p className="text-subtle text-xs leading-relaxed mb-2">{project.description}</p>
              <p className="text-[11px] text-accent/70 flex items-start gap-1.5">
                <span className="shrink-0 mt-0.5">✦</span>{project.achievement}
              </p>
              <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-border/60">
                {project.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="tag text-[10px]">{tag}</span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
