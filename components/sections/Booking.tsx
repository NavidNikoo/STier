import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function Booking() {
  return (
    <section id="booking" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute inset-0 noise opacity-40" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <span className="eyebrow">Booking</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tightest text-foreground sm:text-5xl">
                Book Your Appointment
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                Real-time availability and instant confirmation through Booksy.
                Prefer to talk it through first? Reach out and I&apos;ll get back
                to you.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <ButtonLink href={site.booksyUrl} external variant="primary">
                  Book on Booksy
                </ButtonLink>
                <ButtonLink href="#contact" variant="secondary">
                  Contact
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
