import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Robôs de busca e de IA liberados: quanto mais lugares encontram a LOBAE, melhor.
// (ChatGPT, Claude, Perplexity e Gemini usam esses robôs para recomendar empresas.)
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
