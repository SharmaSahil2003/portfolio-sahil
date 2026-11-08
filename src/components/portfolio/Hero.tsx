import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { profile, stats, typedRoles } from "@/lib/portfolio-data";
import profileAsset from "@/assets/profile.jpg";
import { ParticleField } from "./ParticleField";
import { RuntimeTraceScene } from "./RuntimeTraceScene";
import { Typewriter } from "./Typewriter";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="home-page">
      <ParticleField className="pointer-events-none absolute inset-0 z-0 text-primary opacity-50" />
      <RuntimeTraceScene variant="hero" />
      <div className="atlas-wrap home-composition">
        <motion.div
          className="home-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="atlas-kicker home-overline">
            {profile.role} <span aria-hidden="true">·</span> {profile.company}{" "}
            <span aria-hidden="true">·</span> Pune
          </p>
          <h1 className="home-title">
            Complex work.
            <em>Reliable software.</em>
          </h1>
          <div className="home-roles">
            <span className="sr-only">Roles: </span>
            <Typewriter words={typedRoles} />
          </div>
          <p className="home-summary">{profile.summary}</p>
          <p className="home-location">{profile.location}</p>
          <div className="home-actions">
            <Link to="/projects" className="text-action">
              Selected projects{" "}
              <span aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </Link>
            <a href={`mailto:${profile.email}`} className="text-action">
              Contact{" "}
              <span aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="home-portrait-column"
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <span className="portrait-index" aria-hidden="true">
            RUNTIME TRACE · 01
          </span>
          <figure className="portrait-frame">
            <img
              src={profileAsset}
              alt="Portrait of Sahil S. Sharma"
              width={1200}
              height={1600}
              fetchPriority="high"
            />
            <figcaption className="portrait-caption">{profile.name} / Software engineer</figcaption>
          </figure>
        </motion.div>
      </div>

      <dl className="atlas-wrap home-facts" aria-label="Career and academic highlights">
        {stats.map((item) => (
          <div key={item.label} className="home-fact">
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
