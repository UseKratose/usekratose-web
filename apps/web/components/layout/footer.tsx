import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "#features", label: "Capabilities" },
      { href: "#how-to-use", label: "How it works" },
      { href: "#coverage", label: "Coverage" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/signup", label: "Create workspace" },
      { href: "/login", label: "Sign in" },
      { href: "/dashboard/programs?add=1", label: "Monitor a program" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/dashboard/docs", label: "Documentation" },
      { href: "#roadmap", label: "Roadmap" },
      { href: "/dashboard/events", label: "Security events" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="brand-footer">
      <div aria-hidden="true" className="brand-footer-backdrop" />
      <div className="brand-footer-content">
        <div className="brand-footer-grid">
          <div className="brand-footer-intro">
            <Link className="brand-footer-logo" href="#hero">
              <BrandLogo className="size-11" />
              <span>UseKratose</span>
            </Link>
            <p>
              Continuous deployment security evidence for Solana programs.
              Deterministic, explainable, and grounded in finalized onchain
              state.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav
              aria-label={`${group.title} links`}
              className="brand-footer-group"
              key={group.title}
            >
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="brand-footer-cta">
            <span>Protect the next deployment</span>
            <h2>Make every Solana upgrade accountable.</h2>
            <Link href="/signup">Start monitoring →</Link>
          </div>
        </div>

        <div className="brand-footer-bottom">
          <span>© {new Date().getFullYear()} UseKratose</span>
          <span>Discipline builds freedom.</span>
          <span>Built for the Solana ecosystem.</span>
        </div>
      </div>
    </footer>
  );
}
