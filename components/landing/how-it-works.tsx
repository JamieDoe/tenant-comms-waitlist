"use client";

import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeader } from "@/components/shared/section-header";
import { STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28" aria-label="How it works">
      <SectionHeader
        label="How it works"
        heading="Up and running in minutes, not months"
        centered
      />

      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-4">
        {/* Connecting line on desktop */}
        <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px border-t-2 border-dashed border-border sm:block" />

        {STEPS.map((item, i) => {
          const Icon = item.icon;
          return (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="relative text-center sm:text-left">
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-chart-5 sm:mx-0">
                  <Icon size={24} />
                  <Badge className="absolute -right-1.5 -top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-chart-1 p-0 text-[0.65rem] font-bold text-white">
                    {item.step}
                  </Badge>
                </div>
                <h3 className="mb-1 font-serif text-base font-semibold text-chart-5">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
