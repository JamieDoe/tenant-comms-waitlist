import { createMetadata } from "@/lib/metadata";
import { EmailForm } from "@/components/shared/email-form";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";

export const metadata = createMetadata({
  title: "Blog — TenantComms | Awaab's Law Guides & Letting Agent Resources",
  description:
    "Guides on Awaab's Law compliance, tenant communication best practices, and TenantComms product updates for UK letting agents.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-chart-5">
            Blog — Coming Soon
          </h1>
          <p className="mx-auto mb-10 max-w-[480px] text-base leading-relaxed text-muted-foreground">
            Guides on Awaab&apos;s Law compliance, tenant communication best
            practices, and product updates.
          </p>
          <div className="mx-auto max-w-[420px]">
            <EmailForm source="blog" buttonText="Notify Me" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
