import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Agente de Voz IA — Delta Kilo",
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
      <div className="min-h-screen bg-[#030810]" />
    </>
  );
}
