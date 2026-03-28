import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { createMetadata, articleJsonLd } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/constants";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ArrowRight } from "lucide-react";
import { AnimateIn, AnimateInView } from "@/components/blog/animate-in";
import {
  sanityClient,
  POST_QUERY,
  POST_SLUGS_QUERY,
  RECENT_POSTS_QUERY,
  urlFor,
  type SanityPost,
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

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return createMetadata({
    title: `${post.title} — TenantComms Blog`,
    description: post.excerpt || post.title,
    path: `/blog/${slug}`,
    ogType: "article",
    publishedTime: post.publishedAt,
    author: post.author?.name,
    ogImagePath: imageUrl,
    absoluteTitle: true,
  });
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractHeadings(body: any[]): TocItem[] {
  if (!body) return [];
  return body
    .filter((block) => /^h[1-4]$/.test(block.style))
    .map((block) => {
      const text = block.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.map((c: any) => c.text)
        .join("") || "";
      const level = parseInt(block.style.replace("h", ""), 10);
      return { id: slugify(text), text, level };
    });
}

// Custom PortableText components that add IDs to headings
const portableTextComponents = {
  block: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ({ children, value }: any) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return <h1 id={slugify(text)}>{children}</h1>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children, value }: any) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return <h2 id={slugify(text)}>{children}</h2>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: ({ children, value }: any) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return <h3 id={slugify(text)}>{children}</h3>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h4: ({ children, value }: any) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return <h4 id={slugify(text)}>{children}</h4>;
    },
  },
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

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

  const headings = extractHeadings(post.body ?? []);

  const recentPosts: SanityPost[] = sanityClient
    ? await sanityClient.fetch(RECENT_POSTS_QUERY, { slug })
    : [];

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.excerpt || post.title,
    url: `${SITE_CONFIG.domain}/blog/${slug}`,
    publishedAt: post.publishedAt,
    authorName: post.author?.name,
    imageUrl: postImageUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="px-6 py-16 sm:py-24">
        {/* Back to blog */}
        <AnimateIn className="mx-auto mb-8 max-w-[960px]" y={12}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span>&larr;</span> Back to all blogs
          </Link>
        </AnimateIn>

        <article>
          {/* Header — centred, narrow */}
          <AnimateIn delay={0.05}>
            <header className="mx-auto max-w-[720px] text-center">
              {post.categories && post.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-chart-1/30 bg-chart-1/20 px-2.5 py-0.5 text-xs font-semibold text-chart-5"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mb-5 font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mx-auto mb-8 max-w-[600px] text-lg leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </header>
          </AnimateIn>

          {/* Hero image — wider */}
          {post.mainImage && (
            <AnimateIn delay={0.15} y={32}>
              <div className="relative mx-auto mb-8 max-w-[960px] aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(675).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimateIn>
          )}

          {/* Author & date bar */}
          <AnimateIn delay={0.25} y={16}>
            <div className="mx-auto mb-12 flex max-w-[960px] items-center justify-between border-b border-border pb-6">
              <div className="flex items-center gap-3">
                {post.author?.image && (
                  <Image
                    src={urlFor(post.author.image).width(44).height(44).url()}
                    alt={post.author.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                )}
                <div>
                  {post.author && (
                    <p className="text-sm font-semibold text-foreground">
                      {post.author.name}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Body with ToC sidebar */}
          <AnimateIn delay={0.3} className="mx-auto max-w-[960px]">
            <div className="relative lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
              {/* Sidebar — Table of Contents */}
              {headings.length > 0 && (
                <aside className="hidden lg:block">
                  <TableOfContents headings={headings} />
                </aside>
              )}

              {/* Content */}
              <div className={headings.length === 0 ? "mx-auto max-w-[720px] lg:col-span-2" : ""}>
                {post.body && (
                  <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-foreground prose-a:font-medium prose-a:text-chart-5 prose-a:underline prose-a:decoration-chart-5/30 prose-a:underline-offset-2 hover:prose-a:decoration-chart-5 prose-img:rounded-xl prose-p:leading-relaxed">
                    <PortableText
                      value={post.body}
                      components={portableTextComponents}
                    />
                  </div>
                )}

                {/* Back link */}
                <div className="mt-12 border-t border-border pt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <span>&larr;</span> Back to all blogs
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </article>
      </main>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="border-t border-border bg-muted/30 px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-[1100px]">
            <AnimateInView className="mb-8">
              <h2 className="font-serif text-xl font-bold text-chart-5">
                Recent Articles
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Stay informed with our latest insights
              </p>
            </AnimateInView>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((rp, i) => (
                <AnimateInView key={rp._id} delay={i * 0.1} y={28}>
                  <Link
                    href={`/blog/${rp.slug.current}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-background transition-all duration-300 hover:border-chart-3/30 hover:shadow-lg hover:shadow-chart-3/[0.06]"
                  >
                    {rp.mainImage && (
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                        <Image
                          src={urlFor(rp.mainImage).width(600).height(340).url()}
                          alt={rp.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center gap-2 text-xs">
                        {rp.categories && rp.categories.length > 0 && (
                          <span className="font-medium text-chart-3">
                            {rp.categories[0]}
                          </span>
                        )}
                        <span className="text-muted-foreground/50">&middot;</span>
                        <time className="text-muted-foreground/60">
                          {new Date(rp.publishedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-chart-5 transition-colors group-hover:text-chart-3">
                        {rp.title}
                      </h3>
                      {rp.excerpt && (
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {rp.excerpt}
                        </p>
                      )}
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-chart-5 transition-colors group-hover:text-chart-3">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
