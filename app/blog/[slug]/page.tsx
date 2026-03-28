import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";

// No posts exist yet — all slugs return 404
const posts: Record<string, { title: string; content: string }> = {};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return createMetadata({ title: "Post Not Found — TenantComms" });

  return createMetadata({
    title: `${post.title} — TenantComms Blog`,
    description: post.content.slice(0, 160),
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
        <article>
          <h1 className="mb-6 font-serif text-3xl font-bold tracking-tight text-chart-5">
            {post.title}
          </h1>
          <div className="prose prose-neutral max-w-none text-muted-foreground">
            <p>{post.content}</p>
          </div>
        </article>
        <Link
          href="/blog"
          className="mt-8 inline-block text-sm text-chart-1 transition-colors hover:text-chart-2"
        >
          &larr; Back to blog
        </Link>
      </main>
      <Footer />
    </>
  );
}
