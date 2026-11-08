import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";

export type RuntimeTraceCanvasProps = {
  onFailure: () => void;
  reducedMotion: boolean;
};

const tracePaths = [
  "M 12 78 C 32 76 27 58 47 56 S 63 69 76 47 S 88 29 98 22",
  "M 22 18 C 36 28 34 43 48 49 S 66 47 76 47",
  "M 48 56 C 54 71 67 78 82 78",
];

function TraceFallback() {
  return (
    <svg className="trace-fallback" viewBox="0 0 100 100" aria-hidden="true">
      <path d={tracePaths[0]} />
      <path d={tracePaths[1]} />
      <path d={tracePaths[2]} />
      <circle cx="12" cy="78" r="1.7" />
      <circle cx="48" cy="56" r="2.1" />
      <circle cx="76" cy="47" r="2.4" />
      <circle cx="98" cy="22" r="1.6" />
      <circle cx="82" cy="78" r="1.4" />
    </svg>
  );
}

export function RuntimeTraceScene({ variant = "hero" }: { variant?: "hero" | "ambient" }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [staticOnly, setStaticOnly] = useState(false);
  const [Scene, setScene] = useState<ComponentType<RuntimeTraceCanvasProps> | null>(null);

  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData;
      setStaticOnly(
        window.matchMedia("(max-width: 480px)").matches ||
          saveData === true ||
          (memory !== undefined && memory <= 4),
      );
    };
    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      {
        rootMargin: "180px",
      },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion || staticOnly || failed || Scene) return;
    let cancelled = false;
    import("./RuntimeTraceCanvas").then(
      (module) => {
        if (!cancelled) setScene(() => module.RuntimeTraceCanvas);
      },
      () => {
        if (!cancelled) setFailed(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [visible, reducedMotion, staticOnly, failed, Scene]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`runtime-trace runtime-trace--${variant}`}
      data-webgl-fallback={failed || reducedMotion || staticOnly || undefined}
    >
      <TraceFallback />
      {visible && !failed && !reducedMotion && Scene ? (
        <Scene reducedMotion={reducedMotion} onFailure={handleFailure} />
      ) : null}
    </div>
  );
}
