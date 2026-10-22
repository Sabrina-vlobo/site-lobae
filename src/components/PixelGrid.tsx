"use client";

import { useEffect, useRef } from "react";

// Fundo do hero: grade de pixels.
// Desktop (mouse): um aglomerado de pixels acende seguindo o cursor.
// Celular (toque): abertura com os pixels formando o símbolo L° → se espalham → repousam no canto.
// "Reduzir movimento": grade parada, só como textura.

const ORANGE: [number, number, number] = [255, 90, 31];
const WHITE: [number, number, number] = [241, 242, 246];

// Símbolo L° em grade 10 x 10 (1 = branco, 2 = laranja).
const SYMBOL: number[][] = Array.from({ length: 10 }, (_, r) =>
  Array.from({ length: 10 }, (_, c) => {
    if ((c < 3 && r < 7) || r >= 7) return 1;
    if (c >= 4 && r < 6 && !(c >= 6 && c <= 7 && r >= 2 && r <= 3)) return 2;
    return 0;
  }),
);

// Ruído fixo por célula, para o aglomerado ter "buracos" e não parecer um círculo.
function noise(i: number, j: number) {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function PixelGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let cell = 32;
    let cols = 0;
    let rows = 0;
    let level: Float32Array = new Float32Array(0);
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -1, y: -1, active: false };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cell = w < 700 ? 24 : 32;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h / cell) + 1;
      level = new Float32Array(cols * rows);
    }

    // Ponto de repouso do aglomerado: canto superior direito.
    const restPoint = () => ({ x: w - (w < 700 ? 60 : 190), y: w < 700 ? 40 : 170 });
    const radius = () => (w < 700 ? 85 : 240);

    function drawDots() {
      ctx!.fillStyle = "rgba(241,242,246,0.12)";
      const dot = w < 700 ? 2 : 3;
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) ctx!.fillRect(i * cell + 8, j * cell + 8, dot, dot);
    }

    function drawCluster(cx: number, cy: number, R: number, t: number, smooth: boolean) {
      const size = cell - 6;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * cell + 8;
          const y = j * cell + 8;
          const d = Math.hypot(x - cx, (y - cy) * 1.3);
          const n = noise(i, j);
          let target = 0;
          if (d < R && n < 1 - d / (R * 1.1)) {
            target = Math.max(0.15, 1 - d / R) * 0.9;
            // respiração lenta
            target *= 0.8 + 0.2 * Math.sin(t / 900 + n * 6.28);
          }
          const k = j * cols + i;
          level[k] = smooth ? level[k] + (target - level[k]) * 0.12 : target;
          const a = level[k];
          if (a < 0.02) continue;
          const c = n < 0.75 ? ORANGE : WHITE;
          ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
          ctx!.fillRect(x - 6, y - 6, size, size);
        }
      }
    }

    // Abertura no celular: símbolo L° no centro → explode → repouso.
    function drawOpening(t: number) {
      const s = 24;
      const ox = w / 2 - 5 * s;
      const oy = Math.min(h * 0.42, 360) - 5 * s;
      const form = 700; // pixels aparecem em onda
      const hold = 1000; // segura o símbolo
      const burst = 800; // se espalha
      for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
          const v = SYMBOL[r][c];
          if (!v) continue;
          const col = v === 2 ? ORANGE : WHITE;
          const n = noise(c + 31, r + 17);
          const delay = ((r + c) / 18) * form;
          let x = ox + c * s + 1;
          let y = oy + r * s + 1;
          let a = Math.min(1, Math.max(0, (t - delay) / 160));
          let size = 22;
          if (t > hold) {
            const p = easeOut(Math.min(1, (t - hold) / burst));
            x += (c - 4.5) * s * (0.6 + n * 1.6) * p + (n - 0.5) * 120 * p;
            y += (r - 4.5) * s * (0.6 + n * 1.6) * p - 90 * p;
            a *= 1 - p;
            size = 22 - 6 * p;
          }
          if (a <= 0.01) continue;
          ctx!.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a.toFixed(3)})`;
          ctx!.fillRect(x, y, size, size);
        }
      }
      return hold + burst;
    }

    function frame(now: number) {
      if (!visible) {
        raf = 0;
        return;
      }
      const t = now - start;
      ctx!.clearRect(0, 0, w, h);
      drawDots();

      if (touch) {
        const end = drawOpening(t);
        if (t > end - 300) {
          const rp = restPoint();
          drawCluster(rp.x, rp.y, radius(), t, true);
        }
      } else {
        const rp = restPoint();
        const cx = pointer.active ? pointer.x : rp.x;
        const cy = pointer.active ? pointer.y : rp.y;
        drawCluster(cx, cy, radius(), t, true);
      }
      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h);
      drawDots();
      const rp = restPoint();
      drawCluster(rp.x, rp.y, radius(), 0, false);
    }

    resize();

    if (reduce) {
      drawStatic();
      const onResize = () => {
        resize();
        drawStatic();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const host = canvas.parentElement!;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pixel-grid" aria-hidden="true" />;
}
