// src/app/robots.ts
import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG?.seo?.siteUrl || "https://bacchusdistillery.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/our-brands",
          "/international-presence",
          "/our-business",
          "/team",
          "/investor",
          "/contact",
          "/compliance",
          "/export-policy",
          "/privacy",
          "/terms",
          "/cookies",
          "/sitemap",
        ],
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/private/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}