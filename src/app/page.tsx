import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Delta Kilo Soluciones — Automatización y sistemas para negocios",
  description:
    "Desde la captación hasta el cierre: automatizamos tu atención, seguimiento y gestión para que tu negocio funcione con orden, control y resultados.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CTASection />
    </>
  );
}
