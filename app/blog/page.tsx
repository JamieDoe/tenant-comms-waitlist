import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { EmailForm } from "@/components/shared/email-form";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";
import { AnimateIn, AnimateInView } from "@/components/blog/animate-in";
import { sanityClient, POSTS_QUERY, urlFor, type SanityPost } from "@/lib/sanity";

export const metadata = createMetadata({
  title: "Blog — TenantComms | Awaab's Law Guides & Letting Agent Resources",
  description:
    "Guides on Awaab's Law compliance, tenant communication best practices, and TenantComms product updates for UK letting agents.",
  path: "/blog",
  absoluteTitle: true,
});

export const revalidate = 60;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts: SanityPost[] = sanityClient
    ? await sanityClient.fetch(POSTS_QUERY)
    : [];

  const [featured, ...rest] = posts;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[1100px] px-6 py-16 sm:py-24">
        {posts.length > 0 ? (
          <>
            {/* Featured post — hero card */}
            {featured && (
              <AnimateIn delay={0.1} y={32}>
                <Link
                  href={`/blog/${featured.slug.current}`}
                  className="group mb-16 grid items-center gap-0 overflow-hidden rounded-2xl border border-border/50 bg-muted/20 transition-all duration-300 hover:border-chart-3/30 hover:shadow-xl hover:shadow-chart-3/[0.08] sm:grid-cols-2"
                >
                  {featured.mainImage && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto sm:h-full sm:min-h-[420px]">
                      <Image
                        src={urlFor(featured.mainImage).width(800).height(600).url()}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    </div>
                  )}
                  <div className="p-8 sm:p-10 lg:p-12">
                    <div className="mb-4 flex items-center gap-3">
                      {featured.categories && featured.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {featured.categories.map((cat) => (
                            <span
                              key={cat}
                              className="rounded-full border border-chart-1/30 bg-chart-1/20 px-2.5 py-0.5 text-xs font-semibold text-chart-5"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground/60">
                        {formatDate(featured.publishedAt)}
                      </span>
                    </div>
                    <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-chart-5 transition-colors group-hover:text-chart-3 sm:text-3xl lg:text-4xl">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:text-base">
                        {featured.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-chart-5 transition-colors group-hover:text-chart-3">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimateIn>
            )}

            {/* Recent articles grid */}
            {rest.length > 0 && (
              <section>
                <AnimateInView className="mb-8">
                  <h2 className="font-serif text-xl font-bold text-chart-5">
                    Recent Articles
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Stay informed with our latest insights
                  </p>
                </AnimateInView>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <AnimateInView key={post._id} delay={i * 0.1} y={28}>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 transition-all duration-300 hover:border-chart-3/30 hover:shadow-lg hover:shadow-chart-3/[0.06]"
                      >
                        {post.mainImage && (
                          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                            <Image
                              src={urlFor(post.mainImage).width(600).height(340).url()}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          <div className="mb-3 flex items-center gap-2 text-xs">
                            {post.categories && post.categories.length > 0 && (
                              <span className="font-medium text-chart-1">
                                {post.categories[0]}
                              </span>
                            )}
                            <span className="text-muted-foreground/50">&middot;</span>
                            <time className="text-muted-foreground/60">
                              {formatDate(post.publishedAt)}
                            </time>
                          </div>
                          <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-chart-5 transition-colors group-hover:text-chart-3">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                              {post.excerpt}
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
              </section>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="mb-10 text-muted-foreground">
              No posts yet — sign up to be notified when we publish.
            </p>
            <div className="mx-auto max-w-[420px]">
              <EmailForm source="blog" buttonText="Notify Me" />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
