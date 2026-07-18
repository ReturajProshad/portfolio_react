"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";
import CountUp from "@/components/CountUp";

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

const stats = [
  { component: <CountUp value={50} suffix="K+" />, label: "App Downloads" },
  { component: <CountUp value={3} />, label: "Concurrent Systems" },
  { component: <CountUp value={6} suffix="+" />, label: "Stacks & Languages" },
  { component: <CountUp value={1100} suffix="+" />, label: "DSA Problems" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Cursor-tracked ambient glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, #4F8EF7 0%, transparent 70%)",
        }}
      />
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl pointer-events-none animate-float"
        style={{ background: "radial-gradient(circle, #4F8EF7 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl pointer-events-none animate-float"
        style={{ background: "radial-gradient(circle, #34D399 0%, transparent 70%)", animationDelay: "2s" }}
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
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display font-bold text-2xl text-text">{stat.component}</span>
                <span className="text-xs text-muted font-mono mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mb-12">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all hover:shadow-xl hover:shadow-accent/20"
            >
              View Projects
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border/80 text-subtle hover:text-text hover:border-accent/40 text-sm font-medium transition-all"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex justify-center gap-4">
            {[
              { icon: Github, href: personal.github, label: "GitHub" },
              { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/60 text-muted hover:text-text hover:border-accent/40 hover:bg-surface transition-all"
              >
                <Icon size={16} />
              </motion.a>
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
