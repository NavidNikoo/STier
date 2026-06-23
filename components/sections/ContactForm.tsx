"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type SubmitState = "idle" | "sending" | "success" | "error";

const placeholderLines = [
  "Tell me what you're looking for...",
  "Fade, beard sculpt, full reset...",
  "First time or returning client?",
];

const systemItems = [
  ["STATUS", "BOOKING OPEN"],
  ["LOCATION", site.location.full.toUpperCase()],
  ["RESPONSE", "WITHIN 24 HOURS"],
];

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground caret-accent outline-none transition-colors duration-300 placeholder:text-muted/50 focus:border-accent/50";

function useTypingPlaceholder(lines: string[]): string {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex] ?? "";
    const atEnd = charIndex === current.length;
    const atStart = charIndex === 0;

    const timeout = window.setTimeout(
      () => {
        if (!deleting && atEnd) {
          setDeleting(true);
          return;
        }
        if (deleting && atStart) {
          setDeleting(false);
          setLineIndex((i) => (i + 1) % lines.length);
          return;
        }
        setCharIndex((i) => i + (deleting ? -1 : 1));
      },
      atEnd && !deleting ? 1400 : deleting ? 24 : 46,
    );

    return () => window.clearTimeout(timeout);
  }, [charIndex, deleting, lineIndex, lines]);

  return (lines[lineIndex] ?? "").slice(0, charIndex);
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] uppercase tracking-widest text-muted transition-colors group-focus-within:text-accent">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}

export function ContactForm() {
  const [open, setOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusText, setStatusText] = useState(
    `Messages route to ${site.email}. Typically a reply within 24 hours.`,
  );
  const typedPlaceholder = useTypingPlaceholder(placeholderLines);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: silently ignore bots that fill the hidden field.
    if (String(formData.get("company") ?? "").trim() !== "") {
      return;
    }

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "");
    const message = String(formData.get("message") ?? "");

    setSubmitState("sending");
    setStatusText("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          company: String(formData.get("company") ?? ""),
        }),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "Could not send message.");
      }

      form.reset();
      setSubmitState("success");
      setStatusText("Message sent. I'll get back to you soon.");
    } catch (error) {
      setSubmitState("error");
      setStatusText(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="contact-panel"
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors duration-300 hover:bg-accent"
        >
          {open ? "Close form" : "Say Hello"}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            {open ? "\u2212" : "\u2192"}
          </span>
        </motion.button>
        <a
          href={site.booksyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-white/40"
        >
          Book instantly
        </a>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="contact-panel"
            initial={{ opacity: 0, height: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, height: "auto", y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, y: 8, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 grid gap-4 rounded-3xl border border-white/[0.08] bg-surface/60 p-4 backdrop-blur-xl sm:p-5 lg:grid-cols-[0.85fr_1.15fr] lg:p-6">
              <motion.aside
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="rounded-2xl border border-white/10 bg-background/60 p-6"
              >
                <div className="mb-6 flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <p className="text-[10px] uppercase tracking-widest text-accent">
                    Contact system online
                  </p>
                </div>

                <dl className="space-y-4">
                  {systemItems.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] uppercase tracking-widest text-muted">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 border-t border-white/[0.06] pt-6">
                  <p className="text-[10px] uppercase tracking-widest text-muted">
                    Other ways to reach
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <a
                        href={site.phoneHref}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {site.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <a
                        href={site.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {site.instagramHandle}
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.aside>

              <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="rounded-2xl border border-white/10 bg-background/60 p-6"
              >
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mt-4">
                  <Field
                    label="Service"
                    name="subject"
                    placeholder="Haircut, skin fade, beard trim..."
                    required={false}
                  />
                </div>

                <label className="group mt-4 block">
                  <span className="mb-2 block text-[10px] uppercase tracking-widest text-muted transition-colors group-focus-within:text-accent">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={`${typedPlaceholder}|`}
                    className={`${fieldClass} min-h-[140px] resize-y leading-relaxed`}
                  />
                </label>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    className={`text-sm ${
                      submitState === "success"
                        ? "text-accent"
                        : submitState === "error"
                          ? "text-red-300"
                          : "text-muted"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {statusText}
                  </p>

                  <motion.button
                    type="submit"
                    disabled={submitState === "sending"}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitState === "sending" && (
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border border-background/30 border-t-background" />
                    )}
                    {submitState === "success" ? "Sent" : "Send message"}
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
