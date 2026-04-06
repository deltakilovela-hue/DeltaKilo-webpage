'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SplineScene } from '@/components/ui/spline-scene';
import { ElegantShape } from '@/components/ui/elegant-shape';
import { ArrowRight, ChevronRight } from 'lucide-react';

/* ── Delta triangle decorativo ── */
function DeltaShape({ className = '', size = 120, opacity = 0.05 }: {
  className?: string; size?: number; opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        animate={{ rotate: [0, 3, -3, 0], y: [0, 8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width={size} height={size} viewBox="0 0 100 86.6" fill="none">
          <polygon points="50,2 98,84.6 2,84.6"
            stroke={`rgba(212,175,55,${opacity * 6})`} strokeWidth="1.5"
            fill={`rgba(212,175,55,${opacity})`} />
          <polygon points="50,18 84,78 16,78"
            stroke={`rgba(212,175,55,${opacity * 4})`} strokeWidth="1" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });

  /* ── Robot: zoom sutil y fade parcial ── */
  const robotScale  = useTransform(smooth, [0, 0.7], [1.08, 1.0]);
  const robotOpacity = useTransform(smooth, [0, 0.5, 1], [1, 0.7, 0.5]);

  /* ── Overlay izquierdo: aparece con el scroll ── */
  const overlayOpacity = useTransform(smooth, [0.05, 0.45], [0, 1]);

  /* ── Contenido: se revela progresivamente ── */
  const contentOpacity = useTransform(smooth, [0.15, 0.55], [0, 1]);
  const contentY       = useTransform(smooth, [0.12, 0.55], [70, 0]);

  /* ── Hint inicial "scroll down": desaparece ── */
  const hintOpacity = useTransform(smooth, [0, 0.18], [1, 0]);

  /* ── ElegantShapes: entran también con el scroll ── */
  const shapesOpacity = useTransform(smooth, [0.2, 0.6], [0, 1]);

  /* ── Stats: última capa, un poco más tarde ── */
  const statsOpacity = useTransform(smooth, [0.45, 0.75], [0, 1]);
  const statsY       = useTransform(smooth, [0.42, 0.75], [30, 0]);

  return (
    /* Contenedor scroll — 200vh de altura para el efecto */
    <div ref={containerRef} style={{ height: '200vh' }}>
      {/* ── Panel sticky que ocupa el viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#080808]">

        {/* ── Grid background ── */}
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

        {/* ── ElegantShapes — aparecen con el scroll ── */}
        <motion.div
          style={{ opacity: shapesOpacity }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <ElegantShape delay={0} width={520} height={120} rotate={14}
            gradient="from-[#D4AF37]/[0.08]" className="left-[-6%] top-[10%]" />
          <ElegantShape delay={0} width={380} height={90} rotate={-12}
            gradient="from-[#D4AF37]/[0.06]" className="right-[-3%] top-[58%]" />
          <ElegantShape delay={0} width={200} height={55} rotate={22}
            gradient="from-[#D4AF37]/[0.09]" className="right-[4%] top-[7%]" />
          <DeltaShape size={180} opacity={0.025} className="right-[6%] top-[8%]" />
        </motion.div>

        {/* ── ROBOT — full screen, sticky. pointer-events activos para que Spline capte el mouse ── */}
        <motion.div
          style={{ scale: robotScale, opacity: robotOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Glow dorado detrás del robot */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 60% at 65% 52%, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40
                          bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-10" />

          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>

        {/* ── Overlay gradiente izquierdo — para legibilidad del texto ── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #080808 38%, rgba(8,8,8,0.78) 62%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 50% 40% at 28% 0%, rgba(212,175,55,0.09) 0%, transparent 65%)' }} />
        </motion.div>

        {/* ── CONTENIDO DEL HERO — se revela con el scroll ── */}
        {/* pointer-events-none en el wrapper para no bloquear el mouse al robot Spline */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 flex items-center pointer-events-none
                     px-6 sm:px-10 lg:px-16 xl:px-24
                     pt-24 pb-0"
        >
          {/* Columna de texto — pointer-events-auto solo en el contenido real */}
          <div className="pointer-events-auto w-full lg:max-w-[52%] xl:max-w-[48%] space-y-6 sm:space-y-7">

            {/* Línea accent dorada */}
            <div className="w-12 h-px bg-gradient-to-r from-[#D4AF37]/60 to-transparent" />

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full
                            bg-[#D4AF37]/10 border border-[#D4AF37]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.13em] uppercase text-[#D4AF37]/80">
                Automatización · Sistemas · Resultados
              </span>
              <ChevronRight size={11} className="opacity-50 text-[#D4AF37]" />
            </div>

            {/* Headline */}
            <h1 className="text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[4.8rem] xl:text-[5.6rem]
                           font-bold leading-[1.06] tracking-[-0.025em]">
              <span className="gradient-text block">Todo tu proceso</span>
              <span className="gradient-text block">de ventas,</span>
              <span className="gradient-text-gold block">conectado en</span>
              <span className="gradient-text-gold block">un solo sistema.</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-md">
              Desde la captación hasta el cierre: automatizamos tu atención,
              seguimiento y gestión para que tu negocio funcione con{' '}
              <span className="text-white/70 font-medium">orden, control y resultados</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4
                            w-full max-w-xs sm:max-w-none sm:w-auto">
              <a
                href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20Delta%20Kilo%20Soluciones"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5
                           px-6 py-4 text-sm font-semibold group
                           bg-[#D4AF37] text-[#0e0e0e] rounded-xl
                           hover:bg-[#E5C158] active:bg-[#C49A2E]
                           transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Hablar por WhatsApp
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#como-funciona"
                className="btn-secondary inline-flex items-center justify-center gap-2.5
                           px-6 py-4 text-sm font-medium group">
                <span className="w-5 h-5 rounded-full border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#D4AF37] ml-0.5" fill="currentColor" viewBox="0 0 8 10">
                    <path d="M0 0l8 5-8 5V0z" />
                  </svg>
                </span>
                Ver cómo funciona
                <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── STATS — aparecen como última capa ── */}
        <motion.div
          style={{ opacity: statsOpacity, y: statsY }}
          className="absolute bottom-10 sm:bottom-12 pointer-events-none
                     left-6 sm:left-10 lg:left-16 xl:left-24
                     flex items-center divide-x divide-white/10"
        >
          {[
            { num: '6+',   label: 'Soluciones\nintegradas' },
            { num: '100%', label: 'Personalizado\npara ti' },
            { num: '1',    label: 'Sistema\nconectado' },
          ].map((stat, i) => (
            <div key={i} className="px-5 sm:px-7 first:pl-0 last:pr-0">
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                {stat.num}
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-wider mt-1.5 leading-snug whitespace-pre-line">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Floating badges del robot (desktop, aparecen con contenido) ── */}
        <motion.div
          style={{ opacity: statsOpacity }}
          className="hidden lg:block absolute bottom-16 right-[46%] z-30 pointer-events-none"
        >
          <div className="glass-card rounded-xl px-4 py-3 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 glow-pulse flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">Sistema activo</div>
                <div className="text-[10px] text-white/35 mt-0.5">Procesando en tiempo real</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: statsOpacity }}
          className="hidden lg:block absolute top-28 right-10 z-30 pointer-events-none"
        >
          <div className="glass-card rounded-xl px-4 py-3 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">+340% leads</div>
                <div className="text-[10px] text-white/35 mt-0.5">Promedio por cliente</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── HINT inicial: "Scroll para descubrir" ── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2 pointer-events-none z-40"
        >
          <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-[#D4AF37]/50 to-transparent"
          />
        </motion.div>

      </div>
    </div>
  );
}
