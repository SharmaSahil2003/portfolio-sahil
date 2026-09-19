import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 xl:px-16">
        <SectionHeading index="05" title="Selected projects" meta="Research · Full-stack · Frontend" />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} as="article" delay={(i % 3) * 0.08}>
              <div className="lift flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="aspect-[16/10] w-full border-b border-border object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold tracking-tight text-balance">{p.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  </div>
                  <p className="mt-2 flex-1 text-pretty text-sm text-muted-foreground">{p.description}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Github className="size-3.5" aria-hidden="true" />
                        GitHub
                      </a>
                    ) : null}
                    {p.demo ? (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} live demo`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        Live demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
