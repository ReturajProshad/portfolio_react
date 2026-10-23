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
  siteUrl: "https://returaj.vercel.app",
  headline: "Backend (Java/Spring Boot, Node.js) · Mobile (Flutter) · System Design",
  university: "Islamic University, Bangladesh",
  degree: "B.Sc. in Computer Science & Engineering",
};

export const summary =
  "Software Engineer with production experience since September 2024, owning end-to-end engineering of three concurrent enterprise systems across client, API, and data layers. I build Java/Spring Boot REST services with PostgreSQL, JWT security and versioned migrations, contribute to Node.js services, and ship cross-platform apps with Flutter. Track record spans a multi-backend abstraction layer, offline-first sync with LWW and OR-Set CRDT conflict resolution, a metadata-driven engine behind 90+ forms, and a solo-built Play Store app with 50K+ downloads. Author of two open-source Dart packages, ICPC Regional contestant, 1,100+ problems solved. I use AI coding assistants (Claude Code, GitHub Copilot) to move faster and review every line for correctness, security and maintainability.";

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
    detail: "Clean Architecture, SOLID, multi-backend abstraction, JWT/RBAC, caching (SWR/TTL/LRU), and conflict resolution (LWW, OR-Set CRDT).",
    icon: "●",
  },
  {
    title: "AI-Accelerated Delivery",
    detail: "Claude Code & GitHub Copilot in the daily workflow — always paired with independent review, testing, and debugging.",
    icon: "✦",
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Java", "Dart", "JavaScript / TypeScript", "SQL", "Kotlin", "C / C++", "Python"],
  "Backend & APIs": [
    "Spring Boot 3",
    "Spring Security",
    "JPA / Hibernate",
    "REST API Design",
    "OpenAPI / Swagger",
    "Flyway",
    "Node.js / Express",
    "Firebase Functions",
    "WebSockets",
  ],
  Databases: ["PostgreSQL", "Oracle (PL/SQL)", "Firestore", "SQLite", "Hive", "Isar"],
  "Architecture & Systems": [
    "Clean Architecture",
    "SOLID",
    "Design Patterns",
    "Modular Monolith",
    "Multi-Backend Abstraction",
    "Offline-First Sync",
    "LWW / OR-Set CRDT",
    "Caching (SWR/TTL/LRU)",
  ],
  Security: ["JWT (access + refresh)", "BCrypt", "RBAC", "Encrypted Secure Storage", "Input Validation"],
  "Frontend & Mobile": ["Flutter", "Riverpod", "GoRouter", "Android", "Method Channels", "Next.js", "React"],
  "Testing & Tools": [
    "Unit & Widget Tests",
    "GitHub Actions (CI/CD)",
    "Crashlytics",
    "Git / GitLab",
    "Postman",
    "Figma",
    "Claude Code",
    "GitHub Copilot",
  ],
};

