'use client';

import { motion, type Variants } from 'framer-motion';
import { Circle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function EcosistemaHero() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.3 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
    }),
  };

  return (
    <div className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Ambient glow — teal + gold, marcando que aquí conviven las dos mitades del sistema */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(13,207,207,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-10"
          >
            <Circle className="h-2 w-2 fill-[#0dcfcf]/80" />
            <span className="text-sm text-white/60 tracking-wide">El ecosistema Delta Kilo</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-display mb-6 md:mb-8">
              <span className="gradient-text">Un equipo completo de IA,</span>
              <br />
              <span className="gradient-text-cyan">trabajando en tu negocio</span>
              <br />
              <span className="gradient-text">todos los días.</span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg text-white/40 mb-10 leading-relaxed font-light max-w-xl mx-auto px-4">
              No contratas un servicio. Conectas tu negocio a seis especialistas que diseñan,
              publican, responden y venden por ti — y que puedes ver trabajar en tiempo real
              desde tu propio portal.
            </p>
          </motion.div>

          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="https://wa.me/5215663864984?text=Hola,%20quiero%20conocer%20el%20ecosistema%20de%20Delta%20Kilo%20💊"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-sm group"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Hablar con Delta Kilo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="#escuadron" className="text-sm text-white/35 hover:text-white/70 transition-colors">
              Conocer al escuadrón ↓
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60 pointer-events-none" />
    </div>
  );
}
