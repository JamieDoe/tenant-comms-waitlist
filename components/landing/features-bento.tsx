"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Inbox,
  Sparkles,
  Send,
  Wrench,
  Camera,
  CheckCircle2,
  Shield,
  Clock,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
  FileText,
  Mail,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeader } from "@/components/shared/section-header";

/* ------------------------------------------------------------------ */
/* Decorative background bubbles                                        */
/* ------------------------------------------------------------------ */

function BubbleBg({ variant = "default" }: { variant?: "default" | "alt" | "subtle" }) {
  const colors = {
    default: "bg-chart-1/[0.07]",
    alt: "bg-chart-5/[0.05]",
    subtle: "bg-chart-2/[0.06]",
  };
  const accentColors = {
    default: "bg-chart-1/[0.12]",
    alt: "bg-chart-5/[0.09]",
    subtle: "bg-chart-2/[0.10]",
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <div className={`absolute -right-8 -top-8 h-40 w-40 rounded-full ${colors[variant]}`} />
      <div className={`absolute -bottom-6 -left-6 h-32 w-32 rounded-full ${colors[variant]}`} />
      <div className={`absolute right-1/4 top-1/3 h-20 w-20 rounded-full ${accentColors[variant]}`} />
      {/* Sparkle dots */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, type: "tween", ease: "easeInOut" }}
        className="absolute left-[15%] top-[20%] h-1.5 w-1.5 rounded-full bg-chart-1/30"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5, type: "tween", ease: "easeInOut", delay: 0.8 }}
        className="absolute right-[20%] top-[60%] h-1 w-1 rounded-full bg-chart-1/25"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ repeat: Infinity, duration: 4, type: "tween", ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[25%] left-[60%] h-1.5 w-1.5 rounded-full bg-chart-1/20"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Unified Inbox visual                                              */
/* ------------------------------------------------------------------ */

