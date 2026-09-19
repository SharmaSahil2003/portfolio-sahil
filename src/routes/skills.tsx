import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/components/portfolio/Skills";
import { LeetCode } from "@/components/portfolio/LeetCode";
import { PageShell } from "@/components/portfolio/PageShell";

const title = "Skills & LeetCode — Sahil S. Sharma";
const description =
  "Languages, frameworks and core CS strengths — C++, Java, Python, React, Spring Boot, FastAPI, SQL — plus a live LeetCode submission heatmap.";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: () => (
    <PageShell dark>
      <Skills />
      <LeetCode />
    </PageShell>
  ),
});
