'use client';
import { motion } from 'framer-motion';
import { NumberTicker } from '@/components/ui/number-ticker';

const stats = [
  { value: 6, suffix: '', label: 'Agentes de IA en el escuadrón' },
  { value: 557, suffix: '+', label: 'Piezas de contenido publicadas' },
  { value: 1632, suffix: '+', label: 'Leads gestionados en el CRM de clientes' },
];

export function EcosystemStats() {
  return (
    <section className="relative bg-[#080808] py-14 sm:py-16">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-5xl font-bold gradient-text-cyan tabular-nums">
                <NumberTicker value={stat.value} delay={0.2 + i * 0.1} />
                {stat.suffix}
              </div>
              <p className="mt-2 text-[11px] sm:text-xs uppercase tracking-wide text-white/35 leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[10px] text-white/20 mt-8 font-mono">
          Datos reales de las cuentas de Delta Kilo y sus clientes, actualizados 09/2026
        </p>
      </div>
    </section>
  );
}
