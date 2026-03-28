import {
  Phone,
  Wrench,
  Users,
  Inbox,
  Bot,
  ClipboardList,
  Link as LinkIcon,
  MailOpen,
  Sparkles,
  Timer,
  Clock,
  AlertTriangle,
  FileText,
  Shield,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Site-wide config                                                     */
/* ------------------------------------------------------------------ */

export const SITE_CONFIG = {
  name: "TenantComms",
  domain: "https://tenantcomms.com",
  tagline: "Unified tenant communication for UK letting agents",
  launchDate: "Summer 2026",
} as const;

/* ------------------------------------------------------------------ */
/* SEO defaults                                                        */
/* ------------------------------------------------------------------ */

export const SEO_DEFAULTS = {
  title: "TenantComms — Unified Tenant Communication for UK Letting Agents",
  description:
    "Stop losing tenant messages. TenantComms gives UK letting agents a unified inbox, AI-powered responses, maintenance tracking with compliance timestamps, and a full audit trail for Awaab\u2019s Law.",
  ogImagePath: "/opengraph-image.png",
  locale: "en_GB",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV_ITEMS = [
  { label: "Join the Waitlist", href: "#signup" },
] as const;

/* ------------------------------------------------------------------ */
/* Hero copy                                                           */
/* ------------------------------------------------------------------ */

export const HERO_COPY = {
  badge:
    "Awaab\u2019s Law is extending to private renting \u2014 preparation starts now",
  headlineMain: "Stop losing tenant messages.",
  headlineAccent: "Start proving you responded.",
  subtitle:
    "The all-in-one communication and maintenance platform for UK letting agents. Unified inbox, AI-powered responses, and a compliance audit trail \u2014 before the law demands it.",
  trustLine:
    "Join 50+ letting agents on the early access list. No spam, ever.",
} as const;

/* ------------------------------------------------------------------ */
/* Problems                                                            */
/* ------------------------------------------------------------------ */

export const PROBLEMS = [
  {
    icon: Phone,
    title: "Messages everywhere, answers nowhere",
    body: "Tenant messages are scattered across WhatsApp, email, personal phones, and property portals. Nobody knows who replied to what \u2014 or if anyone replied at all.",
  },
  {
    icon: Wrench,
    title: "Maintenance requests vanish into thin air",
    body: "A tenant reports a leak on WhatsApp. It gets buried under 40 other messages. Three weeks later, you\u2019re facing a formal complaint \u2014 and Awaab\u2019s Law fines of up to \u00a340,000.",
  },
  {
    icon: Users,
    title: "Staff leave. Conversations leave with them.",
    body: "When someone leaves your agency, their WhatsApp history, email threads, and phone notes walk out the door. Six months of tenant context \u2014 gone overnight.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Features (bento)                                                    */
/* ------------------------------------------------------------------ */

export const FEATURES = [
  {
    id: "unified-inbox",
    icon: Inbox,
    label: "Unified Inbox",
    description:
      "Every tenant message \u2014 email now, WhatsApp next \u2014 threaded by tenant and property in a single view your whole team can see.",
    size: "large" as const,
  },
  {
    id: "ai-draft",
    icon: Bot,
    label: "AI Categorisation & Draft Replies",
    description:
      "Inbound messages auto-tagged by type and urgency. One-click draft responses matched to your agency\u2019s tone.",
    size: "small" as const,
  },
  {
    id: "maintenance",
    icon: ClipboardList,
    label: "Maintenance Tracker",
    description:
      "Every request becomes a first-class object with a clear workflow: reported \u2192 acknowledged \u2192 in progress \u2192 resolved. Every stage timestamped.",
    size: "small" as const,
  },
  {
    id: "tenant-portal",
    icon: LinkIcon,
    label: "Tenant Portal",
    description:
      "Tenants submit maintenance requests with photos via a simple link. No app downloads, no account signups \u2014 just a clean form.",
    size: "large" as const,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

export const BENEFITS = [
  {
    stat: "11+",
    unit: "hours saved per week",
    headline: "Save 11+ hours per week",
    body: "Stop chasing messages across WhatsApp, email, and voicemail. Everything in one place, every reply tracked.",
  },
  {
    stat: "0",
    unit: "missed deadlines",
    headline: "Never miss a compliance deadline",
    body: "Automatic timestamps at every stage. When Awaab\u2019s Law hits the PRS, your audit trail is already built.",
  },
  {
    stat: "100%",
    unit: "knowledge retained",
    headline: "Keep institutional knowledge",
    body: "Staff leave, conversations stay. Every tenant interaction lives in TenantComms, not on someone\u2019s personal phone.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Compliance / Awaab's Law                                            */
/* ------------------------------------------------------------------ */

export const COMPLIANCE_COPY = {
  badge: "Regulatory Update",
  badgeIcon: Shield,
  headline: "Awaab\u2019s Law isn\u2019t coming.",
  headlineAccent: "It\u2019s already here.",
  paragraphs: [
    "Awaab\u2019s Law came into force for social housing on 27 October 2025, with Phase 1 covering damp, mould, and emergency repairs under strict timeframes. Phase 2 in 2026 expands to additional hazards including excess cold and heat, falls, fire, electrical, and structural collapse risks.",
    "The Renters\u2019 Rights Act received Royal Assent in October 2025. Phase 3 will extend Awaab\u2019s Law to the Private Rented Sector \u2014 timescales are subject to consultation, but the direction of travel is confirmed.",
    "When it arrives, agents without timestamped records of every tenant interaction will be exposed. Fines start at \u00a37,000 and reach \u00a340,000 for repeat breaches, with criminal prosecution on the table.",
  ],
} as const;

export const COMPLIANCE_ITEMS = [
  { icon: Timer, text: "24-hour acknowledgement for emergencies" },
  {
    icon: Clock,
    text: "10 working days to investigate significant hazards",
  },
  { icon: AlertTriangle, text: "Up to \u00a340,000 fines for non-compliance" },
  { icon: FileText, text: "Full audit trail required as evidence" },
] as const;

export const COMPLIANCE_FOOTER =
  "The agents who prepare now will be protected. The ones who don\u2019t will be scrambling.";

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export const STEPS = [
  {
    step: "01",
    icon: MailOpen,
    title: "Connect your email",
    body: "Link your agency inbox in two clicks. Every tenant email flows into TenantComms automatically.",
  },
  {
    step: "02",
    icon: Inbox,
    title: "Messages land in one place",
    body: "All tenant communications \u2014 threaded by tenant and property \u2014 in a single unified inbox your whole team can see.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "AI categorises and drafts",
    body: "Each message is auto-tagged by type and urgency. Draft replies generated in your agency\u2019s tone, ready to review and send.",
  },
  {
    step: "04",
    icon: ClipboardList,
    title: "Track with timestamps",
    body: "Maintenance requests move through a clear workflow \u2014 every stage logged with a timestamp for your compliance records.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* CTA                                                                 */
/* ------------------------------------------------------------------ */

export const CTA_COPY = {
  headline: "Be first in line when we launch",
  subtitle:
    "Early access members get priority onboarding, direct input on the roadmap, and launch pricing locked in for life.",
  subtext: "Free to join. No card required. Launching Summer 2026.",
} as const;

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const FOOTER_COPY = {
  tagline:
    "Built by a UK developer for UK letting agents \u00b7 Coming Summer 2026",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Dashboard mockup data                                               */
/* ------------------------------------------------------------------ */

export const SIDEBAR_ITEMS = [
  "Inbox",
  "Maintenance",
  "Properties",
  "Tenants",
  "Audit Log",
] as const;

export const MOCK_MESSAGES = [
  {
    name: "Sarah Chen",
    initials: "SC",
    property: "14 Maple Drive, Bristol",
    preview: "Hi, the boiler has stopped working again and there\u2019s no hot water. This is the third time this\u2026",
    tag: "Urgent",
    tagVariant: "destructive" as const,
    time: "2 min ago",
  },
  {
    name: "James Okonkwo",
    initials: "JO",
    property: "Flat 3, 22 Elm Road, Bath",
    preview: "Just wanted to check when the annual gas safety inspection is due? My records show it was\u2026",
    tag: "Maintenance",
    tagVariant: "default" as const,
    time: "18 min ago",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    property: "7 Oak Lane, Reading",
    preview: "Could you confirm the process for ending my tenancy? I\u2019d like to give notice for the end of\u2026",
    tag: "Rent Query",
    tagVariant: "secondary" as const,
    time: "1 hr ago",
  },
  {
    name: "Tom Williams",
    initials: "TW",
    property: "9 Birch Close, Oxford",
    preview: "There\u2019s a small patch of damp appearing on the bedroom ceiling near the window. I\u2019ve taken\u2026",
    tag: "Maintenance",
    tagVariant: "default" as const,
    time: "3 hr ago",
  },
] as const;
