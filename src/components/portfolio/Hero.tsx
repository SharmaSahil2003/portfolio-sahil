import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { profile, stats, typedRoles } from "@/lib/portfolio-data";
import profileAsset from "@/assets/profile.jpg";
import { ParticleField } from "./ParticleField";
import { RuntimeTraceScene } from "./RuntimeTraceScene";
import { Typewriter } from "./Typewriter";

function AnimatedStat({ value, reduceMotion }: { value: string; reduceMotion: boolean }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const numeric = Number.parseFloat(value.replace(/[^\d.]/g, ""));
    const startedAt = performance.now();
    const duration = 780;
    let frame = 0;

    const render = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const count = numeric * eased;
      if (value.startsWith("#")) setDisplay(`#${Math.round(count)}`);
      else if (value.endsWith("+")) setDisplay(`${Math.round(count).toLocaleString("en-US")}+`);
      else if (value.includes(".")) setDisplay(count.toFixed(2));
      else if (/^0\d/.test(value))
        setDisplay(String(Math.round(count)).padStart(value.length, "0"));
      else setDisplay(String(Math.round(count)));

      if (progress < 1) frame = requestAnimationFrame(render);
      else setDisplay(value);
    };

    setDisplay(
      value.startsWith("#")
        ? "#0"
        : value.endsWith("+")
          ? "0+"
          : value.includes(".")
            ? "0.00"
            : "0",
    );
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, value]);

  return (
    <strong>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </strong>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const initial = { opacity: 0, y: 18 };

  return (
    <section id="top" className="home-page">
      <ParticleField className="pointer-events-none absolute inset-0 z-0 text-primary opacity-50" />
      <div className="atlas-wrap home-composition">
        <motion.div
          className="home-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.32 }}
        >
          <motion.p
            className="atlas-kicker home-overline"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : 0.04 }}
          >
            {profile.role} <span aria-hidden="true">·</span> {profile.company}{" "}
            <span aria-hidden="true">·</span> Pune
          </motion.p>
          <motion.h1
            className="home-title"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.12 }}
          >
            <span>Complex work.</span>
            <em>Reliable software.</em>
          </motion.h1>
          <motion.div
            className="home-roles"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.24 }}
          >
            <span className="sr-only">Roles: </span>
            <Typewriter words={typedRoles} />
          </motion.div>
        </motion.div>

        <motion.div
          className="home-portrait-column"
          initial={{ opacity: 0, scale: 0.96, x: 18 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.2 }}
        >
          <RuntimeTraceScene variant="hero" />
          <span className="portrait-index" aria-hidden="true">
            RUNTIME TRACE · 01
          </span>
          <figure className="portrait-frame">
            <div className="portrait-image-wrap">
              <img
                src={profileAsset}
                alt="Portrait of Sahil S. Sharma"
                width={1200}
                height={1600}
                fetchPriority="high"
              />
            </div>
            <figcaption className="portrait-caption">
              <span className="portrait-caption-index">01 / ENGINEER</span>
              <span>{profile.name} / Software engineer</span>
            </figcaption>
          </figure>
          <span className="portrait-orbit-note" aria-hidden="true">
            SYSTEMS · SIGNAL · SCALE
          </span>
        </motion.div>

        <motion.div
          className="home-detail"
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.32 }}
        >
          <p className="home-summary">{profile.summary}</p>
          <p className="home-location">
            <span aria-hidden="true">⌖</span> {profile.location}
          </p>
          <div className="home-actions">
            <Link to="/projects" className="hero-cta hero-cta--primary">
              Selected projects <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href={`mailto:${profile.email}`} className="hero-cta hero-cta--secondary">
              Contact <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <dl className="home-facts" aria-label="Career and academic highlights">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              className="home-fact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.34,
                delay: reduceMotion ? 0 : 0.62 + index * 0.08,
              }}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <AnimatedStat value={item.value} reduceMotion={reduceMotion} />
                <span>{item.label}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
