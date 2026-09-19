import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  title,
  meta,
}: {
  index: string;
  title: string;
  meta?: string;
}) {
  return (
    <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span className="font-mono text-xs text-primary">{index}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">{title}</h2>
      {meta ? <span className="eyebrow ml-auto">{meta}</span> : null}
    </Reveal>
  );
}
