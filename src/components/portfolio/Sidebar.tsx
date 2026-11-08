import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, Download, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import resumeAsset from "@/assets/Sahil_Sharma_Resume_V2.pdf";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
] as const;

function SocialLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "atlas-mobile-socials atlas-socials" : "atlas-socials"}>
      <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
        <Github aria-hidden="true" />
      </a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
        <Linkedin aria-hidden="true" />
      </a>
      <a href={profile.leetcode} target="_blank" rel="noreferrer noopener" aria-label="LeetCode">
        <Activity aria-hidden="true" />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email Sahil">
        <Mail aria-hidden="true" />
      </a>
      <a href={resumeAsset} download="Sahil_Sharma_Resume.pdf" aria-label="Download résumé">
        <Download aria-hidden="true" />
      </a>
    </div>
  );
}

function ChapterLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {navItems.map((item, index) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          aria-current={pathname === item.to ? "page" : undefined}
          className="atlas-nav-link"
        >
          <small>{String(index).padStart(2, "0")}</small>
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="atlas-header">
      <div className="atlas-wrap atlas-header-inner">
        <Link to="/" className="atlas-brand" aria-label="Sahil Sharma — home">
          Sahil <span>Sharma</span>
        </Link>
        <nav className="atlas-desktop-nav" aria-label="Primary navigation">
          <ChapterLinks pathname={pathname} />
        </nav>
        <SocialLinks />
        <button
          type="button"
          className="atlas-menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-primary-navigation"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-primary-navigation"
            aria-label="Primary navigation"
            className="atlas-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="atlas-wrap atlas-mobile-nav-inner">
              <ChapterLinks pathname={pathname} onNavigate={() => setOpen(false)} />
              <SocialLinks mobile />
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
