'use client';
import { motion } from 'framer-motion';
import { Users, ImagePlay, LineChart, Megaphone, CheckCircle2 } from 'lucide-react';

const cards = [
  {
    label: 'Leads & CRM',
    agent: 'Lima',
    desc: 'Cuántos leads entraron y en qué etapa de tu pipeline están, en vivo.',
    icon: Users,
  },
  {
    label: 'Contenido',
    agent: 'AKBOT · Vox',
    desc: 'Lo que ya publicamos y lo que sigue programado: videos, stories, carruseles y blog.',
    icon: ImagePlay,
  },
  {
    label: 'SEO y presencia',
    agent: 'Sierra',
    desc: 'El score de tu sitio, tu ficha de Google Maps y tu engagement en redes.',
    icon: LineChart,
  },
  {
    label: 'Pauta',
    agent: 'Tango',
    desc: 'Tu plan de inversión en marketing digital y, cuando esté activa, tu campaña en vivo.',
    icon: Megaphone,
  },
];

export function EcosystemPortal() {
  return (
    <section className="section-padding relative bg-[#0a0a0a] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="eyebrow text-[#D4AF37] mb-4"
            >
              Sin sorpresas, sin reportes de PDF
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-heading gradient-text-gold mb-5"
            >
              Tu propio portal para ver al equipo trabajar.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/45 text-base leading-relaxed mb-8"
            >
              Cada cliente entra con su propia cuenta y ve, en tiempo real, lo que cada agente está haciendo por su negocio — no un correo mensual, no una llamada para preguntar &ldquo;¿cómo vamos?&rdquo;.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {[
                'Acceso con tu propia cuenta, solo tu negocio',
                'Datos conectados directo a tu CRM y tus redes',
                'Historial de cada mejora, no solo la foto de hoy',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <CheckCircle2 size={16} className="text-[#0dcfcf] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-[#1e1e1e] bg-[#111111] p-5 flex flex-col gap-3 card-lift"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/8 border border-[#D4AF37]/20 flex items-center justify-center">
                      <Icon size={18} strokeWidth={1.5} className="text-[#D4AF37]" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                      {card.agent}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{card.label}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
