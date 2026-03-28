import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";

export const metadata = createMetadata({
  title: "Terms of Service — TenantComms",
  description:
    "TenantComms terms of service. The terms governing use of the TenantComms platform and waitlist.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
        <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-chart-5">
          Terms of Service
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last updated: March 2026
        </p>
        <Separator className="mb-8" />

        <div className="space-y-8 text-[0.93rem] leading-relaxed text-muted-foreground">
          <p>
            These terms of service will be updated before launch. By joining the
            TenantComms waitlist, you agree to the following preliminary terms.
          </p>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              Waitlist
            </h2>
            <p>
              Joining the waitlist does not guarantee access to the TenantComms
              platform. We will contact you via email when early access becomes
              available.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              Use of the site
            </h2>
            <p>
              This website is provided for informational purposes. The features
              and pricing described are subject to change before launch.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              Intellectual property
            </h2>
            <p>
              All content on this site, including text, graphics, and code, is
              the property of TenantComms and is protected by UK copyright law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              Contact
            </h2>
            <p>
              For any enquiries regarding these terms, please contact us at{" "}
              <span className="text-foreground">legal@tenantcomms.com</span>.
            </p>
          </section>
        </div>

        <Separator className="my-8" />
        <Link
          href="/"
          className="text-sm text-chart-1 transition-colors hover:text-chart-2"
        >
          &larr; Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
