"use client";

import { motion } from "framer-motion";
import { WifiOff, CloudUpload, Gamepad2, Languages, Play, BookOpen, Cpu, Network, Brain, Database, FileText, PenLine, ListTodo } from "lucide-react";
import { projects } from "@/data/portfolio";

const shipped = projects.find((p) => p.id === "amar-babu")!;

const techTags = ["Flutter", "Riverpod", "SQLite", "Firebase", "Flame"];

const features = [
  { icon: WifiOff, label: "Offline-First" },
  { icon: CloudUpload, label: "Cloud Backup" },
  { icon: Gamepad2, label: "6 Mini-Games" },
  { icon: Languages, label: "Bangla / English" },
];

const exploring = [
  { icon: BookOpen, label: "React Native", sub: "Cross-platform beyond Flutter" },
  { icon: Cpu, label: "Complex DSA", sub: "Advanced problem-solving patterns" },
  { icon: Brain, label: "AI Integration", sub: "LLM APIs, embeddings, agents" },
  { icon: Database, label: "Local AI", sub: "On-device ML, quantization" },
  { icon: Network, label: "RAG", sub: "Retrieval-Augmented Generation" },
];

function WorkCard() {
  return (
    <div className="current-work-card">
      <div className="current-work-header">
        <span className="live-dot" aria-hidden="true" />
        <span>Recently Shipped · Live</span>
      </div>

      <h3 className="current-work-title">
        {shipped.title} — Pregnancy Companion App
      </h3>

      <p className="current-work-desc">
        A Bangla-first pregnancy companion for expecting mothers, built and
        shipped solo: offline-first data with 12 safe schema migrations, cloud
        backup, a talking-baby experience and physics-based mini-games, backed
        by Crashlytics and 127 automated tests.
      </p>

      <div className="current-work-features">
        {features.map(({ icon: Icon, label }) => (
          <div key={label} className="current-work-feature">
            <Icon size={12} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="current-work-tags">
        {techTags.map((tag) => (
          <span key={tag} className="current-work-tag">{tag}</span>
        ))}
      </div>

      <a
        className="current-work-cta"
        href={shipped.links.playstore}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Play size={12} /> Get it on Google Play
      </a>
    </div>
  );
}

const chapters = [
  "Clean Architecture on Flutter",
  "State Management Patterns",
  "Offline-First Design",
  "CI/CD for Mobile",
  "API Design & Integration",
];

function WritingCard() {
  return (
    <div className="writing-card">
      <div className="writing-card-accent" />
      <div className="writing-card-body">
        <div className="writing-card-header">
          <PenLine size={13} />
          <span>In Progress · Writing & Documenting</span>
        </div>
        <h4 className="writing-card-title">Mobile Architecture & Best Practices Guide</h4>
        <p className="writing-card-desc">
          Every new topic I explore gets documented — architecture decisions,
          pattern trade-offs, and production pitfalls — compiled into a living
          book for future reference and team onboarding.
        </p>
        <div className="writing-card-chapters">
          {chapters.map((ch) => (
            <div key={ch} className="writing-card-chapter">
              <FileText size={10} />
              <span>{ch}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExploringCard() {
  return (
    <div className="exploring-card">
      <div className="exploring-header">
        <ListTodo size={13} />
        <span>Running Tasks · Exploring Next</span>
      </div>

      <div className="exploring-grid">
        {exploring.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="exploring-item">
            <div className="exploring-item-icon">
              <Icon size={13} />
            </div>
            <div className="exploring-item-text">
              <span className="exploring-item-label">{label}</span>
              <span className="exploring-item-sub">{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CurrentWork() {
  return (
    <motion.div
      className="current-work"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
    >
      <WorkCard />
      <ExploringCard />
      <WritingCard />
    </motion.div>
  );
}
