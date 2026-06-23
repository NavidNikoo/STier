"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { services, site } from "@/lib/site";
import { staggerItem } from "@/components/ui/Reveal";

export function Services() {
  const popularServices = services.filter((service) => service.group === "popular");
  const otherServices = services.filter((service) => service.group === "other");

  const sections = [
    { label: "Popular Services", items: popularServices },
    { label: "Other Services", items: otherServices },
  ];

  return (
    <section
      id="services"
      className="relative scroll-mt-20 bg-secondary py-24 sm:py-32"
    >
      <div className="container-content">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Built around your style"
            description="Every service is a clean slate. Pricing starts below — final quotes depend on length, density, and detail."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ButtonLink href={site.booksyUrl} external variant="secondary">
              Book a service
            </ButtonLink>
          </motion.div>
        </div>

        <div className="mt-14 space-y-14">
          {sections.map((section) => (
            <div key={section.label}>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {section.label}
                </h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                  {section.items.length} services
                </span>
              </div>

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {section.items.map((service) => (
                  <motion.li
                    key={`${section.label}-${service.name}`}
                    variants={staggerItem}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <a
                      href={site.booksyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Book ${service.name} on Booksy`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-surface/60 p-7 transition-colors duration-300 hover:border-white/20"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent" />
                      </div>

                      <div className="relative flex items-start justify-between gap-4">
                        <h4 className="font-display text-xl font-semibold text-foreground">
                          {service.name}
                        </h4>
                        <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                          {service.duration}
                        </span>
                      </div>

                      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>

                      <div className="relative mt-7 flex items-end justify-between border-t border-white/[0.06] pt-5">
                        <span className="font-display text-2xl font-semibold text-foreground">
                          {service.price}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Book &rarr;
                        </span>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
