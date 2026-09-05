import type { Metadata } from "next";
import { FunnelsPage } from "@/components/sections/funnels-page";

export const metadata: Metadata = {
  title: "Funnels Automáticos de Venta",
  description:
    "Captamos leads calificados de forma automática. Flujos de venta que trabajan solos, 24/7.",
  alternates: { canonical: "/servicios/funnels" },
  openGraph: {
    title: "Funnels Automáticos de Venta | Delta Kilo Soluciones",
    description:
      "Captamos leads calificados de forma automática. Flujos de venta que trabajan solos, 24/7.",
    url: "/servicios/funnels",
    siteName: "Delta Kilo Soluciones",
    locale: "es_MX",
    type: "website",
    images: [{
      url: "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png",
      width: 1200,
      height: 630,
      alt: "Funnels Automáticos de Venta — Delta Kilo Soluciones",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Funnels Automáticos de Venta | Delta Kilo Soluciones",
    description:
      "Captamos leads calificados de forma automática. Flujos de venta que trabajan solos, 24/7.",
    images: ["https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png"],
  },
};

const funnelsServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Funnels Automáticos de Venta",
  description:
    "Captamos leads calificados de forma automática. Flujos de venta que trabajan solos, 24/7.",
  areaServed: { "@type": "Country", name: "México" },
  provider: { "@id": "https://www.deltakilo.com.mx/#organization" },
  url: "https://www.deltakilo.com.mx/servicios/funnels",
};

const funnelsBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.deltakilo.com.mx" },
    { "@type": "ListItem", position: 2, name: "Servicios", item: "https://www.deltakilo.com.mx/servicios" },
    { "@type": "ListItem", position: 3, name: "Funnels Automáticos", item: "https://www.deltakilo.com.mx/servicios/funnels" },
  ],
};

export default function FunnelsRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(funnelsServiceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(funnelsBreadcrumbJsonLd) }} />
      <FunnelsPage />
    </>
  );
}
