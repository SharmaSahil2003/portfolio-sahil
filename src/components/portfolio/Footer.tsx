import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-10 xl:px-16">
        <div>
          <p className="font-mono text-sm tracking-tight">
            <span className="text-primary">~/</span>sahil-sharma
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name} · Built with React & Tailwind
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 font-mono text-xs text-muted-foreground">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-primary">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">
            LinkedIn
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="hover:text-primary">
            LeetCode
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-primary">
            Email
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            <ArrowUp className="size-3.5" aria-hidden="true" />
            Top
          </button>
        </nav>
      </div>
    </footer>
  );
}
