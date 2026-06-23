import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-background text-accent">
      {children}
    </span>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Contact() {
  const items = [
    {
      label: "Location",
      value: site.location.full,
      href: site.mapsUrl,
      external: true,
      icon: (
        <svg {...iconProps}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: site.phoneDisplay,
      href: site.phoneHref,
      external: false,
      icon: (
        <svg {...iconProps}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      value: site.instagramHandle,
      href: site.instagramUrl,
      external: true,
      icon: (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 bg-secondary py-24 sm:py-32">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Find the chair"
              description={`Located at ${site.location.studio} in ${site.location.city}. Reach out, follow along, or stop in for your next cut.`}
            />

            <ul className="mt-12 space-y-4">
              {items.map((item, i) => (
                <Reveal as="li" key={item.label} delay={i * 0.08}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-surface/50 p-4 transition-colors duration-300 hover:border-white/20"
                  >
                    <IconWrap>{item.icon}</IconWrap>
                    <span className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-muted">
                        {item.label}
                      </span>
                      <span className="mt-0.5 text-base text-foreground transition-colors group-hover:text-accent">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal y={32} delay={0.1}>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${site.location.studio} in Google Maps`}
              className="group relative flex h-full min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-background"
            >
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(192,192,192,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.4) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-surface/40 via-transparent to-surface/40" />

              <div className="relative flex flex-col items-center text-center">
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-surface text-accent">
                    <svg {...iconProps} width={22} height={22}>
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                </span>
                <p className="mt-5 max-w-xs font-display text-lg font-semibold leading-snug text-foreground">
                  {site.location.full}
                </p>
                <p className="mt-1 text-sm text-muted transition-colors group-hover:text-foreground">
                  Open in Google Maps &rarr;
                </p>
              </div>
            </a>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-12">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">Send a message</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tightest text-foreground sm:text-3xl">
                Have a look in mind?
              </h3>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Drop a note with what you&apos;re after and I&apos;ll get back to
                you. For the fastest confirmation, book instantly on Booksy.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
