export const personal = {
  name: "Returaj Proshad",
  fullName: "Returaj Proshad Shornocar",
  role: "Software Engineer",
  roleSub: "Full-Stack · Mobile · Systems",
  tagline:
    "I build systems that scale — from offline-first mobile apps to Spring Boot services and schema-driven form engines used in production.",
  location: "Dhaka, Bangladesh",
  email: "returajsumon0808@gmail.com",
  phone: "+8801608517866",
  github: "https://github.com/ReturajProshad",
  linkedin: "https://www.linkedin.com/in/returaj-proshad",
  codeforces: "https://codeforces.com/profile/returaj0808",
  leetcode: "https://leetcode.com/u/returajsumon0808/",
  available: true,
  languages: ["English", "Bangla"],
};

export const summary =
  "Software engineer with production experience since September 2024, having shipped three concurrent enterprise systems using Clean Architecture and Riverpod-based state management. A generalist by interest — comfortable moving across Java/Spring Boot, Node.js, Flutter, and Next.js, and learning new stacks directly from source code and official docs. Track record spans a metadata-driven form engine (90+ dynamic forms, published to pub.dev), offline-first sync with conflict resolution (LWW, OT, CRDTs), native platform integration via Method Channels, and a solo-built Play Store app with 50K+ downloads. Uses AI coding assistants (Claude Code, GitHub Copilot) to accelerate delivery while independently validating every line for correctness, security, and maintainability.";

export const focusAreas = [
  {
    title: "Full-Stack Systems",
    detail: "Spring Boot + JPA/Hibernate, Node.js/Express, and Next.js — designing APIs and the clients that consume them.",
    icon: "◆",
  },
  {
    title: "Mobile Engineering",
    detail: "Flutter apps in production since 2024 — Riverpod, offline-first sync, native platform channels, 50K+ downloads shipped.",
    icon: "▲",
  },
  {
    title: "Systems & Architecture",
    detail: "Clean Architecture, SOLID, RBAC, caching strategies (SWR/TTL/LRU), and conflict resolution (LWW, OT, CRDTs).",
    icon: "●",
  },
  {
    title: "AI-Accelerated Delivery",
    detail: "Claude Code & GitHub Copilot in the daily workflow — always paired with independent review, testing, and debugging.",
    icon: "✦",
  },
];

export const skills = {
  Languages: ["Java", "Dart", "TypeScript", "JavaScript", "C / C++", "SQL", "Python (basic)"],
  "Backend & APIs": ["Spring Boot", "JPA / Hibernate", "Node.js", "Express", "REST APIs", "JWT Auth", "Firebase Functions"],
  "Frontend & Mobile": ["Flutter", "React", "Next.js", "Riverpod", "Provider", "GetX", "GoRouter"],
  Databases: ["PostgreSQL", "Oracle", "Firebase Firestore", "SQLite", "Hive"],
  "Architecture & Systems": [
    "Clean Architecture",
    "SOLID Principles",
    "RBAC",
    "Offline-First Sync",
    "Caching (SWR/TTL/LRU)",
    "Conflict Resolution (LWW, OT, CRDTs)",
  ],
  "Tools & Workflow": ["Git", "GitHub Actions (CI/CD)", "GitLab", "Postman", "Figma", "Claude Code", "GitHub Copilot"],
};

