"use client";

import { motion, type Variants } from "framer-motion";
import { Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ─── Floating ellipse shapes ───────────────────────────────────────────────── */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────────── */
export function CrmHero() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-transparent to-indigo-500/[0.06] blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3} width={620} height={140} rotate={12}
          gradient="from-violet-500/[0.18]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5} width={500} height={120} rotate={-15}
          gradient="from-indigo-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[68%] md:top-[73%]"
        />
        <ElegantShape
          delay={0.4} width={300} height={80} rotate={-8}
          gradient="from-purple-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6} width={200} height={60} rotate={20}
          gradient="from-violet-400/[0.12]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7} width={150} height={40} rotate={-25}
          gradient="from-indigo-400/[0.12]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                       bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-violet-400/80" />
            <span className="text-sm text-white/60 tracking-wide">
              Gestión comercial
            </span>
          </motion.div>

          {/* Title */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Controla tu pipeline,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-white/90 to-indigo-300">
                cierra más ventas.
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg text-white/40 mb-10 leading-relaxed
                          font-light tracking-wide max-w-xl mx-auto px-4">
              CRM configurado para tu proceso real. Visibilidad total del pipeline,
              seguimiento automático y cero prospectos perdidos.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="https://wa.me/5215663864984?text=Hola,%20quiero%20implementar%20un%20CRM%20en%20mi%20negocio%20💊"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold
                         rounded-xl bg-violet-500 text-white hover:bg-violet-400
                         transition-all duration-300 shadow-lg hover:shadow-violet-500/30 group"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Quiero mi CRM
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
      </div>

      {/* Top/bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80 pointer-events-none" />
    </div>
  );
}
