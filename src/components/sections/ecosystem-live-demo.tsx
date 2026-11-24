'use client';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, Mic, MousePointerClick } from 'lucide-react';
import { LeadDemoForm } from '@/components/ui/lead-demo-form';

const pasos = [
  { icon: MousePointerClick, cuando: 'Ahora', texto: 'Llenas el formulario con tu nombre y tu WhatsApp real.' },
  { icon: MessageCircle, cuando: 'Segundos después', texto: 'Te llega un WhatsApp personalizado que sí leyó lo que escribiste.' },
  { icon: Mic, cuando: 'Enseguida', texto: 'Recibes una nota de voz con tu nombre, hecha solo para ti.' },
  { icon: Bell, cuando: 'Al mismo tiempo', texto: 'Nuestro equipo recibe el aviso con tus datos, listo para darte seguimiento.' },
];

export function EcosystemLiveDemo() {
  return (
    <section id="pruebalo" className="section-padding relative bg-[#080808] overflow-hidden scroll-mt-20">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[#0dcfcf]/[0.06] blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="eyebrow text-[#0dcfcf] mb-4"
            >
              Pruébalo en vivo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-heading gradient-text mb-4"
            >
              No te lo contamos: vívelo en 30 segundos.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/45 max-w-xl text-base leading-relaxed mb-10"
            >
              Llena este formulario como si fueras uno de tus clientes. Lo que pasa después es exactamente lo que el
              Ecosistema Delta Kilo hace por tu negocio, todos los días.
            </motion.p>

            <ol className="relative space-y-6">
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#0dcfcf]/50 via-[#0dcfcf]/20 to-transparent" />
              {pasos.map((p, i) => (
                <motion.li
                  key={p.cuando}
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="relative flex gap-4"
                >
                  <span className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border border-[#0dcfcf]/40 bg-[#0a1414]
                                   text-[#0dcfcf] flex items-center justify-center">
                    <p.icon size={18} />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-[#0dcfcf]/70">{p.cuando}</p>
                    <p className="text-sm text-white/75 leading-relaxed mt-1">{p.texto}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative bg-[#0f0f0f] border border-[#0dcfcf]/20 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#0dcfcf]/60 to-transparent" />
              <div className="mb-7 pb-5 border-b border-white/[0.06] flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Demostración en vivo</h3>
                  <p className="text-xs text-white/35">Usa tu WhatsApp real: ahí vas a recibir la respuesta.</p>
                </div>
                <span className="flex items-center gap-1.5 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sistema activo
                </span>
              </div>
              <LeadDemoForm
                source="demo-ecosistema"
                accent="teal"
                submitLabel="Activar la demostración"
                messageLabel="Cuéntanos de tu negocio"
                messagePlaceholder="Ej. Tengo una clínica dental y se me pierden mensajes de WhatsApp…"
                successTitle="¡Listo, ya está en marcha!"
                successText="Revisa tu WhatsApp: en unos segundos te llegan un mensaje y una nota de voz con tu nombre."
                footnote="Sin compromiso · Usamos tus datos solo para responderte"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
