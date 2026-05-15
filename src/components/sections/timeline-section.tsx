'use client';

import React, {
  useRef, useState, useEffect, useCallback,
  useMemo, createContext, useContext,
} from 'react';
import { motion, useInView } from 'framer-motion';

// ── Palette ────────────────────────────────────────────────────
const DK = {
  bg: '#0A0E12',
  surface: '#121820',
  surface2: '#1B242F',
  border: 'rgba(255,255,255,0.08)',
  teal: '#29C7D6',
  tealDim: '#1a7a85',
  tealGlow: 'rgba(41,199,214,0.55)',
  text: '#F4F1EA',
  muted: '#7A8593',
  danger: '#E56B5A',
  green: '#5BD3A6',
} as const;

// ── Easing ─────────────────────────────────────────────────────
const Easing = {
  linear:        (t: number) => t,
  easeInQuad:    (t: number) => t * t,
  easeOutQuad:   (t: number) => t * (2 - t),
  easeInCubic:   (t: number) => t * t * t,
  easeOutCubic:  (t: number) => { const s = t - 1; return s * s * s + 1; },
  easeInOutCubic:(t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutBack:   (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Deterministic pseudo-random (avoids SSR/hydration issues)
const seedRand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

// ── Timeline context ───────────────────────────────────────────
interface TLCtx {
  time: number; duration: number; playing: boolean;
  setTime: (t: number) => void;
  setPlaying: (p: boolean | ((p: boolean) => boolean)) => void;
}
const TimelineCtx = createContext<TLCtx>({
  time: 0, duration: 56, playing: false, setTime: () => {}, setPlaying: () => {},
});
const useTimeline = () => useContext(TimelineCtx);

// ── Sprite context ─────────────────────────────────────────────
interface SPCtx { localTime: number; progress: number; duration: number; visible: boolean; }
const SpriteCtx = createContext<SPCtx>({ localTime: 0, progress: 0, duration: 0, visible: false });
const useSprite = () => useContext(SpriteCtx);

function Sprite({
  start = 0, end = Infinity, children, keepMounted = false,
}: { start?: number; end?: number; children: React.ReactNode; keepMounted?: boolean }) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const dur = end - start;
  const lt = Math.max(0, time - start);
  const prog = dur > 0 && isFinite(dur) ? clamp(lt / dur, 0, 1) : 0;
  return (
    <SpriteCtx.Provider value={{ localTime: lt, progress: prog, duration: dur, visible }}>
      {children}
    </SpriteCtx.Provider>
  );
}

// ── UI Primitives ──────────────────────────────────────────────

function GridBg({ opacity = 0.08, size = 80 }: { opacity?: number; size?: number }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,${opacity}) 1px,transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
      maskImage: 'radial-gradient(ellipse at center,black 40%,transparent 85%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center,black 40%,transparent 85%)',
    }} />
  );
}

function Vignette() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.75) 100%)',
    }} />
  );
}

function ScanLine({ duration = 4, opacity = 0.25 }: { duration?: number; opacity?: number }) {
  const { localTime } = useSprite();
  const y = ((localTime % duration) / duration) * 1080;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: 0, height: 2,
      transform: `translateY(${y}px)`,
      background: `linear-gradient(90deg,transparent,${DK.teal},transparent)`,
      opacity, boxShadow: `0 0 24px ${DK.tealGlow}`,
    }} />
  );
}

function Caption({
  line1, line2, y = 900, align = 'center', tealWord,
}: { line1?: string; line2?: string; y?: number; align?: 'center' | 'left'; tealWord?: string }) {
  const { localTime, duration } = useSprite();
  const entry = 0.7, exit = 0.7;
  const exitStart = duration - exit;
  let op = 1, ty = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    op = t; ty = (1 - t) * 24;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    op = 1 - t; ty = -t * 12;
  }
  const left = align === 'center' ? 960 : 120;
  const tx = align === 'center' ? '-50%' : '0';

  const render = (text: string) => {
    if (!tealWord) return text;
    const parts = text.split(tealWord);
    if (parts.length < 2) return text;
    return <>{parts[0]}<span style={{ color: DK.teal }}>{tealWord}</span>{parts[1]}</>;
  };

  const baseStyle: React.CSSProperties = {
    fontFamily: 'Inter,system-ui,sans-serif', fontSize: 48,
    letterSpacing: '-0.02em', color: DK.text, lineHeight: 1.15, maxWidth: 1400,
  };

  return (
    <div style={{
      position: 'absolute', left, top: y,
      transform: `translate(${tx},${ty}px)`, opacity: op,
      display: 'flex', flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      gap: 8, textAlign: align,
    }}>
      {line1 && <div style={{ ...baseStyle, fontWeight: 300 }}>{render(line1)}</div>}
      {line2 && <div style={{ ...baseStyle, fontWeight: 600 }}>{render(line2)}</div>}
    </div>
  );
}

function TimeStamp({ x = 60, y = 60, label = 'DK//01', sub }: { x?: number; y?: number; label?: string; sub?: string }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      fontFamily: "'JetBrains Mono',ui-monospace,monospace",
      fontSize: 13, color: DK.muted, letterSpacing: '0.1em',
      display: 'flex', gap: 18, alignItems: 'center',
    }}>
      <span style={{ color: DK.teal }}>●</span>
      <span>{label}</span>
      {sub && <span style={{ opacity: 0.7 }}>{sub}</span>}
    </div>
  );
}

function SceneLabel({ num, total = 9, title }: { num: number; total?: number; title: string }) {
  return (
    <div style={{
      position: 'absolute', right: 60, top: 60,
      fontFamily: "'JetBrains Mono',ui-monospace,monospace",
      fontSize: 13, letterSpacing: '0.2em', color: DK.muted,
      display: 'flex', gap: 20, alignItems: 'center',
    }}>
      <span style={{ color: DK.text }}>{String(num).padStart(2, '0')}</span>
      <span style={{ width: 32, height: 1, background: DK.border, display: 'inline-block' }} />
      <span>{String(total).padStart(2, '0')}</span>
      <span style={{ marginLeft: 8, color: DK.text, letterSpacing: '0.25em' }}>{title}</span>
    </div>
  );
}

function GlowLine({
  x1, y1, x2, y2, progress = 1, color = DK.teal, width = 2,
}: { x1: number; y1: number; x2: number; y2: number; progress?: number; color?: string; width?: number }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const visibleLen = len * clamp(progress, 0, 1);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  return (
    <div style={{
      position: 'absolute', left: x1, top: y1,
      width: visibleLen, height: width,
      background: `linear-gradient(90deg,${color}00,${color})`,
      transform: `rotate(${ang}deg)`, transformOrigin: '0 50%',
      boxShadow: `0 0 12px ${color}88,0 0 24px ${color}44`, opacity: 0.9,
    }} />
  );
}

function DeltaTriangle({
  size = 200, x = 0, y = 0, progress = 1, teal = true, strokeWidth = 3,
}: { size?: number; x?: number; y?: number; progress?: number; teal?: boolean; strokeWidth?: number }) {
  const s = size, h = s * Math.sqrt(3) / 2;
  const pts = `${s / 2},0 ${s},${h} 0,${h}`;
  const perim = 3 * s;
  const dash = perim * clamp(progress, 0, 1);
  return (
    <svg width={s} height={h} style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      <polygon points={pts} fill="none"
        stroke={teal ? DK.teal : DK.text} strokeWidth={strokeWidth}
        strokeDasharray={`${dash} ${perim}`} strokeLinejoin="round"
        style={{ filter: teal ? `drop-shadow(0 0 12px ${DK.tealGlow})` : 'none' }} />
    </svg>
  );
}

