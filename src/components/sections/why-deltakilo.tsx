'use client';
import { motion } from 'framer-motion';

const differentiators = [
  {
    title: 'No vendemos herramientas',
    description: 'Cualquier agencia puede venderte un CRM o una página web. Nosotros construimos el sistema que hace que todo funcione junto.',
  },
  {
    title: 'Personalizado para tu negocio',
    description: 'No hay plantillas genéricas. Cada sistema se diseña según tu proceso, tu equipo y tus objetivos específicos.',
  },
  {
    title: 'Orientado a resultados',
    description: 'Cada componente que implementamos tiene un objetivo medible: más leads, mejor seguimiento, menos trabajo manual.',
  },
  {
    title: 'Escalable desde el día uno',
    description: 'Construimos con visión de largo plazo. El sistema crece con tu negocio sin que tengas que empezar de cero.',
  },
];

export function WhyDeltaKilo() {
  return (
    <section className="section-padding relative bg-[#080808]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0dcfcf]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: Statement */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4"
            >
              Por qué Delta Kilo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold leading-tight mb-6"
            >
              <span className="gradient-text">La diferencia no está</span>
              <br />
              <span className="gradient-text">en las herramientas.</span>
              <br />
              <span className="gradient-text-cyan">Está en el sistema.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/45 text-base leading-relaxed"
            >
              El mercado está lleno de herramientas. Lo que falta es alguien que las conecte, configure y ponga a funcionar como un sistema real orientado a tu negocio.
            </motion.p>
          </div>

          {/* Right: Differentiators */}
          <div className="space-y-4 relative">
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#0dcfcf]/15 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0dcfcf]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0dcfcf]/15 transition-colors">
                  <svg className="w-4 h-4 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
