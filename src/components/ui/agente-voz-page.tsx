"use client";

import { motion } from "framer-motion";
import { Mic, Zap, Clock } from "lucide-react";

/* ── Animated waveform ─────────────────────────────────────────────────────── */
function Waveform() {
  const heights = [30, 55, 80, 100, 75, 90, 55, 70, 45, 85, 60, 95, 40, 75, 50];
  return (
    <div className="flex items-center gap-[3px] h-12">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            background: "linear-gradient(180deg, #0dcfcf 0%, rgba(13,207,207,0.3) 100%)",
            height: `${h}%`,
          }}
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.09,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Trigger widget click ───────────────────────────────────────────────────── */
function triggerWidget() {
  // Try common selectors for the LeadConnector chat widget button
  const selectors = [
    "[id*='chat-widget'] button",
    "[class*='chat-widget'] button",
    "#leadconnector-chat-widget button",
    "[data-widget-id] button",
    "iframe[title*='chat']",
  ];
  for (const sel of selectors) {
    const el = document.querySelector<HTMLElement>(sel);
    if (el) { el.click(); return; }
  }
  // Fallback: look for any fixed-positioned button added to body
  const allBtns = document.querySelectorAll<HTMLElement>("body > div button, body > div > div button");
  const last = allBtns[allBtns.length - 1];
  if (last) last.click();
}

/* ── Main page ─────────────────────────────────────────────────────────────── */
export function AgentePage() {
  return (
    <div className="min-h-screen bg-[#030810] flex flex-col items-center justify-center relative overflow-hidden px-6">

      {/* Deep glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,50,180,0.22) 0%, rgba(13,207,207,0.06) 55%, transparent 80%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Orbit rings */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-[#0dcfcf]/[0.08]"
          style={{
            width: `${160 + i * 110}px`,
            height: `${160 + i * 110}px`,
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{
            duration: 2.2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

        {/* Brand eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.25em] text-[#0dcfcf]/70 font-semibold mb-6"
        >
          Delta Kilo Soluciones
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-4"
        >
          Agente de
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #0dcfcf 0%, #7dd3fc 100%)" }}
          >
            Voz IA
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white/40 text-base sm:text-lg leading-relaxed mb-10 max-w-sm"
        >
          Atiende a tus clientes en segundos.
          <br />Sin personal. Sin horarios. Sin demoras.
        </motion.p>

        {/* Waveform */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10"
        >
          <Waveform />
        </motion.div>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          onClick={triggerWidget}
          className="relative group inline-flex items-center gap-3 px-8 py-5
                     text-base font-bold text-black rounded-2xl
                     bg-[#0dcfcf] hover:bg-[#0bbdbd]
                     transition-all duration-300
                     shadow-[0_0_40px_rgba(13,207,207,0.35)]
                     hover:shadow-[0_0_60px_rgba(13,207,207,0.55)]
                     hover:scale-[1.03] active:scale-[0.98]"
        >
          {/* Pulse ring on button */}
          <span className="absolute inset-0 rounded-2xl border-2 border-[#0dcfcf]/60
                           animate-ping opacity-30 pointer-events-none" />
          <Mic size={20} className="flex-shrink-0" />
          Probar agente de voz IA
          <span className="w-2 h-2 rounded-full bg-black/30 animate-pulse" />
        </motion.button>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 text-white/20 text-xs tracking-wide"
        >
          O usa el botón flotante en la esquina inferior derecha
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-12"
        >
          {[
            { icon: Zap, label: "Responde en < 1 segundo" },
            { icon: Clock, label: "Disponible 24 / 7" },
            { icon: Mic, label: "Voz natural en español" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                         border border-[#0dcfcf]/15 bg-[#0dcfcf]/5 text-xs text-white/45"
            >
              <Icon size={12} className="text-[#0dcfcf]" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 mt-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#0dcfcf] animate-pulse" />
          <span className="text-[11px] text-white/25 tracking-widest uppercase">
            Agente en línea
          </span>
        </motion.div>

      </div>
    </div>
  );
}
