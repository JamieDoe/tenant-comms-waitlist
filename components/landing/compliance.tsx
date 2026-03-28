"use client";

import Image from "next/image";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/fade-in";
import {
  COMPLIANCE_COPY,
  COMPLIANCE_ITEMS,
  COMPLIANCE_FOOTER,
} from "@/lib/constants";

export function Compliance() {
  return (
    <section
      className="bg-accent/30 px-6 py-20 sm:py-28"
      aria-label="Compliance"
    >
      <div className="mx-auto max-w-[1120px]">
        {/* Mould cleanup image */}
        <FadeIn>
          <div className="relative mb-12 h-[250px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl">
            <Image
              src="/assets/mould-cleanup.webp"
              alt="Professional mould remediation in a rental property — the kind of issue Awaab's Law now regulates"
              fill
              loading="eager"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <div className="grid items-center gap-12 sm:grid-cols-2">
          <FadeIn>
            <div>
              <Badge
                variant="outline"
                className="mb-5 gap-2 border-chart-1/30 bg-chart-1/15 px-3 py-1 text-xs font-semibold text-chart-4"
              >
                <Shield size={13} />
                {COMPLIANCE_COPY.badge}
              </Badge>
              <h2 className="mb-5 font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-[1.22] tracking-tight text-chart-5">
                {COMPLIANCE_COPY.headline}{" "}
                <span className="text-chart-3">
                  {COMPLIANCE_COPY.headlineAccent}
                </span>
              </h2>
              <div className="space-y-4 text-[0.93rem] leading-relaxed text-muted-foreground">
                {COMPLIANCE_COPY.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html:
                        i === 2
                          ? p
                              .replace(
                                "\u00a340,000 for repeat breaches",
                                '<strong class="text-foreground">\u00a340,000 for repeat breaches</strong>',
                              )
                              .replace(
                                "will",
                                '<strong class="text-foreground">will</strong>',
                              )
                          : i === 1
                            ? p.replace(
                                "will extend",
                                '<strong class="text-foreground">will</strong> extend',
                              )
                            : p,
                    }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="rounded-2xl bg-chart-5 p-6 sm:p-8">
              <h3 className="mb-6 font-serif text-lg font-semibold text-white">
                The compliance clock is ticking
              </h3>
              {COMPLIANCE_ITEMS.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div
                    key={i}
                    className="mb-4 flex items-start gap-3 last:mb-0"
                  >
                    <div className="mt-0.5 shrink-0 text-chart-1">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm leading-snug text-white/70">
                      {row.text}
                    </p>
                  </div>
                );
              })}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[0.85rem] italic leading-relaxed text-white/50">
                  {COMPLIANCE_FOOTER}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
