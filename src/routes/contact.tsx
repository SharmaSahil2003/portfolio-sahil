import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/portfolio/Contact";
import { PageShell } from "@/components/portfolio/PageShell";

const title = "Contact — Sahil S. Sharma";
const description =
  "Get in touch with Sahil S. Sharma for SDE opportunities, collaborations or questions — email, LinkedIn, GitHub and a direct message form.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <PageShell dark>
      <Contact />
    </PageShell>
  ),
});
