"use client";

import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/fade-in";
import { EmailForm } from "@/components/shared/email-form";
import { DashboardMockup } from "./dashboard-mockup";
import { HERO_COPY } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="signup"
      className="relative overflow-hidden px-6 pb-8 pt-12 sm:pb-16 sm:pt-20"
      aria-label="Hero"
    >
      {/* Subtle radial glow behind hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_40%,_var(--chart-1)_0%,_transparent_60%)] opacity-[0.04]" />

      <div className="mx-auto max-w-[1120px]">
        {/* Centred copy + form */}
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-6 h-auto gap-2 overflow-visible whitespace-normal border-chart-1/30 bg-chart-1/10 px-3 py-1.5 text-center text-[0.65rem] font-semibold text-chart-4 sm:px-4 sm:text-xs"
            >
              <AlertTriangle size={13} />
              {HERO_COPY.badge}
            </Badge>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mb-5 font-serif text-[clamp(2.2rem,6vw,4rem)] font-medium leading-[1.1] tracking-tight text-chart-5">
              {HERO_COPY.headlineMain}{" "}
              <span className="text-chart-1">{HERO_COPY.headlineAccent}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mb-8 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
              {HERO_COPY.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.24} className="w-full">
            <div className="mx-auto w-full max-w-[480px]">
              <EmailForm source="hero" />
              <p className="mt-3 text-xs text-muted-foreground/70">
                {HERO_COPY.trustLine}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Dashboard mockup with animated flow */}
        <FadeIn delay={0.3} className="mt-14 sm:mt-20">
          <DashboardMockup />
        </FadeIn>
      </div>
    </section>
  );
}
