"use client";

import Script from "next/script";

export function PirschAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      defer
      src="https://api.pirsch.io/pa.js"
      id="pirschjs"
      data-code={process.env.NEXT_PUBLIC_PIRSCH_CODE}
      strategy="afterInteractive"
    />
  );
}
