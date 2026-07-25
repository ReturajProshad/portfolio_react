"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Bell, MessageCircle, Activity, BookOpen, Cpu, Network, Brain, Database, FileText, PenLine } from "lucide-react";

const techTags = ["Flutter", "Firestore", "Node.js", "Gemini API"];

const features = [
  { icon: Heart, label: "Mood Tracking" },
  { icon: Bell, label: "Reminders" },
  { icon: MessageCircle, label: "Community Chat" },
  { icon: Activity, label: "Health Tips" },
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
        <Sparkles size={14} />
        <span>Currently Working On</span>
      </div>

      <h3 className="current-work-title">
        Bangladeshi Pregnant Mother&apos;s Emotional Support Application
      </h3>

      <p className="current-work-desc">
        An AI-assisted mobile app providing emotional well-being tracking,
        personalized health tips, community support, and timely reminders for
        expecting mothers — built with empathy and modern full-stack tooling.
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
          <span>Writing & Documenting</span>
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
        <BookOpen size={13} />
        <span>Currently Exploring</span>
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
