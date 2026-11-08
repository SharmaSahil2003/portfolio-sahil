import { experience } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="atlas-wrap">
      <SectionHeading index="04" title="Work in production" meta="Enterprise systems" />
      {experience.map((job) => (
        <div key={job.company} className="experience-record">
          <Reveal className="experience-meta">
            <span className="eyebrow">Employment record</span>
            <p className="experience-period">{job.period}</p>
            <p className="experience-place">{job.location}</p>
          </Reveal>
          <div className="experience-content">
            <Reveal>
              <h2>{job.role}</h2>
              <p className="eyebrow">{job.company}</p>
              <p>{job.summary}</p>
            </Reveal>
            <ol className="workstream-list">
              {job.workstreams.map((workstream, index) => (
                <Reveal key={workstream.name} as="li" className="workstream" delay={index * 0.035}>
                  <span className="workstream-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{workstream.name}</h3>
                    <ul>
                      {workstream.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </section>
  );
}
