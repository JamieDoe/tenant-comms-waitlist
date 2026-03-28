"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitToWaitlist } from "@/lib/waitlist";

interface EmailFormProps {
  source?: string;
  buttonText?: string;
  dark?: boolean;
}

export function EmailForm({
  source = "hero",
  buttonText = "Get Early Access",
  dark = false,
}: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await submitToWaitlist({
        email,
        source,
        submittedAt: new Date().toISOString(),
      });

      if (result.success) {
        setSubmitted(true);
        setEmail("");
        toast.success(result.message);

        // Fire Pirsch custom event
        if (typeof window !== "undefined" && "pirsch" in window) {
          (window as unknown as { pirsch: (event: string, options: { meta: Record<string, string> }) => void }).pirsch(
            "Waitlist Signup",
            { meta: { source } }
          );
        }
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-3 rounded-xl border px-5 py-4 ${
          dark
            ? "border-chart-1/20 bg-chart-1/10"
            : "border-primary/20 bg-primary/5"
        }`}
      >
        <CheckCircle2 size={22} className="shrink-0 text-chart-1" />
        <p className={`text-sm ${dark ? "text-chart-1" : "text-primary"}`}>
          You&apos;re on the list. We&apos;ll be in touch before launch.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@agency.co.uk"
          className={`h-14 min-w-0 flex-1 px-5 text-base ${
            dark
              ? "border-white/10 bg-white/5 text-white placeholder:text-white/40"
              : ""
          }`}
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="h-14 shrink-0 gap-2 bg-chart-5 px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-chart-5/90 active:translate-y-0"
          size="lg"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              {buttonText}
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </form>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
