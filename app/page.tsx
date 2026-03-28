import { Nav } from "@/components/shared/nav";
import { PirschAnalytics } from "@/components/shared/pirsch-analytics";
import { Hero } from "@/components/landing/hero";
import { Problems } from "@/components/landing/problems";
import { FeaturesBento } from "@/components/landing/features-bento";
import { Benefits } from "@/components/landing/benefits";
import { Compliance } from "@/components/landing/compliance";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG, SEO_DEFAULTS } from "@/lib/constants";

export const metadata = createMetadata({
  title: SEO_DEFAULTS.title,
  description: SEO_DEFAULTS.description,
  path: "",
});

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.domain,
        description: SITE_CONFIG.tagline,
      },
      {
        "@type": "WebPage",
        name: SEO_DEFAULTS.title,
        description: SEO_DEFAULTS.description,
        url: SITE_CONFIG.domain,
      },
      {
        "@type": "SoftwareApplication",
        name: SITE_CONFIG.name,
        description: SEO_DEFAULTS.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
          description: "Free early access waitlist",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function LandingPage() {
  return (
    <>
      <JsonLd />
      <PirschAnalytics />
      <Nav />
      <main>
        <Hero />
        <Problems />
        <FeaturesBento />
        <Benefits />
        <Compliance />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
