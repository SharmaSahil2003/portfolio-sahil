import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function Typewriter({ words }: { words: string[] }) {
  const reduceMotion = useReducedMotion();
  const started = useRef(false);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (!started.current) {
      started.current = true;
      setText(words[0]?.slice(0, 1) ?? "");
      return;
    }
    const current = words[index % words.length] ?? "";
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const timeout = window.setTimeout(
      () => {
        if (done) {
          setDeleting(true);
        } else if (cleared) {
          const nextIndex = (index + 1) % words.length;
          setDeleting(false);
          setIndex(nextIndex);
          setText(words[nextIndex]?.slice(0, 1) ?? "");
        } else {
          setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
        }
      },
      done ? 1600 : deleting ? 35 : 70,
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, reduceMotion]);

  return (
    <span>
      <span aria-live="off">{text}</span>
      <span
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-primary align-middle"
        style={{ height: "1em" }}
        aria-hidden="true"
      />
    </span>
  );
}
