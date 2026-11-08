import { skillGroups, tools } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="atlas-wrap">
      <SectionHeading index="02" title="Tools of the trade" meta="Languages · systems · core CS" />
      <div className="skills-list">
        {skillGroups.map((group, groupIndex) => {
          const items = group.kind === "bars" ? group.items.map((item) => item.name) : group.items;
          return (
            <Reveal key={group.title} className="skill-row" delay={groupIndex * 0.05}>
              <h3>{group.title}</h3>
              <ul className="skill-items">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="tool-line">
        <span className="eyebrow">Tools</span>
        {tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </Reveal>
    </section>
  );
}
