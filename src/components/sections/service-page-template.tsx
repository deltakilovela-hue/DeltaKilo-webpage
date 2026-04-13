'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Globe, Zap, Bot, Users, MapPin, Phone } from 'lucide-react';
import { CTASection } from '@/components/sections/cta-section';

type IconName = 'Globe' | 'Zap' | 'Bot' | 'Users' | 'MapPin' | 'Phone';

const iconMap: Record<IconName, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe, Zap, Bot, Users, MapPin, Phone,
};

interface ServiceFeature {
  title: string;
  description: string;
}

interface RelatedService {
  title: string;
  href: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
  previewImageSrc?: string;
  previewImageAlt?: string;
  problem: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
  };
  features: ServiceFeature[];
  howItWorks: { step: string; title: string; description: string }[];
  benefits: string[];
  useCases: string[];
  relatedServices: RelatedService[];
  faqs: FAQItem[];
}

/* ─── Reusable section-header layout ─────────────────────────────────────────
   Left anchor: eyebrow label + h2 (sticky feel on large screens)
   Right: content passed as children
   Ratio: 5/12 | 7/12  ≈ 42% | 58%
──────────────────────────────────────────────────────────────────────────── */
function SectionGrid({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start ${className}`}>
      {/* Left anchor */}
      <div className="lg:sticky lg:top-28">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#0dcfcf] font-semibold mb-5">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold gradient-text leading-[1.15]">
          {title}
        </h2>
      </div>
      {/* Right content */}
      <div>{children}</div>
    </div>
  );
}

export function ServicePageTemplate({
  eyebrow,
  title,
  subtitle,
  description,
  icon: iconName,
  previewImageSrc,
  previewImageAlt,
  problem,
  solution,
  features,
  howItWorks,
  benefits,
  useCases,
  relatedServices,
  faqs,
}: ServicePageProps) {
  const Icon = iconMap[iconName];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 bg-[#080808] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#0dcfcf]/20 bg-[#0dcfcf]/5"
          >
            <Icon size={13} className="text-[#0dcfcf]" />
            <span className="text-xs font-medium text-[#0dcfcf] tracking-widest uppercase">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-[#0dcfcf] font-medium mb-6"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="https://wa.me/5215663864984?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20este%20servicio%20💊"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0dcfcf] text-black font-semibold text-sm rounded-xl hover:bg-[#0bbdbd] transition-all hover:shadow-[0_0_24px_rgba(13,207,207,0.3)] group"
            >
              <MessageCircle size={15} />
              Hablar por WhatsApp
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 text-white/70 font-medium text-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Solicitar información
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Visual Preview ────────────────────────────────────────────────────── */}
      <section className="pb-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="relative rounded-2xl overflow-hidden border border-[#0dcfcf]/12 shadow-[0_0_80px_rgba(13,207,207,0.04)]">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">
                Vista previa
              </span>
            </div>

            {previewImageSrc ? (
              <>
                <img
                  src={previewImageSrc}
                  alt={previewImageAlt ?? `Vista previa de ${title}`}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="relative h-64 md:h-80 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,207,207,0.05), transparent 70%)',
                  }}
                />
                <div className="relative z-10 text-center">
                  <Icon size={40} className="text-[#0dcfcf]/20 mx-auto mb-3" />
                  <p className="text-xs text-white/20 uppercase tracking-widest">
                    Imagen NB2 — próximamente
                  </p>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#080808] to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Problem ───────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionGrid eyebrow="El problema" title={problem.title}>
            <p className="text-white/45 text-base leading-relaxed mb-8">{problem.description}</p>
            <div className="space-y-3">
              {problem.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </SectionGrid>
        </div>
      </section>

      {/* ── Solution ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionGrid eyebrow="La solución" title={solution.title}>
            <div className="relative rounded-2xl border border-[#0dcfcf]/15 bg-[#0f0f0f] p-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#0dcfcf]/5 rounded-full blur-3xl pointer-events-none" />
              <p className="text-white/60 text-base leading-relaxed relative z-10">
                {solution.description}
              </p>
            </div>
          </SectionGrid>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionGrid eyebrow="Qué incluye" title="Todo lo que necesitas, nada más.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#0dcfcf]/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0dcfcf]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                      <p className="text-xs text-white/40 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionGrid>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionGrid eyebrow="Cómo funciona" title="El proceso paso a paso.">
            <div className="space-y-3">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-6 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] items-start"
                >
                  <div className="text-3xl font-bold text-[#0dcfcf]/20 font-mono flex-shrink-0 w-10 leading-none pt-0.5">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">{step.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionGrid>
        </div>
      </section>

      {/* ── Benefits + Use Cases ──────────────────────────────────────────────── */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Benefits */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#0dcfcf] font-semibold mb-6">
                Beneficios
              </p>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 p-3.5 rounded-xl border border-[#1a1a1a] bg-[#0f0f0f]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#0dcfcf]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60 leading-relaxed">{b}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#0dcfcf] font-semibold mb-6">
                Casos de uso
              </p>
              <div className="space-y-3">
                {useCases.map((uc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-4 p-3.5 rounded-xl border border-[#1a1a1a] bg-[#0f0f0f]"
                  >
                    <span className="text-[#0dcfcf]/50 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span className="text-sm text-white/55 leading-relaxed">{uc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionGrid eyebrow="Parte del ecosistema" title="Este servicio se conecta con:">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedServices.map((rs, i) => (
                <Link
                  key={i}
                  href={rs.href}
                  className="group p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#0dcfcf]/20 transition-all cursor-pointer"
                >
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#0dcfcf] transition-colors flex items-center gap-1">
                    {rs.title}
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed">{rs.description}</p>
                </Link>
              ))}
            </div>
          </SectionGrid>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionGrid eyebrow="FAQ" title="Preguntas frecuentes">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]"
                >
                  <h3 className="text-sm font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </SectionGrid>
        </div>
      </section>

      <CTASection />
    </>
  );
}
