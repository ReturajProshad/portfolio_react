import type { Metadata, Viewport } from "next";
import "@fontsource/syne/400.css";
import "@fontsource/syne/500.css";
import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/300-italic.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/caveat/400.css";
import "@fontsource/caveat/600.css";
import "@fontsource/caveat/700.css";
import "./globals.css";
import { personal } from "@/data/portfolio";
import { siteUrl, seoTitle, seoDescription, seoKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: `%s · ${personal.fullName}`,
  },
  description: seoDescription,
  applicationName: `${personal.fullName} — Portfolio`,
  keywords: seoKeywords,
  authors: [{ name: personal.fullName, url: siteUrl }],
  creator: personal.fullName,
  publisher: personal.fullName,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${personal.fullName} — Portfolio`,
    title: seoTitle,
    description: seoDescription,
    locale: "en_US",
    firstName: "Returaj Proshad",
    lastName: "Shornocar",
    username: "ReturajProshad",
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b10" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before paint to avoid a flash of the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
