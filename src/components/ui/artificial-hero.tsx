'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const ArtificialHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const grainCanvas = grainCanvasRef.current;
    if (!canvas || !grainCanvas) return;

    const ctx = canvas.getContext('2d');
    const grainCtx = grainCanvas.getContext('2d');
    if (!ctx || !grainCtx) return;

    const density = ' .:-=+*#%@';

    const params = {
      rotation: 0,
      atmosphereShift: 0,
      glitchIntensity: 0,
      glitchFrequency: 0,
    };

    gsap.to(params, { rotation: Math.PI * 2, duration: 20, repeat: -1, ease: 'none' });
    gsap.to(params, { atmosphereShift: 1, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(params, {
      glitchIntensity: 1,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      repeatDelay: Math.random() * 3 + 1,
    });
    gsap.to(params, { glitchFrequency: 1, duration: 0.05, repeat: -1, yoyo: true, ease: 'none' });

    const generateFilmGrain = (width: number, height: number, intensity = 0.15) => {
      const imageData = grainCtx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * intensity * 255;
        data[i] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 1] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 2] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 3] = Math.abs(grain) * 3;
      }
      return imageData;
    };

    const drawGlitchedOrb = (
      centerX: number,
      centerY: number,
      radius: number,
      hue: number,
      glitchIntensity: number,
    ) => {
      ctx.save();
      const shouldGlitch = Math.random() < 0.1 && glitchIntensity > 0.5;
      const glitchOffset = shouldGlitch ? (Math.random() - 0.5) * 20 * glitchIntensity : 0;
      const glitchScale = shouldGlitch ? 1 + (Math.random() - 0.5) * 0.3 * glitchIntensity : 1;

      if (shouldGlitch) {
        ctx.translate(glitchOffset, glitchOffset * 0.8);
        ctx.scale(glitchScale, 1 / glitchScale);
      }

      const orbGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
      orbGradient.addColorStop(0, `hsla(${hue + 10}, 100%, 95%, 0.9)`);
      orbGradient.addColorStop(0.2, `hsla(${hue + 20}, 90%, 80%, 0.7)`);
      orbGradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, 0.4)`);
      orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orbGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerRadius = radius * 0.3;
      ctx.fillStyle = `hsla(${hue + 20}, 100%, 95%, 0.8)`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
      ctx.fill();

      if (shouldGlitch) {
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `hsla(100, 100%, 50%, ${0.6 * glitchIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX + glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(240, 100%, 50%, ${0.5 * glitchIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX - glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * glitchIntensity})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const y = centerY - radius + Math.random() * radius * 2;
          ctx.beginPath();
          ctx.moveTo(centerX - radius + Math.random() * 20, y);
          ctx.lineTo(centerX + radius - Math.random() * 20, y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(255, 0, 255, ${0.4 * glitchIntensity})`;
        for (let i = 0; i < 3; i++) {
          const bx = centerX - radius + Math.random() * radius * 2;
          const by = centerY - radius + Math.random() * radius * 2;
          const bs = Math.random() * 10 + 2;
          ctx.fillRect(bx, by, bs, bs);
        }
      }

      ctx.strokeStyle = `hsla(${hue + 20}, 80%, 70%, 0.6)`;
      ctx.lineWidth = 2;
      if (shouldGlitch) {
        for (let i = 0; i < 8; i++) {
          const sa = (i / 8) * Math.PI * 2;
          const ea = ((i + 1) / 8) * Math.PI * 2;
          const rr = radius * 1.2 + (Math.random() - 0.5) * 10 * glitchIntensity;
          ctx.beginPath();
          ctx.arc(centerX, centerY, rr, sa, ea);
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (shouldGlitch && Math.random() < 0.3) {
        ctx.globalCompositeOperation = 'difference';
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * glitchIntensity})`;
        for (let i = 0; i < 3; i++) {
          const barY = centerY - radius + Math.random() * radius * 2;
          ctx.fillRect(centerX - radius, barY, radius * 2, Math.random() * 5 + 1);
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.restore();
    };

    function render() {
      timeRef.current += 0.016;
      const time = timeRef.current;

      const width = (canvas.width = grainCanvas.width = window.innerWidth);
      const height = (canvas.height = grainCanvas.height = window.innerHeight);

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.2;

      const hue = 180 + params.atmosphereShift * 60;
      const bgGradient = ctx.createRadialGradient(centerX, centerY - 50, 0, centerX, centerY, Math.max(width, height) * 0.8);
      bgGradient.addColorStop(0, `hsla(${hue + 40}, 80%, 60%, 0.4)`);
      bgGradient.addColorStop(0.3, `hsla(${hue}, 60%, 40%, 0.3)`);
      bgGradient.addColorStop(0.6, `hsla(${hue - 20}, 40%, 20%, 0.2)`);
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawGlitchedOrb(centerX, centerY, radius, hue, params.glitchIntensity);

      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const spacing = 9;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      for (let i = 0; i < cols && i < 150; i++) {
        for (let j = 0; j < rows && j < 100; j++) {
          const x = (i - cols / 2) * spacing + centerX;
          const y = (j - rows / 2) * spacing + centerY;
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius && Math.random() > 0.4) {
            const z = Math.sqrt(Math.max(0, radius * radius - dx * dx - dy * dy));
            const angle = params.rotation;
            const rotZ = dx * Math.sin(angle) + z * Math.cos(angle);
            const brightness = (rotZ + radius) / (radius * 2);

            if (rotZ > -radius * 0.3) {
              let char = density[Math.floor(brightness * (density.length - 1))];
              if (dist < radius * 0.8 && params.glitchIntensity > 0.8 && Math.random() < 0.3) {
                const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '■', '□'];
                char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, brightness)})`;
              ctx.fillText(char, x, y);
            }
          }
        }
      }

      // Film grain
      grainCtx.clearRect(0, 0, width, height);
      grainCtx.putImageData(generateFilmGrain(width, height, 0.22 + Math.sin(time * 10) * 0.03), 0, 0);

      if (params.glitchIntensity > 0.5) {
        grainCtx.globalCompositeOperation = 'screen';
        for (let i = 0; i < 200; i++) {
          const op = Math.random() * 0.5 * params.glitchIntensity;
          grainCtx.fillStyle = `rgba(255,255,255,${op})`;
          grainCtx.beginPath();
          grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 0.5, 0, Math.PI * 2);
          grainCtx.fill();
        }
      }

      grainCtx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 100; i++) {
        grainCtx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`;
        grainCtx.beginPath();
        grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        grainCtx.fill();
      }

      grainCtx.globalCompositeOperation = 'multiply';
      for (let i = 0; i < 50; i++) {
        grainCtx.fillStyle = `rgba(0,0,0,${Math.random() * 0.5 + 0.5})`;
        grainCtx.beginPath();
        grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
        grainCtx.fill();
      }

      frameRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      gsap.killTweensOf(params);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Canvas layers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-black" />
      <canvas
        ref={grainCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* Left side text */}
      <div className="absolute left-8 top-[42%] z-50 pointer-events-none">
        <p className="text-[11px] text-white/70 leading-relaxed tracking-[0.5px] uppercase max-w-[140px]">
          Responde<br />
          en segundos,<br />
          todos los días
        </p>
      </div>

      {/* Right side text */}
      <div className="absolute right-8 top-[42%] z-50 pointer-events-none text-right">
        <p className="text-[11px] text-white/70 leading-relaxed tracking-[0.5px] uppercase max-w-[140px]">
          Sin personal<br />
          extra. Sin<br />
          horarios.
        </p>
      </div>

      {/* Large bottom title */}
      <div className="absolute bottom-[18%] left-0 right-0 z-50 pointer-events-none">
        <h1
          className="text-white text-center font-black leading-none tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(3.5rem, 13vw, 11rem)',
            textShadow: '0 0 50px rgba(255,255,255,0.25)',
            filter: 'contrast(1.2)',
          }}
        >
          ARTIFICIAL
        </h1>
      </div>

      {/* CTA */}
      <div className="absolute bottom-[8%] left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://wa.me/5215663864984?text=Hola,%20quiero%20un%20asistente%20de%20IA%20para%20mi%20negocio%20💊"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold
                     bg-[#D4AF37] text-[#0e0e0e] rounded-full
                     hover:bg-[#E5C158] transition-all duration-300
                     shadow-lg hover:shadow-[#D4AF37]/30 group"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Quiero mi asistente
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <Link
          href="#servicio"
          className="text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          Ver el servicio ↓
        </Link>
      </div>
    </div>
  );
};
