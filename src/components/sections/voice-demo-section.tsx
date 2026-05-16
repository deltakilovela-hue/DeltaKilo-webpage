"use client";

import { motion } from "framer-motion";
import { Phone, Mic, Volume2 } from "lucide-react";
import Link from "next/link";

/* ── Animated waveform bars ─────────────────────────────────────────────────── */
function Waveform() {
  const bars = [0.4, 0.7, 1, 0.85, 0.55, 0.9, 0.65, 1, 0.75, 0.5, 0.8, 0.6, 0.95, 0.45, 0.7];
  return (
    <div className="flex items-center gap-[3px] h-10">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-[#0dcfcf]"
          animate={{ scaleY: [h, h * 0.4, h] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut",
          }}
          style={{ height: `${h * 100}%`, originY: "50%" }}
        />
      ))}
    </div>
  );
}

/* ── Pulse ring around mic ───────────────────────────────────────────────────── */
function PulseRing() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-[#0dcfcf]/30"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
        />
      ))}
      <div className="relative z-10 w-16 h-16 rounded-full bg-[#0dcfcf]/10 border border-[#0dcfcf]/30
                      flex items-center justify-center
                      cursor-pointer transition-all duration-300
                      group-hover:bg-[#0dcfcf]/25 group-hover:border-[#0dcfcf]/60
                      group-hover:shadow-[0_0_28px_rgba(13,207,207,0.45)]
                      group-hover:scale-110">
        <Mic size={24} className="text-[#0dcfcf] group-hover:scale-110 transition-transform duration-300" />
      </div>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────────── */
export function VoiceDemoSection() {
  return (
    <>
      <section className="relative bg-[#080808] border-t border-white/5 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0dcfcf]/[0.03] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">

          {/* Grid: left text | right visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Left ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full
                           border border-[#0dcfcf]/20 bg-[#0dcfcf]/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0dcfcf]">
                  Demo en vivo
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-5"
              >
                Escucha cómo
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #0dcfcf 0%, #5eead4 100%)" }}
                >
                  suena nuestro asistente.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-white/45 text-base leading-relaxed mb-8 max-w-md"
              >
                Interactúa con el asistente de voz directamente aquí.
                Escucha cómo atiende, responde preguntas y califica prospectos
                de forma automática, las 24 horas del día.
              </motion.p>

              {/* Feature list */}
              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                {[
                  { icon: Phone, text: "Responde en menos de 1 segundo" },
                  { icon: Mic, text: "Voz natural, no robótica" },
                  { icon: Volume2, text: "Disponible en español e inglés" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#0dcfcf]/10 border border-[#0dcfcf]/20
                                    flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-[#0dcfcf]" />
                    </div>
                    <span className="text-sm text-white/60">{text}</span>
                  </li>
                ))}
              </motion.ul>

              {/* Arrow hint pointing to widget */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-xs text-white/25 flex items-center gap-2"
              >
                <span className="text-[#0dcfcf]/50">→</span>
                Haz clic en el micrófono para abrir el agente de voz
              </motion.p>
            </div>

            {/* ── Right: visual card ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-sm">
                {/* Card */}
                <div className="rounded-2xl border border-[#0dcfcf]/15 bg-[#0c0c0c]
                                shadow-[0_0_60px_rgba(13,207,207,0.06)] p-8">

                  {/* Top bar */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0dcfcf] animate-pulse" />
                    <span className="text-xs text-white/40 tracking-widest uppercase font-medium">
                      Asistente activo
                    </span>
                  </div>

                  {/* Mic pulse — click to open agent page */}
                  <div className="flex justify-center mb-8">
                    <Link href="/agente" className="group relative" aria-label="Probar agente de voz IA">
                      <PulseRing />
                      {/* Hover tooltip */}
                      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2
                                       text-[10px] text-[#0dcfcf]/60 whitespace-nowrap
                                       opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                       tracking-widest uppercase">
                        Probar agente ↗
                      </span>
                    </Link>
                  </div>

                  {/* Waveform */}
                  <div className="flex justify-center mb-8">
                    <Waveform />
                  </div>

                  {/* Chat bubbles */}
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="bg-[#0dcfcf]/10 border border-[#0dcfcf]/15 rounded-2xl rounded-tl-sm
                                 px-4 py-3 text-sm text-white/70 max-w-[80%]"
                    >
                      Hola, ¿en qué te puedo ayudar hoy?
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                      className="bg-white/5 border border-white/[0.06] rounded-2xl rounded-tr-sm
                                 px-4 py-3 text-sm text-white/50 max-w-[80%] ml-auto"
                    >
                      Quiero información sobre los precios...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                      className="bg-[#0dcfcf]/10 border border-[#0dcfcf]/15 rounded-2xl rounded-tl-sm
                                 px-4 py-3 text-sm text-white/70 max-w-[80%]"
                    >
                      Claro, te explico nuestros planes...
                    </motion.div>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#0dcfcf]/10 to-transparent -z-10 blur-xl" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
  );
}
