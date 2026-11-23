'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const SISTEMA_VIDEO = {
  src: '/videos/sistema-dk.mp4',
  poster: '/videos/sistema-dk-poster.jpg',
  duration: 'PT1M19S',
};

const pasos = [
  { titulo: 'Formularios', texto: 'Alguien llena el formulario de tu página: tu gerente recibe la alerta y el prospecto, un WhatsApp de bienvenida.' },
  { titulo: 'Comentarios', texto: 'Un agente de IA responde los comentarios de tus publicaciones, con información correcta y en el tono de tu marca.' },
  { titulo: 'WhatsApp 24/7', texto: 'A las 2 de la mañana llega un mensaje: el agente lo atiende y resuelve sus dudas.' },
  { titulo: 'Seguimiento', texto: 'Si alguien dejó de responder hace tres días, el agente retoma la conversación.' },
  { titulo: 'Citas', texto: 'La cita entra a tu calendario, avisa a los involucrados y manda recordatorios.' },
  { titulo: 'Programación', texto: 'Tu contenido se programa solo, en todas tus redes.' },
  { titulo: 'Contenido', texto: 'Un creador de contenido produce las piezas de tu marca cada semana.' },
];

export function EcosystemVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.play().catch(() => setPlaying(false));
  };

  return (
    <section id="como-funciona" className="section-padding relative bg-[#0a0a0a] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-12 lg:gap-20 items-center">

          {/* Video en marco de teléfono */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-[#0dcfcf]/10 blur-3xl pointer-events-none" />
            <div className="relative rounded-[2rem] border border-white/10 bg-black p-2 shadow-2xl shadow-black/60">
              <div className="relative overflow-hidden rounded-[1.5rem] aspect-[9/16] bg-black">
                <video
                  ref={videoRef}
                  src={SISTEMA_VIDEO.src}
                  poster={SISTEMA_VIDEO.poster}
                  preload="none"
                  playsInline
                  controls={playing}
                  onPause={(e) => { if (e.currentTarget.ended) setPlaying(false); }}
                  onEnded={() => setPlaying(false)}
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="Video: 7 cosas que pasan solas en tu negocio con el Ecosistema DK"
                />
                {!playing && (
                  <button
                    type="button"
                    onClick={play}
                    aria-label="Reproducir video de 1 minuto 19 segundos"
                    className="absolute inset-0 flex flex-col items-center justify-end pb-16 group"
                  >
                    <span className="w-16 h-16 rounded-full bg-[#0dcfcf] text-black flex items-center justify-center
                                     shadow-lg shadow-[#0dcfcf]/30 transition-transform duration-200 group-hover:scale-110">
                      <Play size={26} className="ml-1" fill="currentColor" />
                    </span>
                    <span className="mt-3 text-xs font-medium text-white/80 tracking-wide">Ver en 1:19 · con audio</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Texto */}
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="eyebrow text-[#0dcfcf] mb-4"
            >
              Así funciona, en 80 segundos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-heading gradient-text mb-4"
            >
              7 cosas que pasan solas en tu negocio.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/45 max-w-xl text-base leading-relaxed mb-8"
            >
              Mientras el sistema atiende, da seguimiento y publica, tú decides lo importante: qué contenido funciona,
              qué promoción lanzar, dónde se atoran tus prospectos y dónde conviene invertir en pauta.
            </motion.p>

            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {pasos.map((p, i) => (
                <motion.li
                  key={p.titulo}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="flex gap-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[#0dcfcf]/40 bg-[#0dcfcf]/10
                                   text-[#0dcfcf] text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{p.titulo}</p>
                    <p className="text-sm text-white/50 leading-relaxed mt-0.5">{p.texto}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
