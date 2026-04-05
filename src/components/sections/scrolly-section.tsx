'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/* ────────────────────────────────────────────────────────────────
   Each "scene" in the scrollytelling narrative
   ──────────────────────────────────────────────────────────────── */
const SCENES = [
  {
    step: '01',
    label: 'El problema',
    title: 'Tu negocio pierde ventas cada día sin saberlo.',
    body: 'Leads que no reciben respuesta. Prospectos que se enfrían. Seguimientos que se olvidan. Sin un sistema conectado, cada oportunidad es un riesgo.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    color: '#ef4444',
    visual: <ProblemVisual />,
  },
  {
    step: '02',
    label: 'Captación automática',
    title: 'Cada lead es capturado y registrado al instante.',
    body: 'Integramos tus canales — WhatsApp, redes, web — en un flujo automático. Ningún prospecto se pierde, sin importar la hora o el canal.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    color: '#D4AF37',
    visual: <CaptureVisual />,
  },
  {
    step: '03',
    label: 'Atención inmediata',
    title: 'Respuesta automática 24/7, personalizada por canal.',
    body: 'Tu negocio responde en segundos. Chatbots inteligentes que califican, informan y agendan — mientras tú duermes o atiendes otro cliente.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    color: '#D4AF37',
    visual: <AttentionVisual />,
  },
  {
    step: '04',
    label: 'Seguimiento inteligente',
    title: 'Nunca pierdas contacto con un prospecto caliente.',
    body: 'Secuencias automáticas de seguimiento. Recordatorios, mensajes de reactivación y contenido de valor — todo activado por el comportamiento del prospecto.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    color: '#D4AF37',
    visual: <FollowupVisual />,
  },
  {
    step: '05',
    label: 'Sistema completo',
    title: 'Todo conectado. Un solo sistema para todo tu negocio.',
    body: 'CRM, atención, ventas, reportes y automatizaciones — funcionando juntos. Visibilidad total, control real y resultados medibles desde el primer mes.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: '#D4AF37',
    visual: <SystemVisual />,
  },
];

/* ────────────────────────────────────────────────────────────────
   Visual panels for each scene
   ──────────────────────────────────────────────────────────────── */
function ProblemVisual() {
  const items = [
    { label: 'Lead sin respuesta', delay: 0 },
    { label: 'Prospecto frío', delay: 0.15 },
    { label: 'Seguimiento olvidado', delay: 0.3 },
    { label: 'Venta perdida', delay: 0.45 },
  ];
  return (
    <div className="space-y-3 w-full max-w-xs">
      {items.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: item.delay }}
          className="flex items-center gap-3 bg-white/[0.04] border border-red-500/20 rounded-xl px-4 py-3"
        >
          <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
          <span className="text-sm text-white/60">{item.label}</span>
          <div className="ml-auto">
            <svg className="w-4 h-4 text-red-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center pt-2"
      >
        <span className="text-xs text-red-400/60 tracking-widest uppercase">Sin sistema = sin control</span>
      </motion.div>
    </div>
  );
}

function CaptureVisual() {
  const channels = [
    { name: 'WhatsApp', color: '#25D366' },
    { name: 'Instagram', color: '#E1306C' },
    { name: 'Web', color: '#D4AF37' },
    { name: 'Facebook', color: '#1877F2' },
  ];
  return (
    <div className="relative w-full max-w-xs">
      {/* Center hub */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 0 0 rgba(212,175,55,0.3)', '0 0 0 16px rgba(212,175,55,0)', '0 0 0 0 rgba(212,175,55,0)'] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center"
        >
          <svg className="w-7 h-7 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
        </motion.div>
      </div>
      {/* Channels */}
      <div className="grid grid-cols-2 gap-3">
        {channels.map((ch, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5"
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ch.color }} />
            <span className="text-xs text-white/60">{ch.name}</span>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-center"
      >
        <span className="text-[10px] text-[#D4AF37]/50 tracking-widest uppercase">Todo en un solo sistema</span>
      </motion.div>
    </div>
  );
}

function AttentionVisual() {
  return (
    <div className="w-full max-w-xs space-y-3">
      {/* Chat bubble — customer */}
      <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
        className="flex gap-2.5 items-end">
        <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-xs text-white/40">U</div>
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
          <p className="text-sm text-white/70">Hola, ¿cuánto cuesta el servicio?</p>
        </div>
      </motion.div>
      {/* Typing indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, delay: 0.5, repeat: 1 }}
        className="flex gap-2.5 items-end justify-end">
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl rounded-br-sm px-4 py-3">
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <motion.div key={i} animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
            ))}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex-shrink-0 flex items-center justify-center">
          <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
      </motion.div>
      {/* Bot response */}
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 1.6 }}
        className="flex gap-2.5 items-end justify-end">
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
          <p className="text-sm text-white/70">¡Hola! Gracias por escribirnos. Te comparto nuestros planes y agendamos una llamada. 🚀</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex-shrink-0 flex items-center justify-center">
          <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="flex justify-center mt-2">
        <span className="text-[10px] text-[#D4AF37]/50 tracking-widest uppercase">Respuesta en 3 segundos · 24/7</span>
      </motion.div>
    </div>
  );
}

