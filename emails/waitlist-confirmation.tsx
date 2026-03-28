import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
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
      <Head />
      <Preview>New waitlist signup — {email}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>TenantComms</Text>
          </Section>

          <Hr style={hr} />

          <Heading style={heading}>New Waitlist Signup</Heading>

          <Text style={paragraph}>
            A new user has joined the TenantComms early access waitlist.
          </Text>

          {/* Details card */}
          <Section style={card}>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Source</Text>
            <Text style={value}>{source}</Text>

            <Text style={label}>Signed up at</Text>
            <Text style={value}>{new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            TenantComms Waitlist · This is an automated notification.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "480px",
};

const header = {
  textAlign: "center" as const,
  padding: "20px 0 10px",
};

const logoText = {
  fontSize: "22px",
  fontWeight: "700" as const,
  color: "#1a2332",
  margin: "0",
};

const heading = {
  fontSize: "20px",
  fontWeight: "600" as const,
  color: "#1a2332",
  textAlign: "center" as const,
  margin: "24px 0 8px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#555",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "24px",
  border: "1px solid #e5e5e5",
};

const label = {
  fontSize: "11px",
  fontWeight: "600" as const,
  color: "#888",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 2px",
};

const value = {
  fontSize: "15px",
  color: "#1a2332",
  margin: "0 0 16px",
  fontWeight: "500" as const,
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "24px 0",
};

const footer = {
  fontSize: "12px",
  color: "#999",
  textAlign: "center" as const,
};
