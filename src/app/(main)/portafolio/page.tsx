import type { Metadata } from "next";

import { CTASection } from "@/components/sections/cta-section";
import { VerticalVideoCard } from "@/components/ui/vertical-video-card";
import { PORTAFOLIO, portafolioPoster, portafolioSrc } from "@/lib/portafolio";

const BASE_URL = "https://www.deltakilo.com.mx";

export const metadata: Metadata = {
  title: "Portafolio de videos",
  description:
    "Videos de ejemplo que producimos para negocios: bienes raíces, agencias de autos, clínicas, historias 3D, casos de negocio, VSL y testimonios.",
  alternates: { canonical: "/portafolio" },
  openGraph: {
    title: "Portafolio de videos | Delta Kilo Soluciones",
    description:
      "Mira la calidad de los videos que producimos para negocios: recorridos inmobiliarios, autos, salud, historias 3D y más.",
    url: "/portafolio",
    siteName: "Delta Kilo Soluciones",
    locale: "es_MX",
    type: "website",
    images: [{ url: `${BASE_URL}${portafolioPoster("inmo-recorrido-mazatlan")}`, alt: "Portafolio de videos Delta Kilo" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Portafolio", item: `${BASE_URL}/portafolio` },
  ],
};

const videosJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Portafolio de videos Delta Kilo",
  itemListElement: PORTAFOLIO.flatMap((c) => c.videos).map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: v.titulo,
      description: `${v.giro}. Video de ejemplo producido por Delta Kilo Soluciones.`,
      thumbnailUrl: `${BASE_URL}${portafolioPoster(v.slug)}`,
      contentUrl: `${BASE_URL}${portafolioSrc(v.slug)}`,
      uploadDate: "2026-11-23",
      duration: `PT${Math.floor(v.segundos / 60)}M${v.segundos % 60}S`,
    },
  })),
};

export default function PortafolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videosJsonLd) }} />

      {/* Encabezado */}
      <section className="relative bg-[#080808] pt-32 sm:pt-40 pb-10 sm:pb-14 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(13,207,207,0.12),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="eyebrow text-[#0dcfcf] mb-4">Portafolio</p>
          <h1 className="text-heading gradient-text mb-5">Videos que producimos para negocios.</h1>
          <p className="text-white/45 max-w-2xl mx-auto text-base leading-relaxed">
            Una muestra de la calidad que puedes tener en tus redes, anuncios y página: recorridos, promociones,
            historias en 3D y videos que explican tu servicio. Toca cualquier video para verlo con audio.
          </p>

          <nav aria-label="Secciones del portafolio" className="mt-10 flex flex-wrap justify-center gap-2">
            {PORTAFOLIO.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/70
                           hover:border-[#0dcfcf]/40 hover:text-white transition-colors"
              >
                {c.eyebrow}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Secciones */}
      {PORTAFOLIO.map((c, i) => (
        <section
          key={c.id}
          id={c.id}
          className={`relative scroll-mt-24 py-14 sm:py-20 ${i % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#080808]"}`}
        >
          <div className="divider-line absolute top-0 left-0 right-0" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="eyebrow text-[#0dcfcf] mb-3">{c.eyebrow}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{c.titulo}</h2>
              <p className="text-white/45 text-sm sm:text-base leading-relaxed">{c.descripcion}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
              {c.videos.map((v) => (
                <VerticalVideoCard key={v.slug} video={v} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#080808] pb-4">
        <p className="max-w-3xl mx-auto px-6 text-center text-xs text-white/30 leading-relaxed">
          Videos de ejemplo producidos por Delta Kilo Soluciones con apoyo de inteligencia artificial. En los proyectos
          de muestra omitimos el nombre de los negocios.
        </p>
      </section>

      <CTASection
        eyebrow="¿Te imaginas tu negocio aquí?"
        headline="Hagamos los videos de tu marca."
        subtext="Cuéntanos qué vendes y a quién, y te proponemos los primeros videos para tus redes, anuncios y página."
        primaryLabel="Quiero mis videos"
        primaryHref="https://wa.me/5215663864984?text=Hola,%20vi%20su%20portafolio%20de%20videos%20y%20quiero%20videos%20para%20mi%20negocio"
        secondaryLabel="Ver el ecosistema"
        secondaryHref="/ecosistema"
      />
    </>
  );
}
