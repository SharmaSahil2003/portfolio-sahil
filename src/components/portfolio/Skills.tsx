import { motion } from "motion/react";
import { skillGroups, tools } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 xl:px-16">
        <SectionHeading index="02" title="Tech stack" meta="Languages · Technologies · Core CS" />

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.08} className="bg-card p-6">
              <h3 className="eyebrow">{group.title}</h3>

              {group.kind === "bars" ? (
                <div className="mt-5 space-y-4">
                  {group.items.map((item, i) => (
                    <div key={item.name}>
                      <div className="mb-1.5 flex justify-between font-mono text-xs">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.level}</span>
                      </div>
                      <div className="h-1 rounded-full bg-muted">
                        <motion.div
                          className="h-full origin-left rounded-full bg-primary"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: item.level / 100 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          role="progressbar"
                          aria-label={item.name}
                          aria-valuenow={item.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {group.kind === "chips" ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs transition-colors hover:border-primary/60 hover:text-primary"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              ) : null}

              {group.kind === "list" ? (
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <span className="eyebrow">Tools</span>
          {tools.map((tool) => (
            <span key={tool} className="font-mono text-xs text-muted-foreground">
              {tool}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
