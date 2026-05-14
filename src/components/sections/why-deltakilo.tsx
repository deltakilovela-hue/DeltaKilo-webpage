'use client';
import { BlurFade } from '@/components/ui/blur-fade';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

const differentiators = [
  {
    title: 'No vendemos herramientas',
    description: 'Cualquier agencia puede venderte un CRM o una página web. Nosotros construimos el sistema que hace que todo funcione junto.',
    icon: '🚫',
  },
  {
    title: 'Personalizado para tu negocio',
    description: 'No hay plantillas genéricas. Cada sistema se diseña según tu proceso, tu equipo y tus objetivos específicos.',
    icon: '🎯',
  },
  {
    title: 'Orientado a resultados',
    description: 'Cada componente que implementamos tiene un objetivo medible: más leads, mejor seguimiento, menos trabajo manual.',
    icon: '📊',
  },
  {
    title: 'Escalable desde el día uno',
    description: 'Construimos con visión de largo plazo. El sistema crece con tu negocio sin que tengas que empezar de cero.',
    icon: '🚀',
  },
];

export function WhyDeltaKilo() {
  return (
    <section className="section-padding relative bg-[#080808]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0dcfcf]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left: Statement */}
          <div className="text-center lg:text-left">
            <BlurFade delay={0} inView>
              <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full
                              bg-[#0dcfcf]/8 border border-[#0dcfcf]/20">
                <AnimatedShinyText
                  shimmerWidth={140}
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0dcfcf]/80"
                >
                  Por qué Delta Kilo
                </AnimatedShinyText>
              </div>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h2 className="text-heading leading-tight mb-6">
                <span className="gradient-text">La diferencia no está</span>
                <br />
                <span className="gradient-text">en las herramientas.</span>
                <br />
                <span className="gradient-text-cyan">Está en el sistema.</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <p className="text-white/45 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                El mercado está lleno de herramientas. Lo que falta es alguien que las conecte,
                configure y ponga a funcionar como un sistema real orientado a tu negocio.
              </p>
            </BlurFade>
          </div>

          {/* Right: Differentiators */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            {differentiators.map((item, i) => (
              <BlurFade key={i} delay={i * 0.1} direction="left" inView>
                <div className="flex gap-4 p-5 sm:p-6 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]
                                hover:border-[#0dcfcf]/20 hover:shadow-[0_0_24px_rgba(13,207,207,0.05)]
                                transition-all duration-300 group">
                  {/* Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0dcfcf]/10 flex items-center justify-center
                                  flex-shrink-0 mt-0.5 text-lg group-hover:bg-[#0dcfcf]/15 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
