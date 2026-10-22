import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: "LOBAE°",
    description: SITE_DESCRIPTION,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0E2A",
    theme_color: "#2433FF",
    icons: [
      { src: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { src: "/icon-maskable-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
