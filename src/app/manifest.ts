import type { MetadataRoute } from "next";
import { personal } from "@/data/portfolio";
import { seoDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.fullName} — Portfolio`,
    short_name: personal.name,
    description: seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#080b10",
    theme_color: "#4f8ef7",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
