'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, Zap, Globe, MousePointer2,
  Layers, Code2, BarChart3, ShieldCheck, Smartphone,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   SPOTLIGHT CARD — 21st.dev inspired, mouse-glow on hover
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
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 35);
    return () => clearInterval(t);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
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
            <span className="text-[11px] text-white/40 font-mono truncate">tuclienta.com</span>
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
            <p className="text-sm text-white/50">Te contactaremos en menos de 2 horas hábiles.</p>
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
              <textarea placeholder="Describe tu proyecto o negocio…" rows={4}
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
            Datos seguros · Sin spam · Respuesta en &lt;2h
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
    { label: 'Contratar ahora', style: 'bg-[#D4AF37] text-[#0e0e0e] font-bold hover:bg-[#E5C158] shadow-lg hover:shadow-[#D4AF37]/30 hover:shadow-xl', tag: 'Primario' },
    { label: 'Saber más', style: 'bg-transparent text-white border border-white/20 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]', tag: 'Secundario' },
    { label: '⚡ Empezar hoy', style: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm', tag: 'Ghost' },
    { label: 'Ver demo →', style: 'text-[#D4AF37] hover:text-[#E5C158] underline underline-offset-4 decoration-[#D4AF37]/40', tag: 'Link' },
  ];

  return (
    <div className="space-y-4">
      {btns.map((btn, i) => (
        <div key={i} className="flex items-center gap-3 sm:gap-4">
          {/* Tag label */}
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

          {/* Mobile tag */}
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
   SECTION HEADER — estilo "¿Así te gustaría…?"
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
      {/* Separador dorado */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05 }}
        className="w-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto origin-center"
      />
      <motion.h2
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-bold gradient-text
                   leading-tight"
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
          1. HERO
          ══════════════════════════════════════════ */}
      <section className="relative bg-[#080808] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12
                        pb-16 sm:pb-20 lg:pb-28"
             style={{ paddingTop: '9rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left: Copy ── */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                bg-[#D4AF37]/10 border border-[#D4AF37]/25 mx-auto lg:mx-0">
                  <Globe className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold text-[#D4AF37]/80 tracking-[0.12em] uppercase">
                    Páginas Web Premium
                  </span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-3">
                <p className="text-[#D4AF37] font-bold text-base sm:text-lg tracking-wide">
                  ¿Así te gustaría tu portada?
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold
                               leading-[1.07] tracking-[-0.02em]">
                  <span className="gradient-text">Tu sitio web,</span>
                  <br />
                  <span className="gradient-text-gold">hecho para vender.</span>
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-sm sm:text-base text-white/50 leading-relaxed max-w-md mx-auto lg:mx-0">
                Diseñamos sitios web modernos, rápidos y enfocados en convertir visitantes en clientes.
                No solo presencia —{' '}
                <span className="text-white/70 font-medium">una herramienta de ventas activa</span>.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-3 items-center lg:items-start">
                <a
                  href="https://wa.me/5215663864984?text=Hola,%20quiero%20una%20página%20web%20profesional%20💊"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5
                             px-6 py-4 text-sm font-semibold rounded-xl
                             bg-[#D4AF37] text-[#0e0e0e]
                             hover:bg-[#E5C158] transition-all duration-300
                             shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl group"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Quiero este diseño
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#demo-elementos"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                             border border-white/10 text-white/60 rounded-xl
                             hover:border-white/20 hover:text-white transition-all">
                  Ver el demo ↓
                </a>
              </motion.div>

              {/* Mini stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-6 border-t border-white/[0.07]">
                {[
                  { n: 100, s: '%', label: 'Responsive' },
                  { n: 2, s: 's', label: 'Carga' },
                  { n: 15, s: 'd', label: 'Entrega' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white leading-none">
                      <Counter to={stat.n} suffix={stat.s} />
                    </div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Mock browser ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <MockBrowser />
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-white/30">
                  Demo — así puede verse tu sitio web
                </span>
              </div>
            </motion.div>
          </div>
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
              src="/images/nb2/paginas-web.png"
              alt="Vista previa Páginas Web Profesionales"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. ELEMENTOS INTERACTIVOS
          ══════════════════════════════════════════ */}
      <section id="demo-elementos" className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="¿Imaginas botones así de interactivos para tus clientes?"
            title="Cada elemento diseñado para que actúen."
            sub="Hover, animaciones, feedback inmediato — cada interacción comunica calidad."
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

            {/* Feature cards with SpotlightCard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-xs text-white/25 uppercase tracking-widest mb-5 text-center lg:text-left">
                Tarjetas con efecto glow — pasa el cursor
              </p>
              {[
                {
                  icon: <Zap className="w-5 h-5 text-[#D4AF37]" />,
                  title: 'Velocidad que retiene clientes',
                  desc: 'Google penaliza sitios lentos. Tu web carga en menos de 2 segundos.',
                },
                {
                  icon: <Smartphone className="w-5 h-5 text-[#D4AF37]" />,
                  title: '100% móvil, tablet y desktop',
                  desc: 'El 70% de tus clientes llega desde el celular. Nada se rompe.',
                },
                {
                  icon: <BarChart3 className="w-5 h-5 text-[#D4AF37]" />,
                  title: 'Métricas que puedes leer',
                  desc: 'Dashboard claro: visitas, fuentes, conversiones. Sin tecnicismos.',
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
          3. FORM DEMO
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="¿Qué tal un formulario que realmente funciona?"
            title="Tener formularios que funcionen al 100%."
            sub="Validación en tiempo real, feedback instantáneo. Complétalo — funciona de verdad."
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
                  Lo que incluye cada formulario
                </p>
                <div className="space-y-4">
                  {[
                    'Validación en tiempo real mientras escribe',
                    'Mensajes de error claros y amigables',
                    'Animación de éxito que genera confianza',
                    'Notificación a tu celular por cada lead',
                    'Conexión con WhatsApp y tu CRM',
                    'Anti-spam — sin captchas molestos',
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
                <p className="text-sm text-white/55 leading-relaxed">
                  <span className="text-[#D4AF37] font-semibold">Cada formulario</span> queda
                  conectado con tu flujo de ventas. Cuando alguien lo llena,
                  tú recibes el lead en tu celular en segundos.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. BENTO FEATURES — SpotlightCard grid
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="¿Todo esto en tu sitio web?"
            title="Todo lo que incluye tu página web."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Layers className="w-6 h-6 text-[#D4AF37]" />, title: 'Diseño personalizado', desc: 'Sin plantillas. Tu marca, tu identidad, desde cero.', span: 'lg:col-span-2' },
              { icon: <Zap className="w-6 h-6 text-[#D4AF37]" />, title: 'Ultra rápido', desc: 'Menos de 2 segundos. Google lo premia con mejor posición.', span: '' },
              { icon: <Globe className="w-6 h-6 text-[#D4AF37]" />, title: 'SEO desde el día 1', desc: 'Estructura técnica para que te encuentren en Google.', span: '' },
              { icon: <Smartphone className="w-6 h-6 text-[#D4AF37]" />, title: '100% Responsive', desc: 'Perfecto en celular, tablet y escritorio sin excepción.', span: '' },
              { icon: <Code2 className="w-6 h-6 text-[#D4AF37]" />, title: 'Integración CRM', desc: 'Cada lead de tu web entra directo a tu sistema de ventas.', span: 'lg:col-span-2' },
              { icon: <BarChart3 className="w-6 h-6 text-[#D4AF37]" />, title: 'Analytics integrado', desc: 'Reportes claros de visitas, fuentes y comportamiento.', span: '' },
              { icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />, title: 'SSL + Seguridad', desc: 'Candado verde, dominio propio, configuración segura.', span: '' },
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
          5. METRICS
          ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
            {[
              { n: 340, s: '%', label: 'Más leads', sub: 'promedio vs. sin sistema' },
              { n: 15, s: 'd', label: 'Entrega típica', sub: 'desde briefing al lanzamiento' },
              { n: 100, s: '%', label: 'Personalizado', sub: 'sin plantillas genéricas' },
              { n: 24, s: '/7', label: 'Tu web trabaja', sub: 'sin días de descanso' },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-gold mb-2 leading-none">
                  <Counter to={stat.n} suffix={stat.s} />
                </div>
                <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-[11px] text-white/30 leading-snug">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. ANTES / DESPUÉS
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader question="¿Ves la diferencia?" title="Sin DK vs. Con Delta Kilo." />

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
                  <span className="text-sm font-bold text-red-400/80">Sin una web profesional</span>
                </div>
                <div className="space-y-4">
                  {[
                    'Carga lenta — los visitantes se van en 3 segundos',
                    'Diseño genérico que no inspira confianza',
                    'Sin CTAs claros — nadie sabe qué hacer',
                    'No aparece en Google',
                    'Leads perdidos por formularios rotos',
                    'Sin conexión con tu proceso de ventas',
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
                    'Carga en menos de 2 segundos — retención alta',
                    'Diseño premium que genera confianza instantánea',
                    'CTAs estratégicos que dirigen al cliente a contactarte',
                    'SEO técnico desde el día uno',
                    'Formularios conectados con WhatsApp y CRM',
                    'Parte de tu sistema completo de ventas',
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
          7. PROCESO
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <DemoHeader
            question="¿Cómo lo hacemos?"
            title="4 pasos del briefing al lanzamiento."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '01', title: 'Briefing estratégico', desc: 'Entendemos tu negocio, tu cliente ideal y el objetivo principal del sitio.' },
              { n: '02', title: 'Estructura y diseño', desc: 'Wireframes y propuesta visual revisada y aprobada por ti antes de construir.' },
              { n: '03', title: 'Desarrollo premium', desc: 'Código limpio, animaciones, performance optimizado y SEO técnico.' },
              { n: '04', title: 'Lanzamiento live', desc: 'Publicamos, conectamos con tus herramientas y tu sitio empieza a generar.' },
            ].map((step, i) => (
              <motion.div key={i}
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
          8. CTA FINAL
          ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#080808] border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="space-y-6">

            {/* Top line */}
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

            <div className="space-y-2">
              <p className="text-[#D4AF37] font-semibold text-xs sm:text-sm uppercase tracking-widest">
                Próximo paso
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text leading-tight">
                ¿Lista tu web<br />para vender?
              </h2>
            </div>

            <p className="text-sm sm:text-base text-white/40 leading-relaxed max-w-sm mx-auto">
              Cuéntanos sobre tu negocio. En menos de 24 horas tienes una propuesta personalizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/5215663864984?text=Hola,%20me%20interesa%20una%20página%20web%20profesional%20💊"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold
                           bg-[#D4AF37] text-[#0e0e0e] rounded-xl
                           hover:bg-[#E5C158] transition-all duration-300
                           shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl group"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Comenzar por WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                           border border-white/10 text-white/60 rounded-xl
                           hover:border-white/20 hover:text-white transition-all">
                Solicitar propuesta
              </Link>
            </div>

            <p className="text-[11px] text-white/20 pt-2">
              Sin compromiso · Propuesta gratuita · Respuesta en &lt;24h
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
