import { experience } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 xl:px-16">
        <SectionHeading index="04" title="Experience" meta="2025 — present" />

        <div className="relative mt-12">
          <div
            className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary via-ember/50 to-transparent"
            aria-hidden="true"
          />

          {experience.map((job) => (
            <Reveal key={job.company} className="relative pl-10">
              <span
                className="absolute left-0 top-1.5 size-3.5 rounded-full bg-primary ring-4 ring-background"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
                <span className="font-mono text-sm text-ember">{job.company}</span>
                <span className="font-mono text-xs text-muted-foreground md:ml-auto">{job.period}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{job.location}</p>
              <p className="mt-3 max-w-[64ch] text-pretty text-muted-foreground">{job.summary}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {job.workstreams.map((ws, i) => (
                  <Reveal
                    key={ws.name}
                    delay={i * 0.07}
                    className="lift rounded-xl border border-border bg-card p-5"
                  >
                    <p className="eyebrow text-ember">Workstream {String(i + 1).padStart(2, "0")}</p>
                    <h4 className="mt-2 font-medium">{ws.name}</h4>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {ws.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-pretty">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
