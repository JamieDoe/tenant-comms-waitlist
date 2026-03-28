"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "cookie-consent";

export type ConsentStatus = "accepted" | "rejected" | null;

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsentStatus()) {
      setVisible(true);
    }
  }, []);

  function handleConsent(status: "accepted" | "rejected") {
    localStorage.setItem(CONSENT_KEY, status);
    setVisible(false);
    // Dispatch a custom event so PirschAnalytics can react immediately
    window.dispatchEvent(new Event("cookie-consent-change"));
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 sm:p-6"
        >
          <div className="mx-auto flex max-w-[1120px] flex-col gap-4 rounded-xl border border-border/60 bg-background/95 p-5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chart-5/10">
                <Cookie size={18} className="text-chart-5" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We use privacy-friendly analytics to improve your
                experience. No tracking cookies are used.{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 transition-colors hover:text-chart-5"
                >
                  Privacy policy
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2.5">
              <Button
                variant="outline"
                size="default"
                onClick={() => handleConsent("rejected")}
                className="rounded-lg px-4 min-h-[44px]"
              >
                Reject
              </Button>
              <Button
                size="default"
                onClick={() => handleConsent("accepted")}
                className="rounded-lg bg-chart-5 px-4 min-h-[44px] font-semibold text-white hover:bg-chart-5/90"
              >
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
