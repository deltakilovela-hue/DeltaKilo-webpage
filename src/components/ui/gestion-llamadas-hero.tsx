"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle, Inbox } from "lucide-react";
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: 0.3 + i * 0.15,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const channels = [
  { icon: Phone, label: "Llamadas", color: "text-[#0dcfcf]", bg: "bg-[#0dcfcf]/10" },
  { icon: MessageCircle, label: "WhatsApp", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { icon: Inbox, label: "Mensajes web", color: "text-violet-400", bg: "bg-violet-400/10" },
];

export function GestionLlamadasHero() {
  return (
    <div className="relative min-h-screen w-full bg-[#080808] flex items-center justify-center overflow-hidden">

      {/* Sparkles background — full coverage */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="gestion-llamadas-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={80}
          particleColor="#0dcfcf"
          speed={1.2}
          className="w-full h-full"
        />
      </div>

      {/* Radial mask — fade particles toward edges */}
      <div className="absolute inset-0 bg-[#080808] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,black_80%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">

        {/* Badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full
                     border border-[#0dcfcf]/20 bg-[#0dcfcf]/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0dcfcf]">
            Comunicación centralizada
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight text-white mb-5"
        >
          Cero leads perdidos
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #0dcfcf 0%, #5eead4 50%, #0dcfcf 100%)" }}
          >
            por falta de respuesta.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Centralizamos llamadas, WhatsApp y mensajes en un solo panel.
          Tu equipo responde más rápido y ningún prospecto queda sin atender.
        </motion.p>

        {/* Channel pills */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center justify-center gap-3 flex-wrap mb-10"
        >
          {channels.map(({ icon: Icon, label, color, bg }) => (
            <div
              key={label}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] ${bg}`}
            >
              <Icon size={14} className={color} />
              <span className={`text-xs font-medium ${color}`}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://wa.me/5215663864984?text=Hola,%20quiero%20centralizar%20las%20comunicaciones%20de%20mi%20negocio%20💊"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl
                       bg-[#0dcfcf] text-black hover:bg-[#0bbdbd]
                       transition-all duration-300 shadow-lg hover:shadow-[#0dcfcf]/25 group"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Quiero centralizar mis canales
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="#servicio"
            className="text-sm text-white/35 hover:text-white/70 transition-colors"
          >
            Ver el servicio ↓
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none" />
    </div>
  );
}
