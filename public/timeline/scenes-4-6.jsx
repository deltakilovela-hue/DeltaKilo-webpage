// scenes-4-6.jsx — First Clients, Learning, System Evolution

// ── SCENE 4: FIRST CLIENTS ─────────────────────────────────────
// Industry cards (real estate, clinic, auto parts) w/ conversations -> appointments

function Scene4Clients() {
  const { localTime, progress } = useSprite();

  const clients = [
    { t: 0.3, x: 140, y: 180, industry: 'INMOBILIARIA', name: 'Casa del Valle', metric: '+38 citas', stat: 'en 14 días' },
    { t: 0.9, x: 760, y: 180, industry: 'CLÍNICA', name: 'Salud Integral MX', metric: '+127 pacientes', stat: 'mes 1' },
    { t: 1.5, x: 1380, y: 180, industry: 'MOTOPARTES', name: 'MotoEje', metric: '+212%', stat: 'ventas online' },
  ];

  // Bottom: conversation → calendar transformation strip
  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.05}/>

      {clients.map((c, i) => (
        <ClientCard key={i} {...c}/>
      ))}

      {/* Bottom row: conversation → booking */}
      <TransformStrip y={540}/>

      <ScanLine duration={5} opacity={0.1}/>
      <Vignette/>
      <SceneLabel num={4} title="PRIMEROS CLIENTES"/>
      <TimeStamp label="DK//04" sub="EN PRODUCCIÓN"/>
      <Caption
        line1="Los primeros clientes no compraron software…"
        line2="compraron orden."
        tealWord="orden"
      />
    </div>
  );
}

