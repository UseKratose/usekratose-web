import ButtonGradient from "@/components/svg/button-gradient";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Benefits from "@/components/sections/benefits";
import Hero from "@/components/sections/hero";
import Pricing from "@/components/sections/pricing";
import Roadmap from "@/components/sections/roadmap";
import Services from "@/components/sections/services";
import { cn } from "@/lib/utils";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "UseKratose",
      url: process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://usekratose.vercel.app",
    },
    {
      "@type": "SoftwareApplication",
      applicationCategory: "SecurityApplication",
      description:
        "Continuous Solana program security monitoring with deterministic deployment fingerprints, upgrade detection, IDL diffs, and security events.",
      name: "UseKratose",
      operatingSystem: "Web",
      url: process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://usekratose.vercel.app",
    },
  ],
};

export default function LandingPage() {
  return (
    <main className="landing-root">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <div className={cn("overflow-hidden")}>
        <Navbar />
        <Hero />
        <Benefits />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <ButtonGradient />
    </main>
  );
}
