'use client';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/ui/marquee';

// Piezas reales publicadas por AKBOT/Vox — portadas de blog de blog.deltakilo.com.mx
const pieces = [
  { title: 'Negocio ordenado sin estar encima de todo', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/24bd4847-fdc3-4876-a887-ab04af223d05.png' },
  { title: 'Cómo pedir reseñas de Google sin forzar', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/02cc06ad-1fb4-45ef-8a08-290fddcae39b.png' },
  { title: 'El costo de responder tarde a clientes', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/3ef6a6e6-0a13-4f3c-a9ea-c865d681240b.png' },
  { title: 'Recordatorios automáticos en clínicas', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/8c461d6b-10df-467a-a22a-241675189ee8.png' },
  { title: 'Meta Business Agent en WhatsApp', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/fa4e2088-8a4b-418d-81ee-07c69ae1c9c8.png' },
  { title: 'Catálogo por WhatsApp en mueblerías', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/78f6e887-555e-4c2b-84db-92c0351cf162.png' },
  { title: 'Noticias de IA para negocios — semana 1', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/9506b2a6-a1d2-4053-9db7-e98b6315ed20.png' },
  { title: 'Noticias de IA para negocios — semana 2', img: 'https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/8c29a927-e1c9-4d11-ab97-c69ddbe8a574.png' },
];

export function EcosystemContentMarquee() {
  return (
    <section className="relative bg-[#0a0a0a] py-16 sm:py-20 overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center mb-10">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="eyebrow text-[#0dcfcf] mb-4"
        >
          Trabajo real, no una maqueta
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-heading gradient-text"
        >
          Esto ya lo publicó AKBOT y Vox.
        </motion.h2>
      </div>

      <Marquee repeat={2} pauseOnHover className="[--duration:45s]">
        {pieces.map((piece) => (
          <div key={piece.title} className="w-[200px] flex-shrink-0 rounded-xl overflow-hidden border border-white/10 bg-[#111111]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={piece.img} alt={piece.title} className="w-full aspect-[4/5] object-cover" />
            <p className="text-[11px] text-white/45 px-3 py-2.5 leading-snug line-clamp-2">{piece.title}</p>
          </div>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
    </section>
  );
}