function ClientCard({ t, x, y, industry, name, metric, stat }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  if (delta < 0) return null;
  const op = Easing.easeOutCubic(clamp(delta / 0.7, 0, 1));
  const ty = (1 - op) * 40;
  // Count-up effect on metric
  const hasPlus = metric.includes('+');
  const numMatch = metric.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const displayNum = Math.round(num * clamp(delta / 1.8, 0, 1));
  const prefix = metric.split(numMatch ? numMatch[0] : '')[0];
  const suffix = metric.split(numMatch ? numMatch[0] : '')[1] || '';

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 420, height: 300,
      background: DK.surface,
      border: `1px solid ${DK.border}`,
      borderRadius: 12,
      padding: 28,
      opacity: op,
      transform: `translateY(${ty}px)`,
      boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ color: DK.teal, fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.2em' }}>{industry}</div>
      <div style={{ color: DK.text, fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>{name}</div>
      <div style={{ flex: 1 }}/>
      <div>
        <div style={{ color: DK.text, fontSize: 56, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Inter' }}>
          {prefix}{displayNum}{suffix}
        </div>
        <div style={{ color: DK.muted, fontSize: 14, marginTop: 4 }}>{stat}</div>
      </div>
      {/* Mini glyph */}
      <div style={{ position: 'absolute', right: 24, top: 24, width: 10, height: 10, borderRadius: 5, background: DK.green, boxShadow: `0 0 12px ${DK.green}` }}/>
    </div>
  );
}

function TransformStrip({ y }) {
  const { localTime } = useSprite();
  // Chat bubble on the left, arrow flowing, calendar on right
  const flow = clamp((localTime - 1.8) / 1.5, 0, 1);
  return (
    <div style={{ position: 'absolute', left: 140, top: y, width: 1640, height: 360 }}>
      {/* Conversation box */}
      <div style={{
        position: 'absolute', left: 0, top: 40, width: 480, height: 280,
        background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`, padding: 24,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ color: DK.muted, fontSize: 12, fontFamily: 'JetBrains Mono', letterSpacing: '0.15em' }}>CONVERSACIÓN</div>
        <div style={{ alignSelf: 'flex-start', background: DK.surface2, color: DK.text, padding: '10px 14px', borderRadius: 14, fontSize: 15, maxWidth: '80%' }}>Quiero ver la casa</div>
        <div style={{ alignSelf: 'flex-end', background: DK.teal, color: DK.bg, padding: '10px 14px', borderRadius: 14, fontSize: 15, maxWidth: '80%', fontWeight: 500 }}>Perfecto. Jueves 5 pm ✓</div>
        <div style={{ alignSelf: 'flex-start', background: DK.surface2, color: DK.text, padding: '10px 14px', borderRadius: 14, fontSize: 15 }}>¡Gracias!</div>
      </div>

      {/* Flowing arrow */}
      <div style={{ position: 'absolute', left: 500, top: 180, width: 580, height: 4 }}>
        <div style={{
          position: 'absolute', left: 0, top: 0,
          width: `${flow * 100}%`, height: 4,
          background: `linear-gradient(90deg, ${DK.teal}00, ${DK.teal})`,
          boxShadow: `0 0 16px ${DK.tealGlow}`,
        }}/>
        <div style={{
          position: 'absolute', left: `${flow * 100}%`, top: -6,
          width: 16, height: 16, borderRadius: 8, background: DK.teal,
          boxShadow: `0 0 24px ${DK.teal}`,
          transform: 'translateX(-50%)',
        }}/>
      </div>

      {/* Calendar / appointment */}
      <div style={{
        position: 'absolute', right: 0, top: 40, width: 480, height: 280,
        background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`, padding: 24,
        opacity: flow,
      }}>
        <div style={{ color: DK.muted, fontSize: 12, fontFamily: 'JetBrains Mono', letterSpacing: '0.15em' }}>CITA CONFIRMADA</div>
        <div style={{ marginTop: 14, color: DK.text, fontSize: 22, fontWeight: 600 }}>Visita — Casa del Valle</div>
        <div style={{ marginTop: 10, color: DK.teal, fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>Jue · 5:00 PM</div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: DK.green }}/>
          <div style={{ color: DK.muted, fontSize: 14 }}>recordatorio automático en 24 h</div>
        </div>
      </div>
    </div>
  );
}

// ── SCENE 5: LEARNING & ITERATION ──────────────────────────────
// Terminal / log panel with errors, then fixes. Broken -> resilient.

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
      <GridBg opacity={0.04}/>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${camScale})`, transformOrigin: 'center center' }}>
        {/* Terminal panel */}
        <div style={{
          position: 'absolute', left: 180, top: 160, width: 1100, height: 720,
          background: '#05090D', borderRadius: 12, border: `1px solid ${DK.border}`,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '12px 20px', background: '#0b1117', borderBottom: `1px solid ${DK.border}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#E56B5A' }}/>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#d4a24e' }}/>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#5BD3A6' }}/>
            <span style={{ color: DK.muted, fontSize: 12, marginLeft: 20, fontFamily: 'JetBrains Mono' }}>delta-kilo / flows / debug.log</span>
          </div>
          <div style={{ padding: 28, fontFamily: 'JetBrains Mono', fontSize: 17, lineHeight: 1.7, flex: 1 }}>
            {logs.map((l, i) => {
              const delta = localTime - l.t;
              if (delta < 0) return null;
              const op = clamp(delta / 0.25, 0, 1);
              return (
                <div key={i} style={{ display: 'flex', gap: 16, opacity: op }}>
                  <span style={{ color: DK.muted, width: 60 }}>{String(i+1).padStart(3,'0')}</span>
                  <span style={{ color: l.code, width: 52, fontWeight: 600 }}>{l.level}</span>
                  <span style={{ color: DK.text, flex: 1 }}>{l.text}</span>
                </div>
              );
            })}
            <Cursor/>
          </div>
        </div>

        {/* Side stats — resilience metric */}
        <div style={{
          position: 'absolute', right: 180, top: 160, width: 440, height: 720,
          background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`,
          padding: 32, display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          <div style={{ color: DK.muted, fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.2em' }}>ITERACIONES</div>
          <MetricBlock label="flujos reconstruidos" target={47} t={0.8}/>
          <MetricBlock label="pruebas automatizadas" target={312} t={1.6}/>
          <MetricBlock label="uptime actual" target={99.94} suffix="%" t={2.8}/>
          <div style={{ flex: 1 }}/>
          <div style={{ borderTop: `1px solid ${DK.border}`, paddingTop: 20, color: DK.muted, fontSize: 13, fontFamily: 'JetBrains Mono' }}>
            <div style={{ color: DK.teal }}>› principio</div>
            <div style={{ color: DK.text, fontFamily: 'Inter', fontSize: 15, marginTop: 6, lineHeight: 1.5 }}>
              automatizar sin pensar como negocio<br/>no es automatización. Es ruido.
            </div>
          </div>
        </div>
      </div>

      <ScanLine duration={6} opacity={0.12}/>
      <Vignette/>
      <SceneLabel num={5} title="APRENDIZAJE"/>
      <TimeStamp label="DK//05" sub="ITERANDO"/>
      <Caption
        line1="Aprendimos que automatizar no es suficiente…"
        line2="hay que pensar como negocio."
        tealWord="negocio"
      />
    </div>
  );
}

function MetricBlock({ label, target, suffix = '', t }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  const p = clamp(delta / 1.2, 0, 1);
  const val = target * Easing.easeOutCubic(p);
  const display = target % 1 === 0 ? Math.round(val) : val.toFixed(2);
  return (
    <div>
      <div style={{ color: DK.muted, fontSize: 13, letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ color: DK.text, fontSize: 54, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Inter', fontVariantNumeric: 'tabular-nums' }}>
        {display}<span style={{ color: DK.teal, fontSize: 32 }}>{suffix}</span>
      </div>
    </div>
  );
}

function Cursor() {
  const { localTime } = useSprite();
  const blink = Math.floor(localTime * 2) % 2;
  return (
    <div style={{ display: 'inline-block', width: 12, height: 22, background: DK.teal, opacity: blink ? 1 : 0.2, marginLeft: 6, verticalAlign: 'middle' }}/>
  );
}

// ── SCENE 6: SYSTEM EVOLUTION ──────────────────────────────────
// Quad grid: CRM dashboard, AI assistant, automated follow-ups, voice agent

function Scene6Evolution() {
  const { localTime, progress } = useSprite();

  return (
    <div style={{ position: 'absolute', inset: 0, background: DK.bg }}>
      <GridBg opacity={0.05}/>

      {/* 2x2 grid of modules */}
      <ModuleCard x={140} y={140} w={820} h={360} t={0.2} title="CRM DASHBOARD">
        <CRMMini/>
      </ModuleCard>
      <ModuleCard x={980} y={140} w={820} h={360} t={0.7} title="ASISTENTE IA">
        <AIAssistantMini/>
      </ModuleCard>
      <ModuleCard x={140} y={520} w={820} h={360} t={1.2} title="SEGUIMIENTO AUTOMATIZADO">
        <FollowUpMini/>
      </ModuleCard>
      <ModuleCard x={980} y={520} w={820} h={360} t={1.7} title="AGENTE DE VOZ">
        <VoiceAgentMini/>
      </ModuleCard>

      <ScanLine duration={5} opacity={0.1}/>
      <Vignette/>
      <SceneLabel num={6} title="EVOLUCIÓN"/>
      <TimeStamp label="DK//06" sub="ECOSISTEMA ACTIVO"/>
      <Caption
        line1="De chatbots…"
        line2="a ecosistemas completos de ventas."
        tealWord="ecosistemas"
      />
    </div>
  );
}

function ModuleCard({ x, y, w, h, t, title, children }) {
  const { localTime } = useSprite();
  const delta = localTime - t;
  const op = Easing.easeOutCubic(clamp(delta / 0.6, 0, 1));
  const ty = (1 - op) * 30;
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
      background: DK.surface, borderRadius: 12, border: `1px solid ${DK.border}`,
      padding: 24,
      opacity: op, transform: `translateY(${ty}px)`,
      boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ color: DK.teal, fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.2em' }}>{title}</div>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: DK.green, boxShadow: `0 0 10px ${DK.green}` }}/>
      </div>
      <div style={{ height: 'calc(100% - 30px)' }}>
        {children}
      </div>
    </div>
  );
}

function CRMMini() {
  const { localTime } = useSprite();
  return (
    <div style={{ display: 'flex', gap: 20, height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ color: DK.muted, fontSize: 13 }}>ingresos mes</div>
        <div style={{ color: DK.text, fontSize: 54, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Inter' }}>
          $842K
        </div>
        <div style={{ color: DK.green, fontSize: 14 }}>↑ 34% vs. anterior</div>
      </div>
      <div style={{ flex: 1.2, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        {Array.from({length: 14}).map((_, i) => {
          const h = 30 + Math.sin(i * 0.8) * 40 + 60 + i * 6;
          const fade = clamp(localTime * 3 - i * 0.15, 0, 1);
          return (
            <div key={i} style={{
              flex: 1, height: h * fade,
              background: i === 13 ? DK.teal : DK.surface2,
              borderRadius: 2, boxShadow: i === 13 ? `0 0 16px ${DK.tealGlow}` : 'none',
            }}/>
          );
        })}
      </div>
    </div>
  );
}

function AIAssistantMini() {
  const { localTime } = useSprite();
  const startT = 1.0;
  const msgs = [
    { t: 0.2, from: 'u', text: 'resume mis leads de hoy' },
    { t: 0.8, from: 'ai', text: '17 leads nuevos · 9 calificados · 3 listos para cerrar' },
    { t: 1.6, from: 'ai', text: 'sugerencia: llamar a "García Lopez" antes de las 3 pm' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', justifyContent: 'center' }}>
      {msgs.map((m, i) => {
        const delta = localTime - (startT + m.t);
        if (delta < 0) return null;
        const op = clamp(delta / 0.3, 0, 1);
        const isAi = m.from === 'ai';
        return (
          <div key={i} style={{
            alignSelf: isAi ? 'flex-start' : 'flex-end',
            maxWidth: '85%',
            padding: '10px 14px',
            borderRadius: 12,
            background: isAi ? DK.surface2 : DK.teal,
            color: isAi ? DK.text : DK.bg,
            fontSize: 15, opacity: op, fontWeight: isAi ? 400 : 500,
          }}>{m.text}</div>
        );
      })}
      <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, marginTop: 8, opacity: clamp(localTime - 3.0, 0, 1) }}>
        <TypingDot d={0}/> <TypingDot d={0.2}/> <TypingDot d={0.4}/>
      </div>
    </div>
  );
}

function TypingDot({ d }) {
  const { localTime } = useSprite();
  const pulse = 0.3 + 0.7 * Math.abs(Math.sin(localTime * 4 + d * 8));
  return <div style={{ width: 8, height: 8, borderRadius: 4, background: DK.teal, opacity: pulse }}/>;
}

function FollowUpMini() {
  const { localTime } = useSprite();
  const steps = [
    { t: 0.3, label: 'Mensaje inicial', time: '0 min' },
    { t: 0.9, label: 'Recordatorio suave', time: '+24 h' },
    { t: 1.5, label: 'Oferta personalizada', time: '+3 días' },
    { t: 2.1, label: 'Cierre IA', time: '+7 días' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      {steps.map((s, i) => {
        const delta = localTime - (1.3 + s.t);
        if (delta < 0) return null;
        const op = clamp(delta / 0.4, 0, 1);
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: op }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, border: `2px solid ${DK.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DK.teal, fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 600 }}>{i+1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: DK.text, fontSize: 16, fontWeight: 500 }}>{s.label}</div>
              <div style={{ color: DK.muted, fontSize: 12, fontFamily: 'JetBrains Mono' }}>{s.time}</div>
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
  const wave = Array.from({length: 32}).map((_, i) => {
    const amp = Math.sin(localTime * 4 + i * 0.4) * 0.5 + Math.sin(localTime * 6 + i * 0.7) * 0.3;
    const active = clamp(localTime - startT, 0, 1);
    return Math.abs(amp) * 40 * active + 4;
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <div style={{ color: DK.text, fontSize: 16, fontWeight: 500 }}>Llamada entrante → Atendida por IA</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 80 }}>
        {wave.map((h, i) => (
          <div key={i} style={{ flex: 1, height: h, background: DK.teal, borderRadius: 2, boxShadow: `0 0 8px ${DK.tealGlow}` }}/>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, color: DK.muted, fontFamily: 'JetBrains Mono', fontSize: 13 }}>
        <span>00:47</span>
        <span>·</span>
        <span>intención: cotizar</span>
        <span>·</span>
        <span style={{ color: DK.green }}>agendado ✓</span>
      </div>
    </div>
  );
}

Object.assign(window, { Scene4Clients, Scene5Learning, Scene6Evolution });
