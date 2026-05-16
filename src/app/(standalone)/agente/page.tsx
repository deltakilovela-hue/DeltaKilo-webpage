import type { Metadata } from "next";
import Script from "next/script";
import { AgentePage } from "@/components/ui/agente-voz-page";

export const metadata: Metadata = {
  title: "Agente de Voz IA — Delta Kilo Soluciones",
  description: "Habla directamente con el agente de voz IA de Delta Kilo. Disponible 24/7, responde en segundos.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a00deff01f21c429efb8509"
        strategy="afterInteractive"
      />
      <AgentePage />
    </>
  );
}
