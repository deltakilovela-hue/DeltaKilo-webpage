'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      ref={ref}
      className="relative bg-[#080808] border-t border-white/5 overflow-hidden"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Subtle ambient glow top */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(13,207,207,0.25), transparent)' }}
      />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#0dcfcf] font-semibold mb-3">
              Nuestra historia
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold gradient-text leading-[1.15]">
              De la idea al sistema.
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm sm:text-right">
            10 escenas · 56 segundos · El camino completo de Delta Kilo.
          </p>
        </motion.div>
      </div>

      {/* Timeline player */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        {/* Aspect-ratio container: 16:9 */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#0dcfcf]/10 shadow-[0_0_80px_rgba(13,207,207,0.05)]"
          style={{ paddingBottom: '56.25%' /* 16:9 */ }}
        >
          {/* Loading shimmer */}
          {!loaded && (
            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#0dcfcf]/30 border-t-[#0dcfcf]"
                  style={{ animation: 'spin 1s linear infinite' }}
                />
                <p className="text-[11px] uppercase tracking-widest text-white/25">
                  Cargando timeline…
                </p>
              </div>
            </div>
          )}

          {/* Iframe — fills the padded container absolutely */}
          {isInView && (
            <iframe
              src="/timeline/index.html"
              title="Delta Kilo — Historia animada"
              allow="autoplay"
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 w-full h-full border-0"
              style={{ display: 'block' }}
            />
          )}

          {/* Corner label */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">
              Historia
            </span>
          </div>
        </div>

        {/* Caption below player */}
        <p className="mt-4 text-center text-xs text-white/25 tracking-wide">
          Usa <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-mono text-[10px]">Space</kbd> para reproducir · <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-mono text-[10px]">← →</kbd> para navegar
        </p>
      </motion.div>

      {/* Spin keyframe injected globally */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
