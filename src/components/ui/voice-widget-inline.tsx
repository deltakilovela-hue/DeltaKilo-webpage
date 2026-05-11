"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

export function VoiceWidgetInline() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  // Poll until the chat-widget custom element appears in the DOM
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

      {/* Card interior — imita la UI del agente de voz */}
      <div className="relative h-full w-full flex flex-col items-center justify-center gap-6 bg-[#050a0a] overflow-hidden">
        {/* Fondo radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,80,255,0.18) 0%, rgba(13,207,207,0.08) 40%, transparent 70%)",
          }}
        />

        {/* Anillos animados */}
        <div className="relative flex items-center justify-center">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute rounded-full border border-blue-500/20"
              style={{
                width: `${80 + i * 52}px`,
                height: `${80 + i * 52}px`,
                animation: `ping ${1.2 + i * 0.4}s cubic-bezier(0,0,0.2,1) infinite`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.4 - i * 0.1,
              }}
            />
          ))}

          {/* Botón mic central */}
          <button
            onClick={openWidget}
            disabled={!ready}
            className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, rgba(80,140,255,0.9), rgba(0,60,200,0.95))",
              boxShadow: active
                ? "0 0 40px rgba(0,100,255,0.7), 0 0 80px rgba(0,100,255,0.3)"
                : "0 0 24px rgba(0,100,255,0.5), 0 0 48px rgba(0,100,255,0.15)",
            }}
          >
            {/* Mic icon SVG */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Label */}
        <div className="relative z-10 text-center">
          <p className="text-white font-semibold text-base md:text-lg mb-1">
            {ready ? "Presiona para iniciar llamada" : "Cargando agente…"}
          </p>
          <p className="text-white/40 text-sm flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] inline-block" />
            VegaVoz AI · Delta Kilo
          </p>
        </div>
      </div>
    </>
  );
}
