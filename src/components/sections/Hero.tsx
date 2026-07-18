"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #4F8EF7 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #34D399 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Status badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/80 bg-surface/60 text-xs font-mono text-subtle backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to new opportunities · Dhaka, Bangladesh
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-display font-bold text-5xl md:text-7xl tracking-tight mb-4"
          >
            <span className="text-gradient">Returaj</span>
            <br />
            <span className="text-text/90">Proshad</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            className="font-mono text-sm text-accent tracking-widest uppercase mb-6"
          >
            {personal.role} · {personal.roleSub}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-subtle text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            I build systems that scale — from{" "}
            <span className="text-text">offline-first mobile apps</span> to{" "}
            <span className="text-text">Spring Boot services</span> and{" "}
            <span className="text-text">schema-driven form engines</span> used in production.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-6 mb-12 text-center"
          >
            {[
              { value: "50K+", label: "App Downloads" },
              { value: "3", label: "Concurrent Systems" },
              { value: "6+", label: "Stacks & Languages" },
              { value: "1100+", label: "DSA Problems" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display font-bold text-2xl text-text">{stat.value}</span>
                <span className="text-xs text-muted font-mono mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border/80 text-subtle hover:text-text hover:border-accent/40 text-sm font-medium transition-all hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex justify-center gap-4">
            {[
              { icon: Github, href: personal.github, label: "GitHub" },
              { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 hover:bg-surface transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
