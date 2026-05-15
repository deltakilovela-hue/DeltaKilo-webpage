'use client';

import { ReactLenis } from 'lenis/dist/lenis-react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const SECTION_HEIGHT = 1500;

/* ─────────────────────────────────────────────
   CENTER IMAGE — parallax clip+zoom on scroll
───────────────────────────────────────────── */
const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          'url(https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06bd73ea36308bcf743fdc.png)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Hero text — visible only when image is still centered */}
      <motion.div
        style={{ opacity: useTransform(scrollY, [0, 400], [1, 0]) }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center"
      >
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37]/80">
          Páginas web conectadas a ventas
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.04] tracking-tight text-white max-w-3xl">
          Páginas que{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%)',
            }}
          >
            generan clientes,
          </span>
          <br />
          no solo visitas.
        </h1>

        <p className="max-w-md text-sm sm:text-base text-white/55 leading-relaxed">
          Sitios profesionales, rápidos y conectados a tu proceso comercial.
          Diseñados para convertir visitantes en contactos reales.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="https://wa.me/5215663864984?text=Hola,%20quiero%20una%20página%20web%20profesional"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl
                       bg-[#D4AF37] text-[#0e0e0e] hover:bg-[#E5C158] transition-all group"
          >
            Quiero mi página web
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#que-incluye"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium rounded-xl
                       border border-white/15 text-white/60 hover:border-white/30 hover:text-white transition-all"
          >
            Ver cómo funciona ↓
          </a>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/25">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   PARALLAX IMG
───────────────────────────────────────────── */
interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
  label?: string;
}

const ParallaxImg = ({ className, alt, src, start, end, label }: ParallaxImgProps) => {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <div className={`${className} relative group`}>
      <motion.img
        src={src}
        alt={alt}
        ref={ref}
        className="w-full rounded-2xl shadow-2xl shadow-black/60 border border-white/[0.06]"
        style={{ transform, opacity }}
      />
      {label && (
        <motion.div
          style={{ opacity }}
          className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full
                     bg-black/70 backdrop-blur-sm border border-[#D4AF37]/25
                     text-[10px] uppercase tracking-widest text-[#D4AF37]/70 font-semibold"
        >
          {label}
        </motion.div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   PARALLAX IMAGES GRID
───────────────────────────────────────────── */
const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-8 pt-[620px] space-y-32">
      {/* Row 1 — left-aligned, medium */}
      <ParallaxImg
        src="https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06bd732e98e28fa1ecb88e.png"
        alt="Diseño de landing page moderno"
        start={-120}
        end={120}
        className="w-5/12"
        label="Landing page"
      />
      {/* Row 2 — center, large */}
      <ParallaxImg
        src="https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06bd73937389dca039a79e.png"
        alt="Sitio web para negocio profesional"
        start={150}
        end={-150}
        className="mx-auto w-3/4"
        label="Sitio profesional"
      />
      {/* Row 3 — right-aligned, medium */}
      <ParallaxImg
        src="https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06bd732e98e28fa1ecb88d.png"
        alt="Diseño web responsive en pantalla"
        start={-120}
        end={120}
        className="ml-auto w-5/12"
        label="Diseño responsive"
      />
      {/* Row 4 — slightly left-offset, medium */}
      <ParallaxImg
        src="https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a06bd73937389dca039a79d.png"
        alt="Dashboard y métricas web"
        start={80}
        end={-200}
        className="ml-16 w-1/2"
        label="Conectada a métricas"
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   BOTTOM — qué tipo de página creamos
───────────────────────────────────────────── */
interface PageTypeItemProps {
  title: string;
  category: string;
  forWho: string;
}

const PageTypeItem = ({ title, category, forWho }: PageTypeItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2
                 border-b border-white/[0.06] px-3 pb-10
                 group hover:border-[#D4AF37]/20 transition-colors duration-300"
    >
      <div>
        <p className="mb-1.5 text-xl sm:text-2xl text-white group-hover:text-[#D4AF37] transition-colors">{title}</p>
        <p className="text-xs uppercase text-white/25 tracking-widest">{category}</p>
      </div>
      <div className="flex items-center gap-1.5 sm:text-end text-xs uppercase text-white/25 tracking-wider">
        <p>{forWho}</p>
        <MapPin size={12} className="text-[#D4AF37]/30 flex-shrink-0" />
      </div>
    </motion.div>
  );
};

const PageTypesSection = () => {
  return (
    <section
      id="que-incluye"
      className="mx-auto max-w-5xl px-6 sm:px-8 py-32 text-white"
    >
      <motion.h2
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
        className="mb-4 text-4xl sm:text-5xl font-black uppercase text-white"
      >
        Páginas que{' '}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(135deg, #D4AF37 0%, #f0d060 100%)',
          }}
        >
          construimos
        </span>
      </motion.h2>
      <motion.p
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75, delay: 0.1 }}
        className="mb-16 text-white/40 text-base max-w-lg leading-relaxed"
      >
        Cada negocio tiene un objetivo diferente. Diseñamos según el tuyo.
      </motion.p>

      <PageTypeItem title="Landing Page" category="Captación de leads" forWho="Negocios en crecimiento" />
      <PageTypeItem title="Sitio Institucional" category="Presencia y confianza" forWho="Empresas y marcas" />
      <PageTypeItem title="Página de Servicios" category="Conversión directa" forWho="Consultores y agencias" />
      <PageTypeItem title="Catálogo de Productos" category="Ventas y cotizaciones" forWho="Tiendas y distribuidoras" />
      <PageTypeItem title="Sitio para Restaurante" category="Reservas y menú digital" forWho="Gastronomía y eventos" />
      <PageTypeItem title="Perfil Profesional" category="Credibilidad y contacto" forWho="Médicos, abogados, coaches" />
      <PageTypeItem title="Funnel de Captación" category="Lead magnet + CRM" forWho="Negocios con estrategia digital" />

      {/* CTA final dentro de la sección */}
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
        className="mt-20 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-xl
                     bg-[#D4AF37] text-[#0e0e0e] hover:bg-[#E5C158] transition-all group"
        >
          Quiero una propuesta
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="https://wa.me/5215663864984?text=Hola,%20me%20interesa%20una%20página%20web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/35 hover:text-[#D4AF37] transition-colors underline underline-offset-4"
        >
          Hablar por WhatsApp
        </a>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   HERO SECTION CONTAINER
───────────────────────────────────────────── */
const HeroParallax = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-[#080808]/0 to-[#080808]" />
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export const PaginasWebScrollHero = () => {
  return (
    <ReactLenis root>
      <div className="bg-[#080808]">
        <HeroParallax />
        <PageTypesSection />
      </div>
    </ReactLenis>
  );
};
