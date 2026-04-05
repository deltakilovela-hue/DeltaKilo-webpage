'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  eyebrow = '¿Listo para ordenar tu negocio?',
  headline = 'Convierte tu proceso de ventas en un sistema que escala.',
  subtext = 'Agenda una llamada gratuita de 30 minutos. Te mostramos exactamente qué necesitas y cómo lo implementamos sin burocracia.',
  primaryLabel = 'Hablar por WhatsApp',
  primaryHref = 'https://wa.me/521XXXXXXXXXX?text=Hola,%20quiero%20agendar%20una%20llamada%20gratuita',
  secondaryLabel = 'Ver servicios',
  secondaryHref = '/servicios',
}: CTASectionProps) {
  return (
    <section className="relative py-32 bg-[#080808] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />

      {/* Background: tech image with dark overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=70&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-[0.06]"
        />
        {/* Central glow — oro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
        />
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* Top gold line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">{eyebrow}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-gold mb-8 leading-[1.1] tracking-tight"
        >
          {headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <a
            href={primaryHref}
            target={primaryHref.startsWith('http') ? '_blank' : undefined}
            rel={primaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 text-sm group"
          >
            <MessageCircle size={16} />
            {primaryLabel}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          {secondaryLabel && (
            <Link
              href={secondaryHref || '/servicios'}
              className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-sm font-medium group"
            >
              {secondaryLabel}
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          {[
            'Sin contratos de permanencia',
            'Respuesta en menos de 1 hora',
            'Diagnóstico gratuito',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/25">
              <svg className="w-3.5 h-3.5 text-[#0dcfcf]/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
