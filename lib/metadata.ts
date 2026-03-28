import type { Metadata } from "next";
import { SITE_CONFIG, SEO_DEFAULTS } from "./constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImagePath?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  ogImagePath,
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const fullTitle = title ?? SEO_DEFAULTS.title;
  const fullDescription = description ?? SEO_DEFAULTS.description;
  const canonicalUrl = `${SITE_CONFIG.domain}${path}`;
  const ogImage = ogImagePath ?? SEO_DEFAULTS.ogImagePath;

  return {
    metadataBase: new URL(SITE_CONFIG.domain),
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SEO_DEFAULTS.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
    },
  };
}
