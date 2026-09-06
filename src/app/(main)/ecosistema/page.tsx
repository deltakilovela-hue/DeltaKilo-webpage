import type { Metadata } from "next";

import { EcosistemaHero } from "@/components/ui/ecosistema-hero";
import { EcosystemTeam } from "@/components/sections/ecosystem-team";
import { EcosystemPortal } from "@/components/sections/ecosystem-portal";
import { CTASection } from "@/components/sections/cta-section";

const OG_IMAGE = "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png";

export const metadata: Metadata = {
  title: "El Ecosistema Delta Kilo",
  description:
    "Seis especialistas de IA — diseño, video, contenido, leads, SEO y pauta — trabajando en tu negocio todos los días, con un portal donde ves todo en tiempo real.",
  alternates: { canonical: "/ecosistema" },
  openGraph: {
    title: "El Ecosistema Delta Kilo | Delta Kilo Soluciones",
    description:
      "Seis especialistas de IA trabajando en tu negocio todos los días, con un portal donde ves todo en tiempo real.",
    url: "/ecosistema",
    siteName: "Delta Kilo Soluciones",
    locale: "es_MX",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "El Ecosistema Delta Kilo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Ecosistema Delta Kilo | Delta Kilo Soluciones",
    description:
      "Seis especialistas de IA trabajando en tu negocio todos los días, con un portal donde ves todo en tiempo real.",
    images: [OG_IMAGE],
  },
};

const ecosistemaBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.deltakilo.com.mx" },
    { "@type": "ListItem", position: 2, name: "Ecosistema", item: "https://www.deltakilo.com.mx/ecosistema" },
  ],
};

const ecosistemaServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ecosistema Delta Kilo",
  description:
    "Equipo de seis agentes de IA especializados (diseño, video, contenido, leads y CRM, SEO, pauta) más un portal de cliente con visibilidad en tiempo real.",
  serviceType: "Automatización comercial",
  areaServed: { "@type": "Country", name: "México" },
  provider: { "@id": "https://www.deltakilo.com.mx/#organization" },
  url: "https://www.deltakilo.com.mx/ecosistema",
};

export default function EcosistemaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosistemaServiceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosistemaBreadcrumbJsonLd) }} />
      <EcosistemaHero />
      <div id="escuadron">
        <EcosystemTeam />
      </div>
      <EcosystemPortal />
      <CTASection
        eyebrow="¿Quieres ver tu diagnóstico gratis?"
        headline="Te decimos gratis qué tan visible eres hoy."
        subtext="Revisamos tu sitio, tu ficha de Google Maps y tus redes — sin compromiso — y te mostramos exactamente qué se puede mejorar."
        primaryLabel="Pide tu diagnóstico gratis"
        primaryHref="https://wa.me/5215663864984?text=Hola,%20quiero%20pedir%20mi%20diagn%C3%B3stico%20gratis%20💊"
        secondaryLabel="Ver servicios"
        secondaryHref="/servicios"
      />
    </>
  );
}
