// scenes-1-3.jsx — Origin, Discovery, First Solutions

// ── SCENE 1: ORIGIN ─────────────────────────────────────────────
// A young entrepreneur working late — chaotic screens, overload.
// We depict via: dark desk scene w/ multiple glowing rectangle "monitors"
// flickering with chat bubbles and spreadsheet rows. A silhouette head/shoulders
// at the bottom. Mood: chaos.

function Scene1Origin() {
  const { localTime, progress } = useSprite();

  // Camera: slow push-in
  const camScale = 1 + progress * 0.08;
  const camY = progress * -20;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#05080B' }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: `scale(${camScale}) translateY(${camY}px)`,
        transformOrigin: 'center 60%',
      }}>
        {/* Warm desk light wash */}
        <div style={{
          position: 'absolute', left: '30%', top: '40%', width: '40%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(255,180,80,0.08), transparent 70%)',
        }}/>

        {/* Chaotic monitor grid — 4 screens */}
        <Monitor x={180} y={180} w={520} h={340} tilt={-1.2}
                 delay={0} content="chats"/>
        <Monitor x={760} y={140} w={520} h={340} tilt={0.8}
                 delay={0.3} content="sheet"/>
        <Monitor x={1340} y={200} w={440} h={320} tilt={-0.6}
                 delay={0.6} content="leads"/>
        <Monitor x={420} y={560} w={480} h={300} tilt={1.5}
                 delay={0.9} content="inbox"/>
        <Monitor x={980} y={540} w={560} h={340} tilt={-0.4}
                 delay={1.2} content="calls"/>

        {/* Silhouette shoulders at bottom (suggestion of person) */}
        <div style={{
          position: 'absolute', bottom: -40, left: '50%',
          transform: 'translateX(-50%)',
          width: 800, height: 180,
          background: 'radial-gradient(ellipse at 50% 0%, #000 40%, transparent 70%)',
          filter: 'blur(4px)',
        }}/>

        {/* Notification bubbles popping sporadically */}
        <NotifBubble x={700} y={280} t={1.0} text="3 nuevos"/>
        <NotifBubble x={1250} y={380} t={1.7} text="!"/>
        <NotifBubble x={380} y={640} t={2.3} text="12"/>
        <NotifBubble x={1550} y={480} t={2.9} text="5"/>
        <NotifBubble x={880} y={700} t={3.5} text="8"/>
      </div>

      <ScanLine duration={6} opacity={0.12}/>
      <Vignette/>
      <TimeStamp label="DK//01" sub="02:47 AM"/>
      <SceneLabel num={1} title="ORIGEN"/>
      <Caption
        line1="Todo comenzó con una idea…"
        line2="y mucho desorden."
        tealWord="idea"
      />
    </div>
  );
}

function Monitor({ x, y, w, h, tilt = 0, delay = 0, content }) {
  const { localTime } = useSprite();
  const t = clamp(localTime - delay, 0, 1);
  const op = Easing.easeOutCubic(t);
  const flicker = 0.85 + Math.sin(localTime * 6 + delay * 10) * 0.08;

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: w, height: h,
      background: DK.surface,
      border: `1px solid ${DK.border}`,
      borderRadius: 6,
      transform: `rotate(${tilt}deg)`,
      opacity: op,
      boxShadow: `0 0 80px rgba(41,199,214,${0.04 * flicker}), inset 0 1px 0 rgba(255,255,255,0.04)`,
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        height: 22, background: '#0b1117', borderBottom: `1px solid ${DK.border}`,
        display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: '#3a4452' }}/>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: '#3a4452' }}/>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: '#3a4452' }}/>
      </div>
      <div style={{ padding: 16 }}>
        {content === 'chats' && <ChatsMock/>}
        {content === 'sheet' && <SheetMock/>}
        {content === 'leads' && <LeadsMock/>}
        {content === 'inbox' && <InboxMock/>}
        {content === 'calls' && <CallsMock/>}
      </div>
    </div>
  );
}

function ChatsMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { n: 'Cliente 01', m: 'precio del paquete?', u: 3 },
        { n: 'Cliente 02', m: 'sigo esperando…', u: 7 },
        { n: 'Cliente 03', m: 'agendamos?', u: 1 },
        { n: 'Cliente 04', m: 'hola, información?', u: 2 },
        { n: 'Cliente 05', m: 'gracias', u: 0 },
      ].map((c,i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '6px 8px', background: i % 2 ? 'transparent' : 'rgba(255,255,255,0.02)',
          borderRadius: 4,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: '#2a3440' }}/>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: DK.text, fontSize: 12, fontWeight: 500 }}>{c.n}</div>
            <div style={{ color: DK.muted, fontSize: 11 }}>{c.m}</div>
          </div>
          {c.u > 0 && (
            <div style={{
              background: DK.danger, color: '#fff', fontSize: 10,
              padding: '2px 6px', borderRadius: 10, fontWeight: 600,
            }}>{c.u}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function SheetMock() {
  const cols = ['Lead','Fuente','Estado','$','Fecha'];
  return (
    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 6, color: DK.muted, paddingBottom: 6, borderBottom: `1px solid ${DK.border}` }}>
        {cols.map(c => <div key={c}>{c}</div>)}
      </div>
      {Array.from({length: 9}).map((_,i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 6, color: DK.text, padding: '5px 0', borderBottom: `1px solid ${DK.border}` }}>
          <div>Cliente {String(i+1).padStart(2,'0')}</div>
          <div style={{ color: DK.muted }}>{['FB','IG','Web','WA','Ref'][i%5]}</div>
          <div style={{ color: [DK.muted, DK.teal, '#d4a24e'][i%3] }}>{['nuevo','seguim.','pend.'][i%3]}</div>
          <div>{['12k','8k','24k','3k','—'][i%5]}</div>
          <div style={{ color: DK.muted }}>04/{10+i}</div>
        </div>
      ))}
    </div>
  );
}

function LeadsMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ color: DK.muted, fontSize: 11, fontFamily: 'JetBrains Mono' }}>LEADS SIN RESPONDER</div>
      <div style={{ fontSize: 42, fontWeight: 700, color: DK.danger, fontFamily: 'Inter' }}>47</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({length: 24}).map((_,i) => (
          <div key={i} style={{ flex: 1, height: 40 + Math.random() * 60, background: i % 3 === 0 ? DK.danger : DK.surface2, borderRadius: 2 }}/>
        ))}
      </div>
    </div>
  );
}

function InboxMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {Array.from({length: 6}).map((_,i) => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: 6, borderBottom: `1px solid ${DK.border}`, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: i < 3 ? DK.teal : DK.muted }}/>
          <div style={{ color: i < 3 ? DK.text : DK.muted, fontSize: 11, flex: 1 }}>Re: Cotización #{2000+i*17}</div>
          <div style={{ color: DK.muted, fontSize: 10, fontFamily: 'JetBrains Mono' }}>{Math.floor(Math.random() * 12) + 1}h</div>
        </div>
      ))}
    </div>
  );
}

function CallsMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ color: DK.muted, fontSize: 11, fontFamily: 'JetBrains Mono' }}>LLAMADAS PERDIDAS — HOY</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: DK.text }}>23</div>
        <div style={{ color: DK.danger, fontSize: 14 }}>↑ 58%</div>
      </div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 60 }}>
        {Array.from({length: 16}).map((_,i) => (
          <div key={i} style={{ flex: 1, height: 20 + Math.abs(Math.sin(i)) * 40, background: DK.surface2, borderRadius: 1 }}/>
        ))}
      </div>
    </div>
  );
}

function NotifBubble({ x, y, t, text }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  if (delta < 0 || delta > 1.4) return null;
  const op = delta < 0.2 ? delta / 0.2 : delta > 1.0 ? 1 - (delta - 1.0) / 0.4 : 1;
  const scale = delta < 0.3 ? Easing.easeOutBack(delta / 0.3) : 1;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: op,
      background: DK.danger, color: '#fff',
      padding: '6px 12px', borderRadius: 14,
      fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
      boxShadow: '0 4px 20px rgba(229,107,90,0.5)',
    }}>{text}</div>
  );
}

// ── SCENE 2: DISCOVERY ─────────────────────────────────────────
// Scattered system icons (nodes) disconnected, then lines glow and connect them.
// "Los negocios no fallan por falta de clientes… fallan por falta de sistema."

