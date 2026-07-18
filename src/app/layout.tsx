import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Returaj Proshad — Software Engineer",
  description:
    "Software Engineer building full-stack, mobile, and systems-level products. Spring Boot, Node.js, Flutter, Next.js. Creator of rj form engine (pub.dev), 50K+ downloads shipped.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Flutter Developer",
    "Mobile Engineer",
    "Spring Boot",
    "Node.js",
    "Next.js",
    "Dart",
    "Java",
    "TypeScript",
    "Bangladesh",
    "rj form engine",
    "Clean Architecture",
    "Open Source",
  ],
  authors: [{ name: "Returaj Proshad Shornocar" }],
  openGraph: {
    title: "Returaj Proshad — Software Engineer",
    description:
      "Software Engineer building full-stack, mobile, and systems-level products. Spring Boot, Node.js, Flutter, Next.js.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Returaj Proshad — Software Engineer",
    description: "Full-stack & mobile engineer. Creator of rj form engine. 50K+ downloads shipped.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if (theme === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Runs before paint to avoid a flash of the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
