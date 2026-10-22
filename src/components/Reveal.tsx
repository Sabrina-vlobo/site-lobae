"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
  Movimento do site (referência: onmidiamkt.com.br)
  - Rolagem suave (Lenis)
  - Menu: transparente no topo, vidro depois de 60px, link da seção atual sublinhado
  - Títulos: palavras sobem de dentro de uma máscara
  - Textos: saem do desfoque
  - Cards: sobem em sequência
  - Números e preços: nitidez atrelada à rolagem
  - Seções empilhadas: cada uma sobe como card por cima da anterior
  Com "reduzir movimento", só o menu e o empilhamento ficam (sem animação).
*/

const SCROLLED_AT = 60;

// Posição da seção no fluxo, ignorando o "grudar" do sticky
function naturalTop(el: HTMLElement) {
  const prev = el.style.position;
  el.style.position = "static";
  const y = el.getBoundingClientRect().top + window.scrollY;
  el.style.position = prev;
  return y;
}

function splitWords(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  el.setAttribute("aria-label", el.textContent?.replace(/\s+/g, " ").trim() ?? "");
  let i = 0;
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const p of parts) {
          if (!p) continue;
          if (/^\s+$/.test(p)) {
            frag.append(" ");
            continue;
          }
          const w = document.createElement("span");
          w.className = "w";
          w.setAttribute("aria-hidden", "true");
          const wi = document.createElement("span");
          wi.className = "wi";
          wi.style.setProperty("--i", String(i++));
          wi.textContent = p;
          w.append(wi);
          frag.append(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    }
  };
  walk(el);
}

export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    /* ---------- Rolagem suave ---------- */
    let lenis: Lenis | null = null;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: true });
      cleanups.push(() => lenis?.destroy());
    }

    /* ---------- Links internos ----------
       Seção empilhada que já grudou mente a própria posição,
       então medimos com ela solta por um instante. */
    const onAnchor = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!a || a.hash.length < 2) return;
      const target = document.getElementById(a.hash.slice(1));
      if (!target) return;
      ev.preventDefault();
      a.closest("details")?.removeAttribute("open");
      const y = naturalTop(target);
      if (lenis) lenis.scrollTo(y, { duration: 1.4 });
      else window.scrollTo(0, y);
      history.replaceState(null, "", a.hash);
      // Teclado e leitor de tela continuam a partir da seção escolhida
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onAnchor);
    cleanups.push(() => document.removeEventListener("click", onAnchor));

    /* ---------- Menu: estado e seção atual ---------- */
    const navLinks = [...document.querySelectorAll<HTMLAnchorElement>(".nav-links a[href^='#']")];
    const spyTargets = navLinks
      .map((a) => ({ a, el: document.getElementById(a.hash.slice(1)) }))
      .filter((t): t is { a: HTMLAnchorElement; el: HTMLElement } => !!t.el);
    let spyRanges: { a: HTMLAnchorElement; top: number; bottom: number }[] = [];

    /* ---------- Revelação ---------- */
    if (!reduce) {
      root.classList.add("js-reveal");
      document.querySelectorAll<HTMLElement>("main h2").forEach((h) => {
        splitWords(h);
        h.dataset.reveal = "words";
      });
      document
        .querySelectorAll<HTMLElement>("main .tag, main .lead, main .caption, main .swipe-hint, .about-photo, .steps li, .faq-item, .zelador")
        .forEach((el) => {
          if (!el.dataset.reveal && !el.closest("[data-reveal]")) el.dataset.reveal = "blur";
        });
      // Sequência: irmãos revelados entram com 100ms de diferença
      const groups = new Map<Element, HTMLElement[]>();
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const p = el.parentElement!;
        groups.set(p, [...(groups.get(p) ?? []), el]);
      });
      groups.forEach((els) => els.forEach((el, i) => el.style.setProperty("--d", `${Math.min(i, 5) * 100}ms`)));

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---------- Seções empilhadas + efeitos atrelados à rolagem ---------- */
    const stacks = [...document.querySelectorAll<HTMLElement>("[data-stack]")];
    const scrubs = reduce ? [] : [...document.querySelectorAll<HTMLElement>("main .num, .price-por, .steps .pixel, .case-media")];

    const measure = () => {
      const vh = window.innerHeight;
      // Seção mais alta que a tela gruda pela base: termina de rolar antes de ser coberta
      stacks.forEach((s) => s.style.setProperty("--stick", `${Math.min(0, vh - s.offsetHeight)}px`));
      spyRanges = spyTargets.map(({ a, el }) => {
        const top = naturalTop(el);
        return { a, top, bottom: top + el.offsetHeight };
      });
    };

    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      root.classList.toggle("is-scrolled", window.scrollY > SCROLLED_AT);
      // Menu claro sobre seção clara, escuro sobre seção escura
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 44)
        .find((el) => !el.closest(".nav-shell"))
        ?.closest("section, header");
      root.classList.toggle("nav-on-light", !!under?.classList.contains("section--light"));
      const mid = window.scrollY + vh * 0.5;
      spyRanges.forEach(({ a, top, bottom }) => {
        if (mid >= top && mid < bottom) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      if (reduce) return;
      // Seção coberta escurece e recua um pouco enquanto a próxima sobe
      stacks.forEach((s) => {
        const next = s.nextElementSibling as HTMLElement | null;
        const top = next ? next.getBoundingClientRect().top : vh;
        const c = Math.min(1, Math.max(0, 1 - top / vh));
        s.style.setProperty("--cover", c.toFixed(3));
      });
      // Nitidez: de 10% a 100% enquanto o elemento sobe do pé da tela até 55% dela
      // Nitidez: ganha foco enquanto sobe; depois de nítido, fica nítido.
      // Se a seção já grudou (empilhada), tudo nela fica nítido.
      scrubs.forEach((el) => {
        if (el.dataset.sharp) return;
        const r = el.getBoundingClientRect();
        const sec = el.closest<HTMLElement>("[data-stack]");
        const stuck = sec ? sec.getBoundingClientRect().top <= parseFloat(sec.style.getPropertyValue("--stick") || "0") + 1 : false;
        let p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.3)));
        if (stuck && r.top < vh) p = 1;
        el.style.setProperty("--sp", p.toFixed(3));
        if (p >= 1) el.dataset.sharp = "1";
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    frame();
    if (!reduce) root.classList.add("js-scrub");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    stacks.forEach((s) => ro.observe(s));
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    });

    return () => cleanups.forEach((f) => f());
  }, []);
  return null;
}
