import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Agente de Voz IA — Delta Kilo",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      {/*
        El widget se inyecta directamente en <body> por el script externo.
        Para centrarlo, convertimos <body> en un flex centrado y hacemos que
        <main> sea "display: contents" (transparente para el layout flex).
      */}
      <style>{`
        html, body {
          height: 100%;
          min-height: 100vh;
          background: #030810 !important;
        }
        body {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
        }
        body > main {
          display: contents;
        }
      `}</style>

      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a00deff01f21c429efb8509"
        strategy="afterInteractive"
      />
    </>
  );
}
