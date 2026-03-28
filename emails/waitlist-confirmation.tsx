import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WaitlistConfirmationEmailProps {
  email?: string;
  source?: string;
}

export default function WaitlistConfirmationEmail({
  email = "agent@example.com",
}: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}</style>
      </Head>
      <Preview>You&apos;re on the TenantComms early access list</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={headerSection}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: "0 auto" }}>
              <tr>
                <td style={logoIcon}>
                  <Text style={logoIconText}>💬</Text>
                </td>
                <td>
                  <Text style={logoText}>TenantComms</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Main content card */}
          <Section style={contentCard}>
            <Text style={badge}>Early Access</Text>

            <Heading style={heading}>You&apos;re on the list</Heading>

            <Text style={subtitle}>
              Thanks for signing up for early access to TenantComms. We&apos;re
              building the all-in-one communication and maintenance platform for
              UK letting agents.
            </Text>

            <Hr style={divider} />

            <Heading as="h3" style={subheading}>
              What happens next?
            </Heading>

            <table cellPadding="0" cellSpacing="0" width="100%">
              <tr>
                <td style={stepRow}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td width="28" style={stepNumberCell}>
                        <div style={stepCircle}>1</div>
                      </td>
                      <td style={stepText}>
                        We&apos;ll keep you updated as we build — you&apos;ll
                        hear from us before anyone else.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={stepRow}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td width="28" style={stepNumberCell}>
                        <div style={stepCircle}>2</div>
                      </td>
                      <td style={stepText}>
                        Early access members get priority onboarding and direct
                        input on the product roadmap.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={stepRow}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td width="28" style={stepNumberCell}>
                        <div style={stepCircle}>3</div>
                      </td>
                      <td style={stepText}>
                        Your launch pricing is locked in for life — no price
                        increases, ever.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <Hr style={divider} />

            {/* Account info */}
            <Section style={detailsBox}>
              <Text style={detailLabel}>Registered email</Text>
              <Text style={detailValue}>{email}</Text>
            </Section>

            {/* CTA */}
            <Section style={buttonSection}>
              <Link href="https://tenantcomms.com/blog" style={button}>
                Read our blog →
              </Link>
            </Section>

            <Text style={ctaSubtext}>
              Catch up on Awaab&apos;s Law compliance guides and letting agent
              best practices while you wait.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              TenantComms · Unified tenant communication for UK letting agents
            </Text>
            <Text style={footerLinks}>
              <Link href="https://tenantcomms.com" style={footerLink}>
                Website
              </Link>
              {"  ·  "}
              <Link href="https://tenantcomms.com/blog" style={footerLink}>
                Blog
              </Link>
              {"  ·  "}
              <Link href="https://tenantcomms.com/privacy" style={footerLink}>
                Privacy
              </Link>
            </Text>
            <Text style={footerMuted}>
              You received this email because {email} signed up for the
              TenantComms waitlist. If this wasn&apos;t you, you can safely
              ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ------------------------------------------------------------------ */
/* Styles — matching TenantComms app palette                          */
/* ------------------------------------------------------------------ */

const colors = {
  primary: "#1c1c1c",
  secondary: "#636363",
  muted: "#8a8a8a",
  light: "#d4d4d4",
  border: "#e8e8e8",
  bg: "#f8f8f8",
  white: "#ffffff",
};

const main = {
  backgroundColor: colors.bg,
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "48px 16px",
  maxWidth: "520px",
};

const headerSection = {
  textAlign: "center" as const,
  padding: "0 0 32px",
};

const logoIcon = {
  width: "36px",
  height: "36px",
  backgroundColor: colors.primary,
  borderRadius: "10px",
  textAlign: "center" as const,
  verticalAlign: "middle" as const,
};

const logoIconText = {
  fontSize: "16px",
  margin: "0",
  lineHeight: "36px",
};

const logoText = {
  fontSize: "20px",
  fontWeight: "700" as const,
  color: colors.primary,
  margin: "0",
  paddingLeft: "10px",
  verticalAlign: "middle" as const,
  letterSpacing: "-0.3px",
};

const contentCard = {
  backgroundColor: colors.white,
  borderRadius: "16px",
  padding: "40px 32px",
  border: `1px solid ${colors.border}`,
};

const badge = {
  display: "inline-block" as const,
  fontSize: "11px",
  fontWeight: "600" as const,
  color: colors.primary,
  backgroundColor: "#f0f0f0",
  borderRadius: "100px",
  padding: "4px 12px",
  margin: "0 0 16px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700" as const,
  color: colors.primary,
  margin: "0 0 12px",
  lineHeight: "1.3",
  letterSpacing: "-0.3px",
};

const subtitle = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: colors.secondary,
  margin: "0 0 4px",
};

const divider = {
  borderColor: colors.border,
  margin: "28px 0",
};

const subheading = {
  fontSize: "16px",
  fontWeight: "600" as const,
  color: colors.primary,
  margin: "0 0 16px",
};

const stepRow = {
  padding: "0 0 14px",
};

const stepNumberCell = {
  width: "28px",
  verticalAlign: "top" as const,
  padding: "0",
};

const stepCircle = {
  width: "28px",
  height: "28px",
  backgroundColor: colors.primary,
  borderRadius: "50%",
  textAlign: "center" as const,
  color: colors.white,
  fontSize: "12px",
  fontWeight: "700" as const,
  lineHeight: "28px",
  MozBorderRadius: "50%",
  WebkitBorderRadius: "50%",
};

const stepText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: colors.secondary,
  paddingLeft: "12px",
  verticalAlign: "top" as const,
  margin: "0",
};

const detailsBox = {
  backgroundColor: colors.bg,
  borderRadius: "12px",
  padding: "16px 20px",
  border: `1px solid ${colors.border}`,
};

const detailLabel = {
  fontSize: "11px",
  fontWeight: "600" as const,
  color: colors.muted,
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 2px",
};

const detailValue = {
  fontSize: "15px",
  color: colors.primary,
  margin: "0",
  fontWeight: "500" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  padding: "24px 0 0",
};

const button = {
  display: "inline-block" as const,
  backgroundColor: colors.primary,
  color: colors.white,
  fontSize: "14px",
  fontWeight: "600" as const,
  padding: "12px 28px",
  borderRadius: "10px",
  textDecoration: "none",
  letterSpacing: "-0.1px",
};

const ctaSubtext = {
  fontSize: "12px",
  color: colors.muted,
  textAlign: "center" as const,
  margin: "12px 0 0",
};

const footerSection = {
  textAlign: "center" as const,
  padding: "32px 0 0",
};

const footerText = {
  fontSize: "12px",
  color: colors.muted,
  margin: "0 0 8px",
};

const footerLinks = {
  fontSize: "12px",
  margin: "0 0 16px",
};

const footerLink = {
  color: colors.secondary,
  textDecoration: "underline",
};

const footerMuted = {
  fontSize: "11px",
  color: colors.light,
  margin: "0",
  lineHeight: "1.5",
};
