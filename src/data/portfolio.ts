export const personal = {
  name: "Returaj Proshad",
  fullName: "Returaj Proshad Shornocar",
  role: "Flutter & Mobile Engineer",
  tagline: "I build systems that scale — from schema-driven form engines to enterprise apps with 50K+ users.",
  location: "Dhaka, Bangladesh",
  email: "returajsumon0808@gmail.com",
  phone: "+8801608517866",
  github: "https://github.com/ReturajProshad",
  linkedin: "https://linkedin.com/in/returaj-proshad",
  pubdev: "https://pub.dev",
  available: true,
};

export const skills = {
  Languages: ["Dart", "Java", "C", "C++"],
  "Flutter & Mobile": [
    "Flutter", "Riverpod", "Provider", "GetX", "GoRouter",
    "Deep Linking", "Animations", "Widget Testing",
  ],
  Backend: ["Spring Boot", "REST APIs", "Firebase Functions", "Node.js"],
  Databases: ["PostgreSQL", "Firebase Firestore", "Hive", "SQLite"],
  Tools: ["Git", "GitHub Actions", "GitLab", "Postman", "VS Code", "Android Studio", "Figma"],
  Architecture: ["Clean Architecture", "SOLID Principles", "RBAC", "Modular Design", "Performance Optimization"],
};

export const experiences = [
  {
    company: "One Direction Companies Limited (ODCL)",
    role: "Flutter & Mobile Developer",
    period: "Apr 2025 – Present",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    current: true,
    highlights: [
      "Primary Flutter developer for 3 enterprise systems: Smart Gowala, FoodExpo Kiosk, and Shimana",
      "Built metadata-driven form engine rendering 90+ complex forms from JSON — cut UI dev effort by ~90%",
      "Designed centralized navigation framework with GoRouter across 30+ feature modules",
      "Implemented JWT auth with dynamic RBAC for multi-role enterprise builds",
      "Built cross-platform POS kiosk (Windows & Android) with native Win32 & ESC/POS thermal printing",
      "Improved UI performance 30% via Sliver lazy loading, Hive caching, and optimized Riverpod subscriptions",
    ],
    tags: ["Flutter", "Riverpod", "GoRouter", "Clean Architecture", "RBAC", "Spring Boot"],
  },
  {
    company: "Kensink Labs",
    role: "Flutter Developer (Contract)",
    period: "Mar 2025 – Apr 2025",
    location: "Remote",
    type: "Contract",
    current: false,
    highlights: [
      "Built AI-driven itinerary timeline feature for the Sootcase travel app",
      "Translated Figma designs to production Flutter UI under strict deadlines",
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
      "Built a responsive Flutter news application with REST APIs",
      "Implemented Provider-based state management architecture",
      "Completed full project within internship timeline",
    ],
    tags: ["Flutter", "Provider", "REST APIs"],
  },
];

export const projects = [
  {
    id: "rj-form-engine",
    title: "rj form engine",
    subtitle: "Open-Source Schema-Driven Form Engine",
    description:
      "A production-grade Flutter form engine that lets developers render complex, fully-validated forms from JSON configuration — no UI code needed.",
    achievement: "90% reduction in UI development effort across 3 enterprise systems",
    tags: ["Dart", "Flutter", "Open Source", "pub.dev"],
    links: {
      pubdev: "https://pub.dev",
      github: "https://github.com/ReturajProshad",
    },
    featured: true,
    type: "opensource",
    stats: [
      { label: "Field Types", value: "13" },
      { label: "Validation Rules", value: "25+" },
      { label: "State Managers", value: "4" },
      { label: "Forms Rendered", value: "90+" },
    ],
    details: [
      "Metadata-driven pipeline with parent-child dependency tracking",
      "Async data loading for multi-step workflows",
      "State-management-agnostic FormController (Provider, Riverpod, Bloc, GetX)",
      "Comprehensive Widget & Unit test suite",
    ],
  },
  {
    id: "codehorse",
    title: "CodeHorse",
    subtitle: "Educational App — 50K+ Downloads",
    description:
      "A published educational app with 50K+ active installs, AdMob monetization, and FCM push notifications. Built solo from scratch to production.",
    achievement: "50K+ installs · 4.2+ Play Store rating · Sole developer",
    tags: ["Flutter", "Firebase", "AdMob", "FCM", "Node.js"],
    links: {
      playstore: "https://play.google.com/store",
    },
    featured: true,
    type: "production",
    stats: [
      { label: "Downloads", value: "50K+" },
      { label: "Rating", value: "4.2★" },
      { label: "Solo Build", value: "✓" },
    ],
  },
  {
    id: "zavimart",
    title: "ZaviMart",
    subtitle: "E-Commerce App — Technical Assessment",
    description:
      "Daraz-style product listing app with Clean Architecture, JWT authentication, and complex scroll architecture using NestedScrollView.",
    achievement: "Solved complex scroll-state problem with NestedScrollView + SliverOverlapAbsorber",
    tags: ["Flutter", "Riverpod", "Clean Architecture", "JWT", "Flutter Secure Storage"],
    links: {
      github: "https://github.com/ReturajProshad",
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
    links: {},
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
    detail: "CodeHorse on Google Play Store — 4.2+ star rating, sole developer",
    tag: "Production",
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
    detail: "Islamic University, Bangladesh · Thesis on NeuroTransMir (miRNA-gene prediction)",
    tag: "Academic",
  },
];
