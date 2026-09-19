import { profile } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const facts = [
  { label: "Based in", value: "Pune, Maharashtra" },
  { label: "Currently", value: "BTSA @ ZS Associates" },
  { label: "Focus", value: "REST APIs · Frontend systems" },
  { label: "Status", value: "Open to SDE opportunities" },
];

export function About() {
  return (
    <section id="about" className="">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 xl:px-16">
        <SectionHeading index="01" title="About" meta="Who I am" />

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Hi, I'm <strong className="font-semibold text-foreground">Sahil Shatrughan Sharma</strong>, a
                software engineer from Pune. I graduated from{" "}
                <strong className="font-semibold text-foreground">Pune Institute of Computer Technology</strong> with a
                B.E. in Computer Engineering (CGPA 9.22) and now build enterprise platforms at ZS Associates.
              </p>
              <p>
                My day-to-day is full-stack: designing REST APIs in{" "}
                <strong className="font-semibold text-foreground">Spring Boot</strong> and{" "}
                <strong className="font-semibold text-foreground">FastAPI</strong>, shipping{" "}
                <strong className="font-semibold text-foreground">React</strong> interfaces on top of them, and keeping
                large-scale data ingestion correct under parallel processing.
              </p>
              <p>
                Outside of work I'm a competitive programmer — {profile.summary.includes("1500+") ? "1500+" : "1500+"}{" "}
                LeetCode problems and a 1000-day streak — and I've published two IEEE papers on semantic comment
                analysis. I enjoy problems where correctness, latency and clean handoffs all matter at once.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <dl className="rounded-xl border border-border bg-card">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    i < facts.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="text-right text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
