import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { portraitImage, site } from "@/lib/site";

const stats = [
  { value: "10+", label: "Years behind the chair" },
  { value: "5k+", label: "Cuts crafted" },
  { value: "100%", label: "Detail obsessed" },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-content">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal y={32}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.06]">
                <Image
                  src={portraitImage.src}
                  alt={portraitImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center grayscale transition-all duration-700 ease-luxe hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-white/[0.08] bg-surface/90 px-6 py-5 backdrop-blur-md sm:block">
                <p className="font-display text-2xl font-semibold text-foreground">
                  S-Tier
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted">
                  Master Barber
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">The Craft</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-foreground sm:text-4xl lg:text-5xl">
                The Barber Behind S-Tier
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <Reveal delay={0.12}>
                <p>
                  S-Tier was built on a simple obsession: every cut should feel
                  like it was made for one person. No templates, no shortcuts.
                  Just precision, patience, and a sharp eye for detail honed over
                  years behind the chair.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>
                  Grooming here is treated as a craft and a form of
                  self-expression. From the first consultation to the final
                  lineup, the goal is the same: a clean, modern look that feels
                  unmistakably yours, and a chair you actually look forward to
                  sitting in.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p>
                  More than a haircut, it&apos;s a relationship. Regulars come for
                  the fade and stay for the experience: the conversation, the
                  consistency, and the community built one client at a time in{" "}
                  {site.location.region}.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-2 text-xs leading-snug text-muted">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
