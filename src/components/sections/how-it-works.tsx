'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tu proceso comercial actual, identificamos cuellos de botella y definimos los módulos que necesitas.',
  },
  {
    number: '02',
    title: 'Diseño del sistema',
    description: 'Construimos la arquitectura de tu sistema: qué se automatiza, cómo se conecta y qué herramientas se integran.',
  },
  {
    number: '03',
    title: 'Implementación',
    description: 'Activamos cada componente: CRM, web, funnels, IA, llamadas. Todo configurado para tu negocio.',
  },
  {
    number: '04',
    title: 'Control y escala',
    description: 'Tu negocio opera con orden. Medimos resultados, optimizamos y escalamos sin caos.',
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding relative bg-[#080808]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4"
          >
            El proceso
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold gradient-text"
          >
            Así es como transformamos tu negocio.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#0dcfcf]/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f]"
              >
                <div className="relative z-10">
                  <div className="text-[#0dcfcf]/30 text-5xl font-bold leading-none mb-4 font-mono">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.description}</p>
                </div>

                {/* Step glow dot */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#0dcfcf]/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
