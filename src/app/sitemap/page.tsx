import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Vault Directory & Sitemap | Bacchus World Spirits",
  description:
    "Complete architectural index of Bacchus Distillery: Home, About, Brands, International Presence, Business, Team, Invest, and Contact.",
};

const MASTER_SITEMAP_SECTIONS = [
  {
    category: "01. Primary Brand Portals",
    links: [
      {
        name: "Home",
        href: "/",
        badge: "Core Gateway",
        desc: "Master bottle unveil, brand lineage since 1994, and active portfolio highlights.",
      },
      {
        name: "About Heritage",
        href: "/about",
        badge: "Heritage",
        desc: "Over 32 years of distillation excellence in Punjab, ISO/HACCP certifications, and craft pillars.",
      },
      {
        name: "Our Brands",
        href: "/our-brands",
        badge: "Portfolio",
        desc: "Single malts, blended whiskies, rums, and vodkas: Talsons' 12, Jackie's Crown, Crazy Boxer, Rozzita.",
      },
      {
        name: "International Presence",
        href: "/international-presence",
        badge: "19+ Nations",
        desc: "Global distribution corridors across Asia, Africa, USA, UAE, and the Tanzania 10X partner scaling study.",
      },
    ],
  },
  {
    category: "02. Commercial & Corporate Leadership",
    links: [
      {
        name: "Our Business",
        href: "/our-business",
        badge: "B2B Framework",
        desc: "Global brand distribution, turnkey private labelling, and domestic statewise manufacturing rights.",
      },
      {
        name: "Executive Leadership & Team",
        href: "/team",
        badge: "Custodians",
        desc: "Chairman & Managing Director (CMD) Mohit Shukla dossier, master blenders, and laboratory directors.",
      },
      {
        name: "Investor Relations",
        href: "/investor",
        badge: "Capital & Yield",
        desc: "Institutional investor models, 18-25% annual ROI structures, container allocations, and margin controls.",
      },
      {
        name: "Contact & Concierge Desk",
        href: "/contact",
        badge: "Direct Liaison",
        desc: "Direct corporate inquiries, importer volume requests, and Noida Global Bureau office contact.",
      },
    ],
  },
  {
    category: "03. Statutory Governance & Protocols",
    links: [
      {
        name: "Statutory Compliance",
        href: "/compliance",
        badge: "Accreditations",
        desc: "HMRC Scotch licensure, FSSAI central manufacturing permits, and ISO 9001:2015 quality standards.",
      },
      {
        name: "Trade Ethics & Export Policy",
        href: "/export-policy",
        badge: "Incoterms & COO",
        desc: "20ft/40ft FCL container specifications, MSDS, Certificate of Origin, and anti-illicit trade standards.",
      },
      {
        name: "Privacy Shield",
        href: "/privacy",
        badge: "Statutory Privacy",
        desc: "Legal drinking age session management (21+), trade partner data confidentiality, and GDPR policies.",
      },
      {
        name: "Terms of Protocol",
        href: "/terms",
        badge: "Legal Protocol",
        desc: "Intellectual property, trademark geometry, tasting telemetry, and wholesale inquiry conditions.",
      },
      {
        name: "Cookie Governance",
        href: "/cookies",
        badge: "Telemetry Matrix",
        desc: "Live active browser preference controls, session tokens, and performance telemetry settings.",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#C3BDAF] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#D4AF37] selection:text-[#050505]">
      {/* Liquid Amber Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      {/* Watermarked Bacchus Lion Crest */}
      <div className="absolute right-4 top-24 w-72 md:w-96 aspect-square pointer-events-none opacity-[0.035] select-none z-0">
        <Image src="/icon.png" alt="Bacchus Crest" fill className="object-contain filter grayscale" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Eyebrow Stamp */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          <span className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-bold">
            Complete Vault Architecture
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F0E6] tracking-tight mb-4">
          Vault Directory &amp; Sitemap
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#77736A] font-mono mb-12">
          Index of all public brand sanctuaries, commercial modules, investor corridors, and statutory registries.
        </p>

        {/* Categorized Matrix */}
        <div className="space-y-12 border-t border-[#8E7626]/20 pt-10 mb-14">
          {MASTER_SITEMAP_SECTIONS.map((section) => (
            <div key={section.category} className="flex flex-col">
              <h2 className="font-serif text-xl sm:text-2xl text-[#F3D36A] font-semibold mb-6 flex items-center gap-3">
                <span>{section.category}</span>
                <span className="flex-1 h-[1px] bg-[#8E7626]/20" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group p-5 rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/25 hover:border-[#D4AF37] hover:bg-[#12110F] transition-all duration-300 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-base sm:text-lg text-[#F4F0E6] group-hover:text-[#D4AF37] transition-colors font-bold">
                          {link.name}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] px-2 py-0.5 rounded bg-[#14120E] border border-[#8E7626]/30">
                          {link.badge}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#77736A] group-hover:text-[#C3BDAF] transition-colors font-light leading-relaxed mb-3">
                        {link.desc}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-[#8E7626] group-hover:text-[#F3D36A] group-hover:translate-x-1 transition-all flex items-center gap-1 self-start">
                      <span>{link.href}</span>
                      <span>&rarr;</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}