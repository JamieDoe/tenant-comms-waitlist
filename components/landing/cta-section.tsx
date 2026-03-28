"use client";

import { FadeIn } from "@/components/shared/fade-in";
import { EmailForm } from "@/components/shared/email-form";
import { CTA_COPY } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="bg-chart-5 px-6 py-20 sm:py-24" aria-label="Call to action">
      <div className="mx-auto max-w-[560px] text-center">
        <FadeIn>
          <h2 className="mb-4 font-serif text-[clamp(1.8rem,4.5vw,2.8rem)] font-medium leading-[1.2] tracking-tight text-white">
            {CTA_COPY.headline}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/60">
            {CTA_COPY.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <EmailForm source="bottom-cta" buttonText="Join the Waitlist" dark />
          <p className="mt-3 text-xs text-white/40">{CTA_COPY.subtext}</p>
        </FadeIn>
      </div>
    </section>
  );
}
