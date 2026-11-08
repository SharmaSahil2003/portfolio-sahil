import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  meta?: string;
  level?: "page" | "section";
};

export function SectionHeading({ index, title, meta, level = "page" }: SectionHeadingProps) {
  if (level === "section") {
    return (
      <Reveal className="section-head">
        <span className="section-head-index">{index}</span>
        <h2>{title}</h2>
        {meta ? <span className="section-head-meta">{meta}</span> : null}
      </Reveal>
    );
  }

  return (
    <Reveal className="chapter-head">
      <span className="chapter-head-index">CHAPTER {index}</span>
      <h1>{title}</h1>
      {meta ? <span className="chapter-head-meta">{meta}</span> : null}
    </Reveal>
  );
}