export const experiences = [
  {
    company: "One Direction Companies Limited (ODCL)",
    role: "Software Engineer — Flutter & Mobile",
    period: "Apr 2025 – Jun 2026",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    current: true,
    highlights: [
      "Owned Flutter development end-to-end across 3 concurrent enterprise systems — Smart Gowala, FoodExpo Kiosk, and Shimana — spanning livestock management, self-service F&B POS kiosks, and border compliance workflows",
      "Built a metadata-driven form engine rendering 90+ complex forms from JSON, cutting UI dev effort by ~90% — later extracted into the open-source rj form engine package",
      "Designed a centralized, type-safe routing and pagination framework with GoRouter across 30+ feature modules, eliminating navigation boilerplate",
      "Implemented JWT auth with dynamic RBAC, letting a single build serve multiple roles with granular, module-level permissions",
      "Engineered an offline-first data layer with Hive-based caching (SWR/TTL) and conflict resolution (LWW, CRDTs) to keep workflows reliable under intermittent connectivity",
      "Built a cross-platform POS kiosk (Windows & Android) integrating native Win32 APIs and ESC/POS thermal printers via Flutter Method Channels",
      "Improved UI performance 30% (Flutter DevTools) via Sliver lazy loading and optimized Riverpod subscriptions",
      "Set up GitHub Actions CI/CD for automatic Windows kiosk builds and releases",
      "Partnered with backend engineers on Spring Boot REST contracts and contributed directly to Node.js endpoints and Firestore integration",
      "Mentored junior developers on Clean Architecture and SOLID through structured code reviews",
    ],
    tags: ["Flutter", "Riverpod", "Spring Boot", "Node.js", "GoRouter", "Clean Architecture", "RBAC", "CI/CD"],
  },
  {
    company: "Kensink Labs",
    role: "Flutter Developer (Contract)",
    period: "Mar 2025 – Apr 2025",
    location: "Remote",
    type: "Contract",
    current: false,
    highlights: [
      "Delivered an AI-driven itinerary timeline feature for the Sootcase travel app",
      "Translated Figma designs to production Flutter UI under a strict deadline",
      "Integrated REST APIs for real-time travel planning data",
    ],
    tags: ["Flutter", "REST APIs", "Figma", "AI Integration"],
  },
  {
    company: "Brainwave Matrix Solutions",
    role: "Mobile Developer Intern",
    period: "Sep 2024 – Oct 2024",
    location: "Remote",
    type: "Internship",
    current: false,
    highlights: [
      "Built a responsive Flutter news application consuming REST APIs",
      "Implemented Provider-based state management architecture",
      "Delivered the full project within the internship timeline",
    ],
    tags: ["Flutter", "Provider", "REST APIs"],
  },
];

