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

export function ServicePageTemplate({
  eyebrow,
  title,
  subtitle,
  description,
  icon: iconName,
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
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 bg-[#080808] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#0dcfcf]/20 bg-[#0dcfcf]/5"
          >
            <Icon size={13} className="text-[#0dcfcf]" />
            <span className="text-xs font-medium text-[#0dcfcf] tracking-widest uppercase">{eyebrow}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 leading-tight"
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
              href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20este%20servicio"
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

      {/* Problem */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">El problema</p>
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4 leading-tight">{problem.title}</h2>
              <p className="text-white/45 text-sm leading-relaxed">{problem.description}</p>
            </div>
            <div className="space-y-3">
              {problem.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                  </div>
                  <p className="text-sm text-white/50">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-[#0dcfcf]/15 bg-[#0f0f0f] p-8 md:p-12 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0dcfcf]/4 rounded-full blur-3xl pointer-events-none" />
            <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">La solución</p>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4 leading-tight max-w-2xl">{solution.title}</h2>
            <p className="text-white/50 text-base leading-relaxed max-w-2xl">{solution.description}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-3">Qué incluye</p>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-10">Todo lo que necesitas, nada más.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#0dcfcf]/15 transition-colors"
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
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-3">Cómo funciona</p>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-10">El proceso paso a paso.</h2>
          <div className="space-y-4">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]"
              >
                <div className="text-3xl font-bold text-[#0dcfcf]/20 font-mono flex-shrink-0 w-10">{step.step}</div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Use Cases */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">Beneficios</p>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0dcfcf]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/55">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">Casos de uso</p>
              <div className="space-y-3">
                {useCases.map((uc, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-[#1a1a1a]">
                    <span className="text-[#0dcfcf]/40 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span className="text-sm text-white/50">{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-3">Parte del ecosistema</p>
          <h2 className="text-xl font-bold gradient-text mb-8">Este servicio se conecta con:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedServices.map((rs, i) => (
              <Link
                key={i}
                href={rs.href}
                className="group p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#0dcfcf]/20 transition-all"
              >
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#0dcfcf] transition-colors flex items-center gap-1">
                  {rs.title}
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-white/35">{rs.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-3 text-center">FAQ</p>
          <h2 className="text-2xl font-bold gradient-text mb-10 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]"
              >
                <h3 className="text-sm font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
