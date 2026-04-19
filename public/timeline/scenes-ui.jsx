// Reusable UI primitives: grid background, chrome, small widgets
// All components share Delta Kilo palette:
//   bg #0A0E12, surface #121820, teal #29C7D6, warm-white #F4F1EA

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
};
window.DK = DK;

// Grid backdrop (subtle tech pattern)
function GridBg({ opacity = 0.08, size = 80 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: `${size}px ${size}px`,
      maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
    }}/>
  );
}

// Soft vignette
function Vignette() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
      pointerEvents: 'none',
    }}/>
  );
}

// Scanning teal line that moves top-to-bottom (ambient)
function ScanLine({ duration = 4, opacity = 0.25 }) {
  const { localTime } = useSprite();
  const y = ((localTime % duration) / duration) * 1080;
  return (
    <div style={{
      position: 'absolute',
      left: 0, right: 0, top: 0,
      height: 2,
      transform: `translateY(${y}px)`,
      background: `linear-gradient(90deg, transparent, ${DK.teal}, transparent)`,
      opacity,
      boxShadow: `0 0 24px ${DK.tealGlow}`,
    }}/>
  );
}

// Caption at bottom — two-line, Spanish, elegant
function Caption({ line1, line2, y = 900, align = 'center', tealWord }) {
  const { localTime, duration } = useSprite();
  const entry = 0.7;
  const exit = 0.7;
  const exitStart = duration - exit;

  let op = 1, ty = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    op = t; ty = (1 - t) * 24;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    op = 1 - t; ty = -t * 12;
  }

  const alignCss = align === 'center' ? 'center' : 'flex-start';
  const tx = align === 'center' ? '-50%' : '0';
  const left = align === 'center' ? 960 : 120;

  const render = (text) => {
    if (!tealWord) return text;
    const parts = text.split(tealWord);
    if (parts.length === 1) return text;
    return (
      <>
        {parts[0]}
        <span style={{ color: DK.teal }}>{tealWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div style={{
      position: 'absolute',
      left, top: y,
      transform: `translate(${tx}, ${ty}px)`,
      opacity: op,
      display: 'flex', flexDirection: 'column', alignItems: alignCss,
      gap: 8,
      textAlign: align,
    }}>
      {line1 && (
        <div style={{
          fontFamily: 'Inter',
          fontSize: 48,
          fontWeight: 300,
          letterSpacing: '-0.02em',
          color: DK.text,
          lineHeight: 1.15,
          maxWidth: 1400,
        }}>{render(line1)}</div>
      )}
      {line2 && (
        <div style={{
          fontFamily: 'Inter',
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: DK.text,
          lineHeight: 1.15,
          maxWidth: 1400,
        }}>{render(line2)}</div>
      )}
    </div>
  );
}

// Small monospace timestamp/counter corner element
function TimeStamp({ x = 60, y = 60, label = 'DK//01', sub }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      fontFamily: 'JetBrains Mono',
      fontSize: 13,
      color: DK.muted,
      letterSpacing: '0.1em',
      display: 'flex', gap: 18, alignItems: 'center',
    }}>
      <span style={{ color: DK.teal }}>●</span>
      <span>{label}</span>
      {sub && <span style={{ opacity: 0.7 }}>{sub}</span>}
    </div>
  );
}

// Scene label top-right (chapter markers like "02 / 09 — DESCUBRIMIENTO")
function SceneLabel({ num, total = 9, title }) {
  return (
    <div style={{
      position: 'absolute', right: 60, top: 60,
      fontFamily: 'JetBrains Mono',
      fontSize: 13,
      letterSpacing: '0.2em',
      color: DK.muted,
      display: 'flex', gap: 20, alignItems: 'center',
    }}>
      <span style={{ color: DK.text }}>{String(num).padStart(2, '0')}</span>
      <span style={{ width: 32, height: 1, background: DK.border }}/>
      <span>{String(total).padStart(2, '0')}</span>
      <span style={{ marginLeft: 8, color: DK.text, letterSpacing: '0.25em' }}>{title}</span>
    </div>
  );
}

// Animated glowing line connector between two points (SVG)
function GlowLine({ x1, y1, x2, y2, progress = 1, color = DK.teal, width = 2 }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const visibleLen = len * clamp(progress, 0, 1);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  return (
    <div style={{
      position: 'absolute',
      left: x1, top: y1,
      width: visibleLen, height: width,
      background: `linear-gradient(90deg, ${color}00, ${color})`,
      transform: `rotate(${ang}deg)`,
      transformOrigin: '0 50%',
      boxShadow: `0 0 12px ${color}88, 0 0 24px ${color}44`,
      opacity: 0.9,
    }}/>
  );
}

// Small pulsing node (endpoint marker)
function Node({ x, y, size = 10, color = DK.teal, pulse = true }) {
  return (
    <div style={{
      position: 'absolute',
      left: x - size/2, top: y - size/2,
      width: size, height: size,
      borderRadius: size,
      background: color,
      boxShadow: `0 0 16px ${color}, 0 0 32px ${color}88`,
      animation: pulse ? 'dk-pulse 2s ease-in-out infinite' : 'none',
    }}/>
  );
}

// Triangle (Delta Kilo motif) rendered as a stroked SVG
function DeltaTriangle({ size = 200, x = 0, y = 0, progress = 1, teal = true, strokeWidth = 3 }) {
  const s = size;
  const h = s * Math.sqrt(3) / 2;
  const pts = `${s/2},0 ${s},${h} 0,${h}`;
  const perim = 3 * s;
  const dash = perim * clamp(progress, 0, 1);
  return (
    <svg width={s} height={h} style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      <polygon
        points={pts}
        fill="none"
        stroke={teal ? DK.teal : DK.text}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dash} ${perim}`}
        strokeLinejoin="round"
        style={{ filter: teal ? `drop-shadow(0 0 12px ${DK.tealGlow})` : 'none' }}
      />
    </svg>
  );
}

Object.assign(window, {
  DK, GridBg, Vignette, ScanLine, Caption, TimeStamp, SceneLabel,
  GlowLine, Node, DeltaTriangle,
});
