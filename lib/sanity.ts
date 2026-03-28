import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const isSanityConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = isSanityConfigured
  ? imageUrlBuilder(sanityClient!)
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity not configured");
  return builder.image(source);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

/* ------------------------------------------------------------------ */
/* Queries                                                             */
/* ------------------------------------------------------------------ */

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "categories": categories[]->title
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  mainImage,
  "categories": categories[]->title,
  "author": author->{name, image}
}`;

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImageSource;
  categories?: string[];
}

export interface SanityPostFull extends SanityPost {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  author?: {
    name: string;
    image?: SanityImageSource;
  };
}