export const experiences = [
  {
    company: "One Direction Companies Limited (ODCL)",
    role: "Software Engineer",
    period: "Apr 2025 – Present",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    current: true,
    highlights: [
      "Owned end-to-end engineering of three concurrent enterprise production systems — Agrotech (Smart Gowala) livestock ERP, FoodExpo self-service POS kiosk, and Shimana border-compliance document platform — across client, API, and data layers",
      "Architected a multi-backend abstraction layer (Factory pattern) so one codebase runs against Firebase Firestore, direct PostgreSQL, or Spring Boot microservices, selected by build configuration with domain and UI layers unchanged",
      "Built a metadata-driven rendering engine generating 90+ forms from JSON schema, cutting manual form development by 90% — later extracted and open-sourced as rj_form_engine",
      "Implemented JWT authentication (access + refresh tokens with interceptor-based renewal) and dynamic RBAC, enforcing module-level permissions across 30+ feature modules from a single codebase",
      "Engineered an offline-first data layer with SWR/TTL caching and model-specific conflict resolution — Last-Write-Wins for single-owner fields, an OR-Set CRDT for concurrently edited collections",
      "Partnered with backend engineers to design Spring Boot REST API contracts with strongly typed request/response models, and contributed to Node.js services covering REST endpoints and Firestore integration",
      "Designed a reusable, type-safe pagination & search framework serving 30+ list views over 10,000+ record datasets; improved app performance by 30% via lazy loading and optimized state subscriptions",
      "Delivered a cross-platform POS kiosk (Windows & Android) integrating Win32 APIs and ESC/POS thermal printers behind a platform-abstraction interface; set up GitHub Actions CI/CD for builds and production updates",
      "Mentored a newly joined engineer through code reviews on Clean Architecture and SOLID; authored architecture guides, API references and handover docs for all three systems; shipped tri-lingual (EN/BN/FR) i18n",
    ],
    tags: ["Spring Boot", "PostgreSQL", "Node.js", "Flutter", "JWT / RBAC", "Offline-First", "Clean Architecture", "CI/CD"],
  },
  {
    company: "Kensink Labs",
    role: "Software Engineer (Contract)",
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
    role: "Software Engineer Intern",
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
    subtitle: "Offline-First Learning Platform — Full-Stack",
    description:
      "A full-stack learning platform built solo in a 24-hour technical assessment: a Spring Boot 3 modular-monolith backend on PostgreSQL, and a Clean Architecture Flutter client that keeps working offline and syncs when it reconnects.",
    achievement: "Ambiguous brief → fully specified 6-module system, shipped across 19+ incremental commits",
    tags: ["Java 17", "Spring Boot", "PostgreSQL", "Flyway", "Flutter", "Isar"],
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
      "Auth, Course, Quiz, Progress, Leaderboard and Sync modules, JWT access/refresh tokens with BCrypt and role-based authorization, documented with Swagger/OpenAPI",
      "PostgreSQL schema with Flyway versioned migrations, JSONB content, unique and composite indexes, and paginated leaderboards via native SQL aggregation",
      "Push/pull sync API with timezone-safe Last-Write-Wins (UTC across client, server and Hibernate) and two-layer duplicate-XP prevention: service guard + DB constraints",
      "Unified ApiResponse<T> envelope with a global exception handler; Isar-backed offline queue on the Flutter client",
    ],
  },
  {
    id: "rj-form-engine",
    title: "rj_form_engine",
    subtitle: "Open-Source Schema-Driven Form Engine",
    description:
      "A published Flutter package that turns a declarative field schema into a fully validated, responsive form — dependency graph, cascading data loading, derived fields, and state handled by the engine instead of hand-written UI code.",
    achievement: "Extracted from production: powers 90+ forms across 3 enterprise systems, ~90% less form code",
    tags: ["Dart", "Flutter", "System Design", "Open Source", "pub.dev"],
    links: {
      github: "https://github.com/ReturajProshad/rj_form_engine",
      pubdev: "https://pub.dev/packages/rj_form_engine",
    },
    featured: true,
    type: "opensource",
    stats: [
      { label: "Field Types", value: "14" },
      { label: "Validators", value: "25+" },
      { label: "Automated Tests", value: "55+" },
      { label: "Runtime Deps", value: "1" },
    ],
    details: [
      "Field dependencies modelled as a graph: one change clears dependents and recomputes chained derivations (A → B → C) in a single pass, with visited-set guards against cycles",
      "Async, cascading data sources with label shadowing, so business rules read human-readable values without extra lookups",
      "Framework-agnostic FormController (Provider, Riverpod, Bloc, GetX) with immutable state updates",
      "Unit + widget tests for the controller, cascade resolution and responsive 12-column grid; only image_picker beyond the Flutter SDK",
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
    id: "amar-babu",
    title: "Amar Babu",
    subtitle: "Pregnancy Companion & Baby Game App — Live on Play Store",
    description:
      "A Bangla-first pregnancy companion built and shipped solo: offline-first data, cloud backup, an interactive talking baby, and physics-based mini-games, with production monitoring and an automated test suite.",
    achievement: "Live in production · 12 backward-compatible schema migrations · 127 automated tests",
    tags: ["Flutter", "Riverpod", "SQLite", "Firebase", "Flame", "Clean Architecture"],
    links: {
      playstore: "https://play.google.com/store/apps/details?id=com.returaj.amarBabu",
    },
    featured: true,
    type: "production",
    stats: [
      { label: "Status", value: "Live" },
      { label: "Migrations", value: "12" },
      { label: "Tests", value: "127" },
      { label: "Mini-games", value: "6" },
    ],
    details: [
      "Feature-first Clean Architecture with Riverpod and GoRouter; EN/BN localization",
      "Offline-first SQLite with 12 backward-compatible migrations, Firebase Auth and cloud backup",
      "6 Flame + Forge2D mini-games, profiled and tuned (adaptive physics sub-stepping, pre-rasterized rendering)",
      "Crashlytics, AdMob with UMP consent, and remotely configured ad units via Firestore",
    ],
  },
  {
    id: "fieldops",
    title: "FieldOps",
    subtitle: "Offline-First Field Service App — Native Location & Per-Field Merge",
    description:
      "Technicians create and edit job visits with no network; visits sync when connectivity returns, and conflicts resolve per field — not per record — through a hand-written three-way merge against the last-synced baseline. Native background location, biometric-gated photos and cold-start deep links.",
    achievement: "Per-field three-way merge: both offline edits survive · 57 automated tests",
    tags: ["Flutter", "Riverpod", "Drift", "Kotlin", "Swift", "Offline-First"],
    links: {
      github: "https://github.com/ReturajProshad/field_ops",
    },
    featured: false,
    type: "mobile",
    stats: [
      { label: "Tests", value: "57" },
      { label: "Merge", value: "Per-field" },
      { label: "Native", value: "Kotlin" },
    ],
    details: [
      "Sync runs pull → merge → push per visit, so a push can never erase the other device's edit before the merge sees it",
      "Conflicts detected field by field against a stored baseline snapshot; resumable mid-batch failure and single-flight sync",
      "Android foreground-service location tracking, including a fix for the Android 12+ START_STICKY restart crash",
      "Drift as the single source of truth, auth token in flutter_secure_storage, local_auth gate with passcode fallback",
    ],
  },
  {
    id: "rj-safe-parser",
    title: "rj_safe_parser",
    subtitle: "Open-Source Dart Code Generator — pub.dev",
    description:
      "A build_runner generator inspired by Spring Boot's @Entity: one annotation on a class produces type-safe fromMap()/toMap() with smart coercion for messy API data — \"7\" → int, 1 → bool, Unix timestamps → DateTime.",
    achievement: "One annotation per model instead of one per field, with dot-path errors like address.zip",
    tags: ["Dart", "Code Generation", "build_runner", "Open Source", "pub.dev"],
    links: {
      github: "https://github.com/ReturajProshad/rj_safe_parser",
      pubdev: "https://pub.dev/packages/rj_safe_parser",
    },
    featured: false,
    type: "opensource",
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
    title: "2 Packages on pub.dev",
    detail: "rj_form_engine (schema-driven forms, extracted from production) and rj_safe_parser (code-generated, coercion-safe JSON parsing)",
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

export const openSource = {
  name: "rj_form_engine",
  tagline: "A schema-driven form engine for Flutter — extracted from production, published on pub.dev.",
  github: "https://github.com/ReturajProshad/rj_form_engine",
  pubdev: "https://pub.dev/packages/rj_form_engine",
  problem:
    "Enterprise apps at ODCL needed 90+ data-entry forms with cascading dropdowns, computed fields and role-specific rules. Hand-writing each one meant repeated layout, validation, state wiring and dependency bugs.",
  solution:
    "Describe each field once in a typed schema. The engine renders it, tracks dependencies between fields, loads data, validates, and returns typed results — the same engine serves every app.",
  impact:
    "Powers 90+ forms across 3 enterprise systems with ~90% less form code, then generalised into a standalone package with no state-management lock-in.",
  design: [
    {
      title: "Dependency graph, single pass",
      desc: "A change clears downstream dependents and recomputes chained derivations (A → B → C) in one pass; visited-set guards stop cycles.",
    },
    {
      title: "Cascading async data",
      desc: "Parent → child dropdowns reload and auto-clear from async or static sources, with label shadowing for readable business rules.",
    },
    {
      title: "Typed schema API",
      desc: "Factory constructors (FieldMeta.text, .dropdown, .date …) expose only valid options per field — 14 field types, 25+ validators.",
    },
    {
      title: "Framework-agnostic state",
      desc: "One FormController with immutable updates works with Provider, Riverpod, Bloc, GetX — or nothing at all.",
    },
    {
      title: "Responsive layout engine",
      desc: "Mobile-first 12-column grid with breakpoint-aware spans; phones stack, tablets and desktops use declared spans.",
    },
    {
      title: "Tested & lean",
      desc: "55+ unit and widget tests cover the controller, cascades and grid; the only dependency beyond Flutter is image_picker.",
    },
  ],
  snippet: `RjForm(
  fields: [
    FieldMeta.dropdown(
      key: 'district',
      label: 'District',
      required: true,
      dropdownSource: DropdownSource.async(fetchDistricts),
    ),
    FieldMeta.dropdown(
      key: 'upazila',
      label: 'Upazila',
      // reloads & clears whenever district changes
      dependency: FieldDependency(dependsOn: 'district'),
      dropdownSource: DropdownSource.async(
        ({parentValue}) async => fetchUpazilas(parentValue: parentValue),
      ),
    ),
  ],
  onSubmit: (result) async => api.save(result.values),
)`,
};

/* ─────────────────────────────────────────────────────────────────────────
   Role lens — the same portfolio framed for a Software Engineer reader or a
   Flutter / mobile reader. Picked only by the link (?role=flutter), so each
   CV links to its own version. The SWE lens is the default and matches the
   exports above (which the server-rendered SEO content uses); the Flutter
   lens follows the Flutter & Mobile CV.
   ───────────────────────────────────────────────────────────────────────── */

export type Lens = "swe" | "flutter";

export type FocusArea = { title: string; detail: string; icon: string };
export type Stat = { value: string; label: string; color: string };
export type TechBadge = { label: string; color: string; accent: string; primary?: boolean };

export interface LensProfile {
  role: string;
  headline: string;
  tagline: string;
  summary: string;
  aboutHeading: [string, string];
  focusAreas: FocusArea[];
  skills: Record<string, string[]>;
  skillsBlurb: string;
  techStack: TechBadge[];
  stats: Stat[];
  config: { role: string; focus: string; stacks: string[] };
  /** Per-company overrides, keyed by experiences[].company */
  experience: Record<string, { role: string; highlights?: string[]; tags?: string[] }>;
  projectOrder: string[];
  featuredProjects: string[];
}

export const lensProfiles: Record<Lens, LensProfile> = {
  swe: {
    role: personal.role,
    headline: personal.headline,
    tagline: personal.tagline,
    summary,
    aboutHeading: ["A generalist engineer,", "not a one-stack specialist."],
    focusAreas,
    skills,
    skillsBlurb: "The stack I use to build scalable, production-grade systems — backend, mobile, and web.",
    techStack: [
      { label: "Java", primary: true, color: "#ED8B00", accent: "#FFB347" },
      { label: "Spring Boot", color: "#6DB33F", accent: "#8BC84B" },
      { label: "PostgreSQL", color: "#4169E1", accent: "#6B8FE3" },
      { label: "Node.js", color: "#339933", accent: "#5CBF5C" },
      { label: "TypeScript", color: "#3178C6", accent: "#5BA3E6" },
      { label: "Flutter", color: "#02569B", accent: "#13B9FD" },
      { label: "React", color: "#61DAFB", accent: "#00D8FF" },
      { label: "System Design", color: "#8B5CF6", accent: "#A78BFA" },
      { label: "C++ / DSA", color: "#00599C", accent: "#3B82C4" },
    ],
    stats: [
      { value: "2+", label: "Years in Production", color: "rgb(var(--accent))" },
      { value: "3", label: "Enterprise Systems", color: "#8B5CF6" },
      { value: "50K+", label: "App Downloads", color: "rgb(var(--emerald))" },
      { value: "90+", label: "Forms Shipped", color: "#F59E0B" },
      { value: "30+", label: "Feature Modules", color: "#EC4899" },
      { value: "1100+", label: "Problems Solved", color: "#06B6D4" },
    ],
    config: {
      role: "Software Engineer",
      focus: "Backend · Mobile · System Design",
      stacks: ["Spring Boot", "Node.js", "Flutter", "Next.js"],
    },
    experience: {},
    projectOrder: [
      "eztrainz",
      "rj-form-engine",
      "codehorse",
      "amar-babu",
      "fieldops",
      "rj-safe-parser",
      "todo-springboot-nextjs",
      "virtual-bookshelf",
      "enterprise",
      "zavimart",
    ],
    featuredProjects: ["eztrainz", "rj-form-engine", "codehorse", "amar-babu"],
  },
  flutter: {
    role: "Flutter & Mobile Engineer",
    headline: "Cross-Platform Flutter (Android · iOS · Windows) · Native Integration · Offline-First",
    tagline:
      "I build production Flutter apps that work offline, talk to native hardware, and scale across 30+ modules — and package the reusable parts as open source.",
    summary:
      "Flutter & Mobile Software Engineer building enterprise-grade cross-platform apps for Android, iOS and Windows since 2024. As the sole Flutter developer at ODCL I own three concurrent enterprise systems end to end — designing reusable frameworks, offline-first data layers, and native integrations through Method Channels and Win32. I shipped a Play Store app to 50K+ installs and a Bangla-first companion app with 127 automated tests, and published rj_form_engine and rj_safe_parser on pub.dev. 1,100+ competitive programming problems solved.",
    aboutHeading: ["Flutter is my craft,", "systems thinking is my edge."],
    focusAreas: [
      {
        title: "Cross-Platform Flutter",
        detail: "Production apps on Android, iOS and Windows — Riverpod, GoRouter, Material 3, custom animations and Flame games.",
        icon: "▲",
      },
      {
        title: "Native Integration",
        detail: "Method Channels in Kotlin/Java, Win32 APIs, Dart FFI, ESC/POS thermal printers and background location services.",
        icon: "◆",
      },
      {
        title: "Offline-First Data",
        detail: "Hive, SQLite, Drift and Isar with SWR/TTL caching and LWW / OR-Set CRDT conflict resolution.",
        icon: "●",
      },
      {
        title: "Reusable Frameworks",
        detail: "Schema-driven forms, pagination & search, multi-backend layers — and two packages published on pub.dev.",
        icon: "✦",
      },
    ],
    skills: {
      Languages: ["Dart", "Kotlin", "Java", "C / C++", "Python"],
      "Flutter & State": [
        "Riverpod",
        "Provider",
        "GetX",
        "GoRouter",
        "Deep Linking",
        "Material 3 & Cupertino",
        "Animations",
        "Async / Streams",
        "Flame / Forge2D",
      ],
      Architecture: [
        "Clean Architecture",
        "SOLID",
        "Feature-First Modules",
        "Dependency Injection",
        "Repository Pattern",
        "Multi-Backend Abstraction",
        "JWT / RBAC",
      ],
      "Native & Platform": [
        "Android SDK",
        "Platform & Method Channels",
        "Win32 API",
        "Dart FFI",
        "ESC/POS Printing",
        "QR Scan & Generate",
        "Background Location",
      ],
      "Offline-First & Data": ["Hive", "SQLite", "Drift", "Isar", "SWR / TTL / LRU Caching", "LWW & CRDT Conflict Resolution"],
      "Backend & Firebase": [
        "Firebase Auth / Firestore",
        "FCM",
        "Crashlytics",
        "Cloud Functions",
        "Spring Boot",
        "REST APIs",
        "WebSockets",
        "PostgreSQL",
      ],
      "Quality & Delivery": [
        "Unit & Widget Tests",
        "Flutter DevTools",
        "Performance Profiling",
        "i18n (EN / BN / FR)",
        "GitHub Actions",
        "Play Store Releases",
      ],
    },
    skillsBlurb: "What I use to ship production Flutter apps across Android, iOS and Windows.",
    techStack: [
      { label: "Flutter", primary: true, color: "#02569B", accent: "#13B9FD" },
      { label: "Dart", color: "#0175C2", accent: "#40C4FF" },
      { label: "Riverpod", color: "#00B4D8", accent: "#48CAE4" },
      { label: "Firebase", color: "#FFA000", accent: "#FFCA28" },
      { label: "Kotlin", color: "#7F52FF", accent: "#A98BFF" },
      { label: "Method Channels", color: "#8B5CF6", accent: "#A78BFA" },
      { label: "SQLite / Hive", color: "#4169E1", accent: "#6B8FE3" },
      { label: "Spring Boot", color: "#6DB33F", accent: "#8BC84B" },
      { label: "Flame", color: "#EF4444", accent: "#F87171" },
    ],
    stats: [
      { value: "2+", label: "Years of Flutter in Prod", color: "rgb(var(--accent))" },
      { value: "50K+", label: "App Downloads", color: "rgb(var(--emerald))" },
      { value: "3", label: "Platforms Shipped", color: "#8B5CF6" },
      { value: "127", label: "Tests in One App", color: "#F59E0B" },
      { value: "90+", label: "Forms Shipped", color: "#EC4899" },
      { value: "2", label: "pub.dev Packages", color: "#06B6D4" },
    ],
    config: {
      role: "Flutter & Mobile Engineer",
      focus: "Android · iOS · Windows",
      stacks: ["Flutter", "Riverpod", "Firebase", "Kotlin"],
    },
    experience: {
      "One Direction Companies Limited (ODCL)": {
        role: "Flutter & Mobile Software Engineer",
        highlights: [
          "Sole Flutter developer owning end-to-end delivery of three concurrent enterprise systems — Agrotech, FoodExpo (Kiosk) and Shimana — spanning livestock management, self-service POS kiosks and document management",
          "Designed a schema-driven form engine that renders complex forms from JSON configuration — 90+ forms, hours of work cut to minutes — later open-sourced as rj_form_engine",
          "Built a cross-platform POS kiosk (Windows & Android) integrating native Win32 APIs and ESC/POS thermal printers through Flutter Method Channels for real-time receipt printing",
          "Engineered a multi-backend architecture (Bootstrap Factory pattern): the same Flutter codebase runs on Firestore, direct PostgreSQL or a Spring Boot API, chosen at build time with UI and domain layers unchanged",
          "Built an offline-first data layer on Hive (SWR/TTL caching) with per-model conflict resolution — Last-Write-Wins for single-owner fields, an OR-Set CRDT for concurrently edited collections",
          "Centralized app infrastructure with GoRouter, JWT authentication and dynamic RBAC, standardizing navigation and authorization across 30+ modules",
          "Reusable pagination & search framework powering 30+ list views with type-safe filtering and lazy loading over 10,000+ records",
          "Reduced unnecessary widget rebuilds on high-traffic lists and dashboards with Sliver lazy loading and refined Riverpod subscriptions, validated in Flutter DevTools",
          "Full i18n (English, Bangla, French) with intl and ARB files; wrote architecture guides and handover docs and onboarded a newly joined Flutter developer",
        ],
        tags: ["Flutter", "Dart", "Riverpod", "GoRouter", "Hive", "Method Channels", "Win32", "RBAC", "CI/CD"],
      },
      "Kensink Labs": {
        role: "Flutter Developer (Contract)",
        highlights: [
          "Delivered an AI-driven itinerary timeline feature for the Sootcase travel app",
          "Translated Figma designs into pixel-perfect Flutter UI with Material 3 components under a strict deadline",
          "Integrated REST APIs for real-time travel planning data",
        ],
      },
      "Brainwave Matrix Solutions": {
        role: "Mobile Developer Intern",
      },
    },
    projectOrder: [
      "amar-babu",
      "fieldops",
      "rj-form-engine",
      "codehorse",
      "rj-safe-parser",
      "enterprise",
      "zavimart",
      "eztrainz",
      "todo-springboot-nextjs",
      "virtual-bookshelf",
    ],
    featuredProjects: ["amar-babu", "fieldops", "rj-form-engine", "codehorse"],
  },
};
