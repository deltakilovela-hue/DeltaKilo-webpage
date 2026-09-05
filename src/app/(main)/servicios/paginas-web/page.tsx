import type { Metadata } from "next";
import { PaginasWebPage } from "@/components/sections/paginas-web-page";

const paginasWebDescription =
  "Páginas web profesionales y rápidas, conectadas a tu proceso comercial para que tus visitantes confíen en tu negocio y sepan cómo contactarte.";

export const metadata: Metadata = {
  title: { absolute: "Páginas Web Conectadas a Ventas — Delta Kilo Soluciones" },
  description: paginasWebDescription,
  alternates: { canonical: "/servicios/paginas-web" },
  openGraph: {
    title: "Páginas Web Conectadas a Ventas — Delta Kilo Soluciones",
    description: paginasWebDescription,
    url: "/servicios/paginas-web",
    siteName: "Delta Kilo Soluciones",
    locale: "es_MX",
    type: "website",
    images: [{
      url: "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png",
      width: 1200,
      height: 630,
      alt: "Páginas Web Conectadas a Ventas — Delta Kilo Soluciones",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas Web Conectadas a Ventas — Delta Kilo Soluciones",
    description: paginasWebDescription,
    images: ["https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png"],
  },
};

const paginasWebServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Páginas Web Conectadas a Ventas",
  description: paginasWebDescription,
  areaServed: { "@type": "Country", name: "México" },
  provider: { "@id": "https://www.deltakilo.com.mx/#organization" },
  url: "https://www.deltakilo.com.mx/servicios/paginas-web",
};

const paginasWebBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.deltakilo.com.mx" },
    { "@type": "ListItem", position: 2, name: "Servicios", item: "https://www.deltakilo.com.mx/servicios" },
    { "@type": "ListItem", position: 3, name: "Páginas Web", item: "https://www.deltakilo.com.mx/servicios/paginas-web" },
  ],
};

export default function PaginasWebRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(paginasWebServiceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(paginasWebBreadcrumbJsonLd) }} />
      <PaginasWebPage />
    </>
  );
}
