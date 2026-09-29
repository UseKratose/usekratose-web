import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://usekratose.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: siteUrl,
    },
  ];
}
