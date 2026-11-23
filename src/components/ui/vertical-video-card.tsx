'use client';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import {
  type PortafolioVideo,
  formatoDuracion,
  portafolioPoster,
  portafolioSrc,
} from '@/lib/portafolio';

// Only one portfolio video plays at a time.
const PLAY_EVENT = 'dk-portafolio-play';

export function VerticalVideoCard({ video }: { video: PortafolioVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== video.slug) ref.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, [video.slug]);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setPlaying(true);
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: video.slug }));
    v.play().catch(() => setPlaying(false));
  };

  return (
    <figure className="group flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black aspect-[9/16]
                      shadow-lg shadow-black/40 transition-colors duration-300 group-hover:border-[#0dcfcf]/40">
        <video
          ref={ref}
          src={portafolioSrc(video.slug)}
          poster={portafolioPoster(video.slug)}
          preload="none"
          playsInline
          controls={playing}
          onPlay={() => window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: video.slug }))}
          onEnded={() => setPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={`Video de ejemplo: ${video.titulo}`}
        />
        {!playing && (
          <button
            type="button"
            onClick={play}
            aria-label={`Reproducir: ${video.titulo} (${formatoDuracion(video.segundos)})`}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/0 to-black/0"
          >
            <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0dcfcf] text-black flex items-center justify-center
                             shadow-lg shadow-[#0dcfcf]/30 transition-transform duration-200 group-hover:scale-110">
              <Play size={22} className="ml-0.5" fill="currentColor" />
            </span>
            <span className="absolute bottom-2.5 left-2.5 flex gap-1.5">
              <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white/90">
                {formatoDuracion(video.segundos)}
              </span>
              {video.idioma && (
                <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white/90">
                  {video.idioma}
                </span>
              )}
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <p className="text-sm font-semibold text-white leading-snug">{video.titulo}</p>
        <p className="text-xs text-white/40 mt-1">{video.giro}</p>
      </figcaption>
    </figure>
  );
}
