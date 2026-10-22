"use client";

import { useEffect, useState } from "react";
import { MSG, whatsappLink } from "@/lib/site";

// Botão fixo de WhatsApp: aparece depois que a pessoa passa do hero
// e some quando o CTA final está na tela.
export function StickyWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const final = document.getElementById("contato");
    if (!hero) return;
    let pastHero = false;
    let atFinal = false;
    const update = () => setShow(pastHero && !atFinal);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === final) atFinal = e.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    if (final) io.observe(final);
    return () => io.disconnect();
  }, []);

  return (
    <a
      className={`sticky-wa${show ? " is-visible" : ""}`}
      href={whatsappLink(MSG.geral)}
      target="_blank"
      rel="noopener"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      Chamar no WhatsApp
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