const BENTO_MSGS = [
  { id: 0, initials: "SC", name: "Sarah C.", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive", preview: "Boiler stopped working\u2026", channel: Mail },
  { id: 1, initials: "JO", name: "James O.", tag: "Maintenance", tagClass: "bg-chart-5/10 text-chart-5", preview: "Gas safety inspection?", channel: MessageSquare },
  { id: 2, initials: "PS", name: "Priya S.", tag: "Rent", tagClass: "bg-chart-2/10 text-chart-2", preview: "Notice process?", channel: Globe },
  { id: 3, initials: "TW", name: "Tom W.", tag: "Maintenance", tagClass: "bg-chart-5/10 text-chart-5", preview: "Damp on bedroom ceiling\u2026", channel: Mail },
  { id: 4, initials: "AH", name: "Amira H.", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive", preview: "Door lock jammed\u2026", channel: MessageSquare },
];

function UnifiedInboxVisual() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => o + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const MAX_VISIBLE = 4;
  const visibleCount = Math.min(offset + 1, MAX_VISIBLE);
  const stack = Array.from({ length: visibleCount }, (_, i) => {
    const arrivalOffset = offset - i;
    const idx = ((arrivalOffset % BENTO_MSGS.length) + BENTO_MSGS.length) % BENTO_MSGS.length;
    return { ...BENTO_MSGS[idx], instanceKey: arrivalOffset };
  });

  const channels = [
    { icon: Mail, label: "Email", color: "bg-chart-1", textColor: "text-chart-1" },
    { icon: MessageSquare, label: "WhatsApp", color: "bg-chart-5", textColor: "text-chart-5" },
    { icon: Globe, label: "Portal", color: "bg-chart-2", textColor: "text-chart-2" },
  ];

  return (
    <div className="relative flex h-full items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-[380px] items-center gap-0">
        {/* Source channels (left side) */}
        <div className="relative z-10 flex shrink-0 flex-col gap-3">
          {channels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={ch.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12, type: "spring" as const, stiffness: 200, damping: 20 }}
                className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md shadow-black/[0.04] ring-1 ring-black/[0.04]"
              >
                <div className={`flex h-6 w-6 items-center justify-center rounded-md ${ch.color}/10`}>
                  <Icon size={12} className={ch.textColor} />
                </div>
                <span className="text-[0.65rem] font-semibold text-foreground">{ch.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Animated flow lines (middle) */}
        <div className="relative mx-1 flex-1">
          <svg viewBox="0 0 120 100" className="h-[100px] w-full" fill="none">
            <motion.path
              d="M 0 15 C 40 15, 60 50, 120 50"
              stroke="oklch(0.646 0.222 41.116)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            />
            <motion.path
              d="M 0 50 L 120 50"
              stroke="oklch(0.398 0.07 227.334)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
            <motion.path
              d="M 0 85 C 40 85, 60 50, 120 50"
              stroke="oklch(0.577 0.174 136.073)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />
            <motion.circle
              r="3" fill="oklch(0.646 0.222 41.116)"
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, type: "tween", ease: "easeInOut", delay: 0 }}
              style={{ offsetPath: "path('M 0 15 C 40 15, 60 50, 120 50')" }}
            />
            <motion.circle
              r="3" fill="oklch(0.398 0.07 227.334)"
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, type: "tween", ease: "easeInOut", delay: 0.7 }}
              style={{ offsetPath: "path('M 0 50 L 120 50')" }}
            />
            <motion.circle
              r="3" fill="oklch(0.577 0.174 136.073)"
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, type: "tween", ease: "easeInOut", delay: 1.4 }}
              style={{ offsetPath: "path('M 0 85 C 40 85, 60 50, 120 50')" }}
            />
          </svg>
        </div>

        {/* Unified Inbox (right side) */}
        <div className="relative z-10 shrink-0 w-[150px] rounded-xl bg-white p-2.5 shadow-lg shadow-black/[0.06] ring-1 ring-black/[0.04]">
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Inbox size={12} className="text-chart-5" />
              <span className="text-[0.55rem] font-semibold text-foreground">Inbox</span>
            </div>
            <span className="text-[0.45rem] text-muted-foreground">{offset + 1}</span>
          </div>
          <div className="h-[120px]">
            <AnimatePresence initial={false} mode="popLayout">
              {stack.map((msg, i) => {
                const ChIcon = msg.channel;
                const isNew = i === 0;
                return (
                  <motion.div
                    key={msg.instanceKey}
                    layout="position"
                    initial={isNew ? { opacity: 0, scale: 0.92, filter: "blur(2px)" } : false}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(2px)" }}
                    transition={{
                      layout: { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.8 },
                      opacity: { duration: 0.25, ease: "easeOut" },
                      scale: { duration: 0.25, ease: "easeOut" },
                      filter: { duration: 0.25 },
                    }}
                    className={`mb-0.5 flex items-center gap-1 rounded-md px-1.5 py-1 ${isNew ? "bg-chart-1/[0.04]" : ""}`}
                  >
                    <Avatar className="h-4 w-4 shrink-0">
                      <AvatarFallback className="bg-chart-5/8 text-[0.35rem] font-semibold text-chart-5">{msg.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-0.5">
                        <span className="text-[0.45rem] font-semibold text-foreground">{msg.name}</span>
                        <Badge variant="outline" className={`h-2.5 border-0 px-0.5 text-[0.32rem] ${msg.tagClass}`}>{msg.tag}</Badge>
                      </div>
                      <p className="truncate text-[0.38rem] text-muted-foreground">{msg.preview}</p>
                    </div>
                    <ChIcon size={7} className="shrink-0 text-muted-foreground/30" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. AI Categorisation & Draft visual                                  */
/* ------------------------------------------------------------------ */

/*
 * AI Draft animation phases (looping):
 * 0: message appears
 * 1: AI thinking dots
 * 2: tags pop in
 * 3: draft text types out
 * 4: send button appears
 * 5: pause then reset
 */
const AI_PHASES = 6;
const AI_PHASE_MS = [800, 1200, 600, 1800, 1000, 600]; // duration per phase

const DRAFT_TEXT = "Thank you for reporting this. I\u2019ve logged it as urgent and our contractor will attend within 24 hours.";

function AiDraftVisual() {
  const [phase, setPhase] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  useEffect(() => {
    if (phase === 3) {
      // Typewriter effect
      if (typedLen < DRAFT_TEXT.length) {
        const t = setTimeout(() => setTypedLen((l) => l + 1), AI_PHASE_MS[3] / DRAFT_TEXT.length);
        return () => clearTimeout(t);
      } else {
        // Done typing, advance
        const t = setTimeout(() => setPhase(4), 200);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => {
        const next = (phase + 1) % AI_PHASES;
        if (next === 0) setTypedLen(0);
        setPhase(next);
      }, AI_PHASE_MS[phase]);
      return () => clearTimeout(t);
    }
  }, [phase, typedLen]);

  const tags = ["Maintenance", "Urgent", "Boiler"];
  const showMessage = phase >= 0;
  const showThinking = phase === 1;
  const showTags = phase >= 2;
  const showDraft = phase >= 3;
  const showSend = phase >= 4;

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-4 py-6">
      <div className="flex w-full max-w-[280px] flex-col" style={{ minHeight: "220px" }}>
        {/* Incoming message */}
        <AnimatePresence mode="wait">
          {showMessage && phase < 5 && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-3 rounded-xl bg-white p-3 shadow-md shadow-black/[0.04] ring-1 ring-black/[0.04]"
            >
              <p className="text-[0.62rem] leading-relaxed text-muted-foreground">
                &ldquo;The boiler has stopped working and there&rsquo;s no hot water. This is the third time this month.&rdquo;
              </p>
              <div className="mt-2 flex gap-1">
                {showTags ? tags.map((tag, i) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 400, damping: 20 }}
                  >
                    <Badge variant="outline" className="h-4 border-chart-1/20 bg-chart-1/5 px-1.5 text-[0.48rem] text-chart-1">{tag}</Badge>
                  </motion.div>
                )) : (
                  <div className="h-4" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI thinking / draft card */}
        <AnimatePresence mode="wait">
          {(showThinking || showDraft) && phase < 5 && (
            <motion.div
              key="ai-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-xl bg-white p-3 shadow-md shadow-black/[0.04] ring-1 ring-black/[0.04]"
              style={{ minHeight: "110px" }}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, type: "tween", ease: "easeInOut" }}
                >
                  <Sparkles size={12} className="text-chart-1" />
                </motion.div>
                <span className="text-[0.6rem] font-semibold text-chart-1">AI Draft</span>
              </div>

              {showThinking && !showDraft ? (
                /* Thinking dots */
                <div className="flex items-center gap-1 py-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, type: "tween", ease: "easeInOut", delay: i * 0.15 }}
                      className="h-1.5 w-1.5 rounded-full bg-chart-1/60"
                    />
                  ))}
                </div>
              ) : (
                /* Typed text */
                <>
                  <p className="text-[0.6rem] leading-relaxed text-muted-foreground">
                    &ldquo;{DRAFT_TEXT.slice(0, typedLen)}
                    {typedLen < DRAFT_TEXT.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, type: "tween" }}
                        className="inline-block w-[3px] translate-y-[1px] bg-chart-1"
                      >
                        &nbsp;
                      </motion.span>
                    )}
                    {typedLen >= DRAFT_TEXT.length && <>&rdquo;</>}
                  </p>
                  {showSend && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-chart-1 py-2"
                    >
                      <Send size={10} className="text-white" />
                      <span className="text-[0.6rem] font-semibold text-white">One-click send</span>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating sparkle */}
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, type: "tween", ease: "easeInOut" }}
          className="absolute -right-1 top-10 sm:right-4"
        >
          <Sparkles size={18} className="text-chart-1/40" />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Maintenance Tracker visual                                        */
/* ------------------------------------------------------------------ */

const MAINT_STAGES = ["Reported", "Acknowledged", "In Progress", "Resolved"] as const;
const MAINT_COLORS = ["bg-destructive text-destructive", "bg-chart-5 text-chart-5", "bg-chart-2 text-chart-2", "bg-chart-1 text-chart-1"];
const MAINT_BAR_COLORS = ["bg-destructive", "bg-chart-5", "bg-chart-2", "bg-chart-1"];

const MAINT_ROWS = [
  { title: "Boiler repair", property: "14 Maple Dr", initials: "SC" },
  { title: "Damp patch", property: "9 Birch Cl", initials: "TW" },
  { title: "Door lock", property: "31 Cedar Ave", initials: "AH" },
];

function MaintenanceVisual() {
  const [stages, setStages] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStages((prev) => {
        const next = [...prev];
        // Advance a random ticket that isn't resolved yet
        const available = next.map((s, i) => (s < 3 ? i : -1)).filter((i) => i >= 0);
        if (available.length === 0) return [0, 0, 0]; // reset all
        const pick = available[Math.floor(Math.random() * available.length)];
        next[pick] = next[pick] + 1;
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-3 py-6" style={{ minHeight: "220px" }}>
      <div className="w-full max-w-[260px] mx-auto space-y-2">
        {MAINT_ROWS.map((row, i) => {
          const stageIdx = stages[i];
          const progress = ((stageIdx + 1) / MAINT_STAGES.length) * 100;
          return (
            <motion.div
              key={i}
              layout
              className="rounded-xl bg-white p-2.5 shadow-sm shadow-black/[0.03] ring-1 ring-black/[0.04]"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <Avatar className="h-5 w-5 shrink-0">
                  <AvatarFallback className="bg-chart-5/8 text-[0.38rem] font-semibold text-chart-5">{row.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <span className="text-[0.55rem] font-semibold text-foreground">{row.title}</span>
                  <span className="ml-1 text-[0.45rem] text-muted-foreground">{row.property}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stageIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge variant="outline" className={`h-3.5 border-0 px-1 text-[0.4rem] ${MAINT_COLORS[stageIdx].split(" ")[0]}/10 ${MAINT_COLORS[stageIdx].split(" ")[1]}`}>
                      {MAINT_STAGES[stageIdx]}
                    </Badge>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Progress bar */}
              <div className="h-1 w-full rounded-full bg-muted/40">
                <motion.div
                  className={`h-full rounded-full ${MAINT_BAR_COLORS[stageIdx]}`}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Tenant Portal visual                                              */
/* ------------------------------------------------------------------ */

/*
 * Tenant Portal animation phases:
 * 0: empty form appears
 * 1: text types into the description
 * 2: photo thumbnail appears
 * 3: submit button pulses, then submitted
 * 4: success confirmation
 * 5: reset
 */
const PORTAL_PHASE_MS = [600, 1800, 800, 1000, 1200, 400];
const PORTAL_TEXT = "Kitchen tap leaking onto floor";

function TenantPortalVisual() {
  const [phase, setPhase] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  useEffect(() => {
    if (phase === 1) {
      if (typedLen < PORTAL_TEXT.length) {
        const t = setTimeout(() => setTypedLen((l) => l + 1), PORTAL_PHASE_MS[1] / PORTAL_TEXT.length);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase(2), 150);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => {
        const next = (phase + 1) % PORTAL_PHASE_MS.length;
        if (next === 0) setTypedLen(0);
        setPhase(next);
      }, PORTAL_PHASE_MS[phase]);
      return () => clearTimeout(t);
    }
  }, [phase, typedLen]);

  const showForm = phase < 5;
  const showTyping = phase >= 1;
  const showPhoto = phase >= 2;
  const showSubmitted = phase >= 3;
  const showSuccess = phase === 4;

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-4 py-6" style={{ minHeight: "220px" }}>
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[220px] rounded-2xl bg-white p-3.5 shadow-lg shadow-black/[0.06] ring-1 ring-black/[0.04]"
          >
            {/* Phone top bar */}
            <div className="mb-2.5 flex items-center justify-center gap-1">
              <div className="h-0.5 w-8 rounded-full bg-muted-foreground/15" />
            </div>

            <p className="mb-0.5 text-center text-[0.6rem] font-semibold text-foreground">Report an issue</p>
            <p className="mb-2.5 text-center text-[0.42rem] text-muted-foreground">No app needed — just this link</p>

            {/* Text input */}
            <div className="mb-2 rounded-lg border border-border/60 bg-muted/15 p-2" style={{ minHeight: "32px" }}>
              {showTyping ? (
                <p className="text-[0.48rem] text-foreground">
                  {PORTAL_TEXT.slice(0, typedLen)}
                  {typedLen < PORTAL_TEXT.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5, type: "tween" }}
                      className="inline-block w-[2px] translate-y-[1px] bg-chart-5"
                    >
                      &nbsp;
                    </motion.span>
                  )}
                </p>
              ) : (
                <p className="text-[0.48rem] text-muted-foreground/40">Describe the issue...</p>
              )}
            </div>

            {/* Photo area */}
            <div className="mb-2 flex items-center gap-1.5 rounded-lg border border-dashed border-border/50 bg-muted/10 px-2 py-2">
              <Camera size={10} className="shrink-0 text-muted-foreground/30" />
              {showPhoto ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >
                  <div className="h-5 w-5 rounded bg-chart-2/15" />
                  <span className="text-[0.42rem] text-foreground">tap_leak.jpg</span>
                </motion.div>
              ) : (
                <span className="text-[0.42rem] text-muted-foreground/40">Add photos</span>
              )}
            </div>

            {/* Submit button */}
            <motion.div
              animate={showSubmitted && !showSuccess ? { scale: [1, 0.97, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`rounded-lg py-1.5 text-center transition-colors duration-300 ${
                showSubmitted ? "bg-chart-1" : "bg-chart-5"
              }`}
            >
              <span className="text-[0.5rem] font-semibold text-white">
                {showSubmitted ? "Submitted \u2713" : "Submit Request"}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-lg shadow-black/[0.08] ring-1 ring-black/[0.04]"
          >
            <CheckCircle2 size={11} className="text-chart-1" />
            <span className="text-[0.55rem] font-semibold text-foreground">Ticket #247 created</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Compliance Audit Trail visual                                     */
/* ------------------------------------------------------------------ */

const AUDIT_EVENTS = [
  { icon: Inbox, iconClass: "text-chart-1", action: "Message received", detail: "Sarah Chen — boiler", time: "14:30:12" },
  { icon: Shield, iconClass: "text-chart-2", action: "AI categorised", detail: "Urgent · Maintenance", time: "14:30:14" },
  { icon: Wrench, iconClass: "text-chart-5", action: "Ticket created", detail: "Boiler repair #248", time: "14:30:15" },
  { icon: Clock, iconClass: "text-amber-500", action: "SLA timer started", detail: "24h response window", time: "14:30:15" },
  { icon: CheckCircle2, iconClass: "text-chart-1", action: "Response sent", detail: "Acknowledged within 18s", time: "14:30:30" },
  { icon: Shield, iconClass: "text-chart-1", action: "Compliance logged", detail: "Full audit trail saved", time: "14:30:31" },
];

const MAX_AUDIT_VISIBLE = 4;

function AuditVisual() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => o + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const visibleCount = Math.min(offset + 1, MAX_AUDIT_VISIBLE);
  const stack = Array.from({ length: visibleCount }, (_, i) => {
    const arrivalOffset = offset - i;
    const idx = ((arrivalOffset % AUDIT_EVENTS.length) + AUDIT_EVENTS.length) % AUDIT_EVENTS.length;
    return { ...AUDIT_EVENTS[idx], instanceKey: arrivalOffset };
  });

  return (
    <div className="relative flex h-full items-center justify-center px-3 py-6" style={{ minHeight: "220px" }}>
      <div className="w-full max-w-[260px]">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FileText size={10} className="text-muted-foreground" />
            <span className="text-[0.5rem] font-semibold text-foreground">Audit Log</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-chart-1/10 px-1.5 py-0.5">
            <Shield size={8} className="text-chart-1" />
            <span className="text-[0.4rem] font-semibold text-chart-1">Compliant</span>
          </div>
        </div>

        {/* Log entries */}
        <div className="h-[160px]">
          <AnimatePresence initial={false} mode="popLayout">
            {stack.map((entry, i) => {
              const Icon = entry.icon;
              const isNew = i === 0;
              return (
                <motion.div
                  key={entry.instanceKey}
                  layout="position"
                  initial={isNew ? { opacity: 0, scale: 0.92, filter: "blur(2px)" } : false}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(2px)" }}
                  transition={{
                    layout: { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.8 },
                    opacity: { duration: 0.25, ease: "easeOut" },
                    scale: { duration: 0.25, ease: "easeOut" },
                    filter: { duration: 0.25 },
                  }}
                  className={`mb-1 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 shadow-sm shadow-black/[0.02] ring-1 ring-black/[0.04] ${isNew ? "ring-chart-1/20" : ""}`}
                >
                  <div className={`shrink-0 ${entry.iconClass}`}>
                    <Icon size={11} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[0.5rem] font-semibold text-foreground">{entry.action}</span>
                    <p className="truncate text-[0.4rem] text-muted-foreground">{entry.detail}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[0.4rem] text-muted-foreground/60">{entry.time}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature card wrapper                                                 */
/* ------------------------------------------------------------------ */

interface FeatureCardProps {
  title: string;
  description: string;
  bubbleVariant?: "default" | "alt" | "subtle";
  children: React.ReactNode;
  delay?: number;
}

function FeatureCard({ title, description, bubbleVariant = "default", children, delay = 0 }: FeatureCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="group flex h-full flex-col">
        <div className="relative flex-1 rounded-2xl border border-border/50 bg-muted/20 transition-all duration-300 hover:border-chart-1/20 hover:shadow-lg hover:shadow-chart-1/[0.04]">
          <BubbleBg variant={bubbleVariant} />
          <div className="relative z-10 min-h-[220px] sm:min-h-[260px]">
            {children}
          </div>
        </div>
        <div className="px-1 pt-4">
          <h3 className="mb-1 font-serif text-[0.95rem] font-semibold text-chart-5">{title}</h3>
          <p className="text-[0.8rem] leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ------------------------------------------------------------------ */
/* Bento grid                                                           */
/* ------------------------------------------------------------------ */

export function FeaturesBento() {
  return (
    <section className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28" aria-label="Features">
      <SectionHeader
        label="The fix"
        heading="One platform. Every tenant message. Full audit trail."
        description="TenantComms doesn't replace your property management software. It fills the gap your PM software ignores — structured communication and maintenance compliance."
      />

      {/* Row 1: 2 equal columns */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <FeatureCard
          title="Unified Inbox"
          description="Every tenant message — email, WhatsApp, portal — threaded by tenant and property in a single view your whole team can see."
          bubbleVariant="default"
          delay={0}
        >
          <UnifiedInboxVisual />
        </FeatureCard>

        <FeatureCard
          title="AI Categorisation & Draft Replies"
          description="Inbound messages auto-tagged by type and urgency. One-click draft responses matched to your agency's tone."
          bubbleVariant="alt"
          delay={0.08}
        >
          <AiDraftVisual />
        </FeatureCard>
      </div>

      {/* Row 2: 3 equal columns */}
      <div className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          title="Maintenance Tracker"
          description="Every request flows through a clear pipeline — reported, acknowledged, in progress, resolved. Every stage timestamped."
          bubbleVariant="subtle"
          delay={0.16}
        >
          <MaintenanceVisual />
        </FeatureCard>

        <FeatureCard
          title="Tenant Portal"
          description="Tenants submit requests with photos via a simple link. No app downloads, no signups — just a clean form."
          bubbleVariant="default"
          delay={0.24}
        >
          <TenantPortalVisual />
        </FeatureCard>

        <FeatureCard
          title="Compliance Audit Trail"
          description="Every interaction timestamped and logged. When Awaab's Law hits the PRS, your evidence is already built."
          bubbleVariant="alt"
          delay={0.32}
        >
          <AuditVisual />
        </FeatureCard>
      </div>
    </section>
  );
}