export const projects = [
  {
    id: "eztrainz",
    title: "EZTrainz",
    subtitle: "Offline-First Language Learning Platform — Full-Stack",
    description:
      "A Duolingo-style app built solo in a 24-hour technical assessment: a Spring Boot modular-monolith backend paired with a Clean Architecture Flutter mobile app, built with AI coding assistants and independently verified line by line.",
    achievement: "Ambiguous brief → fully specified 6-module system, shipped across 19+ incremental commits",
    tags: ["Spring Boot", "Flutter", "Isar", "Offline-First", "System Design"],
    links: {
      github: "https://github.com/ReturajProshad/EZTrainz-Task",
    },
    featured: true,
    type: "fullstack",
    stats: [
      { label: "Modules", value: "6" },
      { label: "Commits", value: "19+" },
      { label: "Build Time", value: "24h" },
    ],
    details: [
      "Auth, Course, Quiz, Progress, Leaderboard, and Sync modules designed from an ambiguous brief",
      "Offline-first conflict resolution engine — Last-Write-Wins with UTC-normalized timestamps",
      "Isar-backed local sync queue for reliable background synchronization",
      "Spring Boot modular monolith backend paired with a Clean Architecture Flutter client",
    ],
  },
  {
    id: "rj-form-engine",
    title: "rj form engine",
    subtitle: "Open-Source Schema-Driven Form Engine",
    description:
      "A production-grade Flutter form engine that lets developers render complex, fully-validated forms from JSON configuration — no UI code needed.",
    achievement: "90% reduction in UI development effort across 3 enterprise systems",
    tags: ["Dart", "Flutter", "Open Source", "pub.dev"],
    links: {
      github: "https://github.com/ReturajProshad",
    },
    featured: true,
    type: "opensource",
    stats: [
      { label: "Field Types", value: "13+" },
      { label: "Validation Rules", value: "25+" },
      { label: "State Managers", value: "4" },
      { label: "Forms Rendered", value: "90+" },
    ],
    details: [
      "Metadata-driven pipeline with parent-child dependency tracking",
      "Async data loading for multi-step workflows",
      "State-management-agnostic FormController (Provider, Riverpod, Bloc, GetX)",
      "Comprehensive Widget & Unit test suite covering conditional visibility and dependency resolution",
    ],
  },
  {
    id: "codehorse",
    title: "CodeHorse",
    subtitle: "Educational App — 50K+ Downloads",
    description:
      "A published educational app with 50K+ active installs, Firebase Firestore, AdMob monetization, and FCM push notifications, backed by a Node.js service. Built solo from scratch to production.",
    achievement: "50K+ installs · 4.3+ Play Store rating · Sole developer",
    tags: ["Flutter", "Firebase", "Node.js", "AdMob", "FCM"],
    links: {
      playstore: "https://play.google.com/store/apps/details?id=com.rayhans.codehorse&hl=en",
    },
    featured: true,
    type: "production",
    stats: [
      { label: "Downloads", value: "50K+" },
      { label: "Rating", value: "4.3★" },
      { label: "Solo Build", value: "✓" },
    ],
  },
  {
    id: "todo-springboot-nextjs",
    title: "Spring Boot + Next.js ToDo",
    subtitle: "Full-Stack Web Application",
    description:
      "A full-stack task manager with a Spring Boot REST backend (CRUD, structured exception handling) and a Next.js + TypeScript frontend — the frontend stack learned independently from official docs while building.",
    achievement: "Self-taught the Next.js/TypeScript frontend while shipping the full stack solo",
    tags: ["Spring Boot", "Next.js", "TypeScript", "REST APIs"],
    links: {
      github: "https://github.com/ReturajProshad/Spring-boot-Next-ts-todo",
    },
    featured: false,
    type: "fullstack",
  },
  {
    id: "virtual-bookshelf",
    title: "Virtual Bookshelf",
    subtitle: "Full-Stack Oracle DB Project",
    description:
      "A bookstore application on Node.js REST APIs backed by Oracle Database — schema normalization, triggers, and stored procedures, with PL/SQL learned independently for the build.",
    achievement: "Independently learned Oracle PL/SQL to design triggers and stored procedures",
    tags: ["Node.js", "Oracle DB", "PL/SQL", "REST APIs"],
    links: {
      github: "https://github.com/ReturajProshad/virtual-bookshelf-management--Returaj-Proshad-Shornocar--DB-Batch-11",
    },
    featured: false,
    type: "backend",
  },
  {
    id: "zavimart",
    title: "ZaviMart",
    subtitle: "E-Commerce App — Technical Assessment",
    description:
      "Daraz-style product listing app with Clean Architecture, Riverpod AsyncNotifierProvider.family, JWT-authenticated persistent sessions, and complex scroll architecture using NestedScrollView.",
    achievement: "Solved a complex scroll-state problem with NestedScrollView + SliverOverlapAbsorber/Injector",
    tags: ["Flutter", "Riverpod", "Clean Architecture", "JWT", "Flutter Secure Storage"],
    links: {
      github: "https://github.com/ReturajProshad/zaviMart",
    },
    featured: false,
    type: "project",
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    subtitle: "Smart Gowala · FoodExpo · Shimana",
    description:
      "Three production enterprise apps: livestock management, self-service F&B POS kiosks, and border compliance workflows.",
    achievement: "Cross-platform POS with native Win32 APIs + ESC/POS thermal printers",
    tags: ["Flutter", "Windows", "Android", "Win32", "GoRouter", "RBAC"],
    links: {
      github: "https://github.com/ReturajProshad/professional-summary",
    },
    featured: false,
    type: "enterprise",
  },
];

export const achievements = [
  {
    icon: "🧩",
    title: "1,100+ Problems Solved",
    detail: "LeetCode (60+) · Codeforces (Max 1235, 890+) · Beecrowd (157+)",
    tag: "Competitive Programming",
  },
  {
    icon: "🏆",
    title: "ICPC 2021 Regional",
    detail: "Asia Dhaka Regional — algorithmic problem-solving under pressure",
    tag: "Competition",
  },
  {
    icon: "📦",
    title: "Published on pub.dev",
    detail: "rj form engine — schema-driven Flutter form library in active production use",
    tag: "Open Source",
  },
  {
    icon: "📱",
    title: "50K+ App Downloads",
    detail: "CodeHorse on Google Play Store — 4.3+ star rating, sole developer",
    tag: "Production",
  },
  {
    icon: "🤖",
    title: "AI-Accelerated Delivery",
    detail: "Claude Code & GitHub Copilot in daily workflow, paired with independent code review and testing",
    tag: "Workflow",
  },
  {
    icon: "🎓",
    title: "Top Performer — Ostad Flutter Batch 3",
    detail: "Assignment 96.7% · Quiz 95% · Live Test 100%",
    tag: "Education",
  },
  {
    icon: "🎓",
    title: "B.Sc. CSE — CGPA 3.63/4.00",
    detail: "Islamic University, Bangladesh · First Class Honors · Thesis on NeuroTransMir (miRNA-gene prediction)",
    tag: "Academic",
  },
];
