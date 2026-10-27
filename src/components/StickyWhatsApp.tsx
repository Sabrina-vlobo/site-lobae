"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { MSG, whatsappLink } from "@/lib/site";

// Contato fixo: aparece depois do hero e some quando o CTA final está na tela.
// No celular vira uma barra compacta no rodapé; no desktop, uma pílula no canto.
// O hero é "grudento" (empilhamento), então medimos por um marcador logo depois dele.
export function StickyWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const marker = document.getElementById("depois-do-hero");
    const final = document.getElementById("contato");
    if (!marker) return;
    let pastHero = false;
    let atFinal = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === marker) pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
          if (e.target === final) atFinal = e.isIntersecting;
        }
        setShow(pastHero && !atFinal);
      },
      { threshold: 0 },
    );
    io.observe(marker);
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
      <WhatsappLogo size={20} weight="regular" aria-hidden="true" />
      Entrar em contato
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
