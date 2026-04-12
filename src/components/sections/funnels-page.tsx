'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, Zap, Users, MessageSquare,
  Calendar, TrendingUp, Bell, Clock, ChevronRight,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   KANBAN DEMO — replica visual del CRM real de DeltaKilo
   ══════════════════════════════════════════════════════════ */

const stages = [
  {
    id: 'nuevo',
    label: 'Nuevo Lead',
    color: '#0dcfcf',
    bg: 'bg-[#0dcfcf]/10',
    border: 'border-[#0dcfcf]/30',
    dot: 'bg-[#0dcfcf]',
    count: 5,
    cards: [
      { name: 'Carlos M.', source: 'Meta Ads', time: 'Hace 2 min', hot: true },
      { name: 'Laura G.', source: 'Google Ads', time: 'Hace 18 min', hot: false },
    ],
    auto: 'Mensaje de bienvenida automático por WhatsApp en segundos.',
  },
  {
    id: 'calificado',
    label: 'Lead calificado',
    color: '#D4AF37',
    bg: 'bg-[#D4AF37]/10',
    border: 'border-[#D4AF37]/30',
    dot: 'bg-[#D4AF37]',
    count: 35,
    cards: [
      { name: 'Francisco H.', source: 'WhatsApp', time: 'Hace 1h', hot: true },
      { name: 'Blanca R.', source: 'Facebook', time: 'Hace 3h', hot: false },
    ],
    auto: 'Secuencia de emails y WhatsApp hasta agendar cita.',
  },
  {
    id: 'cita',
    label: 'Cita agendada',
    color: '#a78bfa',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    dot: 'bg-purple-400',
    count: 8,
    cards: [
      { name: 'Esme V.', source: 'Instagram', time: 'Mañana 10am', hot: true },
    ],
    auto: 'Recordatorio automático 24h y 1h antes de la cita.',
  },
  {
    id: 'cierre',
    label: 'En cierre',
    color: '#34d399',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    count: 3,
    cards: [
      { name: 'Hector R.', source: 'Referido', time: 'Presupuesto enviado', hot: true },
    ],
    auto: 'Seguimiento automático cada 48h hasta el cierre.',
  },
];