function Scene2Discovery() {
  const { localTime, progress } = useSprite();

  // Nodes representing fragmented systems
  const nodes = [
    { x: 360, y: 340, label: 'WhatsApp', t: 0.1 },
    { x: 1560, y: 300, label: 'CRM', t: 0.3 },
    { x: 1680, y: 640, label: 'Sheets', t: 0.5 },
    { x: 260, y: 700, label: 'Email', t: 0.7 },
    { x: 960, y: 540, label: 'Delta Kilo', t: 1.2, hub: true },
    { x: 700, y: 220, label: 'Leads', t: 0.9 },
    { x: 1280, y: 760, label: 'Ventas', t: 1.1 },
  ];

  const hub = nodes.find(n => n.hub);
  const others = nodes.filter(n => !n.hub);

  // Connection animation starts at 3s
  const connStart = 3.2;
  const connProg = clamp((localTime - connStart) / 2.0, 0, 1);

  // Camera: subtle drift
  const camX = Math.sin(progress * Math.PI) * 20;

  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.05}/>
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${camX}px)` }}>
        {/* Lines */}
        {others.map((n, i) => {
          const perNodeProg = clamp((localTime - (connStart + i * 0.15)) / 0.8, 0, 1);
          return (
            <GlowLine
              key={`l${i}`}
              x1={hub.x} y1={hub.y} x2={n.x} y2={n.y}
              progress={perNodeProg}
            />
          );
        })}

        {/* Other nodes */}
        {others.map((n, i) => (
          <NodeLabel key={i} {...n}/>
        ))}

        {/* Hub (Delta Kilo) */}
        <HubNode x={hub.x} y={hub.y} appearAt={hub.t}/>
      </div>

      <ScanLine duration={5} opacity={0.15}/>
      <Vignette/>
      <SceneLabel num={2} title="DESCUBRIMIENTO"/>
      <TimeStamp label="DK//02" sub="CONECTANDO"/>
      <Caption
        line1="Los negocios no fallan por falta de clientes…"
        line2="fallan por falta de sistema."
        tealWord="sistema"
      />
    </div>
  );
}

function NodeLabel({ x, y, label, t }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  if (delta < 0) return null;
  const op = Easing.easeOutCubic(clamp(delta / 0.5, 0, 1));
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: 'translate(-50%, -50%)' }}>
      <div style={{
        position: 'relative',
        width: 80, height: 80, borderRadius: 40,
        border: `1px solid ${DK.border}`,
        background: DK.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: DK.teal, boxShadow: `0 0 12px ${DK.teal}` }}/>
      </div>
      <div style={{
        position: 'absolute', left: '50%', top: 'calc(100% + 10px)',
        transform: 'translateX(-50%)',
        color: DK.muted, fontFamily: 'JetBrains Mono', fontSize: 13,
        letterSpacing: '0.1em', whiteSpace: 'nowrap',
      }}>{label.toUpperCase()}</div>
    </div>
  );
}

function HubNode({ x, y, appearAt }) {
  const { localTime } = useSprite();
  const delta = localTime - appearAt;
  if (delta < 0) return null;
  const op = Easing.easeOutCubic(clamp(delta / 0.8, 0, 1));
  const scale = 0.6 + 0.4 * Easing.easeOutBack(clamp(delta / 0.8, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: op,
    }}>
      <div style={{
        width: 160, height: 160,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 80, border: `1px solid ${DK.teal}`,
          boxShadow: `0 0 40px ${DK.tealGlow}, inset 0 0 40px ${DK.tealGlow}`,
          animation: 'dk-pulse 2.5s ease-in-out infinite',
        }}/>
        <DeltaTriangle size={96} x={32} y={40} progress={clamp(delta/0.8, 0, 1)}/>
      </div>
    </div>
  );
}

// ── SCENE 3: FIRST SOLUTIONS ───────────────────────────────────
// WhatsApp-style chat bubbles auto-replying, pipeline cards sliding in.
// "Así nace Delta Kilo: automatización con propósito."

function Scene3First() {
  const { localTime, progress } = useSprite();

  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.04}/>

      {/* Left: phone-style chat mock */}
      <ChatPanel x={140} y={140}/>

      {/* Right: pipeline kanban forming */}
      <PipelinePanel x={900} y={140}/>

      <ScanLine duration={5} opacity={0.12}/>
      <Vignette/>
      <SceneLabel num={3} title="PRIMERAS SOLUCIONES"/>
      <TimeStamp label="DK//03" sub="BOT ACTIVO"/>
      <Caption
        line1="Así nace Delta Kilo:"
        line2="automatización con propósito."
        tealWord="Delta Kilo"
      />
    </div>
  );
}

function ChatPanel({ x, y }) {
  const { localTime } = useSprite();
  const msgs = [
    { t: 0.3, from: 'user', text: 'Hola, quiero información' },
    { t: 1.0, from: 'bot', text: '¡Hola! Soy tu asistente. ¿Qué te interesa?' },
    { t: 2.0, from: 'user', text: 'el paquete premium' },
    { t: 2.8, from: 'bot', text: 'Perfecto. Te envío detalles y agendo llamada ✓' },
    { t: 4.0, from: 'bot', text: 'Cita confirmada: jueves 3:00 pm' },
  ];
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 660, height: 780,
      background: DK.surface, borderRadius: 16,
      border: `1px solid ${DK.border}`,
      padding: 20,
      display: 'flex', flexDirection: 'column', gap: 10,
      boxShadow: `0 20px 80px rgba(0,0,0,0.5), 0 0 40px ${DK.tealGlow}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: `1px solid ${DK.border}` }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: DK.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          const ty = (1 - op) * 10;
          const isBot = m.from === 'bot';
          return (
            <div key={i} style={{
              alignSelf: isBot ? 'flex-start' : 'flex-end',
              maxWidth: '80%',
              background: isBot ? DK.surface2 : DK.teal,
              color: isBot ? DK.text : DK.bg,
              padding: '12px 16px',
              borderRadius: 16,
              borderBottomLeftRadius: isBot ? 4 : 16,
              borderBottomRightRadius: isBot ? 16 : 4,
              fontSize: 16,
              opacity: op,
              transform: `translateY(${ty}px)`,
              fontWeight: isBot ? 400 : 500,
            }}>{m.text}</div>
          );
        })}
      </div>
    </div>
  );
}

