import { useEffect, useState } from "react";

export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length] ?? "";
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const timeout = window.setTimeout(
      () => {
        if (done) {
          setDeleting(true);
        } else if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        } else {
          setText(
            deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
          );
        }
      },
      done ? 1600 : deleting ? 35 : 70,
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span>
      <span aria-live="polite">{text}</span>
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-primary align-middle" style={{ height: "1em" }} aria-hidden="true" />
    </span>
  );
}
