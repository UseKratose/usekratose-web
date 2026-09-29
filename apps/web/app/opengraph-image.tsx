import { ImageResponse } from "next/og";

export const alt = "UseKratose continuous Solana program security";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

const siteUrl = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://usekratose.vercel.app";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 78% 25%, rgba(155,28,28,.34), transparent 28%), linear-gradient(135deg, #111 0%, #1A1A1A 55%, #221817 100%)",
          color: "#E7E2DC",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "74px 82px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 810 }}>
          <div
            style={{
              color: "#A68B6B",
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 5,
              marginBottom: 28,
              textTransform: "uppercase",
            }}
          >
            Continuous Solana Security
          </div>
          <div style={{ display: "flex", fontSize: 65, fontWeight: 800, lineHeight: 1.05 }}>
            Certificate transparency and Git-style security diffs.
          </div>
          <div style={{ color: "#C8B9AA", display: "flex", fontSize: 27, marginTop: 30 }}>
            Detect every deployed program upgrade with deterministic evidence.
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "rgba(26,26,26,.72)",
            border: "2px solid rgba(166,139,107,.5)",
            borderRadius: 38,
            boxShadow: "0 32px 90px rgba(0,0,0,.5)",
            display: "flex",
            height: 250,
            justifyContent: "center",
            width: 250,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="UseKratose logo"
            height="190"
            src={`${siteUrl}/brand/logo-white.png`}
            width="190"
          />
        </div>
      </div>
    ),
    size,
  );
}
