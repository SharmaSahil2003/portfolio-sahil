import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const coordinates = [
  { label: "Based", value: "Pune, Maharashtra" },
  { label: "Current", value: "BTSA · ZS Associates" },
  { label: "Builds", value: "REST APIs · React systems" },
  { label: "Next", value: "Open to SDE opportunities" },
];

export function About() {
  return (
    <section id="about" className="atlas-wrap">
      <SectionHeading index="01" title="Engineering with context" meta="About Sahil" />
      <div className="about-grid">
        <Reveal className="about-copy">
          <p>
            Hi, I’m <strong>Sahil Shatrughan Sharma</strong>, a software engineer from Pune. I
            graduated from the <strong>Pune Institute of Computer Technology</strong> with a B.E. in
            Computer Engineering and a CGPA of 9.22. I now build enterprise platforms at ZS
            Associates.
          </p>
          <p>
            My day-to-day work spans full-stack engineering: designing REST APIs in{" "}
            <strong>Spring Boot</strong> and <strong>FastAPI</strong>, shipping{" "}
            <strong>React</strong> interfaces, and keeping large-scale data ingestion correct under
            parallel processing.
          </p>
          <p>
            Outside work, I’m a competitive programmer with 1500+ LeetCode problems solved and a
            1000-day streak. I’ve also published two IEEE papers on semantic comment analysis. I
            enjoy problems where correctness, latency, and clean handoffs all matter at once.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <dl className="coordinate-list">
            {coordinates.map((item) => (
              <div key={item.label} className="coordinate-row">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
