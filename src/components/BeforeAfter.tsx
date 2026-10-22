"use client";

import { useState } from "react";

// Slider antes/depois: arraste (ou use as setas do teclado) para comparar.
export function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba" style={{ ["--pos" as string]: `${pos}%` }}>
      <div className="ba-before" aria-hidden="true">
        <span className="tag tag--cobalto ba-tag-left">Antes</span>
        <div className="linkpage">
          <div className="linkpage-avatar" />
          <strong>@clinicaambar</strong>
          <span className="linkpage-bio">odontologia estética · agende pelo direct</span>
          {["Tratamentos (PDF)", "WhatsApp", "Localização", "Instagram"].map((l) => (
            <span key={l} className="linkpage-link">
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="ba-after" aria-hidden="true">
        <span className="tag ba-tag-right">Depois</span>
        <div className="ambarsite">
          <div className="ambarsite-nav">
            <span className="ambarsite-brand">
              <i />
              âmbar
            </span>
            <span className="ambarsite-links">Tratamentos · A clínica · Dúvidas</span>
          </div>
          <span className="ambarsite-kicker">Odontologia estética</span>
          <p className="ambarsite-title">Seu sorriso, sem aquele frio na barriga.</p>
          <p className="ambarsite-text">Avaliação completa na primeira consulta, sem pressa. Agende em 2 cliques.</p>
          <span className="ambarsite-btn">Agendar pelo WhatsApp</span>
        </div>
      </div>

      <div className="ba-line" aria-hidden="true">
        <span className="ba-handle">‹ ›</span>
      </div>

      <input
        className="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Arraste para comparar a página de links com o site"
        aria-valuetext={`${100 - pos}% página de links, ${pos}% site`}
      />
    </div>
  );
}
