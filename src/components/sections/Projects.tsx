"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Package, Smartphone, Building2, ShoppingBag } from "lucide-react";
import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import { projects } from "@/data/portfolio";

const typeIcon: Record<string, React.ReactNode> = {
  opensource: <Package size={14} />,
  production: <Smartphone size={14} />,
  enterprise: <Building2 size={14} />,
  project: <ShoppingBag size={14} />,
};

const typeColor: Record<string, string> = {
  opensource: "text-accent border-accent/30 bg-accent/10",
  production: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  enterprise: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  project: "text-subtle border-border bg-surface",
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects">
      <div className="mb-12">
        <SectionLabel>Projects</SectionLabel>
        <SectionHeading>
          Things I've shipped
        </SectionHeading>
        <p className="text-subtle text-sm mt-2">From open-source libraries to enterprise production systems.</p>
      </div>

      {/* Featured */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="glass rounded-2xl p-6 border-gradient hover:shadow-xl hover:shadow-accent/5 transition-all group cursor-default"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${typeColor[project.type]}`}
                  >
                    {typeIcon[project.type]}
                    {project.type.toUpperCase()}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-mono text-amber-400 border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-xl text-text group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-muted mt-0.5">{project.subtitle}</p>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all"
                  >
                    <Github size={14} />
                  </a>
                )}
                {project.links.pubdev && (
                  <a
                    href={project.links.pubdev}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all"
                  >
                    <Package size={14} />
                  </a>
                )}
                {project.links.playstore && (
                  <a
                    href={project.links.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-subtle text-sm leading-relaxed mb-4">{project.description}</p>

            {/* Achievement badge */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-accent/5 border border-accent/15 mb-4">
              <span className="text-accent text-xs mt-0.5 shrink-0">✦</span>
              <p className="text-xs text-accent/80 font-medium">{project.achievement}</p>
            </div>

            {/* Stats */}
            {project.stats && (
              <div className={`grid grid-cols-${project.stats.length} gap-3 mb-4`}>
                {project.stats.map((s) => (
                  <div key={s.label} className="text-center p-2 rounded-lg bg-surface/60 border border-border/60">
                    <div className="font-display font-bold text-base text-text">{s.value}</div>
                    <div className="text-[10px] text-muted font-mono mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Details list */}
            {project.details && (
              <ul className="space-y-1.5 mb-4">
                {project.details.map((d, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-subtle">
                    <span className="text-accent mt-1 shrink-0">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
              {project.tags.map((tag) => (
                <span key={tag} className="tag text-[11px]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Non-featured grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {rest.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass rounded-xl p-5 hover:border-border/80 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${typeColor[project.type]} mb-2`}
                >
                  {typeIcon[project.type]}
                  {project.type.toUpperCase()}
                </span>
                <h3 className="font-display font-semibold text-base text-text group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-[11px] font-mono text-muted">{project.subtitle}</p>
              </div>
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-text transition-colors"
                >
                  <Github size={14} />
                </a>
              )}
            </div>
            <p className="text-subtle text-xs leading-relaxed mb-3">{project.description}</p>
            <p className="text-[11px] text-accent/70 flex items-start gap-1.5">
              <span className="shrink-0 mt-0.5">✦</span>
              {project.achievement}
            </p>
            <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border/60">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="tag text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
