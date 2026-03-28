"use client";

import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeader } from "@/components/shared/section-header";
import { BENEFITS } from "@/lib/constants";

export function Benefits() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28" aria-label="Benefits">
      <SectionHeader
        label="Why it matters"
        heading="Tangible results from day one"
        centered
      />

      <div className="grid gap-8 sm:grid-cols-3">
        {BENEFITS.map((benefit, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="text-center">
              <p className="mb-2 font-serif text-5xl font-medium text-chart-1">
                {benefit.stat}
              </p>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {benefit.unit}
              </p>
              <h3 className="mb-2 font-serif text-lg font-semibold text-chart-5">
                {benefit.headline}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
