import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { PageShell } from "@/components/portfolio/PageShell";

const title = "Sahil S. Sharma — Software Development Engineer";
const description =
  "Portfolio of Sahil S. Sharma, SDE at ZS Associates: REST APIs, React frontends, IEEE-published research, 1500+ LeetCode problems and selected full-stack projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
    </PageShell>
  );
}
