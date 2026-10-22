import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { profile, stats, typedRoles } from "@/lib/portfolio-data";
import { Typewriter } from "./Typewriter";
import { ParticleField } from "./ParticleField";
import profileAsset from "@/assets/profile.jpg";

const BADGE_TEXT = "• MY PROJECTS • MY PROJECTS ";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        setPointer({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <section id="top" ref={ref} className="hero-dark relative overflow-hidden">
      {/* Reference-style backdrop: deep base wash + large blurred glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 -left-40 -top-40 hidden size-[420px] rounded-full bg-primary/25 blur-[175px] transition-transform duration-500 ease-out md:block"
        style={{ transform: `translate3d(${pointer.x * 22}px, ${pointer.y * 22}px, 0)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 -right-40 -top-40 hidden size-[420px] rounded-full bg-primary/25 blur-[175px] transition-transform duration-500 ease-out md:block"
        style={{ transform: `translate3d(${pointer.x * 30}px, ${pointer.y * 30}px, 0)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 -right-24 top-64 hidden size-[500px] rounded-full bg-ember/20 blur-[175px] transition-transform duration-500 ease-out md:block"
        style={{ transform: `translate3d(${pointer.x * -28}px, ${pointer.y * -28}px, 0)` }}
      />
      <ParticleField className="pointer-events-none absolute inset-0 z-[1] text-primary opacity-80" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1400px] items-center gap-12 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-2 lg:gap-6 lg:pb-16 lg:pt-24">
        {/* Left column — headline */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-ember">
            {profile.role} · {profile.company}
          </p>

          <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl xl:text-7xl">
            Turning ideas into{" "}
            <span className="bg-gradient-to-r from-primary to-ember bg-clip-text text-transparent">
              engineered reality
            </span>
          </h1>

          <div className="mt-6 flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <Typewriter words={typedRoles} />
          </div>

          <p className="mt-6 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">
            {profile.summary}
          </p>

          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {profile.location}
          </p>

          {/* Rotating circular badge */}
          <div className="mt-12">
            <Link
              to="/projects"
              aria-label="View my projects"
              className="group relative grid size-36 place-items-center rounded-full border border-border transition-colors hover:border-primary/60"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 spin-slow motion-reduce:animate-none"
              >
                <svg viewBox="0 0 160 160" className="size-full">
                  <defs>
                    <path
                      id="badge-circle"
                      d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    className="fill-muted-foreground font-mono"
                    fontSize="11"
                    letterSpacing="4.2"
                  >
                    <textPath href="#badge-circle">{BADGE_TEXT}</textPath>
                  </text>
                </svg>
              </span>
              <ArrowRight className="size-6 text-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          </div>
        </motion.div>

        {/* Right column — portrait with a cinematic on-load reveal */}
        <div
          style={{
            transform: reduce
              ? undefined
              : `translate3d(${pointer.x * -16}px, ${pointer.y * -16}px, 0)`,
            transition: "transform 500ms ease-out",
          }}
          className="relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-lg">
            {/* glow blooms open behind the portrait */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute -inset-10 mix-blend-color-dodge bg-[radial-gradient(circle_at_60%_45%,color-mix(in_oklab,var(--color-primary)_45%,transparent),transparent_62%)] blur-2xl md:motion-safe:animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/40 to-ember/25 blur-[70px]"
            />

            {/* frame: unmasks upward, settles with a soft scale + blur focus */}
            <motion.div
              initial={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 56,
                      scale: 1.06,
                      filter: "blur(14px)",
                      clipPath: "inset(100% 0% 0% 0% round 2rem)",
                    }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      clipPath: "inset(0% 0% 0% 0% round 2rem)",
                    }
              }
              transition={{ duration: 1.15, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem]"
            >
              <img
                src={profileAsset}
                alt="Portrait of Sahil S. Sharma"
                width={720}
                height={720}
                className="relative block aspect-square w-full rounded-[2rem] border border-border object-cover"
              />
              {/* one-shot light sweep across the portrait */}
              <span
                aria-hidden="true"
                className="hero-sweep pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
              />
              {/* thin gradient ring that fades in last */}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.15 }}
                className="pointer-events-none absolute -inset-px rounded-[2.05rem] bg-gradient-to-br from-primary/50 via-transparent to-ember/40 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -18, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 -left-4 rounded-lg border border-border bg-card px-4 py-3 font-mono text-xs shadow-lg"
            >
              <span className="text-primary">$ whoami</span>
              <p className="mt-1 text-muted-foreground">btsa · zs associates</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-2xl font-semibold">{s.value}</dd>
              <p className="eyebrow mt-1">{s.label}</p>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