// ── Scene 1 sub-components ─────────────────────────────────────

function ChatsMock() {
  const data = [
    { n: 'Cliente 01', m: 'precio del paquete?', u: 3 },
    { n: 'Cliente 02', m: 'sigo esperando…', u: 7 },
    { n: 'Cliente 03', m: 'agendamos?', u: 1 },
    { n: 'Cliente 04', m: 'hola, información?', u: 2 },
    { n: 'Cliente 05', m: 'gracias', u: 0 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {data.map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px', background: i % 2 ? 'transparent' : 'rgba(255,255,255,0.02)', borderRadius: 4 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: '#2a3440', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: DK.text, fontSize: 12, fontWeight: 500 }}>{c.n}</div>
            <div style={{ color: DK.muted, fontSize: 11 }}>{c.m}</div>
          </div>
          {c.u > 0 && <div style={{ background: DK.danger, color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 10, fontWeight: 600 }}>{c.u}</div>}
        </div>
      ))}
    </div>
  );
}

function SheetMock() {
  const cols = ['Lead', 'Fuente', 'Estado', '$', 'Fecha'];
  return (
    <div style={{ fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 6, color: DK.muted, paddingBottom: 6, borderBottom: `1px solid ${DK.border}` }}>
        {cols.map(c => <div key={c}>{c}</div>)}
      </div>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 6, color: DK.text, padding: '5px 0', borderBottom: `1px solid ${DK.border}` }}>
          <div>Cliente {String(i + 1).padStart(2, '0')}</div>
          <div style={{ color: DK.muted }}>{['FB', 'IG', 'Web', 'WA', 'Ref'][i % 5]}</div>
          <div style={{ color: [DK.muted, DK.teal, '#d4a24e'][i % 3] }}>{['nuevo', 'seguim.', 'pend.'][i % 3]}</div>
          <div>{['12k', '8k', '24k', '3k', '—'][i % 5]}</div>
          <div style={{ color: DK.muted }}>04/{10 + i}</div>
        </div>
      ))}
    </div>
  );
}

function LeadsMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ color: DK.muted, fontSize: 11, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>LEADS SIN RESPONDER</div>
      <div style={{ fontSize: 42, fontWeight: 700, color: DK.danger, fontFamily: 'Inter,system-ui,sans-serif' }}>47</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 40 + seedRand(i * 7 + 3) * 60, background: i % 3 === 0 ? DK.danger : DK.surface2, borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

function InboxMock() {
  const times = [3, 7, 1, 9, 2, 11];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: 6, borderBottom: `1px solid ${DK.border}`, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: i < 3 ? DK.teal : DK.muted, flexShrink: 0 }} />
          <div style={{ color: i < 3 ? DK.text : DK.muted, fontSize: 11, flex: 1 }}>Re: Cotización #{2000 + i * 17}</div>
          <div style={{ color: DK.muted, fontSize: 10, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>{times[i]}h</div>
        </div>
      ))}
    </div>
  );
}

function CallsMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ color: DK.muted, fontSize: 11, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>LLAMADAS PERDIDAS — HOY</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: DK.text }}>23</div>
        <div style={{ color: DK.danger, fontSize: 14 }}>↑ 58%</div>
      </div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 60 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 20 + Math.abs(Math.sin(i)) * 40, background: DK.surface2, borderRadius: 1 }} />
        ))}
      </div>
    </div>
  );
}

function Monitor({
  x, y, w, h, tilt = 0, delay = 0, content,
}: { x: number; y: number; w: number; h: number; tilt?: number; delay?: number; content: string }) {
  const { localTime } = useSprite();
  const t = clamp(localTime - delay, 0, 1);
  const op = Easing.easeOutCubic(t);
  const flicker = 0.85 + Math.sin(localTime * 6 + delay * 10) * 0.08;
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
      background: DK.surface, border: `1px solid ${DK.border}`, borderRadius: 6,
      transform: `rotate(${tilt}deg)`, opacity: op,
      boxShadow: `0 0 80px rgba(41,199,214,${0.04 * flicker}),inset 0 1px 0 rgba(255,255,255,0.04)`,
      overflow: 'hidden',
    }}>
      <div style={{ height: 22, background: '#0b1117', borderBottom: `1px solid ${DK.border}`, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6 }}>
        {['#3a4452', '#3a4452', '#3a4452'].map((bg, i) => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: 4, background: bg, display: 'inline-block' }} />
        ))}
      </div>
      <div style={{ padding: 16 }}>
        {content === 'chats' && <ChatsMock />}
        {content === 'sheet' && <SheetMock />}
        {content === 'leads' && <LeadsMock />}
        {content === 'inbox' && <InboxMock />}
        {content === 'calls' && <CallsMock />}
      </div>
    </div>
  );
}

function NotifBubble({ x, y, t, text }: { x: number; y: number; t: number; text: string }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  if (delta < 0 || delta > 1.4) return null;
  const op = delta < 0.2 ? delta / 0.2 : delta > 1.0 ? 1 - (delta - 1.0) / 0.4 : 1;
  const scale = delta < 0.3 ? Easing.easeOutBack(delta / 0.3) : 1;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%,-50%) scale(${scale})`, opacity: op,
      background: DK.danger, color: '#fff', padding: '6px 12px', borderRadius: 14,
      fontFamily: 'Inter,system-ui,sans-serif', fontSize: 14, fontWeight: 600,
      boxShadow: '0 4px 20px rgba(229,107,90,0.5)',
    }}>{text}</div>
  );
}

function Scene1Origin() {
  const { progress } = useSprite();
  const camScale = 1 + progress * 0.08;
  const camY = progress * -20;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#05080B' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${camScale}) translateY(${camY}px)`, transformOrigin: 'center 60%' }}>
        <div style={{ position: 'absolute', left: '30%', top: '40%', width: '40%', height: '60%', background: 'radial-gradient(ellipse at center,rgba(255,180,80,0.08),transparent 70%)' }} />
        <Monitor x={180} y={180} w={520} h={340} tilt={-1.2} delay={0} content="chats" />
        <Monitor x={760} y={140} w={520} h={340} tilt={0.8} delay={0.3} content="sheet" />
        <Monitor x={1340} y={200} w={440} h={320} tilt={-0.6} delay={0.6} content="leads" />
        <Monitor x={420} y={560} w={480} h={300} tilt={1.5} delay={0.9} content="inbox" />
        <Monitor x={980} y={540} w={560} h={340} tilt={-0.4} delay={1.2} content="calls" />
        <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 800, height: 180, background: 'radial-gradient(ellipse at 50% 0%,#000 40%,transparent 70%)', filter: 'blur(4px)' }} />
        <NotifBubble x={700} y={280} t={1.0} text="3 nuevos" />
        <NotifBubble x={1250} y={380} t={1.7} text="!" />
        <NotifBubble x={380} y={640} t={2.3} text="12" />
        <NotifBubble x={1550} y={480} t={2.9} text="5" />
        <NotifBubble x={880} y={700} t={3.5} text="8" />
      </div>
      <ScanLine duration={6} opacity={0.12} />
      <Vignette />
      <TimeStamp label="DK//01" sub="02:47 AM" />
      <SceneLabel num={1} title="ORIGEN" />
      <Caption line1="Todo comenzó con una idea…" line2="y mucho desorden." tealWord="idea" />
    </div>
  );
}

// ── Scene 2 sub-components ─────────────────────────────────────

