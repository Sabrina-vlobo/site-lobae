import type { Metadata, Viewport } from "next";
import "@fontsource/host-grotesk/400.css";
import "@fontsource/host-grotesk/500.css";
import "@fontsource/host-grotesk/700.css";
import "@fontsource/host-grotesk/800.css";
import "@fontsource/silkscreen/400.css";
// Fontes dos cases fictícios (Traço Arquitetura e Clínica Âmbar)
import "@fontsource/hanken-grotesk/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/bricolage-grotesque/latin-400.css";
import "@fontsource/bricolage-grotesque/latin-600.css";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Sabrina", url: SITE_URL }],
  creator: "Sabrina",
  publisher: SITE_NAME,
  keywords: [
    "criação de sites",
    "landing page",
    "site para pequenos negócios",
    "site institucional",
    "web design",
    "site profissional",
    "site com WhatsApp",
    "desenvolvimento de sites",
  ],
  category: "Web design",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LOBAE° — Sites e landing pages que vendem por você",
    description: "Sob medida para pequenos negócios. Landing page no ar em 7 dias, site institucional em 14.",
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, type: "image/png", alt: "LOBAE° — Sites e landing pages que vendem por você" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOBAE° — Sites e landing pages que vendem por você",
    description: "Sob medida para pequenos negócios. Landing page no ar em 7 dias, site institucional em 14.",
    images: ["/og.png"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#2433FF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
