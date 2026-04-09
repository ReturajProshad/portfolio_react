import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Returaj Proshad — Flutter Engineer",
  description:
    "Flutter & Mobile Engineer. Building enterprise systems, open-source tools, and scalable architectures. Creator of rj form engine (pub.dev).",
  keywords: [
    "Flutter Developer",
    "Mobile Engineer",
    "Dart",
    "Bangladesh",
    "rj form engine",
    "Clean Architecture",
    "React",
    "Open Source",
  ],
  authors: [{ name: "Returaj Proshad Shornocar" }],
  openGraph: {
    title: "Returaj Proshad — Flutter Engineer",
    description:
      "Flutter & Mobile Engineer. Building enterprise systems, open-source tools, and scalable architectures.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Returaj Proshad — Flutter Engineer",
    description: "Flutter & Mobile Engineer. Creator of rj form engine.",
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
