import type { MetadataRoute } from "next";
import { sanityClient, POST_SLUGS_QUERY } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tenantcomms.com";

  /* Static pages */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* Dynamic blog posts */
  let blogRoutes: MetadataRoute.Sitemap = [];

  if (sanityClient) {
    try {
      const slugs: string[] = await sanityClient.fetch(POST_SLUGS_QUERY);
      blogRoutes = slugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    } catch {
      // If Sanity is unreachable, return static routes only
    }
  }

  return [...staticRoutes, ...blogRoutes];
}
