import type { Metadata } from "next";
import { SITE_CONFIG, SEO_DEFAULTS } from "./constants";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImagePath?: string;
  noIndex?: boolean;
  /** Override OG type (default: "website") */
  ogType?: "website" | "article";
  /** Article published date (ISO string) */
  publishedTime?: string;
  /** Article author name */
  author?: string;
  /** If true, title bypasses the layout template (use for homepage) */
  absoluteTitle?: boolean;
}

/* ------------------------------------------------------------------ */
/* Metadata helper                                                     */
/* ------------------------------------------------------------------ */

export function createMetadata({
  title,
  description,
  path = "",
  ogImagePath,
  noIndex = false,
  ogType = "website",
  publishedTime,
  author,
  absoluteTitle = false,
}: PageMetadataOptions = {}): Metadata {
  const fullTitle = title ?? SEO_DEFAULTS.title;
  const fullDescription = description ?? SEO_DEFAULTS.description;
  const canonicalUrl = `${SITE_CONFIG.domain}${path}`;
  const ogImage = ogImagePath ?? SEO_DEFAULTS.ogImagePath;

  return {
    metadataBase: new URL(SITE_CONFIG.domain),
    title: absoluteTitle ? { absolute: fullTitle } : fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SEO_DEFAULTS.locale,
      type: ogType,
      ...(publishedTime && ogType === "article"
        ? { publishedTime, authors: author ? [author] : undefined }
        : {}),
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

/* ------------------------------------------------------------------ */
/* JSON-LD structured data helpers                                     */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.domain}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    description: SITE_CONFIG.tagline,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.domain}/opengraph-image.png`,
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.domain}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    description: SEO_DEFAULTS.description,
    publisher: { "@id": `${SITE_CONFIG.domain}/#organization` },
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  publishedAt,
  authorName,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  authorName?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@id": `${SITE_CONFIG.domain}/#organization` },
    publisher: { "@id": `${SITE_CONFIG.domain}/#organization` },
    ...(imageUrl
      ? { image: { "@type": "ImageObject", url: imageUrl } }
      : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
