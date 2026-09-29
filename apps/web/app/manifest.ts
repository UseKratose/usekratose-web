import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#1A1A1A",
    description:
      "Continuous security monitoring and deterministic diffs for deployed Solana programs.",
    display: "standalone",
    icons: [
      {
        sizes: "1254x1254",
        src: "/brand/logo-white.png",
        type: "image/png",
      },
    ],
    name: "UseKratose",
    short_name: "UseKratose",
    start_url: "/",
    theme_color: "#9B1C1C",
  };
}
