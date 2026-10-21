# Returaj Proshad Shornocar — Portfolio

**Live:** [returaj.vercel.app](https://returaj.vercel.app)

An interactive, desktop-style portfolio: a handwritten name drawn by an animated pen, then a "desktop" where every section (experience, projects, open source, achievements, contact) opens as a draggable, resizable window — with a native-feeling app layout on phones and a classic scrolling **List View** for quick reading.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **Framer Motion**.

---

## Highlights

- **Window manager** (`src/lib/windowManager.tsx`) — open, focus, minimise, maximise, drag and resize windows with z-order handling, behind a small React context API.
- **Two desktop themes** — Windows-style taskbar or Linux/GNOME-style top bar + dock, remembered per visitor.
- **Role-specific links** (`src/lib/roleLens.tsx`) — `/` shows the Software Engineer portfolio and `/?role=flutter` the Flutter Engineer one (role, summary, stats, skills, experience bullets and project order), so each CV links to its own version. There is no on-page toggle and nothing is remembered between visits.
- **macOS-style motion** — windows grow out of their dock/taskbar icon and minimise back into it, maximise/restore animates, dock icons magnify under the pointer and bounce on launch, stats count up.
- **Mobile app shell** — bottom navigation, app drawer and full-screen app views instead of shrunken windows. The phone's back button/gesture closes the open section (it no longer leaves the site), and a swipe from the left edge goes back.
- **Pen-drawn hero** (`WritingReveal.tsx`) — glyph outlines are sampled from a canvas so the pen follows the real letter shapes; waits for the handwriting font before measuring.
- **Single source of truth** — all content lives in `src/data/portfolio.ts`; desktop windows, mobile views, List View, SEO markup and structured data all read from it.

## SEO

- Full metadata: canonical URL, Open Graph (`profile`), Twitter card, robots directives, theme colour.
- Generated social preview image (`app/opengraph-image.tsx`), favicon and Apple touch icon.
- `schema.org` JSON-LD graph (`Person`, `WebSite`, `ProfilePage`, `SoftwareSourceCode`, `MobileApplication`) in `src/lib/seo.ts`.
- `sitemap.xml`, `robots.txt` and a web manifest.
- A server-rendered, visually hidden text version of the portfolio (`components/SeoContent.tsx`) so crawlers and screen readers get the content that otherwise lives inside windows.
- Self-hosted fonts via `@fontsource` (no render-blocking third-party CSS) and `next/image` for the profile photo.

---

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploys automatically on Vercel from `main`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── page.tsx              # JSON-LD + SEO content + desktop
│   ├── opengraph-image.tsx   # Generated social preview
│   ├── icon.tsx / apple-icon.tsx
│   ├── sitemap.ts / robots.ts / manifest.ts
│   └── globals.css
├── components/
│   ├── os/                   # Desktop shell: windows, taskbar, dock, hero, mobile shell
│   ├── apps/                 # Content shown inside each window / mobile app view
│   ├── sections/             # List View sections
│   ├── OpenSourceContent.tsx # Shared rj_form_engine content (window + List View)
│   └── SeoContent.tsx        # Crawlable text version of the portfolio
├── config/apps.ts            # App ids, titles and icons
├── data/portfolio.ts         # ← all content lives here
└── lib/                      # Window manager, SEO helpers, utils
```

## Updating content

Edit `src/data/portfolio.ts` — `personal`, `experiences`, `projects`, `openSource`, `skills`, `achievements`. Everything else, including SEO tags and structured data, updates from there.
