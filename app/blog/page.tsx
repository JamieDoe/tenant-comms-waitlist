import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { EmailForm } from "@/components/shared/email-form";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";
import { sanityClient, POSTS_QUERY, urlFor, type SanityPost } from "@/lib/sanity";

export const metadata = createMetadata({
  title: "Blog — TenantComms | Awaab's Law Guides & Letting Agent Resources",
  description:
    "Guides on Awaab's Law compliance, tenant communication best practices, and TenantComms product updates for UK letting agents.",
  path: "/blog",
});

export const revalidate = 60;

export default async function BlogPage() {
  const posts: SanityPost[] = sanityClient
    ? await sanityClient.fetch(POSTS_QUERY)
    : [];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[960px] px-6 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-chart-5">
            Blog
          </h1>
          <p className="mx-auto max-w-[480px] text-base leading-relaxed text-muted-foreground">
            Guides on Awaab&apos;s Law compliance, tenant communication best
            practices, and product updates.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 transition-all duration-300 hover:border-chart-1/20 hover:shadow-lg hover:shadow-chart-1/[0.04]"
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
                  {post.categories && post.categories.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {post.categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-chart-1/10 px-2 py-0.5 text-[0.65rem] font-medium text-chart-1"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="mb-2 font-serif text-lg font-semibold leading-snug text-chart-5 group-hover:text-chart-1 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mb-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <time className="text-xs text-muted-foreground/60">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
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
