// src/app/export-policy/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Trade Ethics & Export Policy | Bacchus World Spirits",
  description:
    "International export protocols, customs clearance documentation, COO, MSDS, container dispatch rules, and trade ethics.",
};

const EXPORT_STANDARDS = [
  {
    num: "01",
    title: "Documentation & Customs Clearance",
    desc: "Every international shipment is accompanied by a standardized Certificate of Origin (COO), Material Safety Data Sheets (MSDS), Official Health Certificates, and pre-cleared FDA/NAFDAC documentation where applicable.",
  },
  {
    num: "02",
    title: "FCL Container Specifications & MOQs",
    desc: "Standard export dispatches are structured around 20ft and 40ft Full Container Loads (FCL). Trial consignments for new territorial markets can be negotiated under authorized commercial review.",
  },
  {
    num: "03",
    title: "Excise Tax Stamp & Label Localization",
    desc: "Labels and bottle packings are tailored directly to regional target market requirements, incorporating mandated regional tax strips, excise stamps, and localized health warning inscriptions.",
  },
  {
    num: "04",
    title: "Trade Ethics & Anti-Illicit Trade",
    desc: "Bacchus strictly enforces anti-diversion, anti-smuggling, and authentic supply chain tracking. We do not participate in or supply unregistered grey-market trade corridors.",
  },
];

const CORRIDOR_HIGHLIGHTS = [
  { label: "African Trade Corridors", detail: "FDA & NAFDAC approved networks (Tanzania, Kenya, Nigeria)." },
  { label: "Middle East Logistics", detail: "Bonded transit and logistics hub in Dubai, UAE." },
  { label: "European Operations", detail: "Scotch bottling licenses empanelled under UK HMRC standards." },
  { label: "North America Hubs", detail: "Licensed commercial gateway corridors in the USA and Canada." },
];

export default function ExportPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#C3BDAF] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#D4AF37] selection:text-[#050505]">
      {/* Amber Liquid Glow Ambient Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Eyebrow Protocol Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          <span className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-bold">
            International Trade Architecture
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F0E6] tracking-tight mb-4">
          Trade Ethics &amp; Export Policy
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#77736A] font-mono mb-12">
          Global Corridors &bull; 19+ Countries &bull; FCL Logistics &bull; Incorruptible Supply Chains
        </p>

        {/* Global Export Declaration */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/30 mb-12">
          <h2 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] mb-3">
            Commercial Export Charter
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#C3BDAF] leading-relaxed font-light mb-5">
            Bacchus World Spirits Limited ships to national distributors, institutional importers, and duty-free groups across 19+ countries. Our export framework operates on transparent Incoterms (FOB and CIF), verifiable batch traceability, and rapid customs clearance protocols.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[#8E7626]/20">
            {CORRIDOR_HIGHLIGHTS.map((corridor) => (
              <div key={corridor.label} className="p-3 rounded-xl bg-[#12110F] border border-[#8E7626]/15">
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#D4AF37] font-semibold block mb-1">
                  {corridor.label}
                </span>
                <span className="text-xs text-[#C3BDAF] font-light leading-snug block">
                  {corridor.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-4 mb-14">
          <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] mb-6">
            Export Governance &amp; Ethical Directives
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXPORT_STANDARDS.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/25 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#D4AF37] block mb-2">
                    SECTION {item.num}
                  </span>
                  <h4 className="font-serif text-lg text-[#F4F0E6] font-semibold mb-2">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-[#C3BDAF] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Assurance Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0C0C0B] via-[#14120E] to-[#0C0C0B] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h4 className="font-serif text-lg text-[#F4F0E6] font-bold mb-1">
              Initiate an Importer Allocation
            </h4>
            <p className="font-sans text-xs text-[#C3BDAF] font-light leading-relaxed">
              Inquire about container allocations, private label mash bills, or exclusive territorial distribution agreements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact?intent=export-inquiry"
              className="px-6 py-3 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#F3D36A] transition-colors whitespace-nowrap cursor-pointer"
            >
              Export Inquiry
            </Link>
            <Link
              href="/international"
              className="px-5 py-3 rounded-full bg-[#12110F] text-[#C3BDAF] border border-[#8E7626]/30 font-sans text-xs uppercase tracking-[0.2em] hover:text-[#F4F0E6] transition-colors whitespace-nowrap cursor-pointer"
            >
              View Corridors
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}