'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe, Zap, Bot, Users, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Páginas Web',
    description: 'Sitios modernos, rápidos y diseñados para convertir. Tu primera impresión digital que trabaja 24/7.',
    href: '/servicios/paginas-web',
    tag: 'Presencia digital',
    number: '01',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=70&auto=format&fit=crop',
  },
  {
    icon: Zap,
    title: 'Funnels Automáticos',
    description: 'Flujos de captación que trabajan solos. Leads calificados que llegan a tu CRM sin intervención manual.',
    href: '/servicios/funnels',
    tag: 'Captación',
    number: '02',
    img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=70&auto=format&fit=crop',
  },
  {
    icon: Bot,
    title: 'Asistentes de IA',
    description: 'Atención 24/7 sin contratar personal. Tu asistente que atiende, califica y escala al vendedor correcto.',
    href: '/servicios/asistentes-ia',
    tag: 'IA',
    number: '03',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=70&auto=format&fit=crop',
  },
  {
    icon: Users,
    title: 'CRM',
    description: 'Centraliza clientes, seguimientos y oportunidades. Control total de tu pipeline con métricas en tiempo real.',
    href: '/servicios/crm',
    tag: 'Gestión',
    number: '04',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=70&auto=format&fit=crop',
  },
  {
    icon: MapPin,
    title: 'Google Maps',
    description: 'Posiciona tu negocio en el top 3 local. Más reseñas, más visibilidad y más llamadas de tu zona.',
    href: '/servicios/google-maps',
    tag: 'Local SEO',
    number: '05',
    img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=70&auto=format&fit=crop',
  },
  {
    icon: Phone,
    title: 'Gestión de Llamadas',
    description: 'Centraliza llamadas, WhatsApp y mensajes. Cero leads perdidos. Todo registrado y asignado.',
    href: '/servicios/gestion-llamadas',
    tag: 'Comunicación',
    number: '06',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=70&auto=format&fit=crop',
  },
];

export function ServicesHub() {
  return (
    <section id="servicios" className="section-padding relative bg-[#080808] overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(13,207,207,0.03) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-3"
            >
              El ecosistema Delta Kilo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gradient-text leading-tight"
            >
              No son herramientas aisladas.<br className="hidden md:block" />
              Es un sistema que trabaja junto.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/35 max-w-xs text-sm leading-relaxed flex-shrink-0"
          >
            Cada pieza conecta con las demás. El resultado: un negocio que escala sin caos.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={service.href}
                  className="group relative flex flex-col h-full rounded-2xl glass-card transition-all duration-300 overflow-hidden"
                >
                  {/* Service image strip */}
                  <div className="relative h-36 overflow-hidden flex-shrink-0">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/20 via-[#080808]/40 to-[#111]/90" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0dcfcf]/0 group-hover:from-[#0dcfcf]/5 to-transparent transition-all duration-500" />
                    {/* Tag on image */}
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest text-white/50 font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                      {service.tag}
                    </span>
                    {/* Number on image */}
                    <span className="absolute bottom-3 left-4 text-[2.5rem] font-black text-white/[0.07] font-mono leading-none select-none">
                      {service.number}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col flex-1 p-5">
                  {/* Top row: icon + tag */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-[#0dcfcf]/8 border border-[#0dcfcf]/10 flex items-center justify-center group-hover:bg-[#0dcfcf]/12 group-hover:border-[#0dcfcf]/20 transition-all duration-300">
                        <Icon size={18} className="text-[#0dcfcf]" />
                      </div>
                      {/* Icon glow */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: '0 0 20px rgba(13,207,207,0.25)', background: 'rgba(13,207,207,0.05)' }}
                      />
                    </div>
                    <ArrowUpRight size={14} className="text-white/10 group-hover:text-[#0dcfcf]/50 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1">
                    <h3 className="text-base font-semibold text-white mb-2.5 group-hover:text-[#0dcfcf] transition-colors duration-300 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* CTA link */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white/25 group-hover:text-[#0dcfcf] transition-colors duration-300 mt-auto">
                      <span>Ver servicio</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Bottom shimmer line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-border" />
                  </div>{/* end card content */}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-8 pt-8 border-t border-white/5"
        >
          <p className="text-sm text-white/25">
            Cada servicio tiene su propia página con casos de uso, proceso y FAQ.
          </p>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0dcfcf]/50 hover:text-[#0dcfcf] transition-colors group"
          >
            Ver todos
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
