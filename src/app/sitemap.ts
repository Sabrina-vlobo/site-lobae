import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Uma página só por enquanto. Ao criar páginas novas, adicione aqui.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      videos: [
        {
          title: "Site da Volta, e-bike urbana",
          description: "Navegação pelo site da Volta, feito pela LOBAE.",
          thumbnail_loc: `${SITE_URL}/cases/volta-poster.jpg`,
          content_loc: `${SITE_URL}/cases/volta.mp4`,
        },
      ],
      images: [`${SITE_URL}/sabrina.jpg`, `${SITE_URL}/cases/volta-poster.jpg`],
    },
  ];
}
