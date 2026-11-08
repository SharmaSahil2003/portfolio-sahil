import { achievements, education } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Background() {
  return (
    <section id="education" className="atlas-wrap">
      <SectionHeading index="06" title="Education & recognition" meta="Academic record" />
      <div className="education-grid">
        <div className="record-column">
          <h2>Education</h2>
          <ol className="education-records">
            {education.map((item, index) => (
              <Reveal as="li" key={item.school} className="education-record" delay={index * 0.04}>
                <span className="education-year">{item.period}</span>
                <div>
                  <h3>{item.school}</h3>
                  <p>{item.detail}</p>
                  <p>
                    {item.meta} · {item.place}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="record-column">
          <h2>Achievements & certifications</h2>
          <ol className="achievement-records">
            {achievements.map((item, index) => (
              <Reveal as="li" key={item.title} className="achievement-record" delay={index * 0.035}>
                <span className="achievement-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