function KanbanDemo() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full overflow-x-auto pb-4 -mx-2 px-2">
      <div className="flex gap-3 min-w-[720px]">
        {stages.map((stage, si) => (
          <div key={stage.id} className="flex-1 min-w-[160px]">
            {/* Column header */}
            <div
              className={`flex items-center justify-between mb-3 px-3 py-2 rounded-xl border ${stage.border} ${stage.bg}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stage.dot}`} />
                <span className="text-xs font-semibold text-white/80 leading-tight">{stage.label}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: stage.color }}>{stage.count}</span>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {stage.cards.map((card, ci) => (
                <motion.div
                  key={ci}
                  whileHover={{ scale: 1.02, y: -1 }}
                  onClick={() => setActive(active === `${si}-${ci}` ? null : `${si}-${ci}`)}
                  className="bg-[#111] border border-white/[0.07] rounded-xl p-3 cursor-pointer
                             hover:border-white/15 transition-all duration-200 select-none"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-white leading-tight">{card.name}</span>
                    {card.hot && (
                      <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0">
                        HOT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
                    <span className="text-[10px] text-white/35 truncate">{card.source}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock className="w-2.5 h-2.5 text-white/20 flex-shrink-0" />
                    <span className="text-[10px] text-white/30">{card.time}</span>
                  </div>

                  {/* Automation tooltip */}
                  <AnimatePresence>
                    {active === `${si}-${ci}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pt-2 border-t border-white/[0.06] overflow-hidden"
                      >
                        <div className="flex items-start gap-1.5">
                          <Zap className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <p className="text-[10px] text-[#D4AF37]/80 leading-snug">{stage.auto}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Add ghost card */}
              <div className="border border-dashed border-white/[0.06] rounded-xl p-3 flex items-center justify-center">
                <span className="text-[10px] text-white/15">+ {stage.count - stage.cards.length} más</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] text-white/20 mt-4 flex items-center justify-center gap-1">
        <Zap className="w-3 h-3 text-[#D4AF37]/40" />
        Toca una tarjeta para ver la automatización de esa etapa
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   AUTOMATION FLOW STEP
   ══════════════════════════════════════════════════════════ */
const automationSteps = [
  {
    trigger: 'El lead llena tu formulario o escribe por WhatsApp',
    icon: <MessageSquare className="w-5 h-5" />,
    color: '#0dcfcf',
    actions: [
      'Entra automáticamente al CRM con sus datos',
      'Recibe un WhatsApp de bienvenida en los primeros 2 minutos',
      'Se le asigna a un vendedor de tu equipo',
    ],
  },
  {
    trigger: 'El lead no responde en 24 horas',
    icon: <Bell className="w-5 h-5" />,
    color: '#D4AF37',
    actions: [
      'Sistema envía follow-up automático por WhatsApp',
      'Si tampoco responde, email de recordatorio al día siguiente',
      'Tras 3 intentos, se etiqueta como "Lead frío" para retargeting',
    ],
  },
  {
    trigger: 'El lead agenda una cita',
    icon: <Calendar className="w-5 h-5" />,
    color: '#a78bfa',
    actions: [
      'Confirmación automática con fecha, hora y lugar',
      'Recordatorio 24 horas antes',
      'Recordatorio 1 hora antes con link o dirección',
    ],
  },
  {
    trigger: 'La cita ocurrió — lead en etapa de cierre',
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#34d399',
    actions: [
      'Seguimiento automático cada 48 horas',
      'Envío de propuesta o presupuesto personalizado',
      'Nutrición con casos de éxito y testimoniales',
    ],
  },
];

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
export function FunnelsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#080808] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(13,207,207,0.08) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 sm:pt-40 sm:pb-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center space-y-6">

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0dcfcf]/10 border border-[#0dcfcf]/25 mx-auto">
              <Zap className="w-3.5 h-3.5 text-[#0dcfcf] flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.13em] uppercase text-[#0dcfcf]/80">
                Funnels automáticos · CRM · Seguimiento
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.06] tracking-[-0.02em]">
              <span className="gradient-text block">Cada prospecto que llega</span>
              <span className="gradient-text-cyan block">se convierte en una oportunidad real.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
              Imagina que cada vez que alguien muestra interés en tu negocio, de forma automática recibe
              atención inmediata, seguimiento puntual y avanza por etapas hasta que cierra.{' '}
              <span className="text-white/75 font-medium">Eso es un funnel con CRM automatizado.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a href="https://wa.me/5215663864984?text=Hola,%20quiero%20un%20funnel%20automatizado%20💊"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold
                           bg-[#D4AF37] text-[#0e0e0e] rounded-xl
                           hover:bg-[#E5C158] transition-all duration-300
                           shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl group">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Quiero este sistema
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                           border border-white/10 text-white/60 rounded-xl hover:border-white/20 hover:text-white transition-all">
                Ver cómo funciona ↓
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VISUAL PREVIEW NB2 ── */}
      <section className="pb-16 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative rounded-2xl overflow-hidden border border-[#0dcfcf]/12 shadow-[0_0_80px_rgba(13,207,207,0.04)]">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">Vista previa</span>
            </div>
            <img
              src="/images/nb2/funnels.png"
              alt="Vista previa Funnels Automáticos"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA EN PALABRAS SIMPLES ── */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-center lg:text-left">
              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">El problema real</p>
              <h2 className="text-3xl sm:text-4xl font-bold gradient-text leading-tight mb-6">
                Los leads llegan. El dinero se pierde en el seguimiento.
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                El 78% de los clientes compra con el proveedor que responde primero.
                Pero la mayoría de los negocios tarda horas o días en contactar a un prospecto.
                Para cuando lo hacen, ya se fue con la competencia.
              </p>
              <div className="space-y-3">
                {[
                  'Un prospecto escribe a las 11pm — nadie responde hasta el día siguiente',
                  'El vendedor olvida hacer el seguimiento a los 3 días',
                  'No hay registro de en qué etapa está cada cliente',
                  'Se pierde tiempo hablando con prospectos que no van a comprar',
                  'No se sabe de dónde vienen los leads que sí cierran',
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/[0.04] border border-red-500/10">
                    <div className="w-4 h-4 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] text-red-400 font-bold">✕</span>
                    </div>
                    <span className="text-sm text-white/50 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5">
              <div className="p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03]">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">Con Delta Kilo</p>
                <p className="text-white/70 text-base leading-relaxed mb-6">
                  El sistema trabaja de noche, los fines de semana y en tiempo real.
                  Cada prospecto recibe atención en segundos, es calificado automáticamente
                  y avanza por el pipeline hasta que cierra — sin que tu equipo tenga que recordarlo.
                </p>
                {[
                  { label: 'Respuesta automática', sub: 'en menos de 2 minutos, 24/7', icon: <Zap className="w-4 h-4 text-[#D4AF37]" /> },
                  { label: 'Seguimiento sin olvidos', sub: 'el sistema sigue aunque el vendedor no', icon: <Bell className="w-4 h-4 text-[#D4AF37]" /> },
                  { label: 'Pipeline visual en tiempo real', sub: 'todos ven en qué etapa está cada cliente', icon: <Users className="w-4 h-4 text-[#D4AF37]" /> },
                  { label: 'Métricas de conversión', sub: 'sabes qué canales generan los mejores cierres', icon: <TrendingUp className="w-4 h-4 text-[#D4AF37]" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="text-xs text-white/35 mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CRM KANBAN VISUAL ── */}
      <section id="como-funciona" className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">Tu CRM en acción</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text leading-tight mb-4">
              Así se ve tu pipeline de ventas.
            </h2>
            <p className="text-white/40 text-base leading-relaxed">
              Cada prospecto tiene su tarjeta. Tú ves de un vistazo en qué etapa está cada uno
              y el sistema se encarga del seguimiento automático en cada paso.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            {/* CRM top bar */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/40 font-mono">Pipeline — Servicio activo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/20">58 oportunidades</span>
                <div className="h-4 w-px bg-white/[0.08]" />
                <span className="text-xs text-[#D4AF37]/60">MX$130,970</span>
              </div>
            </div>
            <KanbanDemo />
          </div>
        </div>
      </section>

      {/* ── AUTOMATIZACIONES POR ETAPA ── */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">El poder de la automatización</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text leading-tight mb-4">
              El sistema actúa solo. Tu equipo solo cierra.
            </h2>
            <p className="text-white/40 text-base leading-relaxed">
              Define las reglas una vez. A partir de ese momento, cada acción del prospecto
              dispara una respuesta automática perfecta — sin intervención humana.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {automationSteps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.07] bg-[#0f0f0f] overflow-hidden">
                {/* Trigger */}
                <div className="flex items-center gap-4 p-5 sm:p-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-white/25 font-semibold mb-1">
                      Disparador
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-white">{step.trigger}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0" style={{ color: step.color }} />
                </div>
                {/* Actions */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <div className="pl-14 space-y-2.5">
                    {step.actions.map((action, ai) => (
                      <div key={ai} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${step.color}15` }}>
                          <Zap className="w-2.5 h-2.5" style={{ color: step.color }} />
                        </div>
                        <span className="text-sm text-white/55 leading-relaxed">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS CON MÉTRICAS ── */}
      <section className="py-16 sm:py-20 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '2', unit: 'min', label: 'Primera respuesta', sub: 'automática al lead' },
              { num: '3×', unit: '', label: 'Más cierres', sub: 'vs. seguimiento manual' },
              { num: '100%', unit: '', label: 'Leads registrados', sub: 'ninguno se pierde' },
              { num: '24/7', unit: '', label: 'El sistema trabaja', sub: 'también de noche' },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl sm:text-4xl font-bold text-white leading-none mb-1">
                  <span className="gradient-text-cyan">{stat.num}</span>
                  <span className="text-[#0dcfcf]/60 text-2xl">{stat.unit}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-[11px] text-white/30 leading-snug">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ETAPAS DEL FUNNEL EXPLICADO ── */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">El recorrido del prospecto</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-gold leading-tight mb-4">
              De desconocido a cliente cerrado.
            </h2>
            <p className="text-white/40 text-base leading-relaxed">
              Cada etapa tiene una estrategia, un mensaje y una acción automática.
              Nada queda al azar ni depende de que alguien lo recuerde.
            </p>
          </div>

          <div className="relative">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  n: '01', label: 'Captación', color: '#0dcfcf',
                  title: 'El lead llega',
                  desc: 'Desde tu web, Meta Ads, Google, WhatsApp o referidos. El sistema lo registra automáticamente sin que hagas nada.',
                  tags: ['Landing page', 'Formulario', 'Chat web'],
                },
                {
                  n: '02', label: 'Calificación', color: '#D4AF37',
                  title: 'Se evalúa si puede comprar',
                  desc: 'Una secuencia de preguntas automáticas filtra si el lead tiene el perfil ideal. Solo los calificados avanzan.',
                  tags: ['Bot WhatsApp', 'Formulario inteligente', 'Score automático'],
                },
                {
                  n: '03', label: 'Conversión', color: '#a78bfa',
                  title: 'Agenda y se presenta',
                  desc: 'El prospecto agenda su cita en línea. El sistema envía confirmación, recordatorios y preparación automática.',
                  tags: ['Calendario automático', 'Recordatorio', 'Nutrición'],
                },
                {
                  n: '04', label: 'Cierre', color: '#34d399',
                  title: 'El vendedor solo cierra',
                  desc: 'Tu equipo recibe un lead calificado, con historial completo, listo para tomar la decisión. El trabajo sucio ya está hecho.',
                  tags: ['Pipeline CRM', 'Propuesta', 'Seguimiento post-cita'],
                },
              ].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-6 sm:p-7">
                  {/* Number */}
                  <div className="text-4xl font-bold font-mono mb-4 leading-none"
                    style={{ color: `${step.color}20` }}>
                    {step.n}
                  </div>
                  {/* Stage badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3"
                    style={{ backgroundColor: `${step.color}12`, border: `1px solid ${step.color}30` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: step.color }}>
                      {step.label}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2.5">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{step.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag, ti) => (
                      <span key={ti} className="text-[10px] text-white/30 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LO QUE INCLUYE ── */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">¿Qué incluye?</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text leading-tight">
              Todo lo que necesitas para que el funnel funcione solo.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Zap className="w-5 h-5" />, title: 'Landing page de captación', desc: 'Página diseñada para convertir visitantes en leads, no para informar.' },
              { icon: <MessageSquare className="w-5 h-5" />, title: 'Bot de calificación WhatsApp', desc: 'Preguntas automáticas que filtran y califican al prospecto desde el primer contacto.' },
              { icon: <Users className="w-5 h-5" />, title: 'CRM con pipeline por etapas', desc: 'Tablero visual donde ves el estado de cada oportunidad en tiempo real.' },
              { icon: <Bell className="w-5 h-5" />, title: 'Secuencias de seguimiento', desc: 'Emails y WhatsApps automáticos que se envían solos si el lead no responde.' },
              { icon: <Calendar className="w-5 h-5" />, title: 'Agendamiento automático', desc: 'El prospecto elige horario, el calendario se bloquea y las confirmaciones se envían solas.' },
              { icon: <TrendingUp className="w-5 h-5" />, title: 'Dashboard de métricas', desc: 'Costo por lead, tasa de cierre, fuente de tráfico y ROI de cada canal.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-[#0f0f0f] hover:border-[#D4AF37]/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20
                                flex items-center justify-center text-[#D4AF37] mb-4
                                group-hover:bg-[#D4AF37]/15 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,207,207,0.05) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="space-y-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#0dcfcf]/50 to-transparent mx-auto" />
            <div>
              <p className="text-[#0dcfcf] font-semibold text-xs uppercase tracking-widest mb-2">Siguiente paso</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text leading-tight">
                ¿Cuántos leads se están perdiendo hoy sin este sistema?
              </h2>
            </div>
            <p className="text-white/40 text-base leading-relaxed max-w-lg mx-auto">
              Agenda una llamada de 30 minutos. Analizamos tu proceso actual y te mostramos
              exactamente cuántas oportunidades se están escapando y cómo capturarlas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/5215663864984?text=Hola,%20quiero%20un%20funnel%20automatizado%20para%20mi%20negocio%20💊"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold
                           bg-[#D4AF37] text-[#0e0e0e] rounded-xl
                           hover:bg-[#E5C158] transition-all duration-300
                           shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl group">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Agendar llamada gratuita
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/servicios"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                           border border-white/10 text-white/60 rounded-xl hover:border-white/20 hover:text-white transition-all">
                Ver otros servicios
              </Link>
            </div>
            <p className="text-[11px] text-white/20 flex items-center justify-center gap-4 pt-1">
              <span>✓ Sin compromiso</span>
              <span>✓ 30 minutos</span>
              <span>✓ Diagnóstico gratuito</span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
