'use client';
import { motion } from 'framer-motion';

const problems = [
  {
    icon: '📲',
    problem: 'Tus leads llegan pero nadie les da seguimiento a tiempo.',
  },
  {
    icon: '🗂️',
    problem: 'Usas WhatsApp, Excel y notas de papel para gestionar clientes.',
  },
  {
    icon: '😤',
    problem: 'Tu equipo de ventas no sabe en qué etapa está cada prospecto.',
  },
  {
    icon: '🕐',
    problem: 'Respondes mensajes a las 11 de la noche porque no hay automatización.',
  },
];

export function ProblemSection() {
  return (
    <section className="section-padding relative bg-[#080808]">
      {/* Divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Problems */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4"
            >
              El problema real
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 leading-tight"
            >
              Tu negocio está creciendo,<br />pero sin control se convierte<br />en caos.
            </motion.h2>

            <div className="space-y-4">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]"
                >
                  <span className="text-xl mt-0.5">{p.icon}</span>
                  <p className="text-sm text-white/55 leading-relaxed">{p.problem}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Solution summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-[#0dcfcf]/15 bg-[#0f0f0f] p-8 overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0dcfcf]/5 rounded-full blur-3xl pointer-events-none" />

              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-6">La solución Delta Kilo</p>
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                Un sistema único que conecta todo tu proceso comercial.
              </h3>
              <p className="text-sm text-white/45 leading-relaxed mb-8">
                Desde el primer contacto hasta el cierre: cada pieza está conectada, automatizada y bajo control. Tú ves el resultado, el sistema hace el trabajo.
              </p>

              {/* Feature list */}
              <div className="space-y-3">
                {[
                  'Captación automática de leads',
                  'Seguimiento sin esfuerzo manual',
                  'Atención 24/7 con IA',
                  'Panel de control centralizado',
                  'Métricas en tiempo real',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0dcfcf]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
