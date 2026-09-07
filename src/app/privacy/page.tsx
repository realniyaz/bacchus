// src/app/privacy/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Shield | Bacchus World Spirits",
  description: "Statutory privacy policy, legal processing, and client data protection at Bacchus Distillery.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#C3BDAF] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#D4AF37] selection:text-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-[#8E7626]" />
          <span className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-bold">
            Statutory Legal Document
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#F4F0E6] tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#77736A] font-mono mb-12">
          Effective Date: January 1, 2026 &bull; Last Revised: September 2026
        </p>

        <div className="space-y-10 text-xs sm:text-sm font-light leading-relaxed border-t border-[#8E7626]/20 pt-10">
          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">1. Executive Overview</h2>
            <p>
              Bacchus World Spirits Limited (&ldquo;Bacchus,&rdquo; &ldquo;we,&rdquo; or &ldquo;our&rdquo;) upholds strict confidentiality regarding data integrity, trade partner privacy, and regulatory alcohol compliance. This Privacy Policy governs your engagement with our web assets, age verification checks, and institutional investor channels.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">2. Legal Age Telemetry</h2>
            <p>
              In adherence to statutory alcohol control regulations across India, Europe, the UK, and international export jurisdictions, access is restricted to individuals of legal purchase age (21+ in specified jurisdictions). We do not collect or archive identifiable personal data of underage individuals. Age verification parameters are processed as local session states.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">3. Commercial & B2B Inquiry Data</h2>
            <p className="mb-2">When engaging via our Partner Concierge, Importer Desks, or Investor Portals, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#C3BDAF]/90">
              <li>Corporate designations, company trade names, and certified business emails.</li>
              <li>Target export corridors, container allocation requests, and excise licensing intent.</li>
              <li>Regulatory documentation shared for private label and distribution empanelment.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg sm:text-xl text-[#F4F0E6] mb-3">4. Disclosure & Regulatory Compliance</h2>
            <p>
              Bacchus complies with regulatory bodies including FSSAI, HACCP, ISO 9001:2015 frameworks, and Her Majesty&apos;s Revenue and Customs (HMRC) export guidelines. Data is strictly protected and never sold to third-party commercial data brokers.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-[#0C0C0B] border border-[#8E7626]/30">
            <h3 className="font-serif text-base text-[#D4AF37] mb-2">Corporate Privacy Bureau</h3>
            <p className="text-xs text-[#77736A] leading-relaxed mb-2">
              For statutory privacy notices or data rectifications, connect directly with our compliance desk:
            </p>
            <p className="text-xs text-[#F4F0E6]">
              Executive Desk: <span className="text-[#D4AF37]">md@bacchusspiritsglobal.com</span> &bull; Global Bureau: B 28 Manaar Tower, Sector 132, Noida, UP
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}