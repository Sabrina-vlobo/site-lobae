"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo do case: só toca quando está na tela (economiza bateria e dados).
// Com "reduzir movimento", fica parado no primeiro quadro (poster).
// O botão de pausa atende quem precisa parar o movimento (WCAG 2.2.2).
export function CaseVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) userPaused.current = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    userPaused.current = !v.paused;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <>
      <video
        ref={ref}
        className="case-video"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
      <button type="button" className="video-toggle pixel" onClick={toggle} aria-label={playing ? "Pausar vídeo" : "Tocar vídeo"}>
        <span aria-hidden="true">{playing ? "❚❚" : "▶︎"}</span>
      </button>
    </>
  );
}
