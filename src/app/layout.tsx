import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.deltakilo.com.mx"),
  title: {
    default: "Delta Kilo Soluciones | CRM, Automatización y Páginas Web para Negocios en México",
    template: "%s | Delta Kilo Soluciones",
  },
  description:
    "Transforma tu negocio con CRM, funnels de venta, agentes de IA, páginas web profesionales y posicionamiento en Google Maps. Sistema completo de ventas para empresas en México.",
  keywords: [
    "automatización de ventas México",
    "CRM para negocios",
    "funnels de venta",
    "agente de voz IA",
    "páginas web profesionales México",
    "posicionamiento Google Maps",
    "sistema de ventas automatizado",
    "Delta Kilo Soluciones",
    "marketing digital México",
    "captación de clientes",
  ],
  icons: [
    { rel: "icon", url: "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png" },
  ],
  openGraph: {
    title: "Delta Kilo Soluciones | Sistema completo de ventas para tu negocio",
    description:
      "CRM, funnels, agentes de IA, páginas web y Google Maps. Todo conectado para que tu negocio genere más clientes en piloto automático.",
    url: "https://www.deltakilo.com.mx",
    siteName: "Delta Kilo Soluciones",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png",
        width: 1200,
        height: 630,
        alt: "Delta Kilo Soluciones — Automatización y sistemas para negocios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delta Kilo Soluciones | Sistema completo de ventas para tu negocio",
    description:
      "CRM, funnels, agentes de IA, páginas web y Google Maps. Todo conectado para que tu negocio genere más clientes en piloto automático.",
    images: ["https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.deltakilo.com.mx/#organization",
  name: "Delta Kilo Soluciones",
  url: "https://www.deltakilo.com.mx",
  logo: "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a00c788bc1f77cc3563c8b6.png",
  sameAs: [
    "https://www.facebook.com/Deltakilosoluciones/",
    "https://www.instagram.com/deltakilosoluciones",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Delta Kilo Soluciones",
  url: "https://www.deltakilo.com.mx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
