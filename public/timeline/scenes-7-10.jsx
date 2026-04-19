// scenes-7-9.jsx — Strategic Positioning, Present Day, Future Vision + Logo

// ── SCENE 7: STRATEGIC POSITIONING ─────────────────────────────
// Board-room aesthetic: a partner dashboard with strategic insights, not just tools.

function Scene7Strategic() {
  const { localTime, progress } = useSprite();

  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.04}/>

      {/* Left: big insight card */}
      <div style={{
        position: 'absolute', left: 140, top: 160, width: 840, height: 720,
        background: DK.surface, borderRadius: 14, border: `1px solid ${DK.border}`,
        padding: 44,
        boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: 28,
        opacity: Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1)),
        transform: `translateY(${(1 - clamp(localTime/0.6,0,1)) * 30}px)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: DK.teal, boxShadow: `0 0 14px ${DK.teal}` }}/>
          <div style={{ color: DK.teal, fontFamily: 'JetBrains Mono', fontSize: 13, letterSpacing: '0.25em' }}>INSIGHT ESTRATÉGICO</div>
        </div>
        <div style={{ color: DK.text, fontSize: 40, fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          Tu canal de <span style={{ color: DK.teal }}>WhatsApp</span> convierte 3.8× más cuando respondemos en menos de 2 minutos.
        </div>
        <div style={{ color: DK.muted, fontSize: 18, lineHeight: 1.5 }}>
          Recomendación: reasignar 40% del presupuesto de anuncios al canal orgánico de referidos este trimestre.
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', gap: 24 }}>
          <MiniStat label="CAC" before="$1,240" after="$680" t={1.2}/>
          <MiniStat label="LTV" before="$3.1K" after="$5.8K" t={1.6}/>
          <MiniStat label="CICLO" before="28d" after="11d" t={2.0}/>
        </div>
      </div>

      {/* Right: planning session — partner icons */}
      <div style={{
        position: 'absolute', right: 140, top: 160, width: 700, height: 720,
        display: 'flex', flexDirection: 'column', gap: 18,
        opacity: clamp(localTime - 0.4, 0, 1),
      }}>
        <div style={{ color: DK.muted, fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.25em', marginBottom: 6 }}>SESIÓN DE ESTRATEGIA · Q3 2026</div>
        {[
          { t: 0.6, title: 'Roadmap comercial', status: 'en revisión' },
          { t: 1.0, title: 'Modelo de atribución', status: 'aprobado' },
          { t: 1.4, title: 'Rediseño del funnel', status: 'ejecutando' },
          { t: 1.8, title: 'Plan de contenidos IA', status: 'propuesto' },
          { t: 2.2, title: 'Expansión — 2 mercados', status: 'evaluando' },
        ].map((r, i) => {
          const delta = localTime - r.t;
          if (delta < 0) return null;
          const op = Easing.easeOutCubic(clamp(delta / 0.5, 0, 1));
          const tx = (1 - op) * 30;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 18,
              background: DK.surface, border: `1px solid ${DK.border}`,
              borderRadius: 10, padding: '20px 24px',
              opacity: op, transform: `translateX(${tx}px)`,
            }}>
              <div style={{ color: DK.muted, fontFamily: 'JetBrains Mono', fontSize: 14 }}>{String(i+1).padStart(2,'0')}</div>
              <div style={{ flex: 1, color: DK.text, fontSize: 20, fontWeight: 500 }}>{r.title}</div>
              <div style={{ color: DK.teal, fontSize: 13, fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }}>{r.status}</div>
            </div>
          );
        })}
      </div>

      <ScanLine duration={6} opacity={0.1}/>
      <Vignette/>
      <SceneLabel num={7} title="POSICIONAMIENTO"/>
      <TimeStamp label="DK//07" sub="PARTNER MODE"/>
      <Caption
        line1="No somos proveedores."
        line2="Somos socios estratégicos."
        tealWord="socios estratégicos"
      />
    </div>
  );
}

function MiniStat({ label, before, after, t }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  const op = clamp(delta / 0.5, 0, 1);
  return (
    <div style={{ opacity: op }}>
      <div style={{ color: DK.muted, fontSize: 11, fontFamily: 'JetBrains Mono', letterSpacing: '0.2em' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
        <div style={{ color: DK.muted, fontSize: 17, textDecoration: 'line-through' }}>{before}</div>
        <div style={{ color: DK.teal, fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>{after}</div>
      </div>
    </div>
  );
}

// ── SCENE 8: PRESENT DAY ────────────────────────────────────────
// Clean ecosystem visualization: lead flow → qualification → close
// A flowing pipeline with moving nodes

function Scene8Present() {
  const { localTime, progress } = useSprite();

  const stages = [
    { x: 200, label: 'ENTRADA DE LEADS', sub: 'multi-canal' },
    { x: 720, label: 'CALIFICACIÓN IA', sub: 'en segundos' },
    { x: 1240, label: 'SEGUIMIENTO', sub: 'automatizado' },
    { x: 1720, label: 'CIERRE', sub: 'asistido' },
  ];
  const yCenter = 540;

  // Moving lead dots traveling through pipeline
  const leads = Array.from({length: 7}).map((_, i) => ({
    id: i,
    offset: i * 0.6,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.04}/>

      {/* Pipeline rails */}
      <div style={{
        position: 'absolute', left: 180, right: 180, top: yCenter - 1, height: 2,
        background: `linear-gradient(90deg, transparent, ${DK.teal}44, ${DK.teal}44, transparent)`,
      }}/>
      <div style={{
        position: 'absolute', left: 180, right: 180, top: yCenter - 1, height: 2,
        background: `linear-gradient(90deg, transparent, ${DK.teal}, transparent)`,
        boxShadow: `0 0 24px ${DK.tealGlow}`,
        maskImage: `linear-gradient(90deg, transparent ${clamp((localTime - 0.3) / 1.2, 0, 1) * 100 - 20}%, black ${clamp((localTime - 0.3) / 1.2, 0, 1) * 100}%, transparent ${clamp((localTime - 0.3) / 1.2, 0, 1) * 100 + 10}%)`,
        WebkitMaskImage: `linear-gradient(90deg, transparent ${clamp((localTime - 0.3) / 1.2, 0, 1) * 100 - 20}%, black ${clamp((localTime - 0.3) / 1.2, 0, 1) * 100}%, transparent ${clamp((localTime - 0.3) / 1.2, 0, 1) * 100 + 10}%)`,
      }}/>

      {/* Stage nodes */}
      {stages.map((s, i) => (
        <StageNode key={i} {...s} y={yCenter} t={0.3 + i * 0.4}/>
      ))}

      {/* Travelling leads */}
      {leads.map((l) => {
        const local = (localTime + l.offset) % 5.5;
        const progress = clamp(local / 3.5, 0, 1);
        if (local < 0.2 || local > 3.7) return null;
        const x = 200 + progress * (1720 - 200);
        return (
          <div key={l.id} style={{
            position: 'absolute',
            left: x - 8, top: yCenter - 8,
            width: 16, height: 16, borderRadius: 8,
            background: DK.teal,
            boxShadow: `0 0 20px ${DK.teal}, 0 0 40px ${DK.tealGlow}`,
          }}/>
        );
      })}

      {/* Top: live counter */}
      <div style={{
        position: 'absolute', left: '50%', top: 220, transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: clamp(localTime - 0.5, 0, 1),
      }}>
        <div style={{ color: DK.muted, fontFamily: 'JetBrains Mono', fontSize: 13, letterSpacing: '0.3em' }}>HOY · EN VIVO</div>
        <div style={{ color: DK.text, fontSize: 96, fontWeight: 300, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>
          {Math.round(8247 + Easing.easeOutCubic(clamp(localTime / 3, 0, 1)) * 412).toLocaleString()}
        </div>
        <div style={{ color: DK.teal, fontSize: 18, fontFamily: 'JetBrains Mono', letterSpacing: '0.15em' }}>CONVERSACIONES PROCESADAS</div>
      </div>

      <ScanLine duration={4} opacity={0.1}/>
      <Vignette/>
      <SceneLabel num={8} title="HOY"/>
      <TimeStamp label="DK//08" sub="LIVE"/>
      <Caption
        line1="Hoy, Delta Kilo convierte procesos complejos"
        line2="en sistemas simples."
        tealWord="sistemas simples"
      />
    </div>
  );
}

function StageNode({ x, y, label, sub, t }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  const op = Easing.easeOutCubic(clamp(delta / 0.6, 0, 1));
  const scale = 0.6 + 0.4 * Easing.easeOutBack(clamp(delta / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, opacity: op }}>
      <div style={{
        width: 28, height: 28, borderRadius: 14,
        background: DK.bg, border: `2px solid ${DK.teal}`,
        boxShadow: `0 0 24px ${DK.tealGlow}`,
      }}/>
      <div style={{
        position: 'absolute', left: '50%', top: 48,
        transform: 'translateX(-50%)',
        textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        <div style={{ color: DK.text, fontFamily: 'JetBrains Mono', fontSize: 13, letterSpacing: '0.2em' }}>{label}</div>
        <div style={{ color: DK.muted, fontSize: 13, marginTop: 6 }}>{sub}</div>
      </div>
    </div>
  );
}

// ── SCENE 9: FUTURE VISION ──────────────────────────────────────
// Abstract futuristic city — geometric skyline with flowing digital links
// between buildings; AI agents (nodes) blinking in a mesh.

function Scene9Future() {
  const { localTime, progress } = useSprite();

  // Buildings parameters (procedural skyline)
  const buildings = React.useMemo(() => {
    const arr = [];
    const rng = (n) => {
      let x = Math.sin(n * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 22; i++) {
      arr.push({
        x: 40 + i * 88,
        w: 50 + rng(i) * 40,
        h: 180 + rng(i + 99) * 360,
      });
    }
    return arr;
  }, []);

  const camZoom = 1 + progress * 0.12;
  const camY = progress * -30;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#03060A' }}>
      {/* Horizon glow */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%',
        background: `radial-gradient(ellipse at center bottom, ${DK.tealDim}33, transparent 70%)`,
      }}/>
      <GridBg opacity={0.06} size={100}/>

      <div style={{
        position: 'absolute', inset: 0,
        transform: `scale(${camZoom}) translateY(${camY}px)`,
        transformOrigin: 'center 80%',
      }}>
        {/* Skyline */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 600 }}>
          {buildings.map((b, i) => (
            <div key={i} style={{
              position: 'absolute', left: b.x, bottom: 0,
              width: b.w, height: b.h,
              background: `linear-gradient(180deg, ${DK.surface}, ${DK.bg})`,
              border: `1px solid ${DK.border}`,
              borderBottom: 'none',
            }}>
              {/* Windows */}
              {Array.from({length: Math.floor(b.h / 24)}).map((_, r) => (
                <div key={r} style={{ display: 'flex', gap: 4, padding: '6px 6px 0' }}>
                  {Array.from({length: Math.max(2, Math.floor(b.w / 14))}).map((_, c) => {
                    const lit = ((r * 7 + c * 13 + i * 3) % 5) < 3;
                    const flicker = lit && Math.sin(localTime * 2 + i + r * 0.3 + c * 0.7) > 0.6;
                    return (
                      <div key={c} style={{
                        flex: 1, height: 8,
                        background: lit ? (flicker ? DK.teal : DK.tealDim) : 'transparent',
                        opacity: lit ? (flicker ? 0.9 : 0.35) : 0,
                        boxShadow: flicker ? `0 0 8px ${DK.teal}` : 'none',
                      }}/>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Flowing digital links between buildings */}
        <svg style={{ position: 'absolute', inset: 0 }} viewBox="0 0 1920 1080" preserveAspectRatio="none">
          {[
            ['M 200 820 Q 500 400, 800 760', 0.2],
            ['M 400 760 Q 900 300, 1400 680', 0.5],
            ['M 600 740 Q 1200 500, 1700 700', 0.8],
            ['M 1000 780 Q 1400 350, 1800 620', 1.1],
            ['M 150 700 Q 700 250, 1250 720', 1.4],
          ].map(([d, delay], i) => {
            const p = clamp((localTime - delay) / 1.5, 0, 1);
            return (
              <path key={i} d={d} fill="none" stroke={DK.teal} strokeWidth="2"
                    strokeDasharray="2000" strokeDashoffset={2000 * (1 - p)}
                    style={{ filter: `drop-shadow(0 0 6px ${DK.teal})`, opacity: 0.8 }}/>
            );
          })}
        </svg>

        {/* AI agent nodes floating in sky */}
        {[
          [300, 280], [680, 180], [1080, 240], [1480, 160], [1760, 320],
          [500, 360], [920, 340], [1300, 380],
        ].map(([x, y], i) => {
          const appear = clamp(localTime - 1.8 - i * 0.15, 0, 1);
          const float = Math.sin(localTime * 1.5 + i) * 6;
          return (
            <div key={i} style={{
              position: 'absolute', left: x, top: y + float,
              width: 12, height: 12, borderRadius: 6,
              background: DK.teal,
              opacity: appear,
              boxShadow: `0 0 16px ${DK.teal}, 0 0 32px ${DK.tealGlow}`,
              animation: 'dk-pulse 2.5s ease-in-out infinite',
            }}/>
          );
        })}
      </div>

      <Vignette/>
      <SceneLabel num={9} title="FUTURO"/>
      <TimeStamp label="DK//09" sub="2026 →"/>
      <Caption
        line1="El futuro no es trabajar más…"
        line2="es trabajar con sistemas inteligentes."
        tealWord="sistemas inteligentes"
      />
    </div>
  );
}

// ── SCENE 10: LOGO / CLOSING ────────────────────────────────────

function Scene10Logo() {
  const { localTime, progress, duration } = useSprite();

  const logoAppear = Easing.easeOutCubic(clamp(localTime / 0.8, 0, 1));
  const textAppear = clamp(localTime - 0.6, 0, 1);
  const tagAppear = clamp(localTime - 1.2, 0, 1);

  // Pull the teal triangle in from offset
  const triProgress = clamp(localTime / 1.0, 0, 1);

  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.03}/>
      {/* Glow behind */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900, height: 900,
        background: `radial-gradient(circle, ${DK.tealGlow}, transparent 60%)`,
        opacity: logoAppear * 0.6,
      }}/>

      {/* Logo image — the user's provided logo */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -58%) scale(${0.9 + logoAppear * 0.1})`,
        opacity: logoAppear,
        width: 540, height: 540,
      }}>
        <img src="/timeline/assets/logo-circle.png" alt="Delta Kilo"
             style={{ width: '100%', height: '100%', objectFit: 'contain',
                      filter: 'brightness(1.1) drop-shadow(0 0 40px rgba(41,199,214,0.4))' }}/>
      </div>

      {/* Wordmark & tagline */}
      <div style={{
        position: 'absolute', left: '50%', top: 'calc(50% + 260px)',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: textAppear,
      }}>
        <div style={{
          color: DK.text,
          fontFamily: 'Inter',
          fontSize: 64, fontWeight: 300,
          letterSpacing: '0.3em',
          marginBottom: 16,
        }}>DELTA KILO</div>
        <div style={{
          color: DK.teal,
          fontFamily: 'JetBrains Mono',
          fontSize: 16, letterSpacing: '0.5em',
          marginBottom: 28,
        }}>SOLUCIONES</div>
        <div style={{
          width: 80, height: 1, background: DK.border,
          margin: '0 auto 24px',
          opacity: tagAppear,
        }}/>
        <div style={{
          color: DK.muted,
          fontFamily: 'Inter',
          fontSize: 22, fontWeight: 400,
          letterSpacing: '0.05em',
          fontStyle: 'italic',
          opacity: tagAppear,
        }}>Automatizamos tu crecimiento.</div>
      </div>

      <Vignette/>
    </div>
  );
}

Object.assign(window, { Scene7Strategic, Scene8Present, Scene9Future, Scene10Logo });