function PipelinePanel({ x, y }) {
  const { localTime } = useSprite();
  const cols = [
    { name: 'NUEVO', cards: ['Lead #2104','Lead #2105','Lead #2106'], t: 0.5, color: DK.teal },
    { name: 'CALIFICADO', cards: ['Lead #2091','Lead #2098'], t: 1.5, color: '#d4a24e' },
    { name: 'CITA', cards: ['Lead #2082'], t: 2.5, color: DK.green },
    { name: 'CERRADO', cards: ['Lead #2075'], t: 3.5, color: '#9b7bd4' },
  ];
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 920, height: 780,
      background: DK.surface, borderRadius: 16,
      border: `1px solid ${DK.border}`,
      padding: 24,
      boxShadow: `0 20px 80px rgba(0,0,0,0.5)`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ color: DK.text, fontSize: 20, fontWeight: 600 }}>Pipeline de Ventas</div>
        <div style={{ color: DK.muted, fontSize: 12, fontFamily: 'JetBrains Mono' }}>AUTOMATIZADO</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, height: 'calc(100% - 50px)' }}>
        {cols.map((c, i) => {
          const colAppear = clamp((localTime - c.t + 0.3) / 0.5, 0, 1);
          return (
            <div key={i} style={{
              background: '#0b1117', borderRadius: 10, padding: 12,
              opacity: colAppear,
              display: 'flex', flexDirection: 'column', gap: 8,
              border: `1px solid ${DK.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: c.color }}/>
                <div style={{ color: DK.muted, fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em' }}>{c.name}</div>
                <div style={{ marginLeft: 'auto', color: DK.text, fontSize: 12 }}>{c.cards.length}</div>
              </div>
              {c.cards.map((card, j) => {
                const delta = localTime - (c.t + j * 0.3);
                if (delta < 0) return null;
                const op = clamp(delta / 0.4, 0, 1);
                const tx = (1 - op) * -20;
                return (
                  <div key={j} style={{
                    background: DK.surface2, borderRadius: 6, padding: 10,
                    opacity: op, transform: `translateX(${tx}px)`,
                    border: `1px solid ${DK.border}`,
                  }}>
                    <div style={{ color: DK.text, fontSize: 13, fontWeight: 500 }}>{card}</div>
                    <div style={{ color: DK.muted, fontSize: 11, marginTop: 4 }}>WhatsApp · hace {j+1}m</div>
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

Object.assign(window, { Scene1Origin, Scene2Discovery, Scene3First });
