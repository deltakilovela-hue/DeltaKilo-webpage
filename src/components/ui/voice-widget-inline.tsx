"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

export function VoiceWidgetInline() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.querySelector("chat-widget")) {
        setReady(true);
        clearInterval(id);
      }
    }, 300);
    return () => clearInterval(id);
  }, []);

  const openWidget = () => {
    const widget = document.querySelector("chat-widget");
    if (widget) {
      const btn = (widget.shadowRoot ?? widget).querySelector<HTMLElement>("button");
      btn?.click();
    }
    setActive(true);
  };

  return (
    <>
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a00deff01f21c429efb8509"
        strategy="afterInteractive"
        onLoad={() => setTimeout(() => setReady(true), 800)}
      />

      {/* Hero container */}
      <section className="relative min-h-screen bg-[#030810] flex flex-col items-center justify-center overflow-hidden px-6">

        {/* Deep radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,60,200,0.22) 0%, rgba(13,207,207,0.06) 50%, transparent 75%)",
          }}
        />
        {/* Secondary glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 50% 48%, rgba(30,100,255,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Orbit rings */}
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-blue-500/[0.12]"
            style={{
              width: `${160 + i * 90}px`,
              height: `${160 + i * 90}px`,
              animation: `ping ${1.4 + i * 0.5}s cubic-bezier(0,0,0.2,1) infinite`,
              animationDelay: `${i * 0.35}s`,
              opacity: 0.35 - i * 0.06,
            }}
          />
        ))}

        {/* Eyebrow */}
        <p className="relative z-10 text-xs uppercase tracking-[0.22em] text-[#0dcfcf] font-semibold mb-8">
          Agente de voz IA · Delta Kilo
        </p>

        {/* Mic button */}
        <button
          onClick={openWidget}
          disabled={!ready}
          aria-label="Iniciar llamada con VegaVoz AI"
          className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed mb-10"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, rgba(90,150,255,0.95), rgba(0,55,200,0.98))",
            boxShadow: active
              ? "0 0 60px rgba(0,100,255,0.8), 0 0 120px rgba(0,100,255,0.35)"
              : "0 0 36px rgba(0,100,255,0.55), 0 0 72px rgba(0,100,255,0.18)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        {/* Headline */}
        <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white text-center leading-tight mb-4 max-w-lg">
          {ready ? "Presiona para iniciar llamada" : "Cargando agente…"}
        </h1>
        <p className="relative z-10 text-white/40 text-base md:text-lg text-center max-w-sm leading-relaxed">
          Habla directamente con VegaVoz AI.<br />
          Disponible 24 / 7, responde en segundos.
        </p>

        {/* Status dot */}
        <div className="relative z-10 flex items-center gap-2 mt-8">
          <span
            className="w-2 h-2 rounded-full bg-[#0dcfcf]"
            style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite", opacity: 0.8 }}
          />
          <span className="text-xs text-white/30 tracking-widest uppercase">
            {ready ? "En línea" : "Conectando…"}
          </span>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 z-10 pointer-events-none">
          <p className="text-white/20 text-xs tracking-widest uppercase">Scroll</p>
          <div className="w-px h-8 bg-gradient-to-b from-[#0dcfcf]/25 to-transparent" />
        </div>
      </section>
    </>
  );
}
