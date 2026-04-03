'use client';
import { motion } from 'framer-motion';

const industries = [
  '🏪 Retail',
  '🏥 Clínicas',
  '🏗️ Constructoras',
  '🏨 Hospitality',
  '⚖️ Despachos',
  '🚗 Automotriz',
  '🎓 Educación',
  '💼 Consultoría',
  '🏋️ Fitness',
  '🍽️ Restaurantes',
  '🏠 Real Estate',
  '📦 Logística',
];

const stats = [
  { value: '6+',    label: 'Servicios integrados' },
  { value: '100%',  label: 'Proyectos personalizados' },
  { value: '24/7',  label: 'Automatización activa' },
  { value: '1',     label: 'Sistema conectado' },
];

export function TrustBar() {
  return (
    <section className="relative bg-[#080808] overflow-hidden">
      <div className="divider-line" />

      {/* Stats row */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative group"
            >
              <div className="p-5 rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#0dcfcf]/15 transition-all duration-300 text-center">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13,207,207,0.04) 0%, transparent 70%)' }}
                />
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold gradient-text-cyan mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-xs text-white/35 uppercase tracking-widest font-medium leading-tight">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="divider-line" />

      {/* Industry marquee */}
      <div className="py-5 overflow-hidden relative">
        {/* Left/right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #080808, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, #080808, transparent)' }} />

        <div className="marquee-track">
          {[...industries, ...industries].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-5 py-2 mx-2 rounded-full border border-[#1e1e1e] bg-[#0e0e0e] text-white/35 text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="divider-line" />
    </section>
  );
}
