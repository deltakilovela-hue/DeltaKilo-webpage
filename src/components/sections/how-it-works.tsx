'use client';
import { BlurFade } from '@/components/ui/blur-fade';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tu proceso comercial actual, identificamos cuellos de botella y definimos los módulos que necesitas.',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Diseño del sistema',
    description: 'Construimos la arquitectura de tu sistema: qué se automatiza, cómo se conecta y qué herramientas se integran.',
    icon: '🗺️',
  },
  {
    number: '03',
    title: 'Implementación',
    description: 'Activamos cada componente: CRM, web, funnels, IA, llamadas. Todo configurado para tu negocio.',
    icon: '⚡',
  },
  {
    number: '04',
    title: 'Control y escala',
    description: 'Tu negocio opera con orden. Medimos resultados, optimizamos y escalamos sin caos.',
    icon: '📈',
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding relative bg-[#080808]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <BlurFade delay={0} inView>
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-3.5 py-1.5 rounded-full
                            bg-[#0dcfcf]/8 border border-[#0dcfcf]/20">
              <AnimatedShinyText
                shimmerWidth={120}
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0dcfcf]/80"
              >
                El proceso
              </AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h2 className="text-heading gradient-text">
              Así es como transformamos tu negocio.
            </h2>
          </BlurFade>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px
                          bg-gradient-to-r from-transparent via-[#0dcfcf]/25 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((step, i) => (
              <BlurFade key={step.number} delay={i * 0.12} inView>
                <div className="relative h-full p-6 sm:p-7 rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f]
                                hover:border-[#0dcfcf]/20 hover:shadow-[0_0_32px_rgba(13,207,207,0.06)]
                                transition-all duration-300 group">

                  {/* Step number — large watermark */}
                  <div className="text-[#0dcfcf]/20 text-5xl sm:text-6xl font-bold leading-none mb-5 font-mono
                                  group-hover:text-[#0dcfcf]/35 transition-colors duration-300">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-2xl mb-3">{step.icon}</div>

                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Active dot */}
                  <div className="absolute top-5 right-5 w-2 h-2 rounded-full
                                  bg-[#0dcfcf]/40 group-hover:bg-[#0dcfcf]/70
                                  transition-colors duration-300" />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
