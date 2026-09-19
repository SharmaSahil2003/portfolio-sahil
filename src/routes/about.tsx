import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { PageShell } from "@/components/portfolio/PageShell";

const title = "About — Sahil S. Sharma";
const description =
  "Who I am: a software development engineer in Pune building REST APIs and frontend systems at ZS Associates.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <PageShell>
      <About />
    </PageShell>
  ),
});
