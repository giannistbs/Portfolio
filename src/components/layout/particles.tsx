"use client";

import { useEffect, useRef } from "react";
import { useAppTheme } from "@/lib/theme";

type P = { x: number; y: number; vx: number; vy: number; s: number; a: number };

/** Drifting outlined squares joined by lines; lines reach toward the cursor. */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { hex, mode } = useAppTheme();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const base = mode === "dark" ? 0.05 : 0.08;
    let w = 0, h = 0, raf = 0;
    let parts: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(40, Math.max(14, (w * h) / 40000)));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        s: 6 + Math.random() * 30,
        a: base * (0.4 + Math.random() * 0.6),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = hex;
      ctx.lineWidth = 1;
      for (const p of parts) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.globalAlpha = p.a * 2.5;
        ctx.strokeRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s);
      }
      const link = 160;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx.globalAlpha = (1 - d / link) * base * 4;
            ctx.beginPath();
            ctx.moveTo(parts[i].x, parts[i].y);
            ctx.lineTo(parts[j].x, parts[j].y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(parts[i].x - mouse.x, parts[i].y - mouse.y);
        if (md < 260) {
          ctx.globalAlpha = (1 - md / 260) * 0.5;
          ctx.beginPath();
          ctx.moveTo(parts[i].x, parts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [hex, mode]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
