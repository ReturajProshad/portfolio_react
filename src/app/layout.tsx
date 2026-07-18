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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
