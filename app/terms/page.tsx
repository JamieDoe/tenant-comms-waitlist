import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/shared/nav";
import { Footer } from "@/components/landing/footer";

export const metadata = createMetadata({
  title: "Terms of Service — TenantComms",
  description:
    "TenantComms terms of service. The terms governing use of the TenantComms website, waitlist, and blog.",
  path: "/terms",
  absoluteTitle: true,
});

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto max-w-[720px] flex-1 px-6 py-16 sm:py-24">
        <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-chart-5">
          Terms of Service
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last updated: March 2026
        </p>
        <Separator className="mb-8" />

        <div className="space-y-8 text-[0.93rem] leading-relaxed text-muted-foreground">
          <p>
            Please read these terms of service (&ldquo;Terms&rdquo;) carefully
            before using tenantcomms.com (the &ldquo;Website&rdquo;) operated by
            TenantComms (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;). By accessing or using the Website, you agree to
            be bound by these Terms. If you do not agree with any part of these
            Terms, please do not use the Website.
          </p>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              1. Service Description
            </h2>
            <p className="mb-3">
              TenantComms is a communication platform for UK letting agents,
              currently in development with a planned launch in Summer 2026. The
              Website currently provides:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium text-foreground">Waitlist</span>{" "}
                &mdash; you may register your email address to receive updates
                about the TenantComms launch and early access opportunities.
              </li>
              <li>
                <span className="font-medium text-foreground">Blog</span>{" "}
                &mdash; articles and content related to the UK lettings industry,
                property management, and TenantComms updates.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Informational content
                </span>{" "}
                &mdash; descriptions of the planned TenantComms platform,
                features, and pricing.
              </li>
            </ul>
            <p className="mt-3">
              Joining the waitlist does not guarantee access to the TenantComms
              platform. Features, pricing, and availability described on the
              Website are subject to change before and after launch.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              2. Acceptable Use
            </h2>
            <p className="mb-3">
              You agree to use the Website only for lawful purposes and in a
              manner that does not infringe upon the rights of others. You must
              not:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Use the Website in any way that breaches any applicable local,
                national, or international law or regulation.
              </li>
              <li>
                Submit false, misleading, or fraudulent information, including
                when joining the waitlist.
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Website,
                its servers, or any connected systems.
              </li>
              <li>
                Introduce any malicious software, viruses, or harmful code to
                the Website.
              </li>
              <li>
                Use automated tools, bots, or scripts to access, scrape, or
                interact with the Website without our prior written consent.
              </li>
              <li>
                Impersonate any person or entity, or misrepresent your
                affiliation with any person or entity.
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to restrict or terminate access to the Website
              for any user who violates these Terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              3. Intellectual Property
            </h2>
            <p>
              All content on the Website, including but not limited to text,
              graphics, logos, images, software, and code, is the property of
              TenantComms or its licensors and is protected by United Kingdom and
              international copyright, trademark, and other intellectual property
              laws. You may not reproduce, distribute, modify, create derivative
              works from, publicly display, or otherwise exploit any content from
              the Website without our prior written permission.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              4. Blog Content
            </h2>
            <p>
              The blog content published on the Website is provided for general
              informational purposes only. While we strive to ensure accuracy, we
              make no representations or warranties about the completeness,
              reliability, or suitability of any blog content. Blog articles do
              not constitute professional advice, and you should not rely on them
              as a substitute for professional guidance in property management,
              legal, or business matters.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              5. Third-Party Links
            </h2>
            <p>
              The Website may contain links to third-party websites or services
              that are not owned or controlled by TenantComms. We have no control
              over, and assume no responsibility for, the content, privacy
              policies, or practices of any third-party websites or services. You
              access third-party links at your own risk.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              6. Disclaimer of Warranties
            </h2>
            <p>
              The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis without any warranties of any kind, whether
              express or implied, including but not limited to implied warranties
              of merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant that the Website will be
              uninterrupted, error-free, or free of viruses or other harmful
              components.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              7. Limitation of Liability
            </h2>
            <p className="mb-3">
              To the fullest extent permitted by law, TenantComms shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits, revenue, data, or
              goodwill, arising out of or in connection with your use of the
              Website.
            </p>
            <p>
              Nothing in these Terms shall limit or exclude our liability for
              death or personal injury caused by our negligence, fraud or
              fraudulent misrepresentation, or any other liability that cannot be
              limited or excluded by English law.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              8. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless TenantComms, its
              directors, employees, and agents from and against any claims,
              liabilities, damages, losses, or expenses (including reasonable
              legal fees) arising out of or in connection with your use of the
              Website or your breach of these Terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              9. Privacy
            </h2>
            <p>
              Your use of the Website is also governed by our{" "}
              <Link
                href="/privacy"
                className="text-chart-1 transition-colors hover:text-chart-2"
              >
                Privacy Policy
              </Link>
              , which explains how we collect, use, and protect your personal
              data. By using the Website, you acknowledge that you have read and
              understood our Privacy Policy.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              10. Changes to These Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms at any time.
              Any changes will be posted on this page with an updated &ldquo;Last
              updated&rdquo; date. Your continued use of the Website after any
              changes constitutes your acceptance of the revised Terms. We
              encourage you to review this page periodically to stay informed.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              11. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be invalid or
              unenforceable by a court of competent jurisdiction, the remaining
              provisions shall continue in full force and effect.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              12. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of England and Wales. Any disputes arising out of or in
              connection with these Terms shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              13. Contact Us
            </h2>
            <p>
              For any questions or concerns about these Terms, please contact us:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                General enquiries:{" "}
                <span className="text-foreground">hello@tenantcomms.com</span>
              </li>
              <li>
                Privacy enquiries:{" "}
                <span className="text-foreground">privacy@tenantcomms.com</span>
              </li>
            </ul>
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
    </div>
  );
}
