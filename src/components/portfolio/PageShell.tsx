import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ParticleField } from "./ParticleField";

/**
 * Page wrapper with the shared entry transition.
 * `dark` renders the home-hero treatment: deep night canvas, glow orbs and a
 * scoped particle layer behind the page content.
 */
export function PageShell({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={dark ? "relative z-10" : undefined}
    >
      {children}
    </motion.div>
  );

  if (!dark) return content;

  return (
    <div className="hero-dark relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 -left-40 -top-40 hidden size-[420px] rounded-full bg-primary/25 blur-[175px] md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 -right-40 -top-40 hidden size-[420px] rounded-full bg-primary/25 blur-[175px] md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 -right-24 top-64 hidden size-[500px] rounded-full bg-ember/20 blur-[175px] md:block"
      />
      <ParticleField className="pointer-events-none absolute inset-0 z-[1] text-primary opacity-70" />
      {content}
    </div>
  );
}
