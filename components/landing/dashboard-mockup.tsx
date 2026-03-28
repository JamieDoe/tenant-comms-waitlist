"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Inbox,
  Wrench,
  Building2,
  Users,
  FileText,
  Camera,
  ArrowRight,
  Clock,
  CheckCircle2,
  Shield,
  ChevronLeft,
  Send,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SIDEBAR_ITEMS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: "inbox", label: "Unified Inbox", shortLabel: "Inbox" },
  { id: "maintenance", label: "Maintenance Tracking", shortLabel: "Maintenance" },
  { id: "portal", label: "Tenant Portal", shortLabel: "Portal" },
  { id: "audit", label: "Audit Log", shortLabel: "Audit" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_CYCLE_MS = 7500;

/* ------------------------------------------------------------------ */
/* Inbox messages                                                      */
/* ------------------------------------------------------------------ */

const MESSAGES = [
  { id: 0, name: "Sarah Chen", initials: "SC", property: "14 Maple Drive, Bristol", preview: "The boiler has stopped working and there\u2019s no hot water\u2026", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive" },
  { id: 1, name: "James Okonkwo", initials: "JO", property: "Flat 3, 22 Elm Road, Bath", preview: "When is the annual gas safety inspection due?", tag: "Maintenance", tagClass: "bg-chart-5/10 text-chart-5" },
  { id: 2, name: "Priya Sharma", initials: "PS", property: "7 Oak Lane, Reading", preview: "Could you confirm the process for ending my tenancy?", tag: "Rent Query", tagClass: "bg-chart-2/10 text-chart-2" },
  { id: 3, name: "Tom Williams", initials: "TW", property: "9 Birch Close, Oxford", preview: "Small patch of damp appearing on the bedroom ceiling\u2026", tag: "Maintenance", tagClass: "bg-chart-5/10 text-chart-5" },
  { id: 4, name: "Amira Hassan", initials: "AH", property: "31 Cedar Avenue, Leeds", preview: "Front door lock is jammed, can\u2019t secure the property\u2026", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive" },
  { id: 5, name: "David Price", initials: "DP", property: "Flat 12, The Willows, Manchester", preview: "Checking when rent will be adjusted for the new term?", tag: "Rent Query", tagClass: "bg-chart-2/10 text-chart-2" },
  { id: 6, name: "Fatima Begum", initials: "FB", property: "5 Hawthorn Street, Birmingham", preview: "Kitchen extractor fan has stopped working completely\u2026", tag: "Maintenance", tagClass: "bg-chart-5/10 text-chart-5" },
  { id: 7, name: "Oliver Grant", initials: "OG", property: "28 Ash Grove, Edinburgh", preview: "Leak coming through bathroom ceiling from upstairs\u2026", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive" },
  { id: 8, name: "Lucy Brennan", initials: "LB", property: "Flat 7, Riverside Court, Cardiff", preview: "Could I arrange a time for contractor access to the flat?", tag: "General", tagClass: "bg-muted text-muted-foreground" },
  { id: 9, name: "Raj Patel", initials: "RP", property: "16 Willow Lane, Nottingham", preview: "Black mould around the bathroom window frame\u2026", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive" },
  { id: 10, name: "Emily Clarke", initials: "EC", property: "3 Linden Close, Brighton", preview: "Window won\u2019t close properly, security concern\u2026", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive" },
  { id: 11, name: "Hassan Ali", initials: "HA", property: "Flat 9, Oak House, Liverpool", preview: "Heating hasn\u2019t been working for two days now\u2026", tag: "Maintenance", tagClass: "bg-chart-5/10 text-chart-5" },
  { id: 12, name: "Sophie Turner", initials: "ST", property: "27 Elm Street, Sheffield", preview: "Requesting update on deposit return timeline?", tag: "Rent Query", tagClass: "bg-chart-2/10 text-chart-2" },
  { id: 13, name: "Daniel Mensah", initials: "DM", property: "11 Pine Road, Newcastle", preview: "Washing machine leaking water onto the kitchen floor\u2026", tag: "Urgent", tagClass: "bg-destructive/10 text-destructive" },
  { id: 14, name: "Grace Kelly", initials: "GK", property: "Flat 5, River Walk, York", preview: "Smoke alarm keeps beeping, replaced battery already\u2026", tag: "Maintenance", tagClass: "bg-chart-5/10 text-chart-5" },
];

const VISIBLE = 6;
const MOBILE_VISIBLE = 5;
const INTERVAL = 750;

/* ------------------------------------------------------------------ */
/* Maintenance data                                                    */
/* ------------------------------------------------------------------ */

const MAINTENANCE_ITEMS = [
  { id: "m1", title: "Boiler repair", property: "14 Maple Drive", tenant: "Sarah Chen", status: "Reported", statusClass: "bg-destructive/10 text-destructive", time: "2 min ago", priority: "Urgent" },
  { id: "m2", title: "Damp patch investigation", property: "9 Birch Close", tenant: "Tom Williams", status: "Acknowledged", statusClass: "bg-chart-5/10 text-chart-5", time: "1 hr ago", priority: "Standard" },
  { id: "m3", title: "Extractor fan replacement", property: "5 Hawthorn Street", tenant: "Fatima Begum", status: "In Progress", statusClass: "bg-chart-2/10 text-chart-2", time: "2 days ago", priority: "Standard" },
  { id: "m4", title: "Bathroom ceiling leak", property: "28 Ash Grove", tenant: "Oliver Grant", status: "Reported", statusClass: "bg-destructive/10 text-destructive", time: "45 min ago", priority: "Urgent" },
  { id: "m5", title: "Window seal replacement", property: "Flat 2, 8 Bridge Road", tenant: "Michael Adeyemi", status: "In Progress", statusClass: "bg-chart-2/10 text-chart-2", time: "5 days ago", priority: "Standard" },
  { id: "m6", title: "Front door lock", property: "31 Cedar Avenue", tenant: "Amira Hassan", status: "Acknowledged", statusClass: "bg-chart-5/10 text-chart-5", time: "3 hr ago", priority: "Urgent" },
];

/* ------------------------------------------------------------------ */
/* Audit log data                                                      */
/* ------------------------------------------------------------------ */

const AUDIT_ENTRIES = [
  { id: "a1", action: "Response sent", detail: "Sarah Chen \u2014 Boiler repair", time: "14:32:07", icon: CheckCircle2, iconClass: "text-chart-1" },
  { id: "a2", action: "Ticket created", detail: "Boiler repair \u2014 14 Maple Drive", time: "14:32:08", icon: Wrench, iconClass: "text-chart-5" },
  { id: "a3", action: "AI categorised", detail: "Urgent \u00b7 Maintenance \u00b7 Boiler", time: "14:30:14", icon: Shield, iconClass: "text-chart-2" },
  { id: "a4", action: "Message received", detail: "Sarah Chen \u2014 14 Maple Drive", time: "14:30:12", icon: Inbox, iconClass: "text-chart-3" },
  { id: "a5", action: "Contractor assigned", detail: "Damp \u2014 9 Birch Close", time: "13:15:44", icon: Users, iconClass: "text-chart-5" },
  { id: "a6", action: "Response sent", detail: "Tom Williams \u2014 Damp report", time: "12:48:21", icon: CheckCircle2, iconClass: "text-chart-1" },
];

/* ------------------------------------------------------------------ */
/* Sidebar config (desktop only)                                       */
/* ------------------------------------------------------------------ */

const sidebarIcons: Record<string, React.ReactNode> = {
  Inbox: <Inbox size={14} />,
  Maintenance: <Wrench size={14} />,
  Properties: <Building2 size={14} />,
  Tenants: <Users size={14} />,
  "Audit Log": <FileText size={14} />,
};

const tabToSidebar: Record<TabId, number> = {
  inbox: 0,
  maintenance: 1,
  portal: 3,
  audit: 4,
};

/* ------------------------------------------------------------------ */
/* DESKTOP tab content views                                           */
/* ------------------------------------------------------------------ */

function InboxView({ offset }: { offset: number }) {
  const times = ["just now", "1 min ago", "3 min ago", "8 min ago", "14 min ago", "22 min ago"];
  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    const arrivalOffset = offset - i;
    const idx = ((arrivalOffset % MESSAGES.length) + MESSAGES.length) % MESSAGES.length;
    return { ...MESSAGES[idx], time: times[i] ?? `${20 + i * 8} min ago`, instanceKey: arrivalOffset };
  });
  const unread = offset + 1;

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-foreground">Inbox</h4>
        <motion.span
          key={unread}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-muted px-2 py-0.5 text-[0.6rem] text-muted-foreground"
        >
          {unread} unread
        </motion.span>
      </div>
      <div className="mb-3 h-px bg-border" />
      <div className="flex-1 space-y-0.5 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((msg, i) => (
            <motion.div
              key={msg.instanceKey}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
              transition={{
                layout: { type: "spring" as const, stiffness: 500, damping: 35 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className={`flex items-start gap-2.5 rounded-lg p-2.5 ${i === 0 ? "bg-chart-1/[0.04]" : ""}`}
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="bg-chart-5/8 text-[0.5rem] font-semibold text-chart-5">{msg.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.65rem] font-semibold text-foreground">{msg.name}</span>
                  <Badge variant="outline" className={`h-3.5 border-0 px-1 text-[0.5rem] ${msg.tagClass}`}>{msg.tag}</Badge>
                  <span className="ml-auto text-[0.55rem] text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-[0.58rem] text-muted-foreground/70">{msg.property}</p>
                <p className="mt-0.5 truncate text-[0.62rem] text-muted-foreground">{msg.preview}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MaintenanceView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-foreground">Maintenance Requests</h4>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[0.6rem] text-muted-foreground">6 active</span>
      </div>

      <div className="mb-3 h-px bg-border" />
      <div className="mb-2 grid grid-cols-[1fr_80px_60px] sm:grid-cols-[1fr_100px_80px_70px_60px] gap-2 text-[0.55rem] font-medium text-muted-foreground">
        <span>Request</span>
        <span className="hidden sm:inline">Tenant</span>
        <span>Status</span>
        <span className="hidden sm:inline">Priority</span>
        <span className="text-right">Time</span>
      </div>
      <div className="flex-1 space-y-1 overflow-hidden">
        {MAINTENANCE_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="grid grid-cols-[1fr_80px_60px] sm:grid-cols-[1fr_100px_80px_70px_60px] items-center gap-2 rounded-lg p-2 hover:bg-muted/30"
          >
            <div>
              <p className="text-[0.62rem] font-semibold text-foreground">{item.title}</p>
              <p className="text-[0.5rem] text-muted-foreground">{item.property}</p>
            </div>
            <span className="hidden sm:inline text-[0.55rem] text-muted-foreground">{item.tenant}</span>
            <Badge variant="outline" className={`h-4 w-fit border-0 px-1.5 text-[0.48rem] ${item.statusClass}`}>{item.status}</Badge>
            <Badge variant="outline" className={`hidden sm:inline-flex h-4 w-fit border-0 px-1.5 text-[0.48rem] ${item.priority === "Urgent" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{item.priority}</Badge>
            <span className="text-right text-[0.5rem] text-muted-foreground">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const HERO_PORTAL_PHASE_MS = [600, 1800, 800, 1000, 1200, 400];
const HERO_PORTAL_TEXT = "Kitchen tap leaking onto floor";

function PortalView() {
  const [phase, setPhase] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  useEffect(() => {
    if (phase === 1) {
      if (typedLen < HERO_PORTAL_TEXT.length) {
        const t = setTimeout(() => setTypedLen((l) => l + 1), HERO_PORTAL_PHASE_MS[1] / HERO_PORTAL_TEXT.length);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase(2), 150);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => {
        const next = (phase + 1) % HERO_PORTAL_PHASE_MS.length;
        if (next === 0) setTypedLen(0);
        setPhase(next);
      }, HERO_PORTAL_PHASE_MS[phase]);
      return () => clearTimeout(t);
    }
  }, [phase, typedLen]);

  const showForm = phase < 5;
  const showTyping = phase >= 1;
  const showPhoto = phase >= 2;
  const showSubmitted = phase >= 3;
  const showSuccess = phase === 4;

  return (
    <div className="relative flex flex-1 items-center justify-center p-8">
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-[280px] rounded-2xl border border-border bg-background p-5 shadow-sm"
          >
            <h4 className="mb-1 text-center text-sm font-semibold text-foreground">Report an issue</h4>
            <p className="mb-4 text-center text-[0.6rem] text-muted-foreground">No app needed — just this link</p>

            <div className="mb-3 rounded-lg border border-border bg-muted/30 p-3" style={{ minHeight: "44px" }}>
              {showTyping ? (
                <p className="text-[0.55rem] text-foreground">
                  {HERO_PORTAL_TEXT.slice(0, typedLen)}
                  {typedLen < HERO_PORTAL_TEXT.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5, type: "tween" }}
                      className="inline-block w-[3px] translate-y-[1px] bg-chart-5"
                    >
                      &nbsp;
                    </motion.span>
                  )}
                </p>
              ) : (
                <p className="text-[0.55rem] text-muted-foreground/60">Describe the issue...</p>
              )}
            </div>

            <div className="mb-3 flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/20 px-3 py-3">
              <Camera size={14} className="shrink-0 text-muted-foreground/50" />
              {showPhoto ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <div className="h-7 w-7 rounded bg-chart-2/15" />
                  <span className="text-[0.55rem] text-foreground">tap_leak.jpg</span>
                </motion.div>
              ) : (
                <span className="text-[0.6rem] text-muted-foreground/60">Add photos</span>
              )}
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border bg-muted/30 p-2">
                <p className="text-[0.5rem] text-muted-foreground/60">Property</p>
                <p className="text-[0.55rem] font-medium text-foreground">14 Maple Drive</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-2">
                <p className="text-[0.5rem] text-muted-foreground/60">Category</p>
                <p className="text-[0.55rem] font-medium text-foreground">Maintenance</p>
              </div>
            </div>

            <motion.div
              animate={showSubmitted && !showSuccess ? { scale: [1, 0.97, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`rounded-lg py-2.5 text-center transition-colors duration-300 ${
                showSubmitted ? "bg-chart-1" : "bg-chart-5"
              }`}
            >
              <span className="text-[0.65rem] font-semibold text-white">
                {showSubmitted ? "Submitted \u2713" : "Submit Request"}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-background px-3 py-1.5 shadow-lg shadow-black/[0.08] ring-1 ring-black/[0.04]"
          >
            <CheckCircle2 size={13} className="text-chart-1" />
            <span className="text-[0.65rem] font-semibold text-foreground">Ticket #247 created</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AuditView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-foreground">Audit Log</h4>
        <div className="flex items-center gap-1.5 rounded-full bg-chart-1/10 px-2 py-0.5">
          <Shield size={9} className="text-chart-1" />
          <span className="text-[0.55rem] font-medium text-chart-1">Awaab&apos;s Law compliant</span>
        </div>
      </div>
      <div className="mb-3 h-px bg-border" />
      <div className="flex-1 space-y-0.5 overflow-hidden">
        {AUDIT_ENTRIES.map((entry, i) => {
          const Icon = entry.icon;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-lg p-2.5"
            >
              <div className={`mt-0.5 shrink-0 ${entry.iconClass}`}>
                <Icon size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-semibold text-foreground">{entry.action}</span>
                  <span className="shrink-0 font-mono text-[0.5rem] text-muted-foreground">{entry.time}</span>
                </div>
                <p className="text-[0.55rem] text-muted-foreground">{entry.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MOBILE tab content views (iPhone-style)                             */
/* ------------------------------------------------------------------ */

function MobileInboxView({ offset }: { offset: number }) {
  const times = ["now", "1m", "3m", "8m", "14m"];
  const visible = Array.from({ length: MOBILE_VISIBLE }, (_, i) => {
    const arrivalOffset = offset - i;
    const idx = ((arrivalOffset % MESSAGES.length) + MESSAGES.length) % MESSAGES.length;
    return { ...MESSAGES[idx], time: times[i] ?? `${20 + i * 8}m`, instanceKey: arrivalOffset };
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Mobile nav bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[0.6rem] font-semibold text-foreground">Inbox</span>
        <motion.span
          key={offset + 1}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-destructive px-1.5 py-0.5 text-[0.5rem] font-bold text-white"
        >
          {offset + 1}
        </motion.span>
      </div>
      {/* Message list */}
      <div className="flex-1 space-y-px overflow-hidden px-2 py-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((msg, i) => (
            <motion.div
              key={msg.instanceKey}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
              transition={{
                layout: { type: "spring" as const, stiffness: 500, damping: 35 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className={`flex items-center gap-2 rounded-xl px-2.5 py-2 ${i === 0 ? "bg-chart-1/[0.04]" : ""}`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-chart-5/8 text-[0.5rem] font-semibold text-chart-5">{msg.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] font-semibold text-foreground">{msg.name}</span>
                  <span className="text-[0.5rem] text-muted-foreground">{msg.time}</span>
                </div>
                <p className="truncate text-[0.58rem] text-muted-foreground">{msg.preview}</p>
              </div>
              <Badge variant="outline" className={`h-auto shrink-0 border-0 px-1 py-0.5 text-[0.45rem] ${msg.tagClass}`}>{msg.tag}</Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileMaintenanceView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[0.6rem] font-semibold text-foreground">Maintenance</span>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.5rem] text-muted-foreground">6 active</span>
      </div>
      <div className="flex-1 space-y-px overflow-hidden px-2 py-1.5">
        {MAINTENANCE_ITEMS.slice(0, 5).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-2.5 rounded-xl px-2.5 py-2"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.priority === "Urgent" ? "bg-destructive/10" : "bg-chart-5/10"}`}>
              <Wrench size={12} className={item.priority === "Urgent" ? "text-destructive" : "text-chart-5"} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] font-semibold text-foreground">{item.title}</span>
                <span className="text-[0.5rem] text-muted-foreground">{item.time}</span>
              </div>
              <p className="text-[0.55rem] text-muted-foreground">{item.property}</p>
            </div>
            <Badge variant="outline" className={`h-auto shrink-0 border-0 px-1.5 py-0.5 text-[0.45rem] ${item.statusClass}`}>{item.status}</Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MobilePortalView() {
  const [phase, setPhase] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  useEffect(() => {
    if (phase === 1) {
      if (typedLen < HERO_PORTAL_TEXT.length) {
        const t = setTimeout(() => setTypedLen((l) => l + 1), HERO_PORTAL_PHASE_MS[1] / HERO_PORTAL_TEXT.length);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase(2), 150);
        return () => clearTimeout(t);
      }
    } else {
      const t = setTimeout(() => {
        const next = (phase + 1) % HERO_PORTAL_PHASE_MS.length;
        if (next === 0) setTypedLen(0);
        setPhase(next);
      }, HERO_PORTAL_PHASE_MS[phase]);
      return () => clearTimeout(t);
    }
  }, [phase, typedLen]);

  const showTyping = phase >= 1;
  const showPhoto = phase >= 2;
  const showSubmitted = phase >= 3;
  const showSuccess = phase === 4;
  const showForm = phase < 5;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <ChevronLeft size={12} className="text-chart-5" />
          <span className="text-[0.6rem] font-semibold text-foreground">Report Issue</span>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-3 py-3">
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              key="mobile-form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full space-y-2.5"
            >
              {/* Text input */}
              <div className="rounded-xl border border-border bg-muted/30 p-3" style={{ minHeight: "38px" }}>
                {showTyping ? (
                  <p className="text-[0.6rem] text-foreground">
                    {HERO_PORTAL_TEXT.slice(0, typedLen)}
                    {typedLen < HERO_PORTAL_TEXT.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, type: "tween" }}
                        className="inline-block w-[3px] translate-y-[1px] bg-chart-5"
                      >
                        &nbsp;
                      </motion.span>
                    )}
                  </p>
                ) : (
                  <p className="text-[0.6rem] text-muted-foreground/60">Describe the issue...</p>
                )}
              </div>

              {/* Photo area */}
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-3 py-2.5">
                <Camera size={13} className="shrink-0 text-muted-foreground/50" />
                {showPhoto ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="h-6 w-6 rounded bg-chart-2/15" />
                    <span className="text-[0.55rem] text-foreground">tap_leak.jpg</span>
                  </motion.div>
                ) : (
                  <span className="text-[0.55rem] text-muted-foreground/60">Add photos</span>
                )}
              </div>

              {/* Property + Category inline */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border bg-muted/30 px-2.5 py-2">
                  <p className="text-[0.45rem] text-muted-foreground/60">Property</p>
                  <p className="text-[0.55rem] font-medium text-foreground">14 Maple Drive</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 px-2.5 py-2">
                  <p className="text-[0.45rem] text-muted-foreground/60">Category</p>
                  <p className="text-[0.55rem] font-medium text-foreground">Maintenance</p>
                </div>
              </div>

              {/* Submit */}
              <motion.div
                animate={showSubmitted && !showSuccess ? { scale: [1, 0.97, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`rounded-xl py-2.5 text-center transition-colors duration-300 ${
                  showSubmitted ? "bg-chart-1" : "bg-chart-5"
                }`}
              >
                <span className="text-[0.65rem] font-semibold text-white">
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
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-background px-3 py-1.5 shadow-lg shadow-black/[0.08] ring-1 ring-black/[0.04]"
            >
              <CheckCircle2 size={12} className="text-chart-1" />
              <span className="text-[0.6rem] font-semibold text-foreground">Ticket #247 created</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileAuditView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[0.6rem] font-semibold text-foreground">Audit Log</span>
        <div className="flex items-center gap-1 rounded-full bg-chart-1/10 px-1.5 py-0.5">
          <Shield size={8} className="text-chart-1" />
          <span className="text-[0.45rem] font-medium text-chart-1">Compliant</span>
        </div>
      </div>
      <div className="flex-1 space-y-px overflow-hidden px-2 py-1.5">
        {AUDIT_ENTRIES.map((entry, i) => {
          const Icon = entry.icon;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2"
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted/60 ${entry.iconClass}`}>
                <Icon size={11} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[0.6rem] font-semibold text-foreground">{entry.action}</span>
                <p className="truncate text-[0.5rem] text-muted-foreground">{entry.detail}</p>
              </div>
              <span className="shrink-0 font-mono text-[0.45rem] text-muted-foreground">{entry.time}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared device content renderer                                      */
/* ------------------------------------------------------------------ */

const BOTTOM_NAV_ITEMS = [
  { id: "inbox" as TabId, icon: Inbox, label: "Inbox" },
  { id: "maintenance" as TabId, icon: Wrench, label: "Jobs" },
  { id: "portal" as TabId, icon: Send, label: "Report" },
  { id: "audit" as TabId, icon: Shield, label: "Audit" },
];

function DeviceContent({
  activeTab,
  offset,
  variant,
}: {
  activeTab: TabId;
  offset: number;
  variant: "phone" | "tablet";
}) {
  const iconSize = variant === "tablet" ? 16 : 14;
  const labelClass = variant === "tablet" ? "text-[0.5rem]" : "text-[0.4rem]";

  return (
    <>
      <AnimatePresence mode="wait">
        {activeTab === "inbox" && (
          <motion.div key="m-inbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
            <MobileInboxView offset={offset} />
          </motion.div>
        )}
        {activeTab === "maintenance" && (
          <motion.div key="m-maintenance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
            <MobileMaintenanceView />
          </motion.div>
        )}
        {activeTab === "portal" && (
          <motion.div key="m-portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
            <MobilePortalView />
          </motion.div>
        )}
        {activeTab === "audit" && (
          <motion.div key="m-audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
            <MobileAuditView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom nav bar */}
      <div className="flex shrink-0 items-center justify-around border-t border-border/60 bg-muted/20 px-2 py-2">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-0.5">
            <item.icon
              size={iconSize}
              className={activeTab === item.id ? "text-chart-5" : "text-muted-foreground/50"}
            />
            <span
              className={`font-medium ${labelClass} ${
                activeTab === item.id ? "text-chart-5" : "text-muted-foreground/50"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile phone frame                                                  */
/* ------------------------------------------------------------------ */

function MobilePhoneFrame({
  activeTab,
  offset,
}: {
  activeTab: TabId;
  offset: number;
}) {
  return (
    <div className="relative mx-auto w-[240px] sm:w-[260px]">
      {/* iPhone 14 Pro outer frame */}
      <div className="overflow-hidden rounded-[3rem] border-[5px] border-chart-5/90 bg-chart-5/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]">
        {/* Status bar with Dynamic Island */}
        <div className="relative flex h-10 items-start justify-center bg-card pt-2">
          {/* Dynamic Island */}
          <div className="h-[22px] w-[72px] rounded-full bg-chart-5/90" />
          {/* Status bar icons */}
          <div className="absolute right-4 top-2.5 flex items-center gap-1">
            <div className="h-[5px] w-[14px] rounded-sm bg-muted-foreground/30" />
            <div className="h-[6px] w-[6px] rounded-full bg-muted-foreground/30" />
          </div>
          <div className="absolute left-4 top-2.5">
            <span className="text-[0.4rem] font-semibold text-muted-foreground/50">9:41</span>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex flex-col bg-card" style={{ height: "460px" }}>
          <DeviceContent activeTab={activeTab} offset={offset} variant="phone" />
        </div>

        {/* Home indicator area */}
        <div className="flex h-6 items-center justify-center bg-card">
          <div className="h-[4px] w-[80px] rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tablet (iPad) frame — landscape orientation                         */
/* ------------------------------------------------------------------ */

function TabletFrame({
  activeTab,
  offset,
}: {
  activeTab: TabId;
  offset: number;
}) {
  return (
    <div className="relative mx-auto max-w-[700px]">
      {/* Tablet outer frame */}
      <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-chart-5 bg-card shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
        {/* Camera bar (landscape iPad) */}
        <div className="relative flex h-5 items-center justify-center bg-card">
          <div className="h-[6px] w-[6px] rounded-full bg-chart-5/60" />
        </div>

        {/* Screen content — landscape layout with sidebar */}
        <div className="flex" style={{ height: "380px" }}>
          {/* Tablet sidebar */}
          <div className="flex w-[52px] shrink-0 flex-col items-center border-r border-border/60 bg-muted/20 py-3">
            <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-lg bg-chart-5">
              <Inbox size={12} className="text-chart-1" />
            </div>
            {BOTTOM_NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`mb-1 flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                  activeTab === item.id ? "bg-chart-5/10" : ""
                }`}
              >
                <item.icon
                  size={15}
                  className={activeTab === item.id ? "text-chart-5" : "text-muted-foreground/40"}
                />
              </div>
            ))}
          </div>

          {/* Main content area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "inbox" && (
                <motion.div key="t-inbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
                  <TabletInboxView offset={offset} />
                </motion.div>
              )}
              {activeTab === "maintenance" && (
                <motion.div key="t-maintenance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
                  <TabletMaintenanceView />
                </motion.div>
              )}
              {activeTab === "portal" && (
                <motion.div key="t-portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
                  <MobilePortalView />
                </motion.div>
              )}
              {activeTab === "audit" && (
                <motion.div key="t-audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 flex-col overflow-hidden">
                  <TabletAuditView />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex h-4 items-center justify-center bg-card">
          <div className="h-[4px] w-[100px] rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tablet-specific content views                                       */
/* ------------------------------------------------------------------ */

function TabletInboxView({ offset }: { offset: number }) {
  const times = ["just now", "1 min", "3 min", "8 min", "14 min", "22 min"];
  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    const arrivalOffset = offset - i;
    const idx = ((arrivalOffset % MESSAGES.length) + MESSAGES.length) % MESSAGES.length;
    return { ...MESSAGES[idx], time: times[i] ?? `${20 + i * 8} min`, instanceKey: arrivalOffset };
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-foreground">Inbox</h4>
        <motion.span
          key={offset + 1}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-destructive px-1.5 py-0.5 text-[0.55rem] font-bold text-white"
        >
          {offset + 1} unread
        </motion.span>
      </div>
      <div className="mb-2.5 h-px bg-border" />
      <div className="flex-1 space-y-0.5 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((msg, i) => (
            <motion.div
              key={msg.instanceKey}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
              transition={{
                layout: { type: "spring" as const, stiffness: 500, damping: 35 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${i === 0 ? "bg-chart-1/[0.04]" : ""}`}
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="bg-chart-5/8 text-[0.5rem] font-semibold text-chart-5">{msg.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.62rem] font-semibold text-foreground">{msg.name}</span>
                  <Badge variant="outline" className={`h-3.5 border-0 px-1 text-[0.45rem] ${msg.tagClass}`}>{msg.tag}</Badge>
                  <span className="ml-auto text-[0.5rem] text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-[0.52rem] text-muted-foreground/70">{msg.property}</p>
                <p className="mt-0.5 truncate text-[0.55rem] text-muted-foreground">{msg.preview}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabletMaintenanceView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-foreground">Maintenance Requests</h4>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.55rem] text-muted-foreground">6 active</span>
      </div>
      <div className="mb-2.5 h-px bg-border" />
      {/* Column headers */}
      <div className="mb-2 grid grid-cols-[1fr_90px_70px_60px_50px] gap-2 text-[0.5rem] font-medium text-muted-foreground">
        <span>Request</span>
        <span>Tenant</span>
        <span>Status</span>
        <span>Priority</span>
        <span className="text-right">Time</span>
      </div>
      <div className="flex-1 space-y-0.5 overflow-hidden">
        {MAINTENANCE_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="grid grid-cols-[1fr_90px_70px_60px_50px] items-center gap-2 rounded-lg p-2"
          >
            <div>
              <p className="text-[0.58rem] font-semibold text-foreground">{item.title}</p>
              <p className="text-[0.48rem] text-muted-foreground">{item.property}</p>
            </div>
            <span className="truncate text-[0.5rem] text-muted-foreground">{item.tenant}</span>
            <Badge variant="outline" className={`h-4 w-fit border-0 px-1.5 text-[0.44rem] ${item.statusClass}`}>{item.status}</Badge>
            <Badge variant="outline" className={`h-4 w-fit border-0 px-1.5 text-[0.44rem] ${item.priority === "Urgent" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{item.priority}</Badge>
            <span className="text-right text-[0.48rem] text-muted-foreground">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TabletAuditView() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-foreground">Audit Log</h4>
        <div className="flex items-center gap-1 rounded-full bg-chart-1/10 px-2 py-0.5">
          <Shield size={9} className="text-chart-1" />
          <span className="text-[0.5rem] font-medium text-chart-1">Awaab&apos;s Law compliant</span>
        </div>
      </div>
      <div className="mb-2.5 h-px bg-border" />
      <div className="flex-1 space-y-0.5 overflow-hidden">
        {AUDIT_ENTRIES.map((entry, i) => {
          const Icon = entry.icon;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-lg p-2.5"
            >
              <div className={`mt-0.5 shrink-0 ${entry.iconClass}`}>
                <Icon size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[0.58rem] font-semibold text-foreground">{entry.action}</span>
                  <span className="shrink-0 font-mono text-[0.48rem] text-muted-foreground">{entry.time}</span>
                </div>
                <p className="text-[0.5rem] text-muted-foreground">{entry.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<TabId>("inbox");
  const [offset, setOffset] = useState(0);
  const [cycling, setCycling] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopCycling = useCallback(() => {
    setCycling(false);
    setProgress(0);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    if (cycleRef.current) clearTimeout(cycleRef.current);
  }, []);

  const handleTabClick = useCallback((id: TabId) => {
    stopCycling();
    setActiveTab(id);
  }, [stopCycling]);

  // Auto-cycle through tabs
  useEffect(() => {
    if (!cycling) return;

    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / TAB_CYCLE_MS, 1);
      setProgress(pct);

      if (pct < 1) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        setActiveTab((prev) => {
          const idx = TABS.findIndex((t) => t.id === prev);
          return TABS[(idx + 1) % TABS.length].id;
        });
        setProgress(0);
        start = null;
        progressRef.current = requestAnimationFrame(tick);
      }
    };

    progressRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [cycling]);

  // Inbox message rotation
  useEffect(() => {
    if (activeTab !== "inbox") return;
    const interval = setInterval(() => {
      setOffset((o) => o + 1);
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div>
      {/* Tabs — shared between all device frames */}
      <div className="relative mx-auto mb-5 max-w-[700px] lg:max-w-[880px]">
        <div className="flex gap-1 px-1 sm:px-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative z-10 flex-1 overflow-hidden rounded-lg px-2 py-2 text-[0.6rem] sm:text-[0.65rem] md:text-[0.72rem] font-medium whitespace-nowrap text-center transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-secondary-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 overflow-hidden rounded-lg bg-muted shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {cycling && activeTab === tab.id && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] bg-foreground"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- MOBILE: iPhone mockup ---- */}
      <div className="block md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring" as const, damping: 22, stiffness: 90 }}
        >
          <MobilePhoneFrame activeTab={activeTab} offset={offset} />
        </motion.div>
      </div>

      {/* ---- TABLET: iPad mockup ---- */}
      <div className="hidden md:block lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring" as const, damping: 22, stiffness: 90 }}
        >
          <TabletFrame activeTab={activeTab} offset={offset} />
        </motion.div>
      </div>

      {/* ---- DESKTOP: Browser mockup with sidebar ---- */}
      <div className="hidden lg:block">
        <div className="relative mx-auto w-full max-w-[880px]" style={{ perspective: "1200px" }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring" as const, damping: 22, stiffness: 90 }}
            style={{
              transform: "rotateX(8deg) rotateY(-6deg) rotateZ(0.5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]"
              style={{ aspectRatio: "16/10" }}
            >
              {/* Browser chrome */}
              <div className="flex shrink-0 items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
                <div className="mx-auto rounded-md bg-muted px-8 py-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeTab === "portal" ? "tenant" : "app"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="block text-[0.55rem] text-muted-foreground"
                    >
                      {activeTab === "portal" ? "tenant.tenantcomms.com" : "app.tenantcomms.com"}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-[160px] shrink-0 border-r border-border bg-muted/20 p-3">
                  <div className="mb-5 flex items-center gap-2 px-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-5">
                      <Inbox size={11} className="text-chart-1" />
                    </div>
                    <span className="text-xs font-semibold text-chart-5">TenantComms</span>
                  </div>
                  <div className="space-y-0.5">
                    {SIDEBAR_ITEMS.map((item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.68rem] transition-colors duration-200 ${
                          tabToSidebar[activeTab] === i
                            ? "bg-chart-5/8 font-medium text-chart-5"
                            : "text-muted-foreground"
                        }`}
                      >
                        {sidebarIcons[item]}
                        {item}
                        {i === 0 && (
                          <motion.span
                            key={offset}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                            className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[0.5rem] font-bold text-white"
                          >
                            {offset + 1}
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content area */}
                <AnimatePresence mode="wait">
                  {activeTab === "inbox" && (
                    <motion.div key="inbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 overflow-hidden">
                      <InboxView offset={offset} />
                    </motion.div>
                  )}
                  {activeTab === "maintenance" && (
                    <motion.div key="maintenance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 overflow-hidden">
                      <MaintenanceView />
                    </motion.div>
                  )}
                  {activeTab === "portal" && (
                    <motion.div key="portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 overflow-hidden">
                      <PortalView />
                    </motion.div>
                  )}
                  {activeTab === "audit" && (
                    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-1 overflow-hidden">
                      <AuditView />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
