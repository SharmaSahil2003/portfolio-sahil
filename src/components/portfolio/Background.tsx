import { achievements, education } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Background() {
  return (
    <section id="education" className="">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 xl:px-16">
        <SectionHeading index="06" title="Education & achievements" meta="Academics · Awards" />

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="eyebrow">Education</h3>
            <ol className="mt-5 space-y-5">
              {education.map((e, i) => (
                <Reveal key={e.school} as="li" delay={i * 0.07}>
                  <div className="border-b border-border pb-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="font-semibold tracking-tight">{e.school}</p>
                      <span className="font-mono text-xs text-primary">{e.meta}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {e.period} · {e.place}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="eyebrow">Achievements & certifications</h3>
            <ol className="mt-5 space-y-5">
              {achievements.map((a, i) => (
                <Reveal key={a.title} as="li" delay={i * 0.07}>
                  <div className="flex gap-4 border-b border-border pb-5">
                    <span className="font-mono text-xs text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-medium text-balance">{a.title}</p>
                      <p className="mt-1 text-pretty text-sm text-muted-foreground">{a.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
