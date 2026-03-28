import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { PirschAnalytics } from "@/components/shared/pirsch-analytics";
import { SITE_CONFIG, SEO_DEFAULTS } from "@/lib/constants";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/metadata";
import Script from "next/script";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppinsHeading = Poppins({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: SEO_DEFAULTS.title,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SEO_DEFAULTS.description,
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const graphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), webSiteJsonLd()],
  };

  return (
    <html
      lang="en-GB"
      className={cn(
        "h-full antialiased",
        poppins.variable,
        poppinsHeading.variable,
        firaCode.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }}
        />
        <Script
          src="https://cdn.pirsch.io/pirsch.js"
          data-code={process.env.NEXT_PUBLIC_PIRSCH_CODE}
          strategy="afterInteractive"
        />
        {children}
        <Toaster richColors position="top-center" />
        <CookieConsent />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
