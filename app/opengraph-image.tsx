import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TenantComms — Unified Tenant Communication for UK Letting Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#3a3a3a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "#d4d4d4",
            }}
          >
            TC
          </div>
          <span
            style={{
              fontSize: "40px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            TenantComms
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "#d4d4d4",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            margin: "0 0 16px 0",
          }}
        >
          Stop losing tenant messages.
        </p>
        <p
          style={{
            fontSize: "28px",
            color: "#a3a3a3",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Start proving you responded.
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#737373",
            marginTop: "40px",
          }}
        >
          Unified inbox &middot; AI responses &middot; Compliance audit trail
        </p>
      </div>
    ),
    { ...size }
  );
}
