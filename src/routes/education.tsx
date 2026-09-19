import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/portfolio/Background";
import { PageShell } from "@/components/portfolio/PageShell";

const title = "Education & Achievements — Sahil S. Sharma";
const description =
  "Academic background, IEEE publications, certifications and hackathon wins including 1st place at the Takeda AI Hackathon.";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/education" }],
  }),
  component: () => (
    <PageShell dark>
      <Background />
    </PageShell>
  ),
});
