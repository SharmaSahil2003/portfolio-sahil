import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Home,
  User,
  Code2,
  Activity,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Download,
  Menu,
  X,
  Github,
  Linkedin,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import resumeAsset from "@/assets/Sahil_Sharma_Resume_V2.pdf";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/skills", label: "Skills", icon: Code2 },
  { to: "/experience", label: "Experience", icon: Briefcase },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/education", label: "Education", icon: GraduationCap },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

function Wordmark() {
  return (
    <Link to="/" className="text-lg font-bold tracking-tight sm:text-xl">
      Sahil <span className="text-primary">Sharma</span>
    </Link>
  );
}

function SocialRow() {
  return (
    <div className="flex items-center gap-4 text-muted-foreground">
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="transition-colors hover:text-primary"
      >
        <Github className="size-[18px]" />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="transition-colors hover:text-primary"
      >
        <Linkedin className="size-[18px]" />
      </a>
      <a
        href={profile.leetcode}
        target="_blank"
        rel="noreferrer"
        aria-label="LeetCode"
        className="transition-colors hover:text-primary"
      >
        <Activity className="size-[18px]" />
      </a>
      <a
        href={`mailto:${profile.email}`}
        aria-label="Email"
        className="transition-colors hover:text-primary"
      >
        <Mail className="size-[18px]" />
      </a>
      <a
        href={resumeAsset}
        download="Sahil_Sharma_Resume.pdf"
        aria-label="Download résumé"
        className="transition-colors hover:text-primary"
      >
        <Download className="size-[18px]" />
      </a>
    </div>
  );
}

/** Floating vertical icon rail on the right (desktop). */
function IconRail() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-center gap-1 rounded-full border border-border bg-card/70 px-2 py-4 shadow-xl backdrop-blur-xl">
        {navItems.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <li key={item.to} className="group relative">
              <Link
                to={item.to}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`relative grid size-10 place-items-center rounded-full transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="rail-active"
                    className="absolute inset-0 rounded-full bg-primary/12 ring-1 ring-primary/40"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <Icon className="relative size-[18px]" aria-hidden="true" />
              </Link>
              <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex h-16 items-center justify-between border-b border-border bg-background/95 px-5 shadow-sm backdrop-blur-xl md:px-10 lg:h-20 xl:px-16">
          <Wordmark />
          <div className="hidden lg:block">
            <SocialRow />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md lg:hidden"
            >
              <div className="space-y-5 px-5 py-5">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const active = pathname === item.to;
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                            active
                              ? "bg-primary/10 text-foreground ring-1 ring-primary/40"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon
                            className={`size-4 ${active ? "text-primary" : ""}`}
                            aria-hidden="true"
                          />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <SocialRow />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <IconRail />
    </>
  );
}