function NodeLabel({ x, y, label, t }: { x: number; y: number; label: string; t: number }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  if (delta < 0) return null;
  const op = Easing.easeOutCubic(clamp(delta / 0.5, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: 'translate(-50%,-50%)' }}>
      <div style={{ width: 80, height: 80, borderRadius: 40, border: `1px solid ${DK.border}`, background: DK.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: DK.teal, boxShadow: `0 0 12px ${DK.teal}` }} />
      </div>
      <div style={{ position: 'absolute', left: '50%', top: 'calc(100% + 10px)', transform: 'translateX(-50%)', color: DK.muted, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 13, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{label.toUpperCase()}</div>
    </div>
  );
}

function HubNode({ x, y, appearAt }: { x: number; y: number; appearAt: number }) {
  const { localTime } = useSprite();
  const delta = localTime - appearAt;
  if (delta < 0) return null;
  const op = Easing.easeOutCubic(clamp(delta / 0.8, 0, 1));
  const scale = 0.6 + 0.4 * Easing.easeOutBack(clamp(delta / 0.8, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${scale})`, opacity: op }}>
      <div style={{ width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 80, border: `1px solid ${DK.teal}`, boxShadow: `0 0 40px ${DK.tealGlow},inset 0 0 40px ${DK.tealGlow}`, animation: 'dk-pulse 2.5s ease-in-out infinite' }} />
        <DeltaTriangle size={96} x={32} y={40} progress={clamp(delta / 0.8, 0, 1)} />
      </div>
    </div>
  );
}

function Scene2Discovery() {
  const { localTime, progress } = useSprite();
  const nodes = [
    { x: 360, y: 340, label: 'WhatsApp', t: 0.1, hub: false },
    { x: 1560, y: 300, label: 'CRM', t: 0.3, hub: false },
    { x: 1680, y: 640, label: 'Sheets', t: 0.5, hub: false },
    { x: 260, y: 700, label: 'Email', t: 0.7, hub: false },
    { x: 960, y: 540, label: 'Delta Kilo', t: 1.2, hub: true },
    { x: 700, y: 220, label: 'Leads', t: 0.9, hub: false },
    { x: 1280, y: 760, label: 'Ventas', t: 1.1, hub: false },
  ];
  const hub = nodes.find(n => n.hub)!;
  const others = nodes.filter(n => !n.hub);
  const connStart = 3.2;
  const camX = Math.sin(progress * Math.PI) * 20;
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.05} />
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${camX}px)` }}>
        {others.map((n, i) => {
          const p = clamp((localTime - (connStart + i * 0.15)) / 0.8, 0, 1);
          return <GlowLine key={`l${i}`} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} progress={p} />;
        })}
        {others.map((n, i) => <NodeLabel key={i} x={n.x} y={n.y} label={n.label} t={n.t} />)}
        <HubNode x={hub.x} y={hub.y} appearAt={hub.t} />
      </div>
      <ScanLine duration={5} opacity={0.15} />
      <Vignette />
      <SceneLabel num={2} title="DESCUBRIMIENTO" />
      <TimeStamp label="DK//02" sub="CONECTANDO" />
      <Caption line1="Los negocios no fallan por falta de clientes…" line2="fallan por falta de sistema." tealWord="sistema" />
    </div>
  );
}

// ── Scene 3 sub-components ─────────────────────────────────────

function ChatPanel({ x, y }: { x: number; y: number }) {
  const { localTime } = useSprite();
  const msgs = [
    { t: 0.3, from: 'user', text: 'Hola, quiero información' },
    { t: 1.0, from: 'bot', text: '¡Hola! Soy tu asistente. ¿Qué te interesa?' },
    { t: 2.0, from: 'user', text: 'el paquete premium' },
    { t: 2.8, from: 'bot', text: 'Perfecto. Te envío detalles y agendo llamada ✓' },
    { t: 4.0, from: 'bot', text: 'Cita confirmada: jueves 3:00 pm' },
  ];
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 660, height: 780, background: DK.surface, borderRadius: 16, border: `1px solid ${DK.border}`, padding: 20, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: `0 20px 80px rgba(0,0,0,0.5),0 0 40px ${DK.tealGlow}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: `1px solid ${DK.border}` }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: DK.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ color: DK.bg, fontSize: 16, fontWeight: 700 }}>DK</div>
        </div>
        <div>
          <div style={{ color: DK.text, fontSize: 16, fontWeight: 600 }}>Asistente Delta Kilo</div>
          <div style={{ color: DK.green, fontSize: 12 }}>● en línea · responde al instante</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        {msgs.map((m, i) => {
          const delta = localTime - m.t;
          if (delta < 0) return null;
          const op = clamp(delta / 0.35, 0, 1);
          const isBot = m.from === 'bot';
          return (
            <div key={i} style={{ alignSelf: isBot ? 'flex-start' : 'flex-end', maxWidth: '80%', background: isBot ? DK.surface2 : DK.teal, color: isBot ? DK.text : DK.bg, padding: '12px 16px', borderRadius: 16, borderBottomLeftRadius: isBot ? 4 : 16, borderBottomRightRadius: isBot ? 16 : 4, fontSize: 16, opacity: op, transform: `translateY(${(1 - op) * 10}px)`, fontWeight: isBot ? 400 : 500 }}>{m.text}</div>
          );
        })}
      </div>
    </div>
  );
}

function PipelinePanel({ x, y }: { x: number; y: number }) {
  const { localTime } = useSprite();
  const cols = [
    { name: 'NUEVO', cards: ['Lead #2104', 'Lead #2105', 'Lead #2106'], t: 0.5, color: DK.teal },
    { name: 'CALIFICADO', cards: ['Lead #2091', 'Lead #2098'], t: 1.5, color: '#d4a24e' },
    { name: 'CITA', cards: ['Lead #2082'], t: 2.5, color: DK.green },
    { name: 'CERRADO', cards: ['Lead #2075'], t: 3.5, color: '#9b7bd4' },
  ];
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 920, height: 780, background: DK.surface, borderRadius: 16, border: `1px solid ${DK.border}`, padding: 24, boxShadow: `0 20px 80px rgba(0,0,0,0.5)` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ color: DK.text, fontSize: 20, fontWeight: 600 }}>Pipeline de Ventas</div>
        <div style={{ color: DK.muted, fontSize: 12, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>AUTOMATIZADO</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, height: 'calc(100% - 50px)' }}>
        {cols.map((c, i) => {
          const colAppear = clamp((localTime - c.t + 0.3) / 0.5, 0, 1);
          return (
            <div key={i} style={{ background: '#0b1117', borderRadius: 10, padding: 12, opacity: colAppear, display: 'flex', flexDirection: 'column', gap: 8, border: `1px solid ${DK.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: c.color }} />
                <div style={{ color: DK.muted, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 10, letterSpacing: '0.15em' }}>{c.name}</div>
                <div style={{ marginLeft: 'auto', color: DK.text, fontSize: 12 }}>{c.cards.length}</div>
              </div>
              {c.cards.map((card, j) => {
                const delta = localTime - (c.t + j * 0.3);
                if (delta < 0) return null;
                const op = clamp(delta / 0.4, 0, 1);
                return (
                  <div key={j} style={{ background: DK.surface2, borderRadius: 6, padding: 10, opacity: op, transform: `translateX(${(1 - op) * -20}px)`, border: `1px solid ${DK.border}` }}>
                    <div style={{ color: DK.text, fontSize: 13, fontWeight: 500 }}>{card}</div>
                    <div style={{ color: DK.muted, fontSize: 11, marginTop: 4 }}>WhatsApp · hace {j + 1}m</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Scene3First() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.04} />
      <ChatPanel x={140} y={140} />
      <PipelinePanel x={900} y={140} />
      <ScanLine duration={5} opacity={0.12} />
      <Vignette />
      <SceneLabel num={3} title="PRIMERAS SOLUCIONES" />
      <TimeStamp label="DK//03" sub="BOT ACTIVO" />
      <Caption line1="Así nace Delta Kilo:" line2="automatización con propósito." tealWord="Delta Kilo" />
    </div>
  );
}

// ── Scene 4 sub-components ─────────────────────────────────────

function ClientCard({ t, x, y, industry, name, metric, stat }: {
  t: number; x: number; y: number; industry: string; name: string; metric: string; stat: string;
}) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  if (delta < 0) return null;
  const op = Easing.easeOutCubic(clamp(delta / 0.7, 0, 1));
  const numMatch = metric.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const displayNum = Math.round(num * clamp(delta / 1.8, 0, 1));
  const prefix = numMatch ? metric.slice(0, metric.indexOf(numMatch[0])) : '';
  const suffix = numMatch ? metric.slice(metric.indexOf(numMatch[0]) + numMatch[0].length) : '';
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 420, height: 300, background: DK.surface, border: `1px solid ${DK.border}`, borderRadius: 12, padding: 28, opacity: op, transform: `translateY(${(1 - op) * 40}px)`, boxShadow: `0 20px 60px rgba(0,0,0,0.5)`, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ color: DK.teal, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 12, letterSpacing: '0.2em' }}>{industry}</div>
      <div style={{ color: DK.text, fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>{name}</div>
      <div style={{ flex: 1 }} />
      <div>
        <div style={{ color: DK.text, fontSize: 56, fontWeight: 700, letterSpacing: '-0.02em' }}>{prefix}{displayNum}{suffix}</div>
        <div style={{ color: DK.muted, fontSize: 14, marginTop: 4 }}>{stat}</div>
      </div>
      <div style={{ position: 'absolute', right: 24, top: 24, width: 10, height: 10, borderRadius: 5, background: DK.green, boxShadow: `0 0 12px ${DK.green}` }} />
    </div>
  );
}

