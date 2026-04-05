'use client';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/spline-scene';
import { Spotlight } from '@/components/ui/spotlight';
import { ArrowRight, MessageCircle, ChevronRight } from 'lucide-react';
import type { Variants } from 'framer-motion';

/* ── Floating geometric shape ── */
function FloatingShape({
  className, delay = 0, width = 300, height = 80, rotate = 0,
  color = 'rgba(212,175,55,0.12)', reverse = false,
}: {
  className?: string; delay?: number; width?: number; height?: number;
  rotate?: number; color?: string; reverse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reverse ? 60 : -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.2, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={`absolute pointer-events-none ${className ?? ''}`}
    >
      <motion.div
        animate={{ y: reverse ? [0, -14, 0] : [0, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
        style={{ width, height }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full" style={{
          background: `linear-gradient(135deg, ${color}, transparent)`,
          transform: `rotate(${rotate}deg)`,
          boxShadow: `0 0 40px ${color}`,
          border: '1px solid rgba(13,207,207,0.08)',
        }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Delta triangle SVG shape ── */
function DeltaShape({ className, delay = 0, size = 120, opacity = 0.05 }: {
  className?: string; delay?: number; size?: number; opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay, ease: 'easeOut' }}
      className={`absolute pointer-events-none ${className ?? ''}`}
    >
      <motion.div
        animate={{ rotate: [0, 3, -3, 0], y: [0, 8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width={size} height={size} viewBox="0 0 100 86.6" fill="none">
          <polygon points="50,2 98,84.6 2,84.6"
            stroke={`rgba(13,207,207,${opacity * 6})`} strokeWidth="1.5"
            fill={`rgba(13,207,207,${opacity})`} />
          <polygon points="50,18 84,78 16,78"
            stroke={`rgba(13,207,207,${opacity * 4})`} strokeWidth="1" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15, ease: 'easeOut' },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#080808] overflow-hidden">

      {/* ── Background layers ── */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#D4AF37" />
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
      <div className="absolute inset-0 aurora-glow pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(212,175,55,0.08) 0%, transparent 65%)' }}
      />

      {/* ── Full-bleed two-column layout ── */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">

        {/* ── LEFT: Content ── */}
        <div className="relative flex items-center justify-center lg:justify-start
                        px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-8
                        pt-32 pb-10 lg:pt-0 lg:pb-0
                        w-full lg:w-[50%] xl:w-[46%]">

          {/* Subtle left-side decorative shapes */}
          <DeltaShape delay={0.8} size={120} opacity={0.04} className="hidden lg:block left-[5%] top-[15%]" />
          <DeltaShape delay={1.0} size={60}  opacity={0.06} className="hidden lg:block left-[60%] bottom-[18%]" />

          <div className="max-w-xl w-full">

            {/* Premium top accent line */}
            <div className="absolute -top-8 left-0 w-32 h-1 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-transparent rounded-full opacity-60 hidden lg:block" />

            {/* Eyebrow badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full badge-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse flex-shrink-0" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase">
                  Automatización · Sistemas · Resultados
                </span>
                <ChevronRight size={12} className="opacity-50" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.8rem]
                         font-bold leading-[1.08] tracking-[-0.02em] mb-8"
            >
              <span className="gradient-text block">Todo tu proceso</span>
              <span className="gradient-text block">de ventas,</span>
              <span className="gradient-text-gold block">conectado en</span>
              <span className="gradient-text-gold block">un solo sistema.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl mb-12"
            >
              Desde la captación hasta el cierre: automatizamos tu atención,
              seguimiento y gestión para que tu negocio funcione con{' '}
              <span className="text-white/70 font-medium">orden, control y resultados</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row gap-4 mb-16 sm:mb-20"
            >
              <a
                href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20Delta%20Kilo%20Soluciones"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold group
                           bg-[#D4AF37] text-[#0e0e0e] rounded-lg
                           hover:bg-[#E5C158] active:bg-[#C49A2E]
                           transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/20"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Hablar por WhatsApp
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#servicios"
                className="btn-secondary inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-medium group"
              >
                <span className="w-5 h-5 rounded-full border border-[#0dcfcf]/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#0dcfcf] ml-0.5" fill="currentColor" viewBox="0 0 8 10">
                    <path d="M0 0l8 5-8 5V0z" />
                  </svg>
                </span>
                Ver cómo funciona
                <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-0 divide-x divide-white/8"
            >
              {[
                { num: '6+',   label: 'Soluciones\nintegradas' },
                { num: '100%', label: 'Personalizado\npara tu negocio' },
                { num: '1',    label: 'Sistema\nconectado' },
              ].map((stat, i) => (
                <div key={i} className="px-5 sm:px-6 first:pl-0 last:pr-0">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stat.num}</div>
                  <div className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-wider mt-0.5 leading-tight whitespace-pre-line">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: Full-height Spline ── */}
        <div className="relative flex-1 h-[70vw] sm:h-[80vw] lg:h-auto lg:min-h-screen overflow-hidden">

          {/* Decorative shapes on right side */}
          <FloatingShape delay={0.3} width={420} height={100} rotate={10}  color="rgba(212,175,55,0.08)"  className="hidden lg:block -right-[8%] top-[15%]" />
          <FloatingShape delay={0.5} width={280} height={70}  rotate={-14} color="rgba(212,175,55,0.06)" className="hidden lg:block right-[10%] bottom-[12%]" reverse />
          <DeltaShape delay={0.9} size={180} opacity={0.035} className="hidden lg:block right-[4%] top-[8%]" />

          {/* Left edge fade — blends with content panel */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-20" />
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-16 lg:h-24 bg-gradient-to-b from-[#080808]/60 to-transparent pointer-events-none z-20" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 lg:h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-20" />

          {/* Glow behind robot */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)' }}
          />

          {/* Spline — fills full container */}
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />

          {/* Floating status badge — bottom left of scene */}
          <motion.div
            initial={{ opacity: 0, x: -16, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 glass-card rounded-xl px-4 py-3 shadow-2xl z-30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 glow-pulse flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">Sistema activo</div>
                <div className="text-[10px] text-white/35 mt-0.5">Procesando en tiempo real</div>
              </div>
            </div>
          </motion.div>

          {/* Floating metric badge — top right of scene */}
          <motion.div
            initial={{ opacity: 0, x: 16, y: -16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="absolute top-6 right-6 sm:top-10 sm:right-10 glass-card rounded-xl px-4 py-3 shadow-2xl z-30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0dcfcf]/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">+340% leads</div>
                <div className="text-[10px] text-white/35 mt-0.5">Promedio por cliente</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
