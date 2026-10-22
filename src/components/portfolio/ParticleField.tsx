import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
  op: number;
};

/**
 * Cursor-reactive particle background (canvas, no dependencies).
 * Particles drift, link to nearby neighbours, and are gently pushed by the
 * pointer. Colour follows the current theme through `currentColor`.
 */
export function ParticleField({ className }: { className?: string } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Keep the decorative layer inexpensive enough to coexist with scrolling
    // and content animations on every screen size.
    const compact = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const frameInterval = compact ? 1000 / 20 : 1000 / 30;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: P[] = [];
    let raf = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const count = () => {
      if (compact) return 24;
      const base = Math.round((window.innerWidth * window.innerHeight) / 18000);
      return Math.max(48, Math.min(110, base));
    };

    const seed = () => {
      particles = Array.from({ length: count() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.95,
        vy: (Math.random() - 0.5) * 0.95,
        r: 1 + Math.random() * 2.2,
        o: 0.35 + Math.random() * 0.45,
        op: 0.35 + Math.random() * 0.45,
      }));
    };

    const resize = () => {
      dpr = compact ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const host = canvas.parentElement;
      const fixed = getComputedStyle(canvas).position === "fixed";
      width = fixed || !host ? window.innerWidth : host.clientWidth;
      height = fixed || !host ? window.innerHeight : host.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    // Resolve the themed colour into rgb channels via a probe element so that
    // modern colour spaces (oklch) are converted correctly.
    const rgb = () => {
      const probe = document.createElement("span");
      probe.style.color = getComputedStyle(canvas).color;
      probe.style.display = "none";
      document.body.appendChild(probe);
      const resolved = getComputedStyle(probe).color;
      probe.remove();
      const m = resolved.match(/-?[\d.]+/g);
      if (!m || resolved.startsWith("oklch") || resolved.startsWith("color(")) {
        // Fallback: paint with the raw colour string (canvas supports oklch in
        // modern browsers) by returning a sentinel handled below.
        return null;
      }
      return `${Math.round(Number(m[0]))},${Math.round(Number(m[1]))},${Math.round(Number(m[2]))}`;
    };

    const rawColor = () => getComputedStyle(canvas).color;
    let tone = rgb();
    let fallbackTone = rawColor();
    const paint = () => (tone ? `rgb(${tone})` : fallbackTone);
    const withAlpha = (alpha: number) => {
      ctx.globalAlpha = alpha;
      return paint();
    };
    const themeObserver = new MutationObserver(() => {
      tone = rgb();
      fallbackTone = rawColor();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let lastFrame = -Infinity;
    const step = (now = 0) => {
      if (document.hidden) {
        raf = requestAnimationFrame(step);
        return;
      }

      if (frameInterval && now - lastFrame < frameInterval) {
        raf = requestAnimationFrame(step);
        return;
      }
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (!compact && pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / 126) * 0.9;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
          }
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = withAlpha(p.o);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = withAlpha((1 - d2 / 16000) * 0.3);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!compact && pointer.active) {
        for (const p of particles) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 24000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = withAlpha((1 - d2 / 24000) * 0.5);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!compact) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    if (reduced) {
      step();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none fixed inset-0 z-0 text-primary opacity-70"}
    />
  );
}
