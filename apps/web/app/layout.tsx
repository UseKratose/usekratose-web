import type { Metadata } from "next";

import "./globals.css";
import { SiteChrome } from "./site-chrome";
import { getSession } from "@/lib/auth";

const siteUrl = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://usekratose.vercel.app";

const developmentServiceWorkerReset = `
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(async (registrations) => {
    const removed = await Promise.all(
      registrations.map((registration) => registration.unregister()),
    );
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
    }
    if (removed.some(Boolean) && sessionStorage.getItem("usekratose-sw-reset") !== "done") {
      sessionStorage.setItem("usekratose-sw-reset", "done");
      window.location.reload();
    }
  });
}
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "UseKratose",
  category: "developer tools",
  creator: "UseKratose",
  description:
    "Continuous Solana program security monitoring with deterministic deployment fingerprints, upgrade detection, IDL diffs, and reviewable security events.",
  keywords: [
    "Solana security",
    "Solana program monitoring",
    "Solana smart contract security",
    "Solana upgrade monitoring",
    "Solana program audit",
    "Solana ProgramData",
    "Solana IDL diff",
    "continuous deployment security",
    "blockchain security monitoring",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/logo-white.png",
    apple: "/brand/logo-dark.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    description:
      "Certificate transparency and Git-style security diffs for deployed Solana programs.",
    images: [
      {
        alt: "UseKratose continuous Solana program security",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: "UseKratose",
    title: "UseKratose — Continuous Solana Program Security",
    type: "website",
    url: "/",
  },
  publisher: "UseKratose",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "UseKratose — Continuous Solana Program Security",
    template: "%s — UseKratose",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Certificate transparency and Git-style security diffs for deployed Solana programs.",
    images: ["/opengraph-image"],
    title: "UseKratose — Continuous Solana Program Security",
  },
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const session = await getSession();

  const user = session
    ? {
        email: session.email,
        initials: (session.email.split("@")[0] ?? "U")
          .slice(0, 2)
          .toUpperCase(),
      }
    : null;

  return (
    <html lang="en">
      {process.env.NODE_ENV === "development" ? (
        <head>
          <script
            dangerouslySetInnerHTML={{ __html: developmentServiceWorkerReset }}
          />
        </head>
      ) : null}
      <body>
        <SiteChrome user={user}>{children}</SiteChrome>
      </body>
    </html>
  );
}
