import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "VegaVoz AI — Agente de voz Delta Kilo",
  description: "Habla directamente con el agente de voz IA de Delta Kilo Soluciones.",
  robots: { index: false, follow: false },
};

export default function AgentePage() {
  return (
    <>
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a00deff01f21c429efb8509"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-[#030810] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Deep blue glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,60,200,0.25) 0%, rgba(13,207,207,0.07) 55%, transparent 80%)",
          }}
        />

        {/* Orbit rings */}
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-blue-500/10"
            style={{
              width: `${140 + i * 100}px`,
              height: `${140 + i * 100}px`,
              animation: `ping ${1.4 + i * 0.45}s cubic-bezier(0,0,0.2,1) infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.3 - i * 0.04,
            }}
          />
        ))}

        {/* Branding */}
        <div className="relative z-10 flex flex-col items-center gap-3 mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0dcfcf] font-semibold">
            Delta Kilo Soluciones
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">VegaVoz AI</h1>
          <p className="text-white/40 text-base md:text-lg max-w-sm">
            Agente de voz con inteligencia artificial.<br />
            Disponible 24 / 7 — responde en segundos.
          </p>
        </div>

        {/* Status indicator */}
        <div className="relative z-10 flex items-center gap-2 mt-4">
          <span
            className="w-2 h-2 rounded-full bg-[#0dcfcf]"
            style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
          />
          <span className="text-xs text-white/30 tracking-widest uppercase">En línea</span>
        </div>

        {/* Hint */}
        <p className="relative z-10 text-white/20 text-sm mt-10">
          Presiona el botón de voz para iniciar
        </p>
      </div>
    </>
  );
}
