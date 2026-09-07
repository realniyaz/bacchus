// src/app/terms/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Protocol | Bacchus World Spirits",
  description: "Statutory terms, intellectual property, and trade protocols governing Bacchus Distillery digital touchpoints.",
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#C3BDAF] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#D4AF37] selection:text-[#050505]">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-[#8E7626]" />
          <span className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-bold">
            Legal Protocol
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#F4F0E6] tracking-tight mb-4">
          Terms of Use &amp; Protocol
        </h1>
        <p className="text-xs text-[#77736A] font-mono mb-12">
          Applicable to all digital portals, brand decks, and commercial dossiers.
        </p>

        <div className="space-y-10 text-xs sm:text-sm font-light leading-relaxed border-t border-[#8E7626]/20 pt-10">
          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">1. Lawful Entry &amp; Age Gate Attestation</h2>
            <p>
              By accessing this digital platform, you explicitly represent that you have achieved the legal drinking age mandated by the jurisdiction from which you connect. Entering this portal under false declarations constitutes a violation of these Terms and local alcohol control laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">2. Intellectual Property &amp; Brand Marks</h2>
            <p>
              All trademarks, debossed crests, typography, 3D bottle geometry, tasting telemetry, and visual captures of <em>Talsons&apos; Reserve 12 Years</em>, <em>Jackie&apos;s Crown</em>, <em>Crazy Boxer</em>, and <em>Rozzita</em> are the sole proprietary property of Bacchus World Spirits Limited. Unauthorized replication, web scraping, or commercial reproduction is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">3. Commercial Quotations &amp; Importer B2B Terms</h2>
            <p>
              Dossiers, pricing models, container allocations, and MOQs (Minimum Order Quantities) discussed in the Business or Investor sections are commercial invitations to treat and do not constitute formal binding contracts until an authorized Commercial Agreement is executed under Indian and international trade laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">4. Limitation of Liability</h2>
            <p>
              The content provided across our digital sanctuary is for portfolio discovery, heritage storytelling, and B2B engagement. Bacchus does not facilitate direct-to-consumer digital retail where prohibited by regional excise regulations.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}