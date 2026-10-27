"use client";

import { useEffect, useRef, useState } from "react";
import { ConceptPreview } from "@/components/ConceptPreview";

// Hero: os trabalhos reais da LOBAE passando em sequência, empilhados.
// Troca a cada 4,5s, pausa com o mouse em cima, fora da tela ou com a aba escondida.
// Com "reduzir movimento", fica parado no primeiro trabalho.
const WORKS = [
  { id: "volta", nome: "Volta", tipo: "Site no ar" },
  { id: "traco", nome: "Traço Arquitetura", tipo: "Projeto-conceito" },
  { id: "ambar", nome: "Clínica Âmbar", tipo: "Projeto-conceito" },
] as const;

export function HeroWork() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible || paused.current || document.hidden) return;
      setActive((a) => (a + 1) % WORKS.length);
    }, 4500);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  // O vídeo do Volta só toca quando é o card da frente
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (active === 0 && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <div
      ref={root}
      className="hero-work"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="hw-stack" aria-hidden="true">
        {WORKS.map((w, i) => {
          const pos = (i - active + WORKS.length) % WORKS.length;
          return (
            <div key={w.id} className="hw-card" data-pos={pos}>
              {w.id === "volta" ? (
                <video ref={video} muted loop playsInline preload="metadata" poster="/cases/volta-poster.jpg">
                  <source src="/cases/volta.webm" type="video/webm" />
                  <source src="/cases/volta.mp4" type="video/mp4" />
                </video>
              ) : (
                <ConceptPreview variant={w.id} />
              )}
            </div>
          );
        })}
      </div>
      <div className="hw-caption">
        <p aria-live="polite">
          <strong>{WORKS[active].nome}</strong>
          <span>{WORKS[active].tipo}</span>
        </p>
        <div className="hw-dots" role="tablist" aria-label="Trabalhos em destaque">
          {WORKS.map((w, i) => (
            <button
              key={w.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Ver ${w.nome}`}
              onClick={() => setActive(i)}
            >
              <i />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
