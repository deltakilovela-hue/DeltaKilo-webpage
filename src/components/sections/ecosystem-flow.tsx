'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe, Zap, Bot, Users, MapPin, Phone, ArrowRight } from 'lucide-react';

const nodes = [
  { icon: Globe,  label: 'Web',        color: '#0dcfcf', href: '/servicios/paginas-web',      desc: 'Atrae tráfico' },
  { icon: Zap,    label: 'Funnels',    color: '#0dcfcf', href: '/servicios/funnels',           desc: 'Convierte' },
  { icon: Bot,    label: 'IA',         color: '#0dcfcf', href: '/servicios/asistentes-ia',     desc: 'Atiende 24/7' },
  { icon: Users,  label: 'CRM',        color: '#0dcfcf', href: '/servicios/crm',               desc: 'Gestiona' },
  { icon: Phone,  label: 'Llamadas',   color: '#0dcfcf', href: '/servicios/gestion-llamadas',  desc: 'Retiene' },
  { icon: MapPin, label: 'Maps',       color: '#0dcfcf', href: '/servicios/google-maps',       desc: 'Posiciona' },
];

const flow = [
  { from: 0, to: 1, label: 'Tráfico' },
  { from: 1, to: 2, label: 'Leads' },
  { from: 2, to: 3, label: 'Califica' },
  { from: 3, to: 4, label: 'Sigue' },
  { from: 5, to: 0, label: 'Descubrimiento' },
];

export function EcosystemFlow() {
  return (
    <section className="section-padding relative bg-[#080808] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(13,207,207,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4"
          >
            El sistema conectado
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold gradient-text mb-4 leading-tight"
          >
            No son 6 servicios.<br />Es un sistema con 6 dimensiones.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-lg mx-auto text-base leading-relaxed"
          >
            La web trae tráfico → el funnel lo convierte → la IA lo atiende → el CRM lo gestiona → las llamadas lo retienen → Maps trae más.
          </motion.p>
        </div>

        {/* Flow diagram — desktop: horizontal track */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-between gap-0">
            {/* Connector line */}
            <div className="absolute top-10 left-[8%] right-[8%] h-px">
              <motion.div
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
                className="h-full origin-left"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(13,207,207,0.3), rgba(13,207,207,0.5), rgba(13,207,207,0.3), transparent)' }}
              />
              {/* Animated dot travelling the line */}
              <motion.div
                animate={{ x: ['0%', '100%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1.5 }}
                className="absolute top-[-3px] w-1.5 h-1.5 rounded-full bg-[#0dcfcf] shadow-[0_0_8px_rgba(13,207,207,0.8)]"
              />
            </div>

            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex flex-col items-center gap-3 flex-1 relative z-10"
                >
                  <Link href={node.href} className="group flex flex-col items-center gap-3">
                    {/* Node circle */}
                    <div className="w-20 h-20 rounded-full bg-[#0d0d0d] border border-[#1e1e1e] flex items-center justify-center group-hover:border-[#0dcfcf]/30 group-hover:bg-[#0f0f0f] transition-all duration-300 shadow-[0_0_0_4px_rgba(13,207,207,0.03)] group-hover:shadow-[0_0_0_4px_rgba(13,207,207,0.08),0_0_20px_rgba(13,207,207,0.12)]">
                      <Icon size={22} className="text-[#0dcfcf]" />
                    </div>
                    {/* Label */}
                    <div className="text-center">
                      <div className="text-sm font-semibold text-white group-hover:text-[#0dcfcf] transition-colors">{node.label}</div>
                      <div className="text-[11px] text-white/30 mt-0.5">{node.desc}</div>
                    </div>
                  </Link>

                  {/* Step number */}
                  <div className="text-[10px] font-bold text-[#0dcfcf]/20 font-mono">0{i+1}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: grid */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={node.href}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] card-glow text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0dcfcf]/10 flex items-center justify-center group-hover:bg-[#0dcfcf]/15 transition-colors">
                    <Icon size={18} className="text-[#0dcfcf]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#0dcfcf] transition-colors">{node.label}</div>
                    <div className="text-[11px] text-white/30 mt-0.5">{node.desc}</div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0dcfcf]/60 hover:text-[#0dcfcf] transition-colors group"
          >
            Ver todos los servicios en detalle
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