function TransformStrip({ y }: { y: number }) {
  const { localTime } = useSprite();
  const flow = clamp((localTime - 1.8) / 1.5, 0, 1);
  return (
    <div style={{ position: 'absolute', left: 140, top: y, width: 1640, height: 360 }}>
      <div style={{ position: 'absolute', left: 0, top: 40, width: 480, height: 280, background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ color: DK.muted, fontSize: 12, fontFamily: "'JetBrains Mono',ui-monospace,monospace", letterSpacing: '0.15em' }}>CONVERSACIÓN</div>
        <div style={{ alignSelf: 'flex-start', background: DK.surface2, color: DK.text, padding: '10px 14px', borderRadius: 14, fontSize: 15 }}>Quiero ver la casa</div>
        <div style={{ alignSelf: 'flex-end', background: DK.teal, color: DK.bg, padding: '10px 14px', borderRadius: 14, fontSize: 15, fontWeight: 500 }}>Perfecto. Jueves 5 pm ✓</div>
        <div style={{ alignSelf: 'flex-start', background: DK.surface2, color: DK.text, padding: '10px 14px', borderRadius: 14, fontSize: 15 }}>¡Gracias!</div>
      </div>
      <div style={{ position: 'absolute', left: 500, top: 180, width: 580, height: 4 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: `${flow * 100}%`, height: 4, background: `linear-gradient(90deg,${DK.teal}00,${DK.teal})`, boxShadow: `0 0 16px ${DK.tealGlow}` }} />
        <div style={{ position: 'absolute', left: `${flow * 100}%`, top: -6, width: 16, height: 16, borderRadius: 8, background: DK.teal, boxShadow: `0 0 24px ${DK.teal}`, transform: 'translateX(-50%)' }} />
      </div>
      <div style={{ position: 'absolute', right: 0, top: 40, width: 480, height: 280, background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`, padding: 24, opacity: flow }}>
        <div style={{ color: DK.muted, fontSize: 12, fontFamily: "'JetBrains Mono',ui-monospace,monospace", letterSpacing: '0.15em' }}>CITA CONFIRMADA</div>
        <div style={{ marginTop: 14, color: DK.text, fontSize: 22, fontWeight: 600 }}>Visita — Casa del Valle</div>
        <div style={{ marginTop: 10, color: DK.teal, fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>Jue · 5:00 PM</div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: DK.green }} />
          <div style={{ color: DK.muted, fontSize: 14 }}>recordatorio automático en 24 h</div>
        </div>
      </div>
    </div>
  );
}

function Scene4Clients() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.05} />
      <ClientCard t={0.3} x={140} y={180} industry="INMOBILIARIA" name="Casa del Valle" metric="+38 citas" stat="en 14 días" />
      <ClientCard t={0.9} x={760} y={180} industry="CLÍNICA" name="Salud Integral MX" metric="+127 pacientes" stat="mes 1" />
      <ClientCard t={1.5} x={1380} y={180} industry="MOTOPARTES" name="MotoEje" metric="+212%" stat="ventas online" />
      <TransformStrip y={540} />
      <ScanLine duration={5} opacity={0.1} />
      <Vignette />
      <SceneLabel num={4} title="PRIMEROS CLIENTES" />
      <TimeStamp label="DK//04" sub="EN PRODUCCIÓN" />
      <Caption line1="Los primeros clientes no compraron software…" line2="compraron orden." tealWord="orden" />
    </div>
  );
}

// ── Scene 5 sub-components ─────────────────────────────────────

function TerminalCursor() {
  const { localTime } = useSprite();
  const blink = Math.floor(localTime * 2) % 2;
  return <div style={{ display: 'inline-block', width: 12, height: 22, background: DK.teal, opacity: blink ? 1 : 0.2, marginLeft: 6, verticalAlign: 'middle' }} />;
}

function MetricBlock({ label, target, suffix = '', t }: { label: string; target: number; suffix?: string; t: number }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  const p = clamp(delta / 1.2, 0, 1);
  const val = target * Easing.easeOutCubic(p);
  const display = target % 1 === 0 ? Math.round(val) : val.toFixed(2);
  return (
    <div>
      <div style={{ color: DK.muted, fontSize: 13, letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ color: DK.text, fontSize: 54, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Inter,system-ui,sans-serif', fontVariantNumeric: 'tabular-nums' }}>
        {display}<span style={{ color: DK.teal, fontSize: 32 }}>{suffix}</span>
      </div>
    </div>
  );
}

function Scene5Learning() {
  const { localTime, progress } = useSprite();
  const camScale = 1 + progress * 0.05;
  const logs = [
    { t: 0.2, level: 'ERR', text: 'FLOW_404  → trigger not matched', code: DK.danger },
    { t: 0.6, level: 'ERR', text: 'WEBHOOK_TIMEOUT  (attempt 3 of 3)', code: DK.danger },
    { t: 1.0, level: 'WRN', text: 'retrying queue  [==>       ]', code: '#d4a24e' },
    { t: 1.5, level: 'WRN', text: 'flow_v2 / rebuild ...', code: '#d4a24e' },
    { t: 2.2, level: 'OK',  text: 'test_lead_001 ✓  response 420ms', code: DK.green },
    { t: 2.7, level: 'OK',  text: 'test_lead_002 ✓  response 380ms', code: DK.green },
    { t: 3.2, level: 'OK',  text: 'deploy → production  stable', code: DK.green },
    { t: 3.8, level: 'OK',  text: 'uptime 99.94%  ·  avg 412ms', code: DK.green },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#05080B' }}>
      <GridBg opacity={0.04} />
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${camScale})`, transformOrigin: 'center center' }}>
        <div style={{ position: 'absolute', left: 180, top: 160, width: 1100, height: 720, background: '#05090D', borderRadius: 12, border: `1px solid ${DK.border}`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 20px', background: '#0b1117', borderBottom: `1px solid ${DK.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            {([DK.danger, '#d4a24e', DK.green] as string[]).map((bg, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: bg, display: 'inline-block' }} />)}
            <span style={{ color: DK.muted, fontSize: 12, marginLeft: 20, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>delta-kilo / flows / debug.log</span>
          </div>
          <div style={{ padding: 28, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 17, lineHeight: 1.7, flex: 1 }}>
            {logs.map((l, i) => {
              const delta = localTime - l.t;
              if (delta < 0) return null;
              return (
                <div key={i} style={{ display: 'flex', gap: 16, opacity: clamp(delta / 0.25, 0, 1) }}>
                  <span style={{ color: DK.muted, width: 60 }}>{String(i + 1).padStart(3, '0')}</span>
                  <span style={{ color: l.code, width: 52, fontWeight: 600 }}>{l.level}</span>
                  <span style={{ color: DK.text, flex: 1 }}>{l.text}</span>
                </div>
              );
            })}
            <TerminalCursor />
          </div>
        </div>
        <div style={{ position: 'absolute', right: 180, top: 160, width: 440, height: 720, background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`, padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ color: DK.muted, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 12, letterSpacing: '0.2em' }}>ITERACIONES</div>
          <MetricBlock label="flujos reconstruidos" target={47} t={0.8} />
          <MetricBlock label="pruebas automatizadas" target={312} t={1.6} />
          <MetricBlock label="uptime actual" target={99.94} suffix="%" t={2.8} />
          <div style={{ flex: 1 }} />
          <div style={{ borderTop: `1px solid ${DK.border}`, paddingTop: 20, color: DK.muted, fontSize: 13, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>
            <div style={{ color: DK.teal }}>› principio</div>
            <div style={{ color: DK.text, fontFamily: 'Inter,system-ui,sans-serif', fontSize: 15, marginTop: 6, lineHeight: 1.5 }}>
              automatizar sin pensar como negocio<br />no es automatización. Es ruido.
            </div>
          </div>
        </div>
      </div>
      <ScanLine duration={6} opacity={0.12} />
      <Vignette />
      <SceneLabel num={5} title="APRENDIZAJE" />
      <TimeStamp label="DK//05" sub="ITERANDO" />
      <Caption line1="Aprendimos que automatizar no es suficiente…" line2="hay que pensar como negocio." tealWord="negocio" />
    </div>
  );
}

// ── Scene 6 sub-components ─────────────────────────────────────

function ModuleCard({ x, y, w, h, t, title, children }: {
  x: number; y: number; w: number; h: number; t: number; title: string; children: React.ReactNode;
}) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  const op = Easing.easeOutCubic(clamp(delta / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`, padding: 24, opacity: op, transform: `translateY(${(1 - op) * 30}px)`, boxShadow: `0 20px 60px rgba(0,0,0,0.4)`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ color: DK.teal, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 12, letterSpacing: '0.2em' }}>{title}</div>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: DK.green, boxShadow: `0 0 10px ${DK.green}` }} />
      </div>
      <div style={{ height: 'calc(100% - 30px)' }}>{children}</div>
    </div>
  );
}

function CRMMini() {
  const { localTime } = useSprite();
  return (
    <div style={{ display: 'flex', gap: 20, height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: DK.muted, fontSize: 13 }}>ingresos mes</div>
        <div style={{ color: DK.text, fontSize: 54, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Inter,system-ui,sans-serif' }}>$842K</div>
        <div style={{ color: DK.green, fontSize: 14 }}>↑ 34% vs. anterior</div>
      </div>
      <div style={{ flex: 1.2, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        {Array.from({ length: 14 }).map((_, i) => {
          const h = 30 + Math.sin(i * 0.8) * 40 + 60 + i * 6;
          const fade = clamp(localTime * 3 - i * 0.15, 0, 1);
          return <div key={i} style={{ flex: 1, height: h * fade, background: i === 13 ? DK.teal : DK.surface2, borderRadius: 2, boxShadow: i === 13 ? `0 0 16px ${DK.tealGlow}` : 'none' }} />;
        })}
      </div>
    </div>
  );
}

function TypingDot({ d }: { d: number }) {
  const { localTime } = useSprite();
  return <div style={{ width: 8, height: 8, borderRadius: 4, background: DK.teal, opacity: 0.3 + 0.7 * Math.abs(Math.sin(localTime * 4 + d * 8)) }} />;
}

function AIAssistantMini() {
  const { localTime } = useSprite();
  const msgs = [
    { t: 1.2, from: 'u', text: 'resume mis leads de hoy' },
    { t: 1.8, from: 'ai', text: '17 leads nuevos · 9 calificados · 3 listos para cerrar' },
    { t: 2.6, from: 'ai', text: 'sugerencia: llamar a "García Lopez" antes de las 3 pm' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', justifyContent: 'center' }}>
      {msgs.map((m, i) => {
        const delta = localTime - m.t;
        if (delta < 0) return null;
        const isAi = m.from === 'ai';
        return (
          <div key={i} style={{ alignSelf: isAi ? 'flex-start' : 'flex-end', maxWidth: '85%', padding: '10px 14px', borderRadius: 12, background: isAi ? DK.surface2 : DK.teal, color: isAi ? DK.text : DK.bg, fontSize: 15, opacity: clamp(delta / 0.3, 0, 1), fontWeight: isAi ? 400 : 500 }}>{m.text}</div>
        );
      })}
      <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, marginTop: 8, opacity: clamp(localTime - 3.0, 0, 1) }}>
        <TypingDot d={0} /><TypingDot d={0.2} /><TypingDot d={0.4} />
      </div>
    </div>
  );
}

function FollowUpMini() {
  const { localTime } = useSprite();
  const steps = [
    { t: 1.6, label: 'Mensaje inicial', time: '0 min' },
    { t: 2.2, label: 'Recordatorio suave', time: '+24 h' },
    { t: 2.8, label: 'Oferta personalizada', time: '+3 días' },
    { t: 3.4, label: 'Cierre IA', time: '+7 días' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      {steps.map((s, i) => {
        const delta = localTime - s.t;
        if (delta < 0) return null;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: clamp(delta / 0.4, 0, 1) }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, border: `2px solid ${DK.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DK.teal, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: DK.text, fontSize: 16, fontWeight: 500 }}>{s.label}</div>
              <div style={{ color: DK.muted, fontSize: 12, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>{s.time}</div>
            </div>
            <div style={{ color: DK.green, fontSize: 13 }}>✓ enviado</div>
          </div>
        );
      })}
    </div>
  );
}

function VoiceAgentMini() {
  const { localTime } = useSprite();
  const startT = 1.9;
  const wave = Array.from({ length: 32 }).map((_, i) => {
    const amp = Math.sin(localTime * 4 + i * 0.4) * 0.5 + Math.sin(localTime * 6 + i * 0.7) * 0.3;
    return Math.abs(amp) * 40 * clamp(localTime - startT, 0, 1) + 4;
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <div style={{ color: DK.text, fontSize: 16, fontWeight: 500 }}>Llamada entrante → Atendida por IA</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 80 }}>
        {wave.map((h, i) => <div key={i} style={{ flex: 1, height: h, background: DK.teal, borderRadius: 2, boxShadow: `0 0 8px ${DK.tealGlow}` }} />)}
      </div>
      <div style={{ display: 'flex', gap: 16, color: DK.muted, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 13 }}>
        <span>00:47</span><span>·</span><span>intención: cotizar</span><span>·</span><span style={{ color: DK.green }}>agendado ✓</span>
      </div>
    </div>
  );
}

function Scene6Evolution() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.05} />
      <ModuleCard x={140} y={140} w={820} h={360} t={0.2} title="CRM DASHBOARD"><CRMMini /></ModuleCard>
      <ModuleCard x={980} y={140} w={820} h={360} t={0.7} title="ASISTENTE IA"><AIAssistantMini /></ModuleCard>
      <ModuleCard x={140} y={520} w={820} h={360} t={1.2} title="SEGUIMIENTO AUTOMATIZADO"><FollowUpMini /></ModuleCard>
      <ModuleCard x={980} y={520} w={820} h={360} t={1.7} title="AGENTE DE VOZ"><VoiceAgentMini /></ModuleCard>
      <ScanLine duration={5} opacity={0.1} />
      <Vignette />
      <SceneLabel num={6} title="EVOLUCIÓN" />
      <TimeStamp label="DK//06" sub="ECOSISTEMA ACTIVO" />
      <Caption line1="De chatbots…" line2="a ecosistemas completos de ventas." tealWord="ecosistemas" />
    </div>
  );
}

// ── Scene 7 sub-components ─────────────────────────────────────

function MiniStat({ label, before, after, t }: { label: string; before: string; after: string; t: number }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  return (
    <div style={{ opacity: clamp(delta / 0.5, 0, 1) }}>
      <div style={{ color: DK.muted, fontSize: 11, fontFamily: "'JetBrains Mono',ui-monospace,monospace", letterSpacing: '0.2em' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
        <div style={{ color: DK.muted, fontSize: 17, textDecoration: 'line-through' }}>{before}</div>
        <div style={{ color: DK.teal, fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>{after}</div>
      </div>
    </div>
  );
}

function Scene7Strategic() {
  const { localTime } = useSprite();
  const rows = [
    { t: 0.6, title: 'Roadmap comercial', status: 'en revisión' },
    { t: 1.0, title: 'Modelo de atribución', status: 'aprobado' },
    { t: 1.4, title: 'Rediseño del funnel', status: 'ejecutando' },
    { t: 1.8, title: 'Plan de contenidos IA', status: 'propuesto' },
    { t: 2.2, title: 'Expansión — 2 mercados', status: 'evaluando' },
  ];
  const cardOp = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.04} />
      <div style={{ position: 'absolute', left: 140, top: 160, width: 840, height: 720, background: DK.surface, borderRadius: 14, border: `1px solid ${DK.border}`, padding: 44, boxShadow: '0 20px 80px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: 28, opacity: cardOp, transform: `translateY(${(1 - cardOp) * 30}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: DK.teal, boxShadow: `0 0 14px ${DK.teal}` }} />
          <div style={{ color: DK.teal, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 13, letterSpacing: '0.25em' }}>INSIGHT ESTRATÉGICO</div>
        </div>
        <div style={{ color: DK.text, fontSize: 40, fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          Tu canal de <span style={{ color: DK.teal }}>WhatsApp</span> convierte 3.8× más cuando respondemos en menos de 2 minutos.
        </div>
        <div style={{ color: DK.muted, fontSize: 18, lineHeight: 1.5 }}>Recomendación: reasignar 40% del presupuesto de anuncios al canal orgánico de referidos este trimestre.</div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 24 }}>
          <MiniStat label="CAC" before="$1,240" after="$680" t={1.2} />
          <MiniStat label="LTV" before="$3.1K" after="$5.8K" t={1.6} />
          <MiniStat label="CICLO" before="28d" after="11d" t={2.0} />
        </div>
      </div>
      <div style={{ position: 'absolute', right: 140, top: 160, width: 700, height: 720, display: 'flex', flexDirection: 'column', gap: 18, opacity: clamp(localTime - 0.4, 0, 1) }}>
        <div style={{ color: DK.muted, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 12, letterSpacing: '0.25em', marginBottom: 6 }}>SESIÓN DE ESTRATEGIA · Q3 2026</div>
        {rows.map((r, i) => {
          const delta = localTime - r.t;
          if (delta < 0) return null;
          const op = Easing.easeOutCubic(clamp(delta / 0.5, 0, 1));
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, background: DK.surface, border: `1px solid ${DK.border}`, borderRadius: 10, padding: '20px 24px', opacity: op, transform: `translateX(${(1 - op) * 30}px)` }}>
              <div style={{ color: DK.muted, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 14 }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ flex: 1, color: DK.text, fontSize: 20, fontWeight: 500 }}>{r.title}</div>
              <div style={{ color: DK.teal, fontSize: 13, fontFamily: "'JetBrains Mono',ui-monospace,monospace", letterSpacing: '0.1em' }}>{r.status}</div>
            </div>
          );
        })}
      </div>
      <ScanLine duration={6} opacity={0.1} />
      <Vignette />
      <SceneLabel num={7} title="POSICIONAMIENTO" />
      <TimeStamp label="DK//07" sub="PARTNER MODE" />
      <Caption line1="No somos proveedores." line2="Somos socios estratégicos." tealWord="socios estratégicos" />
    </div>
  );
}

// ── Scene 8 sub-components ─────────────────────────────────────

function PipelineNode({ x, y, label, sub, t }: { x: number; y: number; label: string; sub: string; t: number }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  const op = Easing.easeOutCubic(clamp(delta / 0.6, 0, 1));
  const scale = 0.6 + 0.4 * Easing.easeOutBack(clamp(delta / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${scale})`, opacity: op }}>
      <div style={{ width: 28, height: 28, borderRadius: 14, background: DK.bg, border: `2px solid ${DK.teal}`, boxShadow: `0 0 24px ${DK.tealGlow}` }} />
      <div style={{ position: 'absolute', left: '50%', top: 48, transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }}>
        <div style={{ color: DK.text, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 13, letterSpacing: '0.2em' }}>{label}</div>
        <div style={{ color: DK.muted, fontSize: 13, marginTop: 6 }}>{sub}</div>
      </div>
    </div>
  );
}

function Scene8Present() {
  const { localTime } = useSprite();
  const stages = [
    { x: 200, label: 'ENTRADA DE LEADS', sub: 'multi-canal' },
    { x: 720, label: 'CALIFICACIÓN IA', sub: 'en segundos' },
    { x: 1240, label: 'SEGUIMIENTO', sub: 'automatizado' },
    { x: 1720, label: 'CIERRE', sub: 'asistido' },
  ];
  const yCenter = 540;
  const leads = Array.from({ length: 7 }).map((_, i) => ({ id: i, offset: i * 0.6 }));
  const railP = clamp((localTime - 0.3) / 1.2, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.04} />
      <div style={{ position: 'absolute', left: 180, right: 180, top: yCenter - 1, height: 2, background: `linear-gradient(90deg,transparent,${DK.teal}44,${DK.teal}44,transparent)` }} />
      <div style={{
        position: 'absolute', left: 180, right: 180, top: yCenter - 1, height: 2,
        background: `linear-gradient(90deg,transparent,${DK.teal},transparent)`,
        boxShadow: `0 0 24px ${DK.tealGlow}`,
        maskImage: `linear-gradient(90deg,transparent ${railP * 100 - 20}%,black ${railP * 100}%,transparent ${railP * 100 + 10}%)`,
        WebkitMaskImage: `linear-gradient(90deg,transparent ${railP * 100 - 20}%,black ${railP * 100}%,transparent ${railP * 100 + 10}%)`,
      }} />
      {stages.map((s, i) => <PipelineNode key={i} x={s.x} y={yCenter} label={s.label} sub={s.sub} t={0.3 + i * 0.4} />)}
      {leads.map((l) => {
        const local = (localTime + l.offset) % 5.5;
        const prog = clamp(local / 3.5, 0, 1);
        if (local < 0.2 || local > 3.7) return null;
        return <div key={l.id} style={{ position: 'absolute', left: 200 + prog * 1520 - 8, top: yCenter - 8, width: 16, height: 16, borderRadius: 8, background: DK.teal, boxShadow: `0 0 20px ${DK.teal},0 0 40px ${DK.tealGlow}` }} />;
      })}
      <div style={{ position: 'absolute', left: '50%', top: 220, transform: 'translateX(-50%)', textAlign: 'center', opacity: clamp(localTime - 0.5, 0, 1) }}>
        <div style={{ color: DK.muted, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 13, letterSpacing: '0.3em' }}>HOY · EN VIVO</div>
        <div style={{ color: DK.text, fontSize: 96, fontWeight: 300, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>
          {Math.round(8247 + Easing.easeOutCubic(clamp(localTime / 3, 0, 1)) * 412).toLocaleString('es-MX')}
        </div>
        <div style={{ color: DK.teal, fontSize: 18, fontFamily: "'JetBrains Mono',ui-monospace,monospace", letterSpacing: '0.15em' }}>CONVERSACIONES PROCESADAS</div>
      </div>
      <ScanLine duration={4} opacity={0.1} />
      <Vignette />
      <SceneLabel num={8} title="HOY" />
      <TimeStamp label="DK//08" sub="LIVE" />
      <Caption line1="Hoy, Delta Kilo convierte procesos complejos" line2="en sistemas simples." tealWord="sistemas simples" />
    </div>
  );
}

// ── Scene 9 ────────────────────────────────────────────────────

function Scene9Future() {
  const { localTime, progress } = useSprite();
  const buildings = useMemo(() => {
    const arr: { x: number; w: number; h: number }[] = [];
    const rng = (n: number) => { const x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x); };
    for (let i = 0; i < 22; i++) arr.push({ x: 40 + i * 88, w: 50 + rng(i) * 40, h: 180 + rng(i + 99) * 360 });
    return arr;
  }, []);
  const camZoom = 1 + progress * 0.12;
  const camY = progress * -30;
  const paths: [string, number][] = [
    ['M 200 820 Q 500 400, 800 760', 0.2],
    ['M 400 760 Q 900 300, 1400 680', 0.5],
    ['M 600 740 Q 1200 500, 1700 700', 0.8],
    ['M 1000 780 Q 1400 350, 1800 620', 1.1],
    ['M 150 700 Q 700 250, 1250 720', 1.4],
  ];
  const agentPos: [number, number][] = [[300, 280], [680, 180], [1080, 240], [1480, 160], [1760, 320], [500, 360], [920, 340], [1300, 380]];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#03060A' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%', background: `radial-gradient(ellipse at center bottom,${DK.tealDim}33,transparent 70%)` }} />
      <GridBg opacity={0.06} size={100} />
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${camZoom}) translateY(${camY}px)`, transformOrigin: 'center 80%' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 600 }}>
          {buildings.map((b, i) => (
            <div key={i} style={{ position: 'absolute', left: b.x, bottom: 0, width: b.w, height: b.h, background: `linear-gradient(180deg,${DK.surface},${DK.bg})`, border: `1px solid ${DK.border}`, borderBottom: 'none' }}>
              {Array.from({ length: Math.floor(b.h / 24) }).map((_, r) => (
                <div key={r} style={{ display: 'flex', gap: 4, padding: '6px 6px 0' }}>
                  {Array.from({ length: Math.max(2, Math.floor(b.w / 14)) }).map((_, c) => {
                    const lit = ((r * 7 + c * 13 + i * 3) % 5) < 3;
                    const flicker = lit && Math.sin(localTime * 2 + i + r * 0.3 + c * 0.7) > 0.6;
                    return <div key={c} style={{ flex: 1, height: 8, background: lit ? (flicker ? DK.teal : DK.tealDim) : 'transparent', opacity: lit ? (flicker ? 0.9 : 0.35) : 0, boxShadow: flicker ? `0 0 8px ${DK.teal}` : 'none' }} />;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1920 1080" preserveAspectRatio="none">
          {paths.map(([d, delay], i) => {
            const p = clamp((localTime - delay) / 1.5, 0, 1);
            return <path key={i} d={d} fill="none" stroke={DK.teal} strokeWidth="2" strokeDasharray="2000" strokeDashoffset={2000 * (1 - p)} style={{ filter: `drop-shadow(0 0 6px ${DK.teal})`, opacity: 0.8 }} />;
          })}
        </svg>
        {agentPos.map(([x, y], i) => {
          const appear = clamp(localTime - 1.8 - i * 0.15, 0, 1);
          const float = Math.sin(localTime * 1.5 + i) * 6;
          return <div key={i} style={{ position: 'absolute', left: x, top: y + float, width: 12, height: 12, borderRadius: 6, background: DK.teal, opacity: appear, boxShadow: `0 0 16px ${DK.teal},0 0 32px ${DK.tealGlow}`, animation: 'dk-pulse 2.5s ease-in-out infinite' }} />;
        })}
      </div>
      <Vignette />
      <SceneLabel num={9} title="FUTURO" />
      <TimeStamp label="DK//09" sub="2026 →" />
      <Caption line1="El futuro no es trabajar más…" line2="es trabajar con sistemas inteligentes." tealWord="sistemas inteligentes" />
    </div>
  );
}

// ── Scene 10 ───────────────────────────────────────────────────

function Scene10Logo() {
  const { localTime } = useSprite();
  const logoAppear = Easing.easeOutCubic(clamp(localTime / 0.8, 0, 1));
  const textAppear = clamp(localTime - 0.6, 0, 1);
  const tagAppear = clamp(localTime - 1.2, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.03} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 900, background: `radial-gradient(circle,${DK.tealGlow},transparent 60%)`, opacity: logoAppear * 0.6 }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-58%) scale(${0.9 + logoAppear * 0.1})`, opacity: logoAppear, width: 540, height: 540 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/timeline/assets/logo-circle.png" alt="Delta Kilo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(1.1) drop-shadow(0 0 40px rgba(41,199,214,0.4))' }} />
      </div>
      <div style={{ position: 'absolute', left: '50%', top: 'calc(50% + 260px)', transform: 'translateX(-50%)', textAlign: 'center', opacity: textAppear }}>
        <div style={{ color: DK.text, fontFamily: 'Inter,system-ui,sans-serif', fontSize: 64, fontWeight: 300, letterSpacing: '0.3em', marginBottom: 16 }}>DELTA KILO</div>
        <div style={{ color: DK.teal, fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 16, letterSpacing: '0.5em', marginBottom: 28 }}>SOLUCIONES</div>
        <div style={{ width: 80, height: 1, background: DK.border, margin: '0 auto 24px', opacity: tagAppear }} />
        <div style={{ color: DK.muted, fontFamily: 'Inter,system-ui,sans-serif', fontSize: 22, fontWeight: 400, letterSpacing: '0.05em', fontStyle: 'italic', opacity: tagAppear }}>Automatizamos tu crecimiento.</div>
      </div>
      <Vignette />
    </div>
  );
}

// ── Video (all scenes) ─────────────────────────────────────────

const SCENES = [
  { start: 0,    end: 5.2,  Comp: Scene1Origin },
  { start: 5.2,  end: 10.8, Comp: Scene2Discovery },
  { start: 10.8, end: 16.4, Comp: Scene3First },
  { start: 16.4, end: 22.2, Comp: Scene4Clients },
  { start: 22.2, end: 28.2, Comp: Scene5Learning },
  { start: 28.2, end: 34.0, Comp: Scene6Evolution },
  { start: 34.0, end: 39.8, Comp: Scene7Strategic },
  { start: 39.8, end: 45.2, Comp: Scene8Present },
  { start: 45.2, end: 50.4, Comp: Scene9Future },
  { start: 50.4, end: 56.0, Comp: Scene10Logo },
] as const;

const DURATION = 56.0;
const FADE = 0.4;

function SceneFader({ start, end, Comp }: { start: number; end: number; Comp: React.ComponentType }) {
  const { time } = useTimeline();
  if (time < start - FADE || time > end + FADE) return null;
  let op = 1;
  if (time < start) op = (time - (start - FADE)) / FADE;
  else if (time > end) op = 1 - (time - end) / FADE;
  op = Math.max(0, Math.min(1, op));
  return (
    <Sprite start={start} end={end} keepMounted>
      <div style={{ position: 'absolute', inset: 0, opacity: op }}><Comp /></div>
    </Sprite>
  );
}

function Video() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {SCENES.map((s, i) => <SceneFader key={i} start={s.start} end={s.end} Comp={s.Comp} />)}
      {/* Film grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
        opacity: 0.04, mixBlendMode: 'overlay',
      }} />
    </div>
  );
}

// ── Playback bar ───────────────────────────────────────────────

function PBIconButton({ children, onClick, title }: { children: React.ReactNode; onClick: () => void; title?: string }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#f6f4ef', cursor: 'pointer', padding: 0, transition: 'background 120ms', flexShrink: 0 }}>
      {children}
    </button>
  );
}

function PlaybackBar({ time, duration, playing, onPlayPause, onReset, onSeek, onHover }: {
  time: number; duration: number; playing: boolean;
  onPlayPause: () => void; onReset: () => void;
  onSeek: (t: number) => void; onHover: (t: number | null) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const mono = "'JetBrains Mono',ui-monospace,SFMono-Regular,monospace";

  const timeFromEvent = useCallback((e: { clientX: number }) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    return clamp((e.clientX - rect.left) / rect.width, 0, 1) * duration;
  }, [duration]);

  useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = (e: MouseEvent) => onSeek(timeFromEvent(e));
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mouseup', onUp); window.removeEventListener('mousemove', onMove); };
  }, [dragging, timeFromEvent, onSeek]);

  const pct = duration > 0 ? (time / duration) * 100 : 0;
  const fmt = (t: number) => {
    const s = Math.floor(t % 60), m = Math.floor(t / 60), cs = Math.floor((t * 100) % 100);
    return `${m}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(20,20,20,0.92)', borderTop: '1px solid rgba(255,255,255,0.08)', width: '100%', maxWidth: 680, alignSelf: 'center', borderRadius: 8, color: '#f6f4ef', userSelect: 'none', flexShrink: 0 }}>
      <PBIconButton onClick={onReset} title="Inicio (0)">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2v10M12 2L5 7l7 5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" /></svg>
      </PBIconButton>
      <PBIconButton onClick={onPlayPause} title="Reproducir/Pausar (Espacio)">
        {playing
          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="2" width="3" height="10" fill="currentColor" /><rect x="8" y="2" width="3" height="10" fill="currentColor" /></svg>
          : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2l9 5-9 5V2z" fill="currentColor" /></svg>
        }
      </PBIconButton>
      <div style={{ fontFamily: mono, fontSize: 12, fontVariantNumeric: 'tabular-nums', width: 64, textAlign: 'right', color: '#f6f4ef' }}>{fmt(time)}</div>
      <div ref={trackRef}
        onMouseMove={(e) => { const t = timeFromEvent(e); dragging ? onSeek(t) : onHover(t); }}
        onMouseLeave={() => { if (!dragging) onHover(null); }}
        onMouseDown={(e) => { setDragging(true); onSeek(timeFromEvent(e)); onHover(null); }}
        style={{ flex: 1, height: 22, position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 4, background: DK.teal, borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', width: 12, height: 12, marginLeft: -6, marginTop: -6, background: '#fff', borderRadius: 6, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }} />
      </div>
      <div style={{ fontFamily: mono, fontSize: 12, fontVariantNumeric: 'tabular-nums', width: 64, textAlign: 'left', color: 'rgba(246,244,239,0.55)' }}>{fmt(duration)}</div>
    </div>
  );
}

// ── Animation Stage ────────────────────────────────────────────

function AnimStage({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Auto-scale to container
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const barH = 52;
    const measure = () => {
      const s = Math.min(el.clientWidth / 1920, (el.clientHeight - barH) / 1080);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!playing) { lastTsRef.current = null; return; }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => { const next = t + dt; return next >= DURATION ? next % DURATION : next; });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTsRef.current = null; };
  }, [playing]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt?.tagName === 'INPUT' || tgt?.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); setPlaying(p => !p); }
      else if (e.code === 'ArrowLeft') setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, DURATION));
      else if (e.code === 'ArrowRight') setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, DURATION));
      else if (e.key === '0' || e.code === 'Home') setTime(0);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = useMemo<TLCtx>(
    () => ({ time: displayTime, duration: DURATION, playing, setTime, setPlaying }),
    [displayTime, playing],
  );

  return (
    <div ref={stageRef} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0a0a0a' }}>
      <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: 0 }}>
        <div style={{ width: 1920, height: 1080, background: DK.bg, position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
          <TimelineCtx.Provider value={ctxValue}>
            {children}
          </TimelineCtx.Provider>
        </div>
      </div>
      <PlaybackBar
        time={displayTime} duration={DURATION} playing={playing}
        onPlayPause={() => setPlaying(p => !p)}
        onReset={() => setTime(0)}
        onSeek={(t) => setTime(t)}
        onHover={(t) => setHoverTime(t)}
      />
    </div>
  );
}

// ── TimelineSection (exported) ─────────────────────────────────

export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative bg-[#080808] border-t border-white/5 overflow-hidden"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Ambient top line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(13,207,207,0.25),transparent)' }} />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#0dcfcf] font-semibold mb-3">
              Nuestra historia
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold gradient-text leading-[1.15]">
              De la idea al sistema.
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm sm:text-right">
            10 escenas · 56 segundos · El camino completo de Delta Kilo.
          </p>
        </motion.div>
      </div>

      {/* Player */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        {/* 16:9 + playbar space (~58%) */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#0dcfcf]/10 shadow-[0_0_80px_rgba(13,207,207,0.05)]"
          style={{ paddingBottom: '58%' }}
        >
          {isInView && (
            <div className="absolute inset-0">
              <AnimStage>
                <Video />
              </AnimStage>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-white/25 tracking-wide">
          Usa{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-mono text-[10px]">Space</kbd>
          {' '}para reproducir ·{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-mono text-[10px]">← →</kbd>
          {' '}para navegar
        </p>
      </motion.div>

      {/* Keyframes */}
      <style>{`
        @keyframes dk-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes dk-dash { to { stroke-dashoffset: -40; } }
      `}</style>
    </section>
  );
}
