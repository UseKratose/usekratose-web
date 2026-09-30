import type { Metadata } from "next";
import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  description:
    "Sign in to UseKratose for continuous Solana security verification.",
  title: {
    default: "Sign in | UseKratose",
    template: "%s | UseKratose",
  },
};

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="auth-shell">
      <header className="auth-topbar">
        <Link aria-label="UseKratose home" className="brand" href="/">
          <BrandLogo />
          <span>UseKratose</span>
        </Link>
      </header>
      {children}
    </div>
  );
}