function FollowupVisual() {
  const steps = [
    { day: 'Día 1', msg: 'Bienvenida + información enviada', done: true },
    { day: 'Día 3', msg: 'Recordatorio de seguimiento', done: true },
    { day: 'Día 7', msg: 'Caso de éxito compartido', done: false },
    { day: 'Día 14', msg: 'Oferta especial activada', done: false },
  ];
  return (
    <div className="w-full max-w-xs">
      <div className="relative pl-6">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent origin-top"
        />
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex items-start gap-3"
            >
              {/* Node */}
              <div className={`absolute left-0 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-0.5
                ${step.done
                  ? 'bg-[#D4AF37] border-[#D4AF37]'
                  : 'bg-[#080808] border-white/20'
                }`}
                style={{ marginTop: '2px', marginLeft: '-0.5px' }}
              />
              <div className={`${step.done ? '' : 'opacity-40'}`}>
                <div className="text-[10px] text-[#D4AF37]/60 uppercase tracking-wider">{step.day}</div>
                <div className="text-sm text-white/70 mt-0.5">{step.msg}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemVisual() {
  const modules = [
    { name: 'CRM', icon: '📊' },
    { name: 'WhatsApp', icon: '💬' },
    { name: 'Automatización', icon: '⚡' },
    { name: 'Reportes', icon: '📈' },
    { name: 'Agenda', icon: '📅' },
    { name: 'Ventas', icon: '🎯' },
  ];
  return (
    <div className="w-full max-w-xs">
      {/* Central node */}
      <div className="flex justify-center mb-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center relative"
        >
          <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          {/* Orbit ring */}
          <div className="absolute inset-[-8px] rounded-3xl border border-[#D4AF37]/15 border-dashed" />
        </motion.div>
      </div>
      {/* Module grid */}
      <div className="grid grid-cols-3 gap-2">
        {modules.map((mod, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white/[0.04] border border-[#D4AF37]/10 rounded-xl px-2 py-2.5 text-center
                       hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-colors"
          >
            <div className="text-lg mb-1">{mod.icon}</div>
            <div className="text-[9px] text-white/40 uppercase tracking-wider leading-tight">{mod.name}</div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-4 text-center">
        <span className="text-[10px] text-[#D4AF37]/60 tracking-widest uppercase">Todo conectado · Un solo sistema</span>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Progress bar per scene
   ──────────────────────────────────────────────────────────────── */
function SceneProgress({ active, total, current }: { active: number; total: number; current: number }) {
  return (
    <div className="flex gap-1.5 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="h-0.5 flex-1 rounded-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-[#D4AF37] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i < current ? 1 : i === current ? active : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Scene card — shown in sticky panel
   ──────────────────────────────────────────────────────────────── */
function SceneCard({ scene, progress }: { scene: typeof SCENES[0]; progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ background: `${scene.color}20`, color: scene.color, border: `1px solid ${scene.color}40` }}>
          {scene.step}
        </div>
        <span className="text-xs uppercase tracking-[0.18em] font-semibold"
          style={{ color: `${scene.color}99` }}>
          {scene.label}
        </span>
      </div>

      {/* Icon + title */}
      <div className="flex gap-4 mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${scene.color}12`, color: scene.color, border: `1px solid ${scene.color}25` }}>
          {scene.icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{scene.title}</h3>
      </div>

      {/* Body */}
      <p className="text-white/50 text-base leading-relaxed mb-8">{scene.body}</p>

      {/* Progress */}
      <SceneProgress active={progress} total={SCENES.length} current={parseInt(scene.step) - 1} />
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Main export
   ──────────────────────────────────────────────────────────────── */
export function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Each scene occupies 1/N of the total scroll range
  const n = SCENES.length;

  return (
    <section
      id="como-funciona"
      ref={containerRef}
      className="relative bg-[#080808]"
      style={{ height: `${n * 100}vh` }}
    >
      {/* Background texture */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)' }}
        />

        {/* Section label */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-[#D4AF37]/50 tracking-[0.25em] uppercase">Así funciona</span>
            <div className="w-px h-6 bg-gradient-to-b from-[#D4AF37]/30 to-transparent" />
          </motion.div>
        </div>

        {/* Main layout: text left, visual right */}
        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-20">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT: Scene text — animated per scroll */}
            <div className="relative">
              {SCENES.map((scene, i) => {
                const start = i / n;
                const end = (i + 1) / n;
                return (
                  <ScrollScene
                    key={scene.step}
                    scene={scene}
                    scrollProgress={smoothProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </div>

            {/* RIGHT: Visual panel — animated per scroll */}
            <div className="relative flex items-center justify-center min-h-[300px]">
              {SCENES.map((scene, i) => {
                const start = i / n;
                const end = (i + 1) / n;
                return (
                  <ScrollVisual
                    key={scene.step}
                    scene={scene}
                    scrollProgress={smoothProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll hint at bottom */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[9px] text-white/20 tracking-[0.2em] uppercase">Sigue scrolleando</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-[#D4AF37]/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   Per-scene wrappers that respond to scroll progress
   ──────────────────────────────────────────────────────────────── */
function ScrollScene({
  scene, scrollProgress, start, end,
}: {
  scene: typeof SCENES[0];
  scrollProgress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
}) {
  const mid = (start + end) / 2;
  const opacity = useTransform(scrollProgress, [start, start + 0.04, mid, end - 0.04, end], [0, 1, 1, 1, 0]);
  const y = useTransform(scrollProgress, [start, start + 0.05, end - 0.05, end], [32, 0, 0, -32]);
  const progressVal = useTransform(scrollProgress, [start, end], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <SceneCard scene={scene} progress={0} />
    </motion.div>
  );
}

function ScrollVisual({
  scene, scrollProgress, start, end,
}: {
  scene: typeof SCENES[0];
  scrollProgress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [start, start + 0.05, end - 0.05, end], [0.92, 1, 1, 0.92]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, scale }}
    >
      {/* Glass card background */}
      <div className="w-full max-w-sm bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8
                      backdrop-blur-sm shadow-2xl relative overflow-hidden">
        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${scene.color}15 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
        {scene.visual}
      </div>
    </motion.div>
  );
}
