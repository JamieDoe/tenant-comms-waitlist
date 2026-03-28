"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  Mail,
  MessageSquare,
  Wrench,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Inbox,
  Sparkles,
  ClipboardList,
  FileText,
  ChevronRight,
  Send,
  Building2,
  Users,
  Phone,
  MailOpen,
  Bot,
  Timer,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/* Scroll-reveal utility                                               */
/* ------------------------------------------------------------------ */
function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isInView] as const;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Email capture form                                                  */
/* ------------------------------------------------------------------ */
function EmailForm({
  buttonText = "Get Early Access",
}: {
  buttonText?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
    toast.success("You're on the list — we'll be in touch before launch.");
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <CheckCircle2 size={22} className="shrink-0 text-primary" />
        <p className="text-sm text-primary">
          You&apos;re on the list. We&apos;ll be in touch before launch.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@agency.co.uk"
          className="min-w-0 flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleSubmit}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-chart-1 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
        >
          {buttonText}
          <ArrowRight size={16} />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-5">
            <MessageSquare size={18} className="text-chart-1" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-chart-5">
            TenantComms
          </span>
        </div>
        <a
          href="#signup"
          className="hidden items-center gap-1.5 rounded-lg bg-chart-5 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex"
        >
          Join the Waitlist <ChevronRight size={14} />
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        id="signup"
        className="mx-auto max-w-[1120px] px-6 pb-20 pt-12 sm:pb-28 sm:pt-20"
      >
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-chart-1/30 bg-chart-1/10 px-4 py-1.5 text-xs font-semibold text-chart-4">
              <AlertTriangle size={13} />
              Awaab&apos;s Law is extending to private renting — preparation
              starts now
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mb-5 font-serif text-[clamp(2rem,5.5vw,3.4rem)] font-extrabold leading-[1.12] tracking-tight text-chart-5">
              Stop losing tenant messages.{" "}
              <span className="text-chart-1">Start proving you responded.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mb-8 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
              The all-in-one communication and maintenance platform for UK
              letting agents. Unified inbox, AI-powered responses, and a
              compliance audit trail — before the law demands it.
            </p>
          </FadeIn>

          <FadeIn delay={0.24} className="w-full">
            <div className="mx-auto w-full max-w-[480px]">
              <EmailForm />
              <p className="mt-3 text-xs text-muted-foreground/70">
                Join 50+ letting agents on the early access list. No spam, ever.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────── */}
      <section className="bg-chart-5 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[1120px]">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-chart-1">
              Sound familiar?
            </p>
            <h2 className="mb-12 max-w-[520px] font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.2] tracking-tight text-white">
              You&apos;re managing properties. Your communications are managing
              you.
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {(
              [
                {
                  icon: <Phone size={22} />,
                  title: "Messages everywhere, answers nowhere",
                  body: "Tenant messages are scattered across WhatsApp, email, personal phones, and property portals. Nobody knows who replied to what — or if anyone replied at all.",
                },
                {
                  icon: <Wrench size={22} />,
                  title: "Maintenance requests vanish into thin air",
                  body: "A tenant reports a leak on WhatsApp. It gets buried under 40 other messages. Three weeks later, you're facing a formal complaint — and Awaab's Law fines of up to £40,000.",
                },
                {
                  icon: <Users size={22} />,
                  title: "Staff leave. Conversations leave with them.",
                  body: "When someone leaves your agency, their WhatsApp history, email threads, and phone notes walk out the door. Six months of tenant context — gone overnight.",
                },
              ] as const
            ).map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-chart-1/15 text-chart-1">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.35}>
            <p className="mt-10 max-w-[540px] text-sm italic text-white/40 sm:text-left">
              &ldquo;Every letting agent I spoke to said the same thing — tenant
              messages are chaos.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Solution ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28">
        <FadeIn>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-chart-1">
            The fix
          </p>
          <h2 className="mb-4 max-w-[520px] font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.2] tracking-tight text-chart-5">
            One platform. Every tenant message. Full audit trail.
          </h2>
          <p className="mb-12 max-w-[560px] text-base leading-relaxed text-muted-foreground">
            TenantComms doesn&apos;t replace your property management software.
            It fills the gap your PM software ignores — structured communication
            and maintenance compliance.
          </p>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2">
          {(
            [
              {
                icon: <Inbox size={24} />,
                title: "Unified Inbox",
                body: "Every tenant message — email now, WhatsApp next — threaded by tenant and property. Your whole team sees the same conversations. No more chasing across five different apps.",
              },
              {
                icon: <Bot size={24} />,
                title: "AI Categorisation & Draft Replies",
                body: "Inbound messages are auto-tagged: maintenance, rent query, complaint, urgent. One click generates a draft response matched to your agency's tone and the property's context.",
              },
              {
                icon: <ClipboardList size={24} />,
                title: "Maintenance Tracker with Timestamps",
                body: "Every maintenance request becomes a first-class object with a clear workflow: reported → acknowledged → in progress → resolved. Every stage timestamped automatically for compliance.",
              },
              {
                icon: <LinkIcon size={24} />,
                title: "Tenant Portal",
                body: "Tenants submit maintenance requests with photos via a simple link. No app downloads, no account signups. Just a clean form that feeds straight into your dashboard.",
              },
            ] as const
          ).map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-chart-4 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-chart-5">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Compliance / Urgency ────────────────────────────────── */}
      <section className="bg-accent/30 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid items-center gap-12 sm:grid-cols-2">
            <FadeIn>
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-chart-1/15 px-3 py-1 text-xs font-semibold text-chart-4">
                  <Shield size={13} />
                  Regulatory Update
                </div>
                <h2 className="mb-5 font-serif text-[clamp(1.5rem,3.5vw,2.1rem)] font-bold leading-[1.22] tracking-tight text-chart-5">
                  Awaab&apos;s Law isn&apos;t coming.{" "}
                  <span className="text-chart-3">It&apos;s already here.</span>
                </h2>
                <div className="space-y-4 text-[0.93rem] leading-relaxed text-muted-foreground">
                  <p>
                    Awaab&apos;s Law is already in force for social housing —
                    mandating 24-hour acknowledgement for emergencies and 10
                    working days to fix significant hazards like damp and mould.
                  </p>
                  <p>
                    The Renters&apos; Rights Act received Royal Assent in
                    October 2025. It{" "}
                    <strong className="text-foreground">will</strong> extend
                    these same rules to the private rented sector. The timeline
                    is confirmed — only the exact date remains.
                  </p>
                  <p>
                    When it arrives, agents without timestamped records of every
                    tenant interaction will be exposed. Fines start at £7,000
                    and reach{" "}
                    <strong className="text-foreground">
                      £40,000 for repeat breaches
                    </strong>
                    , with criminal prosecution on the table.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="rounded-2xl bg-chart-5 p-6 sm:p-8">
                <h3 className="mb-6 font-serif text-lg font-semibold text-white">
                  The compliance clock is ticking
                </h3>
                {(
                  [
                    {
                      icon: <Timer size={18} />,
                      text: "24-hour acknowledgement for emergencies",
                    },
                    {
                      icon: <Clock size={18} />,
                      text: "10 working days to investigate significant hazards",
                    },
                    {
                      icon: <AlertTriangle size={18} />,
                      text: "Up to £40,000 fines for non-compliance",
                    },
                    {
                      icon: <FileText size={18} />,
                      text: "Full audit trail required as evidence",
                    },
                  ] as const
                ).map((row, i) => (
                  <div
                    key={i}
                    className="mb-4 flex items-start gap-3 last:mb-0"
                  >
                    <div className="mt-0.5 shrink-0 text-chart-1">
                      {row.icon}
                    </div>
                    <p className="text-sm leading-snug text-white/70">
                      {row.text}
                    </p>
                  </div>
                ))}
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[0.85rem] italic leading-relaxed text-white/50">
                    The agents who prepare now will be protected. The ones who
                    don&apos;t will be scrambling.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-chart-1">
              How it works
            </p>
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.2] tracking-tight text-chart-5">
              Up and running in minutes, not months
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-4">
          {(
            [
              {
                step: "01",
                icon: <MailOpen size={24} />,
                title: "Connect your email",
                body: "Link your agency inbox in two clicks. Every tenant email flows into TenantComms automatically.",
              },
              {
                step: "02",
                icon: <Inbox size={24} />,
                title: "Messages land in one place",
                body: "All tenant communications — threaded by tenant and property — in a single unified inbox your whole team can see.",
              },
              {
                step: "03",
                icon: <Sparkles size={24} />,
                title: "AI categorises and drafts",
                body: "Each message is auto-tagged by type and urgency. Draft replies generated in your agency's tone, ready to review and send.",
              },
              {
                step: "04",
                icon: <ClipboardList size={24} />,
                title: "Track with timestamps",
                body: "Maintenance requests move through a clear workflow — every stage logged with a timestamp for your compliance records.",
              },
            ] as const
          ).map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-chart-5 sm:mx-0">
                  {item.icon}
                  <span className="absolute -right-1.5 -top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-chart-1 text-[0.65rem] font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-base font-semibold text-chart-5">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Second CTA ──────────────────────────────────────────── */}
      <section className="bg-chart-5 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[560px] text-center">
          <FadeIn>
            <h2 className="mb-4 font-serif text-[clamp(1.5rem,4vw,2.2rem)] font-bold leading-[1.2] tracking-tight text-white">
              Be first in line when we launch
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/60">
              Early access members get priority onboarding, direct input on the
              roadmap, and launch pricing locked in for life.
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <EmailForm buttonText="Join the Waitlist" />
            <p className="mt-3 text-xs text-white/40">
              Free to join. No card required. Launching Summer 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-chart-5">
              <MessageSquare size={14} className="text-chart-1" />
            </div>
            <span className="font-serif text-base font-semibold text-chart-5">
              TenantComms
            </span>
          </div>
          <p className="text-center text-xs text-muted-foreground/70">
            Built by a UK developer for UK letting agents · Coming Summer 2026
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-muted-foreground/70 transition-colors hover:text-muted-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground/70 transition-colors hover:text-muted-foreground"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
