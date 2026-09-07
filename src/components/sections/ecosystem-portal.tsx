'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { DashboardPreview } from '@/components/ui/dashboard-preview';

export function EcosystemPortal() {
  return (
    <section className="section-padding relative bg-[#0a0a0a] overflow-hidden">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="eyebrow text-[#D4AF37] mb-4"
            >
              Sin sorpresas, sin reportes de PDF
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-heading gradient-text-gold mb-5"
            >
              Tu propio portal para ver al equipo trabajar.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/45 text-base leading-relaxed mb-8"
            >
              Cada cliente entra con su propia cuenta y ve, en tiempo real, lo que cada agente está haciendo por su negocio — no un correo mensual, no una llamada para preguntar &ldquo;¿cómo vamos?&rdquo;.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {[
                'Acceso con tu propia cuenta, solo tu negocio',
                'Datos conectados directo a tu CRM y tus redes',
                'Historial de cada mejora, no solo la foto de hoy',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <CheckCircle2 size={16} className="text-[#0dcfcf] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <DashboardPreview />
            <p className="text-center text-[10px] text-white/25 mt-3 font-mono">
              Vista real del portal — datos de Delta Kilo Soluciones, 09/2026
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
