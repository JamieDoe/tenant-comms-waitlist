import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";

export const metadata = createMetadata({
  title: "Privacy Policy — TenantComms",
  description:
    "TenantComms privacy policy. How we collect, use, and protect your data in compliance with UK GDPR and the Data Protection Act 2018.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
        <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-chart-5">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last updated: March 2026
        </p>
        <Separator className="mb-8" />

        <div className="space-y-8 text-[0.93rem] leading-relaxed text-muted-foreground">
          <p>
            This privacy policy will be updated before launch. TenantComms is
            committed to protecting your data in compliance with UK GDPR and the
            Data Protection Act 2018.
          </p>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              What we collect
            </h2>
            <p>
              When you join our waitlist, we collect your email address and the
              date you signed up. We do not collect any other personal
              information at this stage.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              How we use it
            </h2>
            <p>
              Your email address is used solely to notify you about TenantComms
              launch updates and early access opportunities. We will never sell
              your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              Your rights
            </h2>
            <p>
              Under UK GDPR, you have the right to access, rectify, or delete
              your personal data at any time. You can unsubscribe from our
              communications at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              Contact
            </h2>
            <p>
              For any privacy-related enquiries, please contact us at{" "}
              <span className="text-foreground">privacy@tenantcomms.com</span>.
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
