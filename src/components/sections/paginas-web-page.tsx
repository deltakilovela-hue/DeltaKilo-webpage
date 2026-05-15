'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, Zap, Globe, MousePointer2,
  Layers, Code2, BarChart3, ShieldCheck, Smartphone,
} from 'lucide-react';
import { PaginasWebScrollHero } from '@/components/ui/paginas-web-hero';

/* ═══════════════════════════════════════════════════════════════
   SPOTLIGHT CARD — mouse-glow on hover
   ═══════════════════════════════════════════════════════════════ */
function SpotlightCard({
  children, className = '', color = 'rgba(212,175,55,0.15)',
}: { children: React.ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [op, setOp] = useState(0);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseEnter={() => setOp(1)}
      onMouseLeave={() => setOp(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f0f]
                  hover:border-[#D4AF37]/30 transition-colors duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: op,
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOCK BROWSER — wireframe de un sitio web
   ═══════════════════════════════════════════════════════════════ */
function MockBrowser() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
      {/* Chrome bar */}
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-[#111] rounded-lg px-3 py-1.5 flex items-center gap-2 max-w-xs mx-auto">
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-[11px] text-white/40 font-mono truncate">tunegocio.com</span>
          </div>
        </div>
      </div>

      {/* Simulated site */}
      <div className="bg-[#060606] relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.13) 0%, transparent 65%)' }} />

        {/* Nav */}
        <div className="absolute top-0 left-0 right-0 h-10 flex items-center px-5 justify-between border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#D4AF37]/80 rounded-md" />
            <div className="w-14 h-2 bg-white/30 rounded-full" />
          </div>
          <div className="hidden sm:flex gap-4">
            {[0, 1, 2].map(i => <div key={i} className="w-10 h-1.5 bg-white/15 rounded-full" />)}
          </div>
          <div className="w-16 h-6 rounded-lg bg-[#D4AF37]/70" />
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 sm:gap-3 px-6 pt-10">
          <div className="w-20 h-1.5 bg-[#D4AF37]/50 rounded-full" />
          <div className="w-56 sm:w-64 h-4 sm:h-5 bg-white/70 rounded-full" />
          <div className="w-48 sm:w-56 h-4 sm:h-5 bg-white/50 rounded-full" />
          <div className="w-44 sm:w-48 h-3.5 sm:h-4 bg-[#D4AF37]/60 rounded-full" />
          <div className="w-36 sm:w-40 h-2.5 bg-white/20 rounded-full mt-1" />
          <div className="flex gap-3 mt-3">
            <div className="w-18 h-6 sm:h-7 rounded-lg bg-[#D4AF37]/80 px-4 py-1.5">
              <div className="h-full w-10 bg-[#0e0e0e]/40 rounded" />
            </div>
            <div className="w-18 h-6 sm:h-7 rounded-lg border border-white/25 px-4 py-1.5">
              <div className="h-full w-10 bg-white/15 rounded" />
            </div>
          </div>
        </div>

        {/* Floating status card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-3 right-3 bg-[#111]/95 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="space-y-1">
              <div className="w-14 h-1.5 bg-white/55 rounded-full" />
              <div className="w-10 h-1 bg-white/25 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Floating gold badge */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute top-12 left-3 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-xl px-2.5 py-1.5"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-[#D4AF37]/60 flex-shrink-0" />
            <div className="w-12 h-1.5 bg-[#D4AF37]/50 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE FORM DEMO
   ═══════════════════════════════════════════════════════════════ */
function FormDemo() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = 'Tu nombre es requerido';
    if (!fields.email.includes('@')) e.email = 'Ingresa un correo válido';
    if (fields.message.length < 10) e.message = 'Cuéntanos más (mínimo 10 caracteres)';
    return e;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    setTimeout(() => setStatus('done'), 1800);
  };

  const reset = () => { setStatus('idle'); setFields({ name: '', email: '', message: '' }); };

  const fieldClass = (key: string) =>
    `relative rounded-xl border transition-all duration-200 overflow-hidden ${
      errors[key] ? 'border-red-500/50 bg-red-500/[0.04]'
      : focused === key ? 'border-[#D4AF37]/50 bg-[#D4AF37]/[0.04]'
      : 'border-white/10 bg-white/[0.03]'
    }`;

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <motion.div key="success"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-14 text-center gap-5"
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35
                       flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
          </motion.div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">¡Mensaje recibido!</h4>
            <p className="text-sm text-white/50">Te contactaremos en menos de 24 horas.</p>
          </div>
          <button onClick={reset}
            className="text-xs text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors underline underline-offset-4 mt-2">
            Enviar otro mensaje
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} className="space-y-5">

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider pl-1">
              Nombre
            </label>
            <div className={fieldClass('name')}>
              <input type="text" placeholder="Tu nombre completo"
                value={fields.name}
                onChange={e => { setFields(p => ({ ...p, name: e.target.value })); if (errors.name) setErrors(p => ({ ...p, name: '' })); }}
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder-white/25 outline-none pr-10"
              />
              {fields.name && !errors.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              )}
            </div>
            {errors.name && <p className="text-xs text-red-400 pl-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider pl-1">
              Correo electrónico
            </label>
            <div className={fieldClass('email')}>
              <input type="email" placeholder="tu@correo.com"
                value={fields.email}
                onChange={e => { setFields(p => ({ ...p, email: e.target.value })); if (errors.email) setErrors(p => ({ ...p, email: '' })); }}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder-white/25 outline-none pr-10"
              />
              {fields.email.includes('@') && !errors.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              )}
            </div>
            {errors.email && <p className="text-xs text-red-400 pl-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider pl-1">
              ¿Qué necesitas?
            </label>
            <div className={fieldClass('message')}>
              <textarea placeholder="Cuéntanos sobre tu negocio…" rows={4}
                value={fields.message}
                onChange={e => { setFields(p => ({ ...p, message: e.target.value })); if (errors.message) setErrors(p => ({ ...p, message: '' })); }}
                onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder-white/25 outline-none resize-none"
              />
            </div>
            {errors.message && <p className="text-xs text-red-400 pl-1">{errors.message}</p>}
          </div>

          <button type="submit" disabled={status === 'sending'}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl
                       bg-[#D4AF37] text-[#0e0e0e] font-semibold text-sm
                       hover:bg-[#E5C158] active:bg-[#C49A2E]
                       disabled:opacity-60 transition-all duration-200 mt-2
                       shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl"
          >
            {status === 'sending' ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando…
              </>
            ) : (
              <>Enviar mensaje <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <p className="text-center text-[11px] text-white/20 flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3 h-3" />
            Notificación inmediata · Sin spam · Respuesta en &lt;24h
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BUTTON SHOWCASE
   ═══════════════════════════════════════════════════════════════ */
function ButtonShowcase() {
  const [clicked, setClicked] = useState<number | null>(null);

  const btns = [
    { label: 'Quiero mi página web', style: 'bg-[#D4AF37] text-[#0e0e0e] font-bold hover:bg-[#E5C158] shadow-lg hover:shadow-[#D4AF37]/30 hover:shadow-xl', tag: 'Primario' },
    { label: 'Ver cómo funciona', style: 'bg-transparent text-white border border-white/20 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]', tag: 'Secundario' },
    { label: '⚡ Solicitar propuesta', style: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm', tag: 'Ghost' },
    { label: 'Hablar por WhatsApp →', style: 'text-[#D4AF37] hover:text-[#E5C158] underline underline-offset-4 decoration-[#D4AF37]/40', tag: 'Link' },
  ];

  return (
    <div className="space-y-4">
      {btns.map((btn, i) => (
        <div key={i} className="flex items-center gap-3 sm:gap-4">
          <div className="w-20 shrink-0 text-right hidden sm:block">
            <span className="text-[10px] text-white/30 uppercase tracking-wider">{btn.tag}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.015, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setClicked(i); setTimeout(() => setClicked(null), 700); }}
            className={`flex-1 px-5 py-3.5 rounded-xl text-sm transition-all duration-200 ${btn.style}`}
          >
            {clicked === i ? '✓ ¡Perfecto!' : btn.label}
          </motion.button>

          <span className="text-[9px] text-white/25 uppercase tracking-wider sm:hidden w-12 shrink-0">
            {btn.tag}
          </span>
        </div>
      ))}

      <p className="text-xs text-white/25 flex items-center gap-1.5 pt-2 pl-0 sm:pl-24">
        <MousePointer2 className="w-3 h-3 text-[#D4AF37]/40" />
        Haz click o pasa el cursor — son botones reales
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════ */
function DemoHeader({
  question, title, sub,
}: { question: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-14 sm:mb-20 space-y-4 max-w-2xl mx-auto px-2">
      <motion.p
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-[#D4AF37] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase"
      >
        {question}
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05 }}
        className="w-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto origin-center"
      />
      <motion.h2
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold gradient-text leading-tight"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-white/40 max-w-sm sm:max-w-md mx-auto leading-relaxed"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════════════════════ */
export function PaginasWebPage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          1. HERO — parallax scroll
          ══════════════════════════════════════════ */}
      <PaginasWebScrollHero />

      {/* ══════════════════════════════════════════
          2. BOTONES / INTERACCIÓN
          ══════════════════════════════════════════ */}
      <section id="demo-elementos" className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="Cada elemento diseñado con intención"
            title="Cada clic debe acercar al cliente a contactarte."
            sub="No llenamos tu página de efectos solo porque se ven bien. Cada botón y sección está pensado para que el usuario avance: entender, confiar y tomar acción."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-7 pb-5 border-b border-white/[0.06]">
                  <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20
                                  flex items-center justify-center flex-shrink-0">
                    <MousePointer2 className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Botones interactivos</div>
                    <div className="text-xs text-white/30 mt-0.5">Haz click en cualquiera</div>
                  </div>
                </div>
                <ButtonShowcase />
              </div>
            </motion.div>

            {/* 3 principles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                {
                  icon: <MousePointer2 className="w-5 h-5 text-[#D4AF37]" />,
                  title: 'Botones claros',
                  desc: 'Indicamos exactamente qué debe hacer el visitante. Sin ambigüedad, sin distracciones.',
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
                  title: 'Diseño que genera confianza',
                  desc: 'Una página moderna comunica profesionalismo antes de que te escriban.',
                },
                {
                  icon: <Smartphone className="w-5 h-5 text-[#D4AF37]" />,
                  title: 'Experiencia sin fricción',
                  desc: 'Todo debe sentirse fácil desde celular, tablet o computadora. Sin errores, sin confusión.',
                },
              ].map((card, i) => (
                <SpotlightCard key={i} className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20
                                    flex items-center justify-center flex-shrink-0 mt-0.5">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1.5">{card.title}</h3>
                      <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. VELOCIDAD / CLARIDAD / MEDICIÓN
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="Rendimiento que no negocias"
            title="Una página lenta o confusa también pierde clientes."
            sub="Un cliente interesado no siempre te da una segunda oportunidad. Si tu página tarda en cargar o no deja claro cómo contactarte, esa oportunidad se puede perder."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: <Zap className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Rápida',
                desc: 'Para que el visitante no se vaya antes de conocerte. Menos de 2 segundos de carga, optimizada para cualquier conexión.',
                stat: '< 2s',
              },
              {
                icon: <Globe className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Clara',
                desc: 'Para que entienda qué haces, por qué elegirte y cuál es el siguiente paso. Sin texto de relleno.',
                stat: '100%',
              },
              {
                icon: <BarChart3 className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Medible',
                desc: 'Para saber cuántas personas llegan, desde dónde vienen y qué acciones realizan. Decisiones con datos.',
                stat: '24/7',
              },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <SpotlightCard className="p-7 h-full flex flex-col gap-5">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20
                                    flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-2xl font-black text-[#D4AF37]/20">{item.stat}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. FORM DEMO
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="El puente entre el interés y la venta"
            title="Formularios que sí generan oportunidades."
            sub="Un formulario no debe ser solo una caja para capturar datos. Debe ser el puente entre una persona interesada y tu proceso de ventas."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start max-w-4xl mx-auto">
            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-6 sm:p-8">
                <div className="mb-7 pb-5 border-b border-white/[0.06]">
                  <h3 className="text-base font-bold text-white mb-1">Solicitar información</h3>
                  <p className="text-xs text-white/30">Ejemplo real — inténtalo</p>
                </div>
                <FormDemo />
              </div>
            </motion.div>

            {/* What it includes */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-8">
              <div>
                <p className="text-xs text-[#D4AF37]/60 uppercase tracking-widest mb-5">
                  Cada formulario puede incluir
                </p>
                <div className="space-y-4">
                  {[
                    'Validación en tiempo real',
                    'Mensajes claros para el usuario',
                    'Confirmación automática al enviar',
                    'Notificación inmediata a tu equipo',
                    'Conexión con WhatsApp',
                    'Integración con CRM',
                    'Protección anti-spam',
                  ].map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25
                                      flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <span className="text-sm text-white/55 leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/15">
                <p className="text-sm text-white/60 leading-relaxed">
                  <span className="text-[#D4AF37] font-semibold">Cuando alguien llena tu formulario,</span>{' '}
                  tu negocio debe enterarse al instante. Lo conectamos con tu WhatsApp, correo o CRM
                  para que ningún lead se pierda.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. BENTO FEATURES
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="Todo en un solo proyecto"
            title="Todo lo que necesita una página web para trabajar por tu negocio."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Layers className="w-6 h-6 text-[#D4AF37]" />, title: 'Diseño personalizado', desc: 'Alineado a tu marca, tu cliente ideal y tu objetivo comercial. Sin plantillas genéricas.', span: 'lg:col-span-2' },
              { icon: <Globe className="w-6 h-6 text-[#D4AF37]" />, title: 'Copy estratégico', desc: 'No solo diseñamos. Estructuramos mensajes para explicar tu valor y llevar al usuario a contactarte.', span: '' },
              { icon: <Zap className="w-6 h-6 text-[#D4AF37]" />, title: 'Carga rápida', desc: 'Optimizamos el sitio para que abra rápido y no pierdas visitantes por lentitud.', span: '' },
              { icon: <Smartphone className="w-6 h-6 text-[#D4AF37]" />, title: 'Versión móvil impecable', desc: 'Tu página se adapta correctamente a celular, tablet y computadora.', span: '' },
              { icon: <Code2 className="w-6 h-6 text-[#D4AF37]" />, title: 'Formularios conectados', desc: 'Cada solicitud puede llegar a WhatsApp, correo o CRM. Cero leads perdidos.', span: 'lg:col-span-2' },
              { icon: <BarChart3 className="w-6 h-6 text-[#D4AF37]" />, title: 'Analytics integrado', desc: 'Medimos visitas, fuentes de tráfico y acciones importantes.', span: '' },
              { icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />, title: 'Seguridad SSL', desc: 'Tu sitio queda configurado con conexión segura y dominio profesional.', span: '' },
              { icon: <MousePointer2 className="w-6 h-6 text-[#D4AF37]" />, title: 'Botones de conversión', desc: 'Llamados a la acción en puntos estratégicos para guiar al visitante.', span: '' },
              { icon: <Globe className="w-6 h-6 text-[#D4AF37]" />, title: 'SEO básico desde el inicio', desc: 'Configuramos la estructura inicial para que Google pueda entender tu sitio.', span: '' },
            ].map((feat, i) => (
              <motion.div key={i} className={feat.span}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <SpotlightCard className="p-6 sm:p-7 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20
                                  flex items-center justify-center mb-5">
                    {feat.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2.5">{feat.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. STATS
          ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-widest text-[#D4AF37]/60 font-semibold mb-10">
            Tu web trabaja incluso cuando tú no estás disponible
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
            {[
              { val: '24/7', label: 'Siempre activa', sub: 'Recibe solicitudes todos los días, a cualquier hora' },
              { val: '<2s', label: 'De carga', sub: 'Sitios optimizados para cargar rápido' },
              { val: '100%', label: 'Responsive', sub: 'Diseñada para verse bien en celular, tablet y desktop' },
              { val: '∞', label: 'Conectada a ventas', sub: 'Formularios, WhatsApp y CRM trabajando juntos' },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-gold mb-2 leading-none">
                  {stat.val}
                </div>
                <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-[11px] text-white/30 leading-snug">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. ANTES / DESPUÉS
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="La diferencia es clara"
            title="La diferencia entre tener una página y tener un sistema web."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Sin */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-red-500/10">
                  <div className="w-7 h-7 rounded-full bg-red-500/15 border border-red-500/30
                                  flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-red-400 font-bold">✕</span>
                  </div>
                  <span className="text-sm font-bold text-red-400/80">Sin una página profesional</span>
                </div>
                <div className="space-y-4">
                  {[
                    'Tu negocio depende solo de redes sociales',
                    'El cliente no encuentra información clara',
                    'No hay un lugar formal para presentar tus servicios',
                    'Los interesados escriben, pero no siempre reciben seguimiento',
                    'No sabes cuántas personas visitan tu página',
                    'Los formularios no están conectados a tu proceso de ventas',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      </div>
                      <span className="text-sm text-white/40 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Con DK */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-[#D4AF37]/10">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30
                                  flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-[#D4AF37] font-bold">✓</span>
                  </div>
                  <span className="text-sm font-bold text-[#D4AF37]/80">Con Delta Kilo</span>
                </div>
                <div className="space-y-4">
                  {[
                    'Tu negocio tiene una presencia profesional y confiable',
                    'El cliente entiende rápido qué haces y cómo contactarte',
                    'Tu página guía al visitante hacia una acción clara',
                    'Cada lead puede llegar a WhatsApp, correo o CRM',
                    'Puedes medir visitas, fuentes y conversiones',
                    'Tu sitio se convierte en parte de tu sistema comercial',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <span className="text-sm text-white/60 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. PROCESO — 5 pasos
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="De cero a lanzado"
            title="De una idea suelta a una página lista para vender."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: '01', title: 'Diagnóstico comercial', desc: 'Entendemos tu negocio, tus servicios, tu cliente ideal y el objetivo principal de la página.' },
              { n: '02', title: 'Estructura estratégica', desc: 'Definimos las secciones, mensajes, botones y recorrido que debe seguir el visitante.' },
              { n: '03', title: 'Diseño y desarrollo', desc: 'Construimos una página moderna, rápida, responsive y alineada a tu marca.' },
              { n: '04', title: 'Conexión comercial', desc: 'Integramos formularios, WhatsApp, correo, CRM o las herramientas que uses para recibir prospectos.' },
              { n: '05', title: 'Lanzamiento y medición', desc: 'Publicamos tu sitio y dejamos lista la medición para saber qué está pasando con tus visitantes.' },
            ].map((step, i) => (
              <motion.div key={i}
                className={i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <SpotlightCard className="p-6 sm:p-7 h-full">
                  <div className="text-4xl font-bold text-[#D4AF37]/15 font-mono mb-5 leading-none">
                    {step.n}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2.5">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. CTA FINAL
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="space-y-6">

            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

            <div className="space-y-3">
              <p className="text-[#D4AF37] font-semibold text-xs sm:text-sm uppercase tracking-widest">
                Próximo paso
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text leading-tight">
                Tu próxima página puede ser más que una presentación bonita.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-sm mx-auto">
              Puede ser el lugar donde tus clientes entienden tu valor, confían en tu negocio
              y dan el primer paso para comprarte.
            </p>

            <p className="text-white/35 text-sm leading-relaxed max-w-sm mx-auto">
              Cuéntanos qué haces y te ayudamos a convertirlo en una página clara,
              profesional y orientada a generar oportunidades.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contacto"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold
                           bg-[#D4AF37] text-[#0e0e0e] rounded-xl
                           hover:bg-[#E5C158] transition-all duration-300
                           shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl group">
                Quiero una propuesta
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5215663864984?text=Hola,%20me%20interesa%20una%20página%20web%20profesional"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold
                           border border-white/10 text-white/70 rounded-xl
                           hover:border-[#D4AF37]/30 hover:text-white transition-all group"
              >
                <svg className="w-4 h-4 flex-shrink-0 text-[#D4AF37]/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Hablar por WhatsApp
              </a>
            </div>

            <p className="text-[11px] text-white/20 pt-2">
              Propuesta sin compromiso · Respuesta en menos de 24 horas · Atención personalizada
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
