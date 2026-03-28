import { FadeIn } from "./fade-in";

interface SectionHeaderProps {
  label: string;
  heading: string;
  headingAccent?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  label,
  heading,
  headingAccent,
  description,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <FadeIn>
      <div className={centered ? "text-center" : ""}>
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-widest ${
            light ? "text-chart-1" : "text-chart-1"
          }`}
        >
          {label}
        </p>
        <h2
          className={`mb-4 font-serif text-[clamp(1.8rem,4.5vw,2.8rem)] font-medium leading-[1.2] tracking-tight ${
            light ? "text-white" : "text-chart-5"
          } ${!centered ? "max-w-[520px]" : ""}`}
        >
          {heading}{" "}
          {headingAccent && (
            <span className={light ? "text-chart-1" : "text-chart-3"}>
              {headingAccent}
            </span>
          )}
        </h2>
        {description && (
          <p
            className={`mb-12 text-base leading-relaxed ${
              !centered ? "max-w-[560px]" : "mx-auto max-w-[560px]"
            } ${light ? "text-white/60" : "text-muted-foreground"}`}
          >
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
