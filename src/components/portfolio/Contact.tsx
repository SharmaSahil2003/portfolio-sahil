import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Status = "idle" | "sending" | "done" | "error" | "invalid";

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ from_name: "", reply_to: "", message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
    setStatus("idle");
  };

  const sendEmail = (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.from_name.trim() || !values.reply_to.trim() || !values.message.trim()) {
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

  return (
    <section id="contact" className="atlas-wrap">
      <SectionHeading index="07" title="Contact" meta="Open channel" />
      <div className="contact-grid">
        <Reveal>
          <p className="contact-prompt">Let’s talk about the work.</p>
          <p className="about-copy">
            Open to SDE roles, engineering collaborations, and interesting problems. Drop a message
            and I’ll get back to you.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <nav className="contact-socials" aria-label="Professional links">
            <a href={profile.github} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer noopener">
              LeetCode
            </a>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          <form ref={form} onSubmit={sendEmail} className="contact-form" aria-label="Contact form">
            <div className="contact-field">
              <label htmlFor="from_name">Name</label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.from_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="reply_to">Email</label>
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                autoComplete="email"
                placeholder="you@domain.com"
                value={values.reply_to}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me about the role or problem…"
                value={values.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending" || status === "done"}
              className="contact-submit"
            >
              {status === "sending"
                ? "Sending message…"
                : status === "done"
                  ? "Message sent"
                  : "Send message"}
              <span aria-hidden="true">↗</span>
            </button>
            <p role="status" aria-live="polite" className="form-status">
              {status === "invalid" ? (
                <span className="error">Please fill in all fields.</span>
              ) : null}
              {status === "error" ? (
                <span className="error">Something went wrong — please email me directly.</span>
              ) : null}
              {status === "done" ? (
                <span className="success">
                  Thanks for reaching out — I’ve received your message.
                </span>
              ) : null}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
