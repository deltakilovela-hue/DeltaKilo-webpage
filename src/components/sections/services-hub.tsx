'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe, Zap, Bot, Users, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

const services = [
  {
    icon: Globe,
    title: 'Páginas Web',
    description: 'Sitios modernos, rápidos y diseñados para convertir. Tu primera impresión digital que trabaja 24/7.',
    href: '/servicios/paginas-web',
    tag: 'Presencia digital',
    number: '01',
    img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06a692dbe569a25d249a7e.png',
  },
  {
    icon: Zap,
    title: 'Funnels Automáticos',
    description: 'Flujos de captación que trabajan solos. Leads calificados que llegan a tu CRM sin intervención manual.',
    href: '/servicios/funnels',
    tag: 'Captación',
    number: '02',
    img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06a692ea36308bcf739e10.png',
  },
  {
    icon: Bot,
    title: 'Asistentes de IA',
    description: 'Atención 24/7 sin contratar personal. Tu asistente que atiende, califica y escala al vendedor correcto.',
    href: '/servicios/asistentes-ia',
    tag: 'IA',
    number: '03',
    img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06a692ea36308bcf739e0f.png',
  },
  {
    icon: Users,
    title: 'CRM',
    description: 'Centraliza clientes, seguimientos y oportunidades. Control total de tu pipeline con métricas en tiempo real.',
    href: '/servicios/crm',
    tag: 'Gestión',
    number: '04',
    img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06a6920a69f1e7664a8eae.png',
  },
  {
    icon: MapPin,
    title: 'Google Maps',
    description: 'Posiciona tu negocio en el top 3 local. Más reseñas, más visibilidad y más llamadas de tu zona.',
    href: '/servicios/google-maps',
    tag: 'Local SEO',
    number: '05',
    img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06a692ff331dd879111de9.png',
  },
  {
    icon: Phone,
    title: 'Gestión de Llamadas',
    description: 'Centraliza llamadas, WhatsApp y mensajes. Cero leads perdidos. Todo registrado y asignado.',
    href: '/servicios/gestion-llamadas',
    tag: 'Comunicación',
    number: '06',
    img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06a692937389dca0345744.png',
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

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 md:mb-16">
          <div className="text-center md:text-left">
            <BlurFade delay={0} inView>
              <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full
                              bg-[#D4AF37]/8 border border-[#D4AF37]/20">
                <AnimatedShinyText
                  shimmerWidth={160}
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37]/80"
                >
                  El ecosistema Delta Kilo
                </AnimatedShinyText>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
                No son herramientas aisladas.<br className="hidden md:block" />
                Es un sistema que trabaja junto.
              </h2>
            </BlurFade>
          </div>
          <BlurFade delay={0.2} inView className="flex-shrink-0">
            <p className="text-white/40 max-w-xs text-sm sm:text-base leading-relaxed text-center md:text-left mx-auto md:mx-0">
              Cada pieza conecta con las demás. El resultado: un negocio que escala sin caos.
            </p>
          </BlurFade>
        </div>

        {/* Grid — premium cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <BlurFade key={service.href} delay={i * 0.09} inView>
              <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
                <Link
                  href={service.href}
                  className="group relative flex flex-col h-full rounded-3xl overflow-hidden
                             bg-[#111111] border border-white/[0.06]
                             hover:border-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/[0.06]
                             transition-all duration-500"
                >
                  {/* Image with parallax hover */}
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#111111]" />
                    {/* Gold hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 group-hover:from-[#D4AF37]/8 to-transparent transition-all duration-500" />
                    {/* Tag */}
                    <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-[#D4AF37]/70 font-semibold bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                      {service.tag}
                    </span>
                    {/* Number watermark */}
                    <span className="absolute bottom-4 left-5 text-[3rem] font-black text-white/[0.06] font-mono leading-none select-none">
                      {service.number}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Icon + arrow */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/8 border border-[#D4AF37]/15
                                        flex items-center justify-center
                                        group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/30
                                        transition-all duration-300">
                          <Icon size={20} className="text-[#D4AF37]" />
                        </div>
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: '0 0 24px rgba(212,175,55,0.2)' }} />
                      </div>
                      <ArrowUpRight size={15}
                        className="text-white/10 group-hover:text-[#D4AF37]/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/20 group-hover:text-[#D4AF37] transition-colors duration-300 mt-6 pt-4 border-t border-white/5 group-hover:border-[#D4AF37]/10">
                      <span>Ver servicio</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-12 pt-8 border-t border-white/5"
        >
          <p className="text-sm text-white/25">
            Cada servicio tiene su propia página con casos de uso, proceso y FAQ.
          </p>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors group"
          >
            Ver todos
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
