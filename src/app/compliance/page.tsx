// src/app/compliance/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Statutory Compliance & Licensure | Bacchus World Spirits",
  description:
    "Statutory credentials, quality accreditations, HMRC Scotch licensure, FSSAI regulations, and ISO frameworks.",
};

const STATUTORY_CERTS = [
  {
    id: "hmrc",
    authority: "Her Majesty's Revenue and Customs (HMRC)",
    jurisdiction: "United Kingdom & Scotland",
    scope: "Empanelled facility for authentic Scotch whisky blending and bottling operations in India[cite: 1].",
    badge: "UK Government Empanelled",
  },
  {
    id: "fssai",
    authority: "Food Safety and Standards Authority of India (FSSAI)",
    jurisdiction: "Republic of India",
    scope: "Central statutory manufacturing licensing for grain distillation, rectification, and high-speed packaging.",
    badge: "Central Manufacturing License",
  },
  {
    id: "iso",
    authority: "ISO 9001:2015 Certification",
    jurisdiction: "International Standard",
    scope: "Quality Management Systems (QMS) covering procurement, copper pot still distillation, and laboratory analysis[cite: 1].",
    badge: "Quality Certified",
  },
  {
    id: "haccp",
    authority: "HACCP Food Safety Protocol",
    jurisdiction: "Global Food Safety Initiative",
    scope: "Hazard Analysis Critical Control Point controls over water purification, grain filtration, and seal integrity[cite: 1].",
    badge: "Safety Audited",
  },
];

const AUDIT_PILLARS = [
  {
    title: "Excise & Duty Stamp Adherence",
    desc: "Strict compliance with Indian State Excise policies and international bonded customs corridors[cite: 1, 2]. All consignments feature automated tracking and authorized regional tax stamps[cite: 2].",
  },
  {
    title: "Analytical Laboratory Standards",
    desc: "In-house chromatography and organoleptic testing ensuring uniform 42.8% V/V (75° Proof) standardization, zero unauthorized congeners, and precise Scotch blend ratios[cite: 1, 3].",
  },
  {
    title: "Mandatory Health & Age Attestations",
    desc: "Adherence to statutory warnings, legal drinking age restrictions (21+), and responsible consumption labeling across all 40+ brand portfolios.",
  },
];

export default function CompliancePage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#C3BDAF] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#D4AF37] selection:text-[#050505]">
      {/* Amber Liquid Glow Ambient Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Eyebrow Protocol Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          <span className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-bold">
            Statutory Legal Framework
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F0E6] tracking-tight mb-4">
          Statutory Compliance &amp; Licensure
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#77736A] font-mono mb-12">
          Regulatory Empanelment &bull; ISO 9001:2015 &bull; HMRC Licensed &bull; FSSAI Registered[cite: 1]
        </p>

        {/* Lead Narrative */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/30 mb-12">
          <h2 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] mb-3">
            Institutional Distilling Governance
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#C3BDAF] leading-relaxed font-light mb-4">
            Bacchus World Spirits Limited operates under a multi-tiered regulatory framework spanning central Indian ministries and global excise divisions[cite: 1, 3]. Over 32 years of operational heritage[cite: 2], every hectolitre of malt, grain spirit, and blended whisky conforms to the highest statutory safety and tax compliance benchmarks[cite: 1, 2].
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#8E7626]/20">
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736A]">Direct Desk:</span>
            <span className="text-xs text-[#D4AF37] font-mono">md@bacchusspiritsglobal.com</span>[cite: 1]
            <span className="text-stone text-xs">&bull;</span>
            <span className="text-[11px] text-[#C3BDAF]">Corporate Bureau: Sector 132, Noida, UP[cite: 4]</span>
          </div>
        </div>

        {/* Accreditation Matrix */}
        <div className="mb-14">
          <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] mb-6">
            Accredited Statutory Licensures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {STATUTORY_CERTS.map((cert) => (
              <div
                key={cert.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/25 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#14120E] border border-[#8E7626]/30">
                      {cert.badge}
                    </span>
                    <span className="text-[10px] uppercase font-sans tracking-wider text-[#77736A]">
                      {cert.jurisdiction}
                    </span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#F4F0E6] font-bold mb-2">
                    {cert.authority}
                  </h4>
                  <p className="font-sans text-xs text-[#C3BDAF] font-light leading-relaxed mb-4">
                    {cert.scope}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#77736A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Periodic Independent Audit Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Oversight Pillars */}
        <div className="space-y-6 border-t border-[#8E7626]/20 pt-10 mb-12">
          <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] mb-4">
            Auditing &amp; Quality Control Protocols
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AUDIT_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-[#12110F] border border-[#8E7626]/20"
              >
                <h4 className="font-serif text-sm sm:text-base text-[#F3D36A] font-bold mb-2">
                  {pillar.title}
                </h4>
                <p className="font-sans text-xs text-[#C3BDAF] font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation & Contact Route */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/30">
          <div>
            <p className="font-serif text-base text-[#F4F0E6] mb-1">
              Need Verification or Compliance Attestations?
            </p>
            <p className="text-xs text-[#77736A]">
              Connect directly with our legal and excise liaison desk.
            </p>
          </div>
          <Link
            href="/contact?intent=compliance-dossier"
            className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#F3D36A] transition-colors cursor-pointer"
          >
            Request Audit Dossier
          </Link>
        </div>
      </div>
    </main>
  );
}