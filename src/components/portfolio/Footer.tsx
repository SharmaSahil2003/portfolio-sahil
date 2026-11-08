import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="atlas-footer">
      <div className="atlas-wrap atlas-footer-inner">
        <p className="footer-signature">
          © {new Date().getFullYear()} {profile.name} · Software engineer · Built with React &amp;
          Tailwind
        </p>
        <nav className="footer-links" aria-label="Footer links">
          <a href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer noopener">
            LeetCode
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top <ArrowUpRight size={13} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </footer>
  );
}
