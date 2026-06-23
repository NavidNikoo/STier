"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/site";
import { staggerItem } from "@/components/ui/Reveal";

function QuoteMark() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="text-accent/40"
    >
      <path
        d="M14 10C9 12 6 16 6 22c0 .7.1 1.4.2 2H14V14h-3c.4-1.6 1.6-2.9 3-3.5V10Zm16 0c-5 2-8 6-8 12 0 .7.1 1.4.2 2H30V14h-3c.4-1.6 1.6-2.9 3-3.5V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-20 bg-secondary py-24 sm:py-32"
    >
      <div className="container-content">
        <SectionHeading
          eyebrow="Reviews"
          title="Trusted from the first cut"
          description="What clients say after sitting in the S-Tier chair."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.author}
              variants={staggerItem}
              className="card-surface relative flex flex-col p-8"
            >
              <QuoteMark />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-white/[0.06] pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background font-display text-sm font-semibold text-accent">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.author}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {t.detail}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
