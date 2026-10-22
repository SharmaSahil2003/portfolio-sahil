import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Github, Linkedin, Code2, Loader2 } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Status = "idle" | "sending" | "done" | "error" | "invalid";

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ from_name: "", reply_to: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setStatus("idle");
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.from_name || !values.reply_to || !values.message) {
      setStatus("invalid");
      return;
    }
    if (!form.current) return;
    setStatus("sending");
    emailjs.sendForm("contact_service", "contact_form", form.current, "gaXvuGUcAFPz40cUc").then(
      () => setStatus("done"),
      () => setStatus("error"),
    );
  };

  const inputClass =
    "mt-1.5 w-full rounded-md border border-border bg-secondary px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

  return (
    <section id="contact" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 right-[-10%] hidden size-[520px] rounded-full blur-3xl md:block"
      />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-2 md:px-10 xl:px-16">
        <div>
          <SectionHeading index="07" title="Contact" meta="Let's talk" />
          <Reveal delay={0.06}>
            <p className="mt-6 max-w-[42ch] text-pretty text-muted-foreground">
              Open to SDE roles, engineering collaborations and interesting problems. Drop a message
              and I'll get back to you.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm transition-colors hover:text-primary"
            >
              <Mail className="size-4" aria-hidden="true" />
              {profile.email}
            </a>
            <ul className="mt-8 flex gap-3">
              {[
                { href: profile.github, label: "GitHub", Icon: Github },
                { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: profile.leetcode, label: "LeetCode", Icon: Code2 },
                { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form ref={form} onSubmit={sendEmail} className="space-y-4" aria-label="Contact form">
            <div>
              <label htmlFor="from_name" className="eyebrow">
                Name
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.from_name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="reply_to" className="eyebrow">
                Email
              </label>
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                autoComplete="email"
                placeholder="you@domain.com"
                value={values.reply_to}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="eyebrow">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about the role or the problem…"
                value={values.message}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "done"}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : null}
              {status === "done" ? "Message sent" : "Send message"}
            </button>

            <p role="status" aria-live="polite" className="min-h-5 text-sm">
              {status === "invalid" ? (
                <span className="text-destructive">Please fill in all fields.</span>
              ) : null}
              {status === "error" ? (
                <span className="text-destructive">
                  Something went wrong — please email me directly.
                </span>
              ) : null}
              {status === "done" ? (
                <span className="text-primary">
                  Thanks for reaching out — I've received your message.
                </span>
              ) : null}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
