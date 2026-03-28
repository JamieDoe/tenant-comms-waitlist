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
  source = "hero",
}: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}</style>
      </Head>
      <Preview>New waitlist signup — {email}</Preview>
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
            <Text style={badge}>New Signup</Text>

            <Heading style={heading}>
              Someone joined the waitlist
            </Heading>

            <Text style={subtitle}>
              A new letting agent has signed up for early access to TenantComms.
            </Text>

            {/* Details */}
            <Section style={detailsBox}>
              <table cellPadding="0" cellSpacing="0" width="100%">
                <tr>
                  <td style={detailRow}>
                    <Text style={detailLabel}>Email address</Text>
                    <Text style={detailValue}>{email}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={detailDivider}>
                    <Hr style={detailHr} />
                  </td>
                </tr>
                <tr>
                  <td style={detailRow}>
                    <Text style={detailLabel}>Source</Text>
                    <Text style={detailValue}>{source}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={detailDivider}>
                    <Hr style={detailHr} />
                  </td>
                </tr>
                <tr>
                  <td style={detailRow}>
                    <Text style={detailLabel}>Signed up</Text>
                    <Text style={detailValue}>
                      {new Date().toLocaleString("en-GB", {
                        timeZone: "Europe/London",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Action button */}
            <Section style={buttonSection}>
              <Link
                href="https://resend.com/audiences"
                style={button}
              >
                View in Resend →
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              TenantComms · Automated waitlist notification
            </Text>
            <Text style={footerSubtext}>
              Unified tenant communication for UK letting agents
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
  primary: "#1c1c1c",       // chart-5
  secondary: "#636363",     // chart-3
  muted: "#8a8a8a",         // chart-2
  light: "#d4d4d4",         // chart-1
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
  paddingRight: "0",
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
  margin: "0 0 8px",
  lineHeight: "1.3",
  letterSpacing: "-0.3px",
};

const subtitle = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: colors.secondary,
  margin: "0 0 28px",
};

const detailsBox = {
  backgroundColor: colors.bg,
  borderRadius: "12px",
  padding: "20px 24px",
  border: `1px solid ${colors.border}`,
};

const detailRow = {
  padding: "0",
};

const detailDivider = {
  padding: "0",
};

const detailHr = {
  borderColor: colors.border,
  margin: "12px 0",
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
  padding: "28px 0 0",
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

const footerSection = {
  textAlign: "center" as const,
  padding: "32px 0 0",
};

const footerText = {
  fontSize: "12px",
  color: colors.muted,
  margin: "0 0 4px",
};

const footerSubtext = {
  fontSize: "11px",
  color: colors.light,
  margin: "0",
};
