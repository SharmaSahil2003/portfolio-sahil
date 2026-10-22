import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/portfolio/Experience";
import { PageShell } from "@/components/portfolio/PageShell";

const title = "Experience — Sahil S. Sharma";
const description =
  "Professional timeline: Business Technology Solutions Associate at ZS Associates and earlier engineering work.";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: () => (
    <PageShell dark>
      <Experience />
    </PageShell>
  ),
});
