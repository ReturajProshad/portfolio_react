# Returaj Proshad — Portfolio

A modern, minimal, dark-mode portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Deploy to Vercel (5 minutes)

### Option A — Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Inside the portfolio folder
vercel

# Follow the prompts:
# Set up and deploy → Yes
# Which scope → your account
# Link to existing project → No
# Project name → returaj-portfolio (or anything)
# In which directory → ./  (press Enter)
# Override settings → No

# Done! Your URL will be printed.
```

### Option B — Via GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Leave all settings as default
5. Click **Deploy** — done in ~60 seconds

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Home page (assembles sections)
│   └── globals.css       # Global styles, CSS variables, utilities
├── components/
│   ├── Navbar.tsx        # Sticky nav with active section tracking
│   ├── Footer.tsx        # Simple footer
│   ├── SectionWrapper.tsx # Reusable animated section container
│   └── sections/
│       ├── Hero.tsx       # Hero with stats and CTAs
│       ├── About.tsx      # About + code-style bio card
│       ├── Skills.tsx     # Categorized skills with badges
│       ├── Experience.tsx # Timeline with cards
│       ├── Projects.tsx   # Featured + grid project cards
│       ├── OpenSource.tsx # rj form engine deep dive
│       ├── Achievements.tsx # Achievements + GitHub stats
│       └── Contact.tsx    # Contact links
└── data/
    └── portfolio.ts       # ← ALL your content lives here
```

---

## ✏️ Customizing Content

**All your data is in one file:** `src/data/portfolio.ts`

To update your info:
- Edit `personal` object for name, email, GitHub, LinkedIn
- Edit `experiences` array for work history
- Edit `projects` array for projects
- Edit `achievements` array for achievements
- Edit `skills` object for tech stack

---

## 🎨 Design Tokens

Defined in `tailwind.config.ts` and `globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#080B10` | Page background |
| `surface` | `#0D1117` | Card backgrounds |
| `border` | `#1A2030` | Card borders |
| `accent` | `#4F8EF7` | Primary accent (blue) |
| `emerald` | `#34D399` | Success / current |
| `text` | `#E8EDF5` | Primary text |
| `subtle` | `#8A9BB8` | Secondary text |

---

## 🔧 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — scroll animations, staggered reveals
- **Lucide React** — icons
- **Google Fonts** — Syne (display), DM Sans (body), JetBrains Mono (code)

---

## 📊 GitHub Stats

In `src/components/sections/Achievements.tsx`, the GitHub stats images use your username `ReturajProshad`. These load from `github-readme-stats.vercel.app` automatically — no API key needed.

---

## 📝 License

Personal use. Feel free to adapt for your own portfolio.
