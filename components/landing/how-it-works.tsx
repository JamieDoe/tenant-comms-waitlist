"use client";

import { useRef, useEffect, useState } from "react";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeader } from "@/components/shared/section-header";
import { STEPS } from "@/lib/constants";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const icons = container.querySelectorAll<HTMLElement>("[data-step-icon]");
      if (icons.length < 2) return;
      const first = icons[0];
      const last = icons[icons.length - 1];
      const containerRect = container.getBoundingClientRect();
      const firstCenter = first.getBoundingClientRect().top + first.getBoundingClientRect().height / 2 - containerRect.top;
      const lastCenter = last.getBoundingClientRect().top + last.getBoundingClientRect().height / 2 - containerRect.top;
      setLineStyle({ top: firstCenter, height: lastCenter - firstCenter });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28" aria-label="How it works">
      <SectionHeader
        label="How it works"
        heading="Up and running in minutes, not months"
        centered
      />

      <div ref={containerRef} className="relative mx-auto max-w-[720px]">
        {/* Vertical timeline line — measured from first to last icon center */}
        <div
          className="absolute left-5 sm:left-6 hidden w-px -translate-x-1/2 bg-border/80 sm:block"
          style={{ top: lineStyle.top, height: lineStyle.height }}
        />

        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          {STEPS.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative flex gap-4 sm:gap-6 md:gap-8">
                  {/* Step indicator */}
                  <div
                    data-step-icon
                    className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-chart-5 text-white shadow-lg shadow-chart-5/20"
                  >
                    <Icon size={22} />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-5 sm:p-6 transition-all duration-300 hover:border-chart-3/30 hover:shadow-md hover:shadow-chart-3/[0.04]">
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-1/15 text-[0.65rem] font-bold text-chart-5">
                        {item.step}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-chart-5">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
