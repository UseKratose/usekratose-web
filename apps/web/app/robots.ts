import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://usekratose.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: ["/api/", "/auth/", "/dashboard/", "/onboarding/"],
      userAgent: "*",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
