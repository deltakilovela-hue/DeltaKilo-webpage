'use client';
import { motion } from 'framer-motion';
import { Palette, Film, Newspaper, MessageCircle, Search, Target } from 'lucide-react';

const squad = [
  {
    callsign: 'Echo',
    role: 'Diseño',
    desc: 'Crea cada pieza visual de tu marca — gráficos, imagen de blog, mockups — con tu identidad real, no una plantilla genérica.',
    icon: Palette,
  },
  {
    callsign: 'Vox',
    role: 'Video',
    desc: 'Escribe, narra y anima tus videos cortos de principio a fin, sin que tengas que grabar ni editar nada.',
    icon: Film,
  },
  {
    callsign: 'AKBOT',
    role: 'Contenido',
    desc: 'Publica tu blog y tus redes cada semana, con la voz de tu marca, sin que se te olvide ni un día.',
    icon: Newspaper,
  },
  {
    callsign: 'Lima',
    role: 'Leads & CRM',
    desc: 'Responde tu WhatsApp, clasifica cada prospecto y lo agenda directo en tu CRM, a cualquier hora.',
    icon: MessageCircle,
  },
  {
    callsign: 'Sierra',
    role: 'SEO y presencia',
    desc: 'Vigila tu sitio, tu ficha de Google Maps y tus redes, y corrige lo que te está restando visibilidad.',
    icon: Search,
  },
  {
    callsign: 'Tango',
    role: 'Pauta',
    desc: 'Diseña y opera tu inversión en Meta, Google y TikTok con un solo objetivo: bajar tu costo por cliente.',
    icon: Target,
  },
];

export function EcosystemTeam() {
  return (
    <section className="section-padding relative bg-[#080808] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14 lg:mb-20">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="eyebrow text-[#0dcfcf] mb-4"
          >
            El escuadrón
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-heading gradient-text mb-4"
          >
            Seis especialistas de IA,<br className="hidden sm:block" />trabajando en tu negocio todos los días.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-lg mx-auto text-base leading-relaxed"
          >
            Cada uno tiene una función clara. Juntos cubren diseño, video, contenido, ventas y posicionamiento — sin que tengas que contratar ni coordinar a nadie.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {squad.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.callsign}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card card-glow card-lift rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#0dcfcf]/8 border border-[#0dcfcf]/15 flex items-center justify-center">
                    <Icon size={20} strokeWidth={1.5} className="text-[#0dcfcf]" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                    Agente 0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{agent.callsign}</h3>
                  <p className="text-xs uppercase tracking-wide text-[#0dcfcf]/70 mt-0.5">{agent.role}</p>
                </div>
                <p className="text-sm text-white/45 leading-relaxed">{agent.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
