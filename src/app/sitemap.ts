import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.seo.siteUrl || "https://bacchusdistillery.com";
  const lastModified = new Date();

  const routes = [
    // --- 1. Primary Navigation Routes ---
    { path: "", priority: 1.0, changeFrequency: "weekly" as const }, // Home
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const }, // About
    { path: "/our-brands", priority: 0.9, changeFrequency: "weekly" as const }, // Brands / The Vault
    { path: "/international-presence", priority: 0.8, changeFrequency: "monthly" as const }, // International Presence
    { path: "/our-business", priority: 0.8, changeFrequency: "monthly" as const }, // Business & Private Label
    { path: "/team", priority: 0.8, changeFrequency: "monthly" as const }, // Team & CMD Dossier
    { path: "/investor", priority: 0.8, changeFrequency: "monthly" as const }, // Invest / Investor Relations
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const }, // Contact Desk

    // --- 2. Regulatory & Trade Portals ---
    { path: "/compliance", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/export-policy", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/sitemap", priority: 0.5, changeFrequency: "monthly" as const },

    // --- 3. Statutory & Privacy Governance ---
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}