import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Comp = motion[as];
  const reduceMotion = useReducedMotion();
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.42,
        delay: reduceMotion ? 0 : delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </Comp>
  );
}
