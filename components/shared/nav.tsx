"use client";

import { useEffect, useState } from "react";
import { MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-5">
            <MessageSquare size={18} className="text-chart-1" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-chart-5">
            {SITE_CONFIG.name}
          </span>
        </a>
        <Button asChild size="lg" className="hidden bg-chart-5 px-5 py-3 font-semibold text-white hover:bg-chart-5/90 sm:inline-flex">
          <a href="#signup" className="gap-1.5">
            Join the Waitlist <ChevronRight size={14} />
          </a>
        </Button>
      </div>
    </nav>
  );
}
