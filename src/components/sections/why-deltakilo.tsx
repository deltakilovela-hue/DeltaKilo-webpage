'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 'captamos',
    number: '01',
    label: 'Captamos',
    title: 'Convertimos atención en oportunidades',
    body: 'Visitas, mensajes de WhatsApp, campañas pagadas, formularios y redes sociales. Todo entra al sistema con contexto, fuente y momento. Sin leads perdidos por falta de seguimiento.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
      </svg>
    ),
  },
  {
    id: 'calificamos',
    number: '02',
    label: 'Calificamos',
    title: 'Detectamos quién está listo para comprar',
    body: 'La IA identifica intención, necesidad, presupuesto y urgencia. Tus vendedores hablan primero con quien tiene más probabilidad de cerrar, no con quien llegó primero.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6" /><path d="M8 11h6" />
      </svg>
    ),
  },
  {
    id: 'organizamos',
    number: '03',
    label: 'Organizamos',
    title: 'Cada lead, en su etapa y con su contexto',
    body: 'Entra al CRM con etiqueta, etapa, responsable y toda la conversación. Sin Excel, sin notas sueltas. El equipo sabe exactamente qué hacer con cada contacto.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    id: 'automatizamos',
    number: '04',
    label: 'Automatizamos',
    title: 'El sistema trabaja aunque nadie esté mirando',
    body: 'Respuestas inmediatas, recordatorios, tareas automáticas y flujos de seguimiento. Tu equipo hace lo que requiere criterio humano. El sistema hace el resto.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 'medimos',
    number: '05',
    label: 'Medimos',
    title: 'Sabes qué funciona y qué se puede mejorar',
    body: 'Dashboards claros con tasas de conversión, tiempos de respuesta, fuentes de leads y cierres por canal. Tomas decisiones con datos, no con intuición.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

export function WhyDeltaKilo() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding relative bg-[#080808] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0dcfcf]/[0.025] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header — two-line punch */}
        <div className="text-center mb-14 lg:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-5"
          >
            Por qué Delta Kilo
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
          >
            <span className="text-white">No necesitas otro CRM.</span>
            <br />
            <span className="gradient-text-cyan">Necesitas que todo funcione junto.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="max-w-2xl mx-auto space-y-3 text-white/45 text-base leading-relaxed"
          >
            <p>
              La mayoría de los negocios ya tienen herramientas: WhatsApp, redes sociales, formularios, campañas, vendedores y bases de datos.
            </p>
            <p className="text-white/60 font-medium">
              El problema no es tener herramientas.{' '}
              <span className="text-white/80">El problema es que no están conectadas.</span>
            </p>
          </motion.div>
        </div>

        {/* Interactive step selector */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:gap-6"
        >
          {/* Left: step tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory lg:snap-none">
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActive(i)}
                className={`group relative flex-shrink-0 snap-start flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 w-40 lg:w-full
                  ${active === i
                    ? 'bg-[#0dcfcf]/10 border border-[#0dcfcf]/25 text-white'
                    : 'border border-transparent hover:bg-white/[0.03] hover:border-white/8 text-white/50 hover:text-white/80'
                  }`}
              >
                {/* Active indicator */}
                {active === i && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[#0dcfcf]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Number + label */}
                <span className={`font-mono text-[11px] font-bold transition-colors flex-shrink-0
                  ${active === i ? 'text-[#0dcfcf]' : 'text-white/20 group-hover:text-white/40'}`}>
                  {step.number}
                </span>
                <span className="text-sm font-semibold truncate">{step.label}</span>
              </button>
            ))}
          </div>

          {/* Right: content panel */}
          <div className="relative min-h-[260px] lg:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="p-8 lg:p-10 rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] h-full flex flex-col justify-center gap-6
                                relative overflow-hidden">

                  {/* Background number watermark */}
                  <div className="absolute right-6 top-4 font-mono text-[7rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
                    {steps[active].number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#0dcfcf]/10 border border-[#0dcfcf]/20 flex items-center justify-center text-[#0dcfcf]">
                    {steps[active].icon}
                  </div>

                  {/* Text */}
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-[#0dcfcf]/60 font-semibold mb-2 font-mono">
                      {steps[active].label}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-snug">
                      {steps[active].title}
                    </h3>
                    <p className="text-white/50 text-base leading-relaxed max-w-xl">
                      {steps[active].body}
                    </p>
                  </div>

                  {/* Step dots nav */}
                  <div className="flex items-center gap-2 mt-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          active === i ? 'w-6 bg-[#0dcfcf]' : 'w-2 bg-white/15 hover:bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-center mt-14"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0dcfcf]/60 hover:text-[#0dcfcf] transition-colors group"
          >
            Quiero un sistema así para mi negocio
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
