import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ProblemSection } from "@/components/sections/problem-section";
import { ServicesHub } from "@/components/sections/services-hub";
import { ScrollySection } from "@/components/sections/scrolly-section";
import { EcosystemFlow } from "@/components/sections/ecosystem-flow";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyDeltaKilo } from "@/components/sections/why-deltakilo";
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
      <TrustBar />
      <ProblemSection />
      <ServicesHub />
      <ScrollySection />
      <EcosystemFlow />
      <HowItWorks />
      <WhyDeltaKilo />
      <CTASection />
    </>
  );
}
