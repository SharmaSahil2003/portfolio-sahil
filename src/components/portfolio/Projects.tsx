import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="atlas-wrap">
      <SectionHeading index="05" title="Selected work" meta="AI · full stack · systems" />
      <div className="project-list">
        {projects.map((project, index) => (
          <Reveal
            key={project.title}
            as="article"
            className="project-entry"
            delay={index % 2 ? 0.04 : 0}
          >
            {project.image ? (
              <div className="project-image">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading={index < 2 ? "eager" : "lazy"}
                  width={1024}
                  height={640}
                />
              </div>
            ) : null}
            <div className="project-copy">
              <div className="project-title-row">
                <div>
                  <span className="project-number">
                    PROJECT {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{project.title}</h2>
                </div>
                <span className="project-year">{project.year}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <ul className="project-tags" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {project.github || project.demo ? (
                <div className="project-links">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github size={14} aria-hidden="true" /> GitHub
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink size={14} aria-hidden="true" /> Live demo
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
