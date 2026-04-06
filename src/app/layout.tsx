import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Delta Kilo Soluciones — Automatización y sistemas para negocios",
    template: "%s | Delta Kilo Soluciones",
  },
  description:
    "Automatizamos tu proceso de ventas de principio a fin: CRM, funnels, asistentes de IA, páginas web y más. Todo conectado en un solo sistema.",
  keywords: [
    "automatización de negocios",
    "CRM México",
    "funnels de venta",
    "asistentes de IA",
    "páginas web profesionales",
    "Google Maps",
    "Delta Kilo Soluciones",
  ],
  openGraph: {
    title: "Delta Kilo Soluciones",
    description: "Automatizamos tu proceso de ventas de principio a fin.",
    url: "https://www.deltakilo.com.mx",
    siteName: "Delta Kilo Soluciones",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
