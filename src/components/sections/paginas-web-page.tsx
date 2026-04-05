'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, Globe, MousePointer2, Layers, Code2, BarChart3, ShieldCheck, Smartphone } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   SPOTLIGHT CARD — Inspired by 21st.dev (self-contained)
   ═══════════════════════════════════════════════════════════════ */
function SpotlightCard({
  children, className = '', color = 'rgba(212,175,55,0.18)',
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
                  hover:border-[#D4AF37]/25 transition-colors duration-300 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
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
   MOCK BROWSER — shows a demo mini-website
   ═══════════════════════════════════════════════════════════════ */
function MockBrowser() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
      {/* Browser chrome */}
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-[#111] rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/40 font-mono">tuclienta.com</span>
          </div>
        </div>
      </div>
      {/* Simulated site */}
      <div className="bg-[#060606] relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Gold glow */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 60%)' }} />

        {/* Simulated nav */}
        <div className="absolute top-0 left-0 right-0 h-10 flex items-center px-6 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#D4AF37]/80 rounded" />
            <div className="w-16 h-2 bg-white/30 rounded-full" />
          </div>
          <div className="flex gap-4">
            {[0,1,2].map(i => <div key={i} className="w-10 h-1.5 bg-white/15 rounded-full" />)}
          </div>
          <div className="w-16 h-6 rounded-lg bg-[#D4AF37]/70" />
        </div>

        {/* Simulated hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 pt-10">
          <div className="w-24 h-1.5 bg-[#D4AF37]/50 rounded-full" />
          <div className="w-64 h-5 bg-white/70 rounded-full" />
          <div className="w-56 h-5 bg-white/50 rounded-full" />
          <div className="w-48 h-4 bg-[#D4AF37]/60 rounded-full" />
          <div className="w-40 h-3 bg-white/20 rounded-full" />
          <div className="w-40 h-3 bg-white/15 rounded-full" />
          <div className="flex gap-3 mt-2">
            <div className="w-20 h-7 rounded-lg bg-[#D4AF37]/80" />
            <div className="w-20 h-7 rounded-lg border border-white/20" />
          </div>
        </div>

        {/* Floating stats card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-4 right-4 bg-[#111]/90 border border-white/10 rounded-xl p-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="w-16 h-1.5 bg-white/60 rounded-full mb-1" />
              <div className="w-12 h-1 bg-white/25 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="absolute top-14 left-4 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-xl px-3 py-2"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#D4AF37]/60" />
            <div className="w-14 h-1.5 bg-[#D4AF37]/50 rounded-full" />
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
    if (fields.message.length < 10) e.message = 'Cuéntanos un poco más (mín. 10 caracteres)';
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

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-12 text-center gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center"
            >
              <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
            </motion.div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">¡Mensaje recibido!</h4>
              <p className="text-sm text-white/50">Te contactaremos en menos de 2 horas hábiles.</p>
            </div>
            <button onClick={reset}
              className="text-xs text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors underline underline-offset-4">
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="space-y-4">
            {/* Name */}
            <div>
              <div className={`relative rounded-xl border transition-all duration-200 overflow-hidden
                ${errors.name ? 'border-red-500/60 bg-red-500/5' : focused === 'name' ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-white/10 bg-white/[0.03]'}`}>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={fields.name}
                  onChange={e => { setFields(p => ({ ...p, name: e.target.value })); if (errors.name) setErrors(p => ({ ...p, name: '' })); }}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none"
                />
                {fields.name && !errors.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>
              {errors.name && <p className="text-xs text-red-400 mt-1 ml-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <div className={`relative rounded-xl border transition-all duration-200 overflow-hidden
                ${errors.email ? 'border-red-500/60 bg-red-500/5' : focused === 'email' ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-white/10 bg-white/[0.03]'}`}>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={fields.email}
                  onChange={e => { setFields(p => ({ ...p, email: e.target.value })); if (errors.email) setErrors(p => ({ ...p, email: '' })); }}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none"
                />
                {fields.email.includes('@') && !errors.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <div className={`relative rounded-xl border transition-all duration-200 overflow-hidden
                ${errors.message ? 'border-red-500/60 bg-red-500/5' : focused === 'message' ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-white/10 bg-white/[0.03]'}`}>
                <textarea
                  placeholder="¿Qué tipo de sitio web necesitas?"
                  rows={3}
                  value={fields.message}
                  onChange={e => { setFields(p => ({ ...p, message: e.target.value })); if (errors.message) setErrors(p => ({ ...p, message: '' })); }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none resize-none"
                />
              </div>
              {errors.message && <p className="text-xs text-red-400 mt-1 ml-1">{errors.message}</p>}
            </div>

            <button type="submit" disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl
                         bg-[#D4AF37] text-[#0e0e0e] font-semibold text-sm
                         hover:bg-[#E5C158] active:bg-[#C49A2E]
                         disabled:opacity-70 transition-all duration-200
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
                <>
                  Enviar mensaje
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-white/25 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              Tus datos están seguros. Nunca spam.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BUTTON SHOWCASE
   ═══════════════════════════════════════════════════════════════ */
function ButtonShowcase() {
  const [hover, setHover] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);

  const btns = [
    { label: 'Contratar ahora', style: 'bg-[#D4AF37] text-[#0e0e0e] font-bold hover:bg-[#E5C158] shadow-lg hover:shadow-[#D4AF37]/30 hover:shadow-xl', tag: 'Primario' },
    { label: 'Saber más', style: 'bg-transparent text-white border border-white/20 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]', tag: 'Secundario' },
    { label: '⚡ Empezar hoy', style: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm', tag: 'Ghost' },
    { label: 'Ver demo →', style: 'text-[#D4AF37] hover:text-[#E5C158] underline underline-offset-4 decoration-[#D4AF37]/40', tag: 'Link' },
  ];

  return (
    <div className="space-y-3">
      {btns.map((btn, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-20 text-right">
            <span className="text-[10px] text-white/30 uppercase tracking-wider">{btn.tag}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setHover(i)}
            onHoverEnd={() => setHover(null)}
            onClick={() => { setClicked(i); setTimeout(() => setClicked(null), 600); }}
            className={`flex-1 px-5 py-3 rounded-xl text-sm transition-all duration-200 ${btn.style}
              ${clicked === i ? 'scale-95' : ''}`}
          >
            {clicked === i ? '✓ ¡Perfecto!' : btn.label}
          </motion.button>
          {hover === i && (
            <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-[10px] text-[#D4AF37]/60">
              <MousePointer2 className="w-3 h-3" />
              interactivo
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER — "¿Así te gustaría…?" style
   ═══════════════════════════════════════════════════════════════ */
function DemoHeader({ question, title, sub }: { question: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-3"
      >
        {question}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text leading-tight max-w-2xl mx-auto"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/45 text-base mt-4 max-w-xl mx-auto"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export function PaginasWebPage() {
  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen bg-[#080808] overflow-hidden flex items-center">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full pt-28 pb-20 lg:pt-32 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mb-8">
                  <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold text-[#D4AF37]/80 tracking-widest uppercase">Páginas Web Premium</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                <p className="text-[#D4AF37] font-bold text-lg mb-3 tracking-wide">¿Así te gustaría tu portada?</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-[-0.02em] mb-6">
                  <span className="gradient-text">Tu sitio web,</span>
                  <br />
                  <span className="gradient-text-gold">hecho para vender.</span>
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}
                className="text-base md:text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
                Diseñamos sitios web modernos, rápidos y enfocados en convertir visitantes en clientes.
                No solo presencia: <span className="text-white/70 font-medium">una herramienta de ventas activa</span>.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="https://wa.me/521XXXXXXXXXX?text=Hola,%20quiero%20una%20página%20web%20como%20la%20de%20Delta%20Kilo"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold
                             bg-[#D4AF37] text-[#0e0e0e] rounded-xl hover:bg-[#E5C158]
                             transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl group">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Quiero este diseño
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#demo-elementos" className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium
                           border border-white/10 text-white/70 rounded-xl hover:border-white/20 hover:text-white transition-all">
                  Ver el demo en vivo ↓
                </a>
              </motion.div>

              {/* Mini stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex items-center gap-6 pt-6 border-t border-white/5">
                {[
                  { n: 100, s: '%', label: 'Responsive' },
                  { n: 2, s: 's', label: 'Tiempo carga' },
                  { n: 15, s: '+', label: 'Días de entrega' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold text-white"><Counter to={stat.n} suffix={stat.s} /></div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Mock browser */}
            <motion.div initial={{ opacity: 0, x: 30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}>
              <MockBrowser />
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-white/30">Demo interactivo — así puede verse tu sitio</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. BUTTON / ELEMENTS DEMO ── */}
      <section id="demo-elementos" className="py-24 lg:py-32 bg-[#080808] border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <DemoHeader
            question="¿Imaginas botones así de interactivos para tus clientes?"
            title="Cada elemento, diseñado para que actúen."
            sub="Hover, click, animaciones — cada interacción comunica calidad y profesionalismo."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Button demo */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MousePointer2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-semibold text-white">Pasa el cursor — interactúa</span>
                </div>
                <ButtonShowcase />
              </div>
            </motion.div>

            {/* Cards demo */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="space-y-4">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-4 ml-1">Tarjetas con glow al hover →</p>
                {[
                  { icon: <Zap className="w-5 h-5 text-[#D4AF37]" />, title: 'Carga en menos de 2 segundos', desc: 'Google penaliza sitios lentos. Los tuyos arrancan al instante.' },
                  { icon: <Smartphone className="w-5 h-5 text-[#D4AF37]" />, title: '100% móvil, tablet y desktop', desc: 'El 70% de tus clientes llega desde el teléfono.' },
                  { icon: <BarChart3 className="w-5 h-5 text-[#D4AF37]" />, title: 'Analytics integrado', desc: 'Sabes exactamente qué funciona y qué no.' },
                ].map((card, i) => (
                  <SpotlightCard key={i} className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">{card.title}</h3>
                        <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. FORM DEMO ── */}
      <section className="py-24 lg:py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <DemoHeader
            question="¿Qué tal un formulario que realmente funciona?"
            title="Tener formularios que funcionen al 100%."
            sub="Validación en tiempo real, feedback instantáneo, integrado con tu CRM. Inténtalo ahora mismo."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-8">
                <div className="mb-6">
                  <h3 className="text-base font-bold text-white mb-1">Solicitar información</h3>
                  <p className="text-xs text-white/35">Ejemplo real — complétalo y ve la magia</p>
                </div>
                <FormDemo />
              </div>
            </motion.div>

            {/* What this means */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6">
              <div>
                <p className="text-xs text-[#D4AF37]/60 uppercase tracking-widest mb-4">Lo que incluye cada formulario</p>
                <div className="space-y-4">
                  {[
                    'Validación en tiempo real mientras el usuario escribe',
                    'Mensajes de error claros y amigables',
                    'Animación de éxito que inspira confianza',
                    'Conexión directa con WhatsApp y tu CRM',
                    'Notificación automática cada vez que llega un lead',
                    'Anti-spam integrado — sin captchas molestos',
                  ].map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <span className="text-sm text-white/55">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/15">
                <p className="text-sm text-[#D4AF37]/80 leading-relaxed">
                  <strong className="text-[#D4AF37]">Cada formulario</strong> queda conectado con tu flujo de ventas. Cuando alguien lo llena, tú recibes la notificación en tu celular.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. BENTO FEATURES — SpotlightCard grid ── */}
      <section className="py-24 lg:py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <DemoHeader
            question="¿Todo esto en tu sitio web?"
            title="Lo que incluye tu página web."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <Layers className="w-6 h-6 text-[#D4AF37]" />, title: 'Diseño personalizado',
                desc: 'Sin plantillas. Tu marca, tu identidad, desde cero.',
                size: 'lg:col-span-2',
              },
              {
                icon: <Zap className="w-6 h-6 text-[#D4AF37]" />, title: 'Ultra rápido',
                desc: 'Carga en menos de 2 segundos. Google lo ama.',
                size: '',
              },
              {
                icon: <Globe className="w-6 h-6 text-[#D4AF37]" />, title: 'SEO desde el día 1',
                desc: 'Estructura optimizada para que te encuentren en Google.',
                size: '',
              },
              {
                icon: <Smartphone className="w-6 h-6 text-[#D4AF37]" />, title: '100% Responsive',
                desc: 'Perfecto en celular, tablet y escritorio.',
                size: '',
              },
              {
                icon: <Code2 className="w-6 h-6 text-[#D4AF37]" />, title: 'Integración CRM',
                desc: 'Los leads de tu web van directo a tu sistema de gestión.',
                size: 'lg:col-span-2',
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-[#D4AF37]" />, title: 'Analytics integrado',
                desc: 'Reportes claros de visitas, fuentes y comportamiento.',
                size: '',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />, title: 'SSL + Seguridad',
                desc: 'Candado verde, dominio propio, seguridad total.',
                size: '',
              },
            ].map((feat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={feat.size}
              >
                <SpotlightCard className="p-7 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-5">
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{feat.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. METRICS BAR ── */}
      <section className="py-20 bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: 340, s: '%', label: 'Más leads en promedio', sub: 'vs. sitio sin sistema' },
              { n: 15, s: 'd', label: 'Entrega típica', sub: 'desde briefing al lanzamiento' },
              { n: 100, s: '%', label: 'Personalizado', sub: 'sin plantillas genéricas' },
              { n: 24, s: '/7', label: 'Tu web trabaja', sub: 'sin descanso ni días libres' },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl md:text-5xl font-bold gradient-text-gold mb-1">
                  <Counter to={stat.n} suffix={stat.s} />
                </div>
                <div className="text-sm font-semibold text-white mb-0.5">{stat.label}</div>
                <div className="text-[11px] text-white/30">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BEFORE / AFTER ── */}
      <section className="py-24 lg:py-32 bg-[#080808] border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <DemoHeader
            question="¿Ves la diferencia?"
            title="Sin DK vs. Con DK."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Without */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-7">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                    <span className="text-xs text-red-400">✕</span>
                  </div>
                  <span className="text-sm font-bold text-red-400/80">Sin una web profesional</span>
                </div>
                <div className="space-y-3">
                  {[
                    'Sitio lento, los visitantes se van en 3 segundos',
                    'Diseño genérico que no inspira confianza',
                    'Sin CTAs claros — nadie sabe qué hacer',
                    'No aparece en Google',
                    'Leads perdidos por falta de formularios',
                    'Sin conexión con tu proceso de ventas',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      </div>
                      <span className="text-sm text-white/40">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* With DK */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03] p-7">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                    <span className="text-xs text-[#D4AF37]">✓</span>
                  </div>
                  <span className="text-sm font-bold text-[#D4AF37]/80">Con Delta Kilo</span>
                </div>
                <div className="space-y-3">
                  {[
                    'Carga en menos de 2 segundos, retención alta',
                    'Diseño premium que genera confianza instantánea',
                    'CTAs estratégicos que llevan al cliente a contactarte',
                    'SEO técnico desde el día uno',
                    'Formularios conectados con WhatsApp y CRM',
                    'Parte de tu sistema completo de ventas',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <span className="text-sm text-white/65">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS ── */}
      <section className="py-24 lg:py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <DemoHeader
            question="¿Cómo lo hacemos?"
            title="4 pasos del briefing al lanzamiento."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '01', title: 'Briefing estratégico', desc: 'Entendemos tu negocio, cliente ideal y objetivos.' },
              { n: '02', title: 'Estructura y diseño', desc: 'Wireframes y propuesta visual aprobada por ti.' },
              { n: '03', title: 'Desarrollo premium', desc: 'Código limpio, animaciones, rendimiento y SEO.' },
              { n: '04', title: 'Lanzamiento', desc: 'Publicamos, conectamos y tu sitio empieza a generar resultados.' },
            ].map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <SpotlightCard className="p-6 h-full">
                  <div className="text-4xl font-bold text-[#D4AF37]/15 font-mono mb-4">{step.n}</div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ── */}
      <section className="py-24 lg:py-32 bg-[#080808] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-4">Próximo paso</p>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight mb-6">
              ¿Lista tu web<br />para vender?
            </h2>
            <p className="text-white/45 text-base leading-relaxed mb-10">
              Cuéntanos sobre tu negocio. En menos de 24 horas te contactamos con una propuesta personalizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20una%20página%20web%20profesional"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold
                           bg-[#D4AF37] text-[#0e0e0e] rounded-xl
                           hover:bg-[#E5C158] transition-all duration-300
                           shadow-lg hover:shadow-[#D4AF37]/25 hover:shadow-xl group">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Comenzar por WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium
                           border border-white/10 text-white/70 rounded-xl hover:border-white/20 hover:text-white transition-all">
                Solicitar propuesta →
              </Link>
            </div>

            <p className="text-xs text-white/20 mt-8">Sin compromiso · Respuesta en menos de 24h · Propuesta gratuita</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
