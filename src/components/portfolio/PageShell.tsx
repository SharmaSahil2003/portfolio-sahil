import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function PageShell({ children }: { children: ReactNode; dark?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="chapter-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
