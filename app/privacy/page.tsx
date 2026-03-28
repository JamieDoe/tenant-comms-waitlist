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
  absoluteTitle: true,
});

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto max-w-[720px] flex-1 px-6 py-16 sm:py-24">
        <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-chart-5">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last updated: March 2026
        </p>
        <Separator className="mb-8" />

        <div className="space-y-8 text-[0.93rem] leading-relaxed text-muted-foreground">
          <p>
            TenantComms (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;) is committed to protecting your personal data.
            This privacy policy explains how we collect, use, store, and protect
            your information when you visit tenantcomms.com (the
            &ldquo;Website&rdquo;) in accordance with the UK General Data
            Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              1. Data Controller
            </h2>
            <p>
              TenantComms is the data controller responsible for your personal
              data. If you have any questions about this privacy policy or our
              data practices, you can contact us at:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                Email:{" "}
                <span className="text-foreground">privacy@tenantcomms.com</span>
              </li>
              <li>
                Website:{" "}
                <span className="text-foreground">tenantcomms.com</span>
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              2. What Data We Collect
            </h2>
            <p className="mb-3">
              We collect a minimal amount of data necessary to operate the
              Website and provide our services. The data we collect falls into
              two categories:
            </p>
            <h3 className="mb-2 font-serif text-base font-semibold text-chart-5">
              a) Information you provide directly
            </h3>
            <ul className="mb-4 list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium text-foreground">
                  Email address
                </span>{" "}
                &mdash; collected when you join our waitlist.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Date and time of sign-up
                </span>{" "}
                &mdash; recorded automatically when you submit the waitlist
                form.
              </li>
            </ul>
            <h3 className="mb-2 font-serif text-base font-semibold text-chart-5">
              b) Information collected automatically
            </h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium text-foreground">
                  Analytics data
                </span>{" "}
                &mdash; we use Pirsch Analytics, a privacy-focused, cookieless
                analytics service based in Germany. Pirsch collects anonymised
                usage data including page views, referrer information, browser
                type, operating system, screen resolution, country, and
                language. This data cannot be used to identify you personally.
                No cookies are set by Pirsch, and no personal data is stored.
              </li>
            </ul>
            <p className="mt-3">
              We do not collect any special category data (such as health,
              biometric, or genetic data).
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              3. Legal Basis for Processing
            </h2>
            <p className="mb-3">
              Under UK GDPR, we must have a valid legal basis for processing
              your personal data. We rely on the following:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-foreground">Consent</span>{" "}
                (Article 6(1)(a)) &mdash; when you voluntarily submit your email
                address to join our waitlist, you consent to us processing that
                data to send you launch updates and early access information.
                You can withdraw your consent at any time by unsubscribing or
                contacting us.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Legitimate interests
                </span>{" "}
                (Article 6(1)(f)) &mdash; we use anonymised analytics data to
                understand how visitors use our Website and to improve its
                content and performance. Since Pirsch Analytics does not process
                personal data, this processing has minimal impact on your
                privacy.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              4. How We Use Your Data
            </h2>
            <p className="mb-3">We use your personal data to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Send you updates about the TenantComms launch and early access
                opportunities.
              </li>
              <li>
                Respond to any enquiries or requests you submit via email.
              </li>
              <li>
                Monitor and improve the performance and content of our Website.
              </li>
            </ul>
            <p className="mt-3">
              We will never sell, rent, or trade your personal data to third
              parties for marketing purposes.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              5. Third-Party Processors
            </h2>
            <p className="mb-3">
              We share your data only with trusted third-party service providers
              who process data on our behalf. Each processor is contractually
              bound to handle your data securely and only for the purposes we
              specify.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-foreground">
                  Resend
                </span>{" "}
                &mdash; email delivery service used to send waitlist
                confirmation and launch update emails. Resend processes your
                email address on our behalf. Resend is based in the United
                States and operates under appropriate data transfer safeguards.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Pirsch Analytics
                </span>{" "}
                &mdash; privacy-focused, cookieless website analytics. Pirsch is
                based in Germany (EU) and processes only anonymised,
                non-personal data. No cookies are set and no personal data
                leaves your browser.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Sanity
                </span>{" "}
                &mdash; headless content management system used to manage and
                deliver our blog content. Sanity does not process any personal
                data collected from our visitors.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Vercel
                </span>{" "}
                &mdash; hosting and deployment platform for our Website. Vercel
                may process standard server logs (IP addresses, request
                metadata) as part of hosting. Vercel is based in the United
                States and operates under appropriate data transfer safeguards.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              6. International Data Transfers
            </h2>
            <p>
              Some of our third-party processors (Resend, Vercel) are based
              outside of the UK. Where personal data is transferred
              internationally, we ensure that appropriate safeguards are in place
              as required by UK GDPR, including standard contractual clauses or
              adequacy decisions where applicable.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              7. Data Retention
            </h2>
            <p className="mb-3">
              We retain your personal data only for as long as necessary to
              fulfil the purposes for which it was collected:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium text-foreground">
                  Waitlist email addresses
                </span>{" "}
                &mdash; retained until the TenantComms platform launches and you
                either create an account or opt out. If you do not create an
                account, your email will be deleted within 6 months of the
                platform launch. You may request deletion at any time before
                this.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Analytics data
                </span>{" "}
                &mdash; Pirsch retains anonymised analytics data in accordance
                with its own retention policy. Since this data is anonymised, it
                does not constitute personal data.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Server logs
                </span>{" "}
                &mdash; standard server logs held by Vercel are retained for up
                to 30 days.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              8. Cookies and Local Storage
            </h2>
            <p className="mb-3">
              Our Website uses minimal cookies and browser storage:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-foreground">
                  Consent preference
                </span>{" "}
                &mdash; we store your cookie consent preference in your
                browser&apos;s localStorage. This is a strictly necessary
                function that remembers whether you have accepted or declined
                analytics. No personal data is stored.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  No tracking cookies
                </span>{" "}
                &mdash; we do not use any third-party tracking cookies,
                advertising cookies, or social media cookies. Pirsch Analytics
                is entirely cookieless.
              </li>
            </ul>
            <p className="mt-3">
              You can clear your localStorage data at any time through your
              browser settings.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              9. Your Rights Under UK GDPR
            </h2>
            <p className="mb-3">
              Under the UK General Data Protection Regulation, you have the
              following rights regarding your personal data:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-foreground">
                  Right of access
                </span>{" "}
                &mdash; you can request a copy of the personal data we hold
                about you.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Right to rectification
                </span>{" "}
                &mdash; you can request that we correct any inaccurate or
                incomplete personal data.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Right to erasure
                </span>{" "}
                &mdash; you can request that we delete your personal data where
                there is no compelling reason for us to continue processing it.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Right to restrict processing
                </span>{" "}
                &mdash; you can request that we limit the way we use your data.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Right to data portability
                </span>{" "}
                &mdash; you can request a copy of your data in a structured,
                commonly used, and machine-readable format.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Right to object
                </span>{" "}
                &mdash; you can object to the processing of your personal data
                where we rely on legitimate interests.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Right to withdraw consent
                </span>{" "}
                &mdash; where we rely on your consent to process data, you can
                withdraw that consent at any time without affecting the
                lawfulness of prior processing.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <span className="text-foreground">privacy@tenantcomms.com</span>.
              We will respond to your request within one month, as required by
              law.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              10. Data Security
            </h2>
            <p>
              We take appropriate technical and organisational measures to
              protect your personal data against unauthorised access, alteration,
              disclosure, or destruction. All data is transmitted over encrypted
              connections (HTTPS), and access to personal data is restricted to
              authorised personnel only.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              11. Children&apos;s Privacy
            </h2>
            <p>
              Our Website and services are not directed at individuals under the
              age of 18. We do not knowingly collect personal data from children.
              If you believe we have collected data from a child, please contact
              us at{" "}
              <span className="text-foreground">privacy@tenantcomms.com</span>{" "}
              and we will promptly delete it.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time to reflect
              changes in our practices or legal requirements. Any changes will be
              posted on this page with an updated &ldquo;Last updated&rdquo;
              date. If we make significant changes that affect your rights, we
              will notify you via email where possible.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              13. Complaints
            </h2>
            <p className="mb-3">
              If you are unhappy with how we have handled your personal data,
              you have the right to lodge a complaint with the UK&apos;s
              supervisory authority:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium text-foreground">
                  Information Commissioner&apos;s Office (ICO)
                </span>
              </li>
              <li>Website: ico.org.uk</li>
              <li>Telephone: 0303 123 1113</li>
            </ul>
            <p className="mt-3">
              We would appreciate the chance to address your concerns before you
              contact the ICO, so please reach out to us first at{" "}
              <span className="text-foreground">privacy@tenantcomms.com</span>.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-chart-5">
              14. Contact Us
            </h2>
            <p>
              For any questions about this privacy policy or your personal data,
              please contact us:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                Privacy enquiries:{" "}
                <span className="text-foreground">privacy@tenantcomms.com</span>
              </li>
              <li>
                General enquiries:{" "}
                <span className="text-foreground">hello@tenantcomms.com</span>
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
