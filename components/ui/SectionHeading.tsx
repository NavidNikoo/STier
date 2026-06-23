import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={
        isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      }
    >
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-base leading-relaxed text-muted sm:text-lg ${
              isCenter ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
