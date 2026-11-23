'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { VerticalVideoCard } from '@/components/ui/vertical-video-card';
import { PORTAFOLIO_DESTACADOS, videoPorSlug } from '@/lib/portafolio';

export function EcosystemPortafolio() {
  const videos = PORTAFOLIO_DESTACADOS.map(videoPorSlug).filter((v) => v !== undefined);

  return (
    <section id="portafolio" className="section-padding relative bg-[#080808] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="eyebrow text-[#0dcfcf] mb-4"
            >
              Lo que producimos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-heading gradient-text mb-4"
            >
              Videos con calidad de agencia, para cualquier giro.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/45 text-base leading-relaxed"
            >
              Bienes raíces, autos, clínicas, historias en 3D… Estos son algunos ejemplos de lo que tu marca puede publicar.
            </motion.p>
          </div>
          <Link
            href="/portafolio"
            className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-[#0dcfcf]/40 px-5 py-3 text-sm font-semibold
                       text-[#0dcfcf] hover:bg-[#0dcfcf]/10 transition-colors shrink-0"
          >
            Ver portafolio completo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
          {videos.map((v) => (
            <VerticalVideoCard key={v.slug} video={v} />
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-2 rounded-xl border border-[#0dcfcf]/40 px-5 py-3 text-sm font-semibold
                       text-[#0dcfcf] hover:bg-[#0dcfcf]/10 transition-colors"
          >
            Ver portafolio completo <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
