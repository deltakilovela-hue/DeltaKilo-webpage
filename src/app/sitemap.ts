import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";

const BASE_URL = "https://www.deltakilo.com.mx";

function lastModified(filePath: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`).toString().trim();
    if (iso) return new Date(iso);
  } catch {
    // git no disponible en el entorno de build
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: lastModified("src/app/(main)/page.tsx"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: lastModified("src/app/(main)/contacto/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: lastModified("src/app/(main)/servicios/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicios/paginas-web`,
      lastModified: lastModified("src/app/(main)/servicios/paginas-web/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/servicios/google-maps`,
      lastModified: lastModified("src/app/(main)/servicios/google-maps/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/servicios/asistentes-ia`,
      lastModified: lastModified("src/app/(main)/servicios/asistentes-ia/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/servicios/crm`,
      lastModified: lastModified("src/app/(main)/servicios/crm/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/servicios/funnels`,
      lastModified: lastModified("src/app/(main)/servicios/funnels/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/servicios/gestion-llamadas`,
      lastModified: lastModified("src/app/(main)/servicios/gestion-llamadas/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
