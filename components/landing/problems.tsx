"use client";

import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeader } from "@/components/shared/section-header";
import { PROBLEMS } from "@/lib/constants";

export function Problems() {
  return (
    <section
      className="relative overflow-hidden bg-chart-5 px-6 py-20 sm:py-28"
      aria-label="Common problems"
    >
      {/* Background image — messy office = comms chaos */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <Image
          src="/assets/messy-office.webp"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="relative mx-auto max-w-[1120px]">
        <SectionHeader
          label="Sound familiar?"
          heading="You're managing properties. Your communications are managing you."
          light
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {PROBLEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm"
                  style={{
                    backgroundImage:
                      i === 0
                        ? "radial-gradient(ellipse at top left, rgba(255,255,255,0.03), transparent 60%)"
                        : i === 1
                          ? "radial-gradient(ellipse at center, rgba(255,255,255,0.03), transparent 60%)"
                          : "radial-gradient(ellipse at bottom right, rgba(255,255,255,0.03), transparent 60%)",
                  }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-chart-1/15 text-chart-1">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.35}>
          <p className="mt-10 max-w-[540px] text-sm italic text-white/40 sm:text-left">
            &ldquo;Every letting agent I spoke to said the same thing — tenant
            messages are chaos.&rdquo;
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
