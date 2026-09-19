import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/portfolio/Projects";
import { PageShell } from "@/components/portfolio/PageShell";

const title = "Projects — Sahil S. Sharma";
const description =
  "Selected full-stack and machine-learning projects with source links: semantic comment clustering, fake news detection and more.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: () => (
    <PageShell dark>
      <Projects />
    </PageShell>
  ),
});
