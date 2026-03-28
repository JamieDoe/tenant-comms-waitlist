import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { createMetadata } from "@/lib/metadata";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";
import {
  sanityClient,
  POST_QUERY,
  POST_SLUGS_QUERY,
  urlFor,
  type SanityPostFull,
} from "@/lib/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!sanityClient) return [];
  const slugs: string[] = await sanityClient.fetch(POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: SanityPostFull | null = sanityClient
    ? await sanityClient.fetch(POST_QUERY, { slug })
    : null;
  if (!post) return createMetadata({ title: "Post Not Found — TenantComms" });

  return createMetadata({
    title: `${post.title} — TenantComms Blog`,
    description: post.excerpt || post.title,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: SanityPostFull | null = sanityClient
    ? await sanityClient.fetch(POST_QUERY, { slug })
    : null;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
        <article>
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-chart-1/10 px-2.5 py-0.5 text-xs font-medium text-chart-1"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-chart-5 sm:text-4xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            {post.author && <span className="text-border">·</span>}
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          {/* Hero image */}
          {post.mainImage && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Body */}
          {post.body && (
            <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-chart-5 prose-a:text-chart-1 prose-a:no-underline hover:prose-a:underline">
              <PortableText value={post.body} />
            </div>
          )}
        </article>

        <Link
          href="/blog"
          className="mt-10 inline-block text-sm text-chart-1 transition-colors hover:text-chart-2"
        >
          &larr; Back to blog
        </Link>
      </main>
      <Footer />
    </>
  );
}
