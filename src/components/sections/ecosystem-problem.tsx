'use client';
import { motion } from 'framer-motion';

const pairs = [
  {
    problema: 'Publicas cuando te acuerdas, no cuando toca.',
    resuelve: 'Contenido diseñado y publicado cada semana, sin que lo pienses.',
    agente: 'Echo + AKBOT',
  },
  {
    problema: 'Los mensajes de WhatsApp se pierden entre chats personales.',
    resuelve: 'Cada lead respondido y agendado, día y noche.',
    agente: 'Lima',
  },
  {
    problema: 'No sabes si apareces en Google ni qué dice tu ficha de Maps.',
    resuelve: 'Tu presencia revisada y corregida, mes tras mes.',
    agente: 'Sierra',
  },
  {
    problema: 'Le metes dinero a anuncios sin saber qué está funcionando.',
    resuelve: 'Campañas armadas, medidas y ajustadas cada mes.',
    agente: 'Tango',
  },
  {
    problema: 'Tu marca se ve distinta en cada publicación.',
    resuelve: 'Diseño consistente con tu identidad, en cada pieza.',
    agente: 'Echo',
  },
  {
    problema: 'No tienes forma de ver qué se hizo por tu negocio este mes.',
    resuelve: 'Tu portal, actualizado en tiempo real — sin pedir reportes.',
    agente: 'Portal de cliente',
  },
];

export function EcosystemProblem() {
  return (
    <section className="section-padding relative bg-[#080808] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14 lg:mb-20">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="eyebrow text-[#0dcfcf] mb-4"
          >
            El problema real
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-heading gradient-text mb-4"
          >
            Esto es lo que te está costando<br className="hidden sm:block" /> cada mes que sigues igual.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-lg mx-auto text-base leading-relaxed"
          >
            No son problemas que se arreglan una vez — son problemas que vuelven cada mes si nadie los atiende. Esto es lo que nuestro sistema resuelve, todos los meses, sin que tengas que acordarte.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.problema}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card card-glow card-lift rounded-2xl p-6 flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400/70">El problema</span>
                <p className="text-sm text-white/55 leading-relaxed mt-1.5 line-through decoration-white/20">
                  {pair.problema}
                </p>
              </div>
              <div className="h-px bg-white/8" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0dcfcf]">Lo resolvemos cada mes</span>
                <p className="text-sm text-white/90 leading-relaxed mt-1.5 font-medium">
                  {pair.resuelve}
                </p>
              </div>
              <span className="text-[11px] uppercase tracking-wide text-[#0dcfcf]/60 mt-auto pt-1">
                {pair.agente}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
