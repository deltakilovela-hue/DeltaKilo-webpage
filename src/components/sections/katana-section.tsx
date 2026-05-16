'use client';

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   KATANA SECTION
   Orientation: kissaki (tip) on LEFT → handle on RIGHT
   On scroll: katana exits LEFT, saya exits RIGHT
   Saya at z-index 2 covers blade at rest
───────────────────────────────────────────────────────────── */
export function KatanaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const katanaX      = useTransform(scrollYProgress, [0.18, 0.88], ["0vw", "-135vw"]);
  const sayaX        = useTransform(scrollYProgress, [0.18, 0.88], ["0vw",  "135vw"]);
  const glowOpacity  = useTransform(scrollYProgress, [0.2, 0.48, 0.74, 0.9], [0, 1, 0.5, 0]);
  const flashOpacity = useTransform(scrollYProgress, [0.38, 0.52, 0.66],      [0, 0.9, 0]);
  const textOpacity  = useTransform(scrollYProgress, [0, 0.12, 0.72, 0.88],   [0, 1, 1, 0]);
  const textY        = useTransform(scrollYProgress, [0, 0.12],               [18, 0]);

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-[#080808]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_35%_at_50%_58%,rgba(13,207,207,0.05)_0%,transparent_70%)]" />

        {/* mid-draw glow */}
        <motion.div style={{ opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_28%_at_50%_52%,rgba(13,207,207,0.16)_0%,transparent_68%)]" />

        {/* flash burst */}
        <motion.div style={{ opacity: flashOpacity }}
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_30%_18%_at_50%_52%,rgba(13,207,207,0.36)_0%,transparent_58%)]" />

        {/* headline */}
        <motion.div style={{ opacity: textOpacity, y: textY }}
          className="absolute top-[14%] left-1/2 -translate-x-1/2 text-center pointer-events-none z-20 w-full px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#0dcfcf] font-semibold mb-2">
            Precisión quirúrgica
          </p>
          <h2 className="text-3xl md:text-5xl font-bold gradient-text leading-tight">
            Cada sistema, afilado
            <br />
            <span className="gradient-text-cyan">para tu negocio</span>
          </h2>
        </motion.div>

        {/* ── KATANA STAGE ────────────────────────────────── */}
        {/*  viewBox 920×180, weapons centered at y=90
            Blade tip (kissaki) → x=55   |   Kashira (pommel) → x=870
            Saya mouth (koiguchi) at x=716, saya tip (kojiri) at x=55  */}
        <div className="relative flex items-center justify-center w-full" style={{ height: 200 }}>
          <div className="relative" style={{ width: 920, maxWidth: '95vw', height: 180 }}>

            {/* ── LAYER 1: KATANA — z1, exits LEFT ── */}
            <motion.div style={{ x: katanaX, position: 'absolute', inset: 0, zIndex: 1 }}>
              <svg viewBox="0 0 920 180" width="920" height="180"
                style={{ position: 'absolute', inset: 0, maxWidth: '95vw' }}
                preserveAspectRatio="xMidYMid meet" overflow="visible">
                <defs>
                  {/* blade steel — top to bottom */}
                  <linearGradient id="kBladeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#e4e8ea" />
                    <stop offset="22%"  stopColor="#c8d4da" />
                    <stop offset="52%"  stopColor="#9db0bc" />
                    <stop offset="80%"  stopColor="#6a8090" />
                    <stop offset="100%" stopColor="#3e5562" />
                  </linearGradient>
                  {/* hamon glow — right→left (handle→tip) */}
                  <linearGradient id="kHamon" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%"   stopColor="#0dcfcf" stopOpacity="0" />
                    <stop offset="18%"  stopColor="#0dcfcf" stopOpacity="0.7" />
                    <stop offset="65%"  stopColor="#0dcfcf" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0dcfcf" stopOpacity="0" />
                  </linearGradient>
                  {/* cutting edge highlight — handle→tip */}
                  <linearGradient id="kEdge" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
                    <stop offset="60%"  stopColor="white" stopOpacity="0.5"  />
                    <stop offset="100%" stopColor="white" stopOpacity="0.05" />
                  </linearGradient>
                  {/* tsuka wrap */}
                  <linearGradient id="kTsuka" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#3c2b16" />
                    <stop offset="50%"  stopColor="#291c0c" />
                    <stop offset="100%" stopColor="#190f06" />
                  </linearGradient>
                  {/* gold fittings */}
                  <linearGradient id="kGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#eecf5a" />
                    <stop offset="42%"  stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#946f14" />
                  </linearGradient>
                  {/* hamon blur filter */}
                  <filter id="kHamonGlow" x="-2%" y="-80%" width="104%" height="260%">
                    <feGaussianBlur stdDeviation="2.2" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="kEdgeGlow" x="-2%" y="-120%" width="104%" height="340%">
                    <feGaussianBlur stdDeviation="1.6" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* ─── BLADE ─── kissaki at x=55, machi at x=700
                    Slight upward curve: mune rises from x=700 to x=55  */}
                {/* Main blade body */}
                <path d="
                  M 700 80   C 500 80 250 84 90 87   L 58 89.5   L 55 91
                  L 58 92.5  L 90 93   C 250 96 500 100 700 100
                  Z"
                  fill="url(#kBladeGrad)" />

                {/* Shinogi-ji (upper bright panel) */}
                <path d="M 700 80 C 500 80 250 84 90 87 L 58 89.5 L 700 86 Z"
                  fill="rgba(255,255,255,0.07)" />

                {/* Mune (spine) top edge */}
                <path d="M 700 80 C 500 80 250 84 90 87 L 60 89"
                  fill="none" stroke="rgba(255,255,255,0.52)" strokeWidth="0.7" />

                {/* Shinogi ridge line */}
                <path d="M 700 83 C 500 83 250 86.5 90 88.8"
                  fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="0.65" />

                {/* Ha (cutting edge) bottom */}
                <path d="M 700 100 C 500 100 250 96 90 93 L 58 92.5 L 55 91"
                  fill="none" stroke="url(#kEdge)" strokeWidth="1.3"
                  filter="url(#kEdgeGlow)" />

                {/* Hamon wavy temper line */}
                <path d={[
                  "M 695 97.5",
                  "Q 668 95.5 645 97","Q 618 99 592 95.5",
                  "Q 564 92 536 96","Q 508 99.5 480 95.5",
                  "Q 450 92 420 96","Q 390 99.5 360 95",
                  "Q 330 91 300 95","Q 268 99 236 94.5",
                  "Q 204 90.5 170 94","Q 138 97 106 92.5",
                  "Q 82 89.5 62 91.5 L 55 91",
                ].join(" ")}
                  fill="none" stroke="url(#kHamon)" strokeWidth="1.5"
                  filter="url(#kHamonGlow)" />

                {/* Nie dots */}
                {[660,608,554,498,442,386,330,274,218,164,116].map((cx, i) => (
                  <circle key={i} cx={cx} cy={94.5 + (i%2 ? -0.7 : 0.7)}
                    r="0.8" fill="#0dcfcf" opacity="0.72" />
                ))}

                {/* Kissaki face highlight */}
                <path d="M 90 87 L 55 91 L 90 93"
                  fill="rgba(255,255,255,0.14)"
                  stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />

                {/* Blade center reflection */}
                <path d="M 680 84 C 480 83.5 260 86 100 88.5"
                  fill="none" stroke="rgba(13,207,207,0.1)" strokeWidth="1.8" />

                {/* Habaki (blade collar) */}
                <rect x="697" y="83" width="12" height="14" rx="1.5"
                  fill="url(#kGold)" stroke="#946f14" strokeWidth="0.4" />

                {/* ─── TSUBA (guard) at x=714 ─── */}
                <ellipse cx="716" cy="90" rx="22" ry="32"
                  fill="#161616" stroke="#d4af37" strokeWidth="1.3" />
                <ellipse cx="716" cy="90" rx="15" ry="22"
                  fill="none" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.38" />
                {[0,45,90,135,180,225,270,315].map((deg, i) => {
                  const r = deg * Math.PI / 180;
                  return <line key={i}
                    x1={716 + Math.cos(r)*9}  y1={90 + Math.sin(r)*13}
                    x2={716 + Math.cos(r)*17} y2={90 + Math.sin(r)*25}
                    stroke="#d4af37" strokeWidth="0.8" strokeOpacity="0.48" />;
                })}
                <ellipse cx="711" cy="80" rx="5" ry="7" fill="white" fillOpacity="0.04" />

                {/* ─── TSUKA (handle) x=737→865 ─── */}
                <path d="M 737 81.5 Q 795 79 865 81 Q 874 83 878 90 Q 874 97 865 99 Q 795 101 737 98.5 L 738 90 Z"
                  fill="url(#kTsuka)" stroke="#231406" strokeWidth="0.5" />

                {/* Diamond ito wrap */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const x = 742 + i * 10.5;
                  return (
                    <g key={i} opacity="0.78">
                      <line x1={x}    y1="80"  x2={x+5}  y2="90" stroke="#d4af37" strokeWidth="0.75" strokeOpacity="0.65" />
                      <line x1={x+5}  y1="90"  x2={x}    y2="100" stroke="#d4af37" strokeWidth="0.75" strokeOpacity="0.65" />
                      <line x1={x}    y1="80"  x2={x-5}  y2="90" stroke="#d4af37" strokeWidth="0.75" strokeOpacity="0.28" />
                      <line x1={x-5}  y1="90"  x2={x}    y2="100" stroke="#d4af37" strokeWidth="0.75" strokeOpacity="0.28" />
                      {i % 3 === 1 && (
                        <ellipse cx={x+2} cy="90" rx="2.8" ry="4.5"
                          fill="#d4af37" fillOpacity="0.2" />
                      )}
                    </g>
                  );
                })}

                {/* Handle top highlight */}
                <path d="M 737 81.5 Q 795 79 865 81"
                  stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" fill="none" />

                {/* Kashira (pommel) */}
                <path d="M 865 81 Q 882 83 886 90 Q 882 97 865 99 Z"
                  fill="url(#kGold)" stroke="#946f14" strokeWidth="0.5" />
                <ellipse cx="879" cy="90" rx="4" ry="3"
                  fill="none" stroke="#eecf5a" strokeWidth="0.4" strokeOpacity="0.5" />
              </svg>
            </motion.div>

            {/* ── LAYER 2: SAYA — z2, exits RIGHT ── */}
            <motion.div style={{ x: sayaX, position: 'absolute', inset: 0, zIndex: 2 }}>
              <svg viewBox="0 0 920 180" width="920" height="180"
                style={{ position: 'absolute', inset: 0, maxWidth: '95vw' }}
                preserveAspectRatio="xMidYMid meet" overflow="visible">
                <defs>
                  {/* saya body — dark lacquer top-to-bottom */}
                  <linearGradient id="sSayaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#303030" />
                    <stop offset="25%"  stopColor="#1d1d1d" />
                    <stop offset="60%"  stopColor="#111111" />
                    <stop offset="100%" stopColor="#070707" />
                  </linearGradient>
                  {/* lacquer sheen */}
                  <linearGradient id="sSayaSheen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="white" stopOpacity="0.08" />
                    <stop offset="38%"  stopColor="white" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.01" />
                  </linearGradient>
                  {/* gold fittings */}
                  <linearGradient id="sGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#eecf5a" />
                    <stop offset="42%"  stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#946f14" />
                  </linearGradient>
                </defs>

                {/* ─── SAYA BODY ───
                    Kojiri (tip) at x=55, Koiguchi (mouth) at x=720
                    Slight upward curve matching the blade            */}
                <path d="
                  M 718 80   C 500 80 250 84 90 87.5  L 58 90  L 90 92.5
                  C 250 96 500 100 718 100
                  Z"
                  fill="url(#sSayaGrad)" stroke="#2e2e2e" strokeWidth="0.5" />

                {/* Top sheen band */}
                <path d="M 718 80 C 500 80 250 84 90 87.5 L 60 89.5 L 718 86 Z"
                  fill="url(#sSayaSheen)" />

                {/* Lacquer texture lines */}
                {[160, 260, 360, 460, 560, 650].map((x, i) => (
                  <line key={i} x1={x} y1="81" x2={x+1} y2="99"
                    stroke="rgba(255,255,255,0.022)" strokeWidth="2.5" />
                ))}

                {/* Blue accent stripe (top) — matching real image */}
                <path d="M 680 81.5 C 480 82 240 85.5 90 88 L 60 89.5"
                  fill="none" stroke="rgba(13,207,207,0.28)" strokeWidth="1.1" />
                {/* Blue accent stripe (bottom) */}
                <path d="M 680 98.5 C 480 98 240 94.5 90 92 L 60 90.5"
                  fill="none" stroke="rgba(13,207,207,0.18)" strokeWidth="0.8" />

                {/* Mune edge highlight top */}
                <path d="M 718 80 C 500 80 250 84 90 87.5"
                  fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.85" />
                {/* Bottom shadow */}
                <path d="M 718 100 C 500 100 250 96 90 92.5"
                  fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="0.65" />

                {/* Kojiri (saya tip cap) at x=55–80 */}
                <path d="M 90 87.5 L 62 89 L 58 90 L 62 91 L 90 92.5
                         C 88 91.5 85 91 82 90 C 85 89 88 88.5 90 87.5 Z"
                  fill="url(#sGold)" stroke="#946f14" strokeWidth="0.5" />
                <line x1="86" y1="88" x2="86" y2="92"
                  stroke="#946f14" strokeWidth="0.6" strokeOpacity="0.4" />

                {/* Sageo (cord ring) at x=380 */}
                <ellipse cx="380" cy="90" rx="8" ry="12"
                  fill="#1a0f06" stroke="#d4af37" strokeWidth="0.9" />
                <ellipse cx="380" cy="90" rx="5" ry="8"
                  fill="none" stroke="#d4af37" strokeWidth="0.4" strokeOpacity="0.38" />
                <line x1="380" y1="78" x2="380" y2="102"
                  stroke="#d4af37" strokeWidth="0.55" strokeOpacity="0.55" />

                {/* Smaller fuchi band */}
                <ellipse cx="260" cy="90" rx="4" ry="7"
                  fill="none" stroke="#d4af37" strokeWidth="0.7" strokeOpacity="0.22" />

                {/* Koiguchi (mouth fitting) at x=714–730 */}
                <rect x="712" y="76" width="18" height="28" rx="2.5"
                  fill="url(#sGold)" stroke="#946f14" strokeWidth="0.5" />
                <line x1="715" y1="76" x2="715" y2="104"
                  stroke="#946f14" strokeWidth="0.8" strokeOpacity="0.42" />
                {/* Mouth slot (opening where blade exits) */}
                <rect x="726" y="86" width="4" height="8" rx="1"
                  fill="#040404" />
              </svg>
            </motion.div>

          </div>
        </div>

        {/* scroll hint */}
        <motion.div style={{ opacity: textOpacity }}
          className="absolute bottom-[14%] left-1/2 -translate-x-1/2 pointer-events-none">
          <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
            Scroll para revelar
          </p>
        </motion.div>

      </div>
    </section>
  );
}
