// src/app/cookies/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookiesPage() {
  const [currentConsent, setCurrentConsent] = useState<string>("Not Set");

  useEffect(() => {
    const consent = localStorage.getItem("bacchus_cookie_consent");
    if (consent) setCurrentConsent(consent.toUpperCase());
  }, []);

  const updateConsent = (type: "accepted" | "rejected") => {
    localStorage.setItem("bacchus_cookie_consent", type);
    document.cookie = `bacchus_cookie_consent=${type}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    setCurrentConsent(type.toUpperCase());
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#C3BDAF] font-sans pt-28 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#D4AF37] selection:text-[#050505]">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-[#8E7626]" />
          <span className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-bold">
            Telemetry Policy
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#F4F0E6] tracking-tight mb-4">
          Cookie Governance
        </h1>
        <p className="text-xs text-[#77736A] font-mono mb-10">
          Transparent data tracking and session verification standards.
        </p>

        {/* Live Status Control Box */}
        <div className="p-6 rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736A] block mb-1">
              Active Browser Preference
            </span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${currentConsent === "ACCEPTED" ? "bg-[#D4AF37]" : "bg-[#B51F24]"}`} />
              <span className="font-serif text-lg text-[#F4F0E6] font-bold tracking-wide">
                {currentConsent}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateConsent("accepted")}
              className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#050505] text-xs font-bold uppercase tracking-wider hover:bg-[#F3D36A] transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={() => updateConsent("rejected")}
              className="px-4 py-2 rounded-full bg-[#12110F] text-[#C3BDAF] border border-[#8E7626]/30 text-xs uppercase tracking-wider hover:text-[#F4F0E6] transition-colors cursor-pointer"
            >
              Reject All
            </button>
          </div>
        </div>

        {/* Cookie Categories Matrix */}
        <div className="space-y-8 text-xs sm:text-sm font-light leading-relaxed">
          <section className="border-b border-[#8E7626]/20 pb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-lg text-[#F4F0E6]">Strictly Necessary Cookies</h2>
              <span className="px-2 py-0.5 rounded text-[9px] uppercase tracking-widest bg-[#12110F] border border-[#8E7626]/30 text-[#D4AF37]">
                Mandatory
              </span>
            </div>
            <p className="text-[#C3BDAF]/90">
              Essential for core functions including the age gate legal verification session and security tokens. These do not store personally identifiable data and cannot be switched off in our systems.
            </p>
          </section>

          <section className="border-b border-[#8E7626]/20 pb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-lg text-[#F4F0E6]">Performance &amp; Telemetry Cookies</h2>
              <span className="px-2 py-0.5 rounded text-[9px] uppercase tracking-widest bg-[#12110F] border border-[#8E7626]/30 text-[#77736A]">
                Optional
              </span>
            </div>
            <p className="text-[#C3BDAF]/90">
              Collect aggregate, anonymized traffic reports to measure loading speeds of our WebGL assets and high-res brand decks. Disabling these will not impair site navigation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#F4F0E6] mb-2">Browser-Level Control</h2>
            <p>
              Most web browsers permit configuration to deny or delete cookies via system preferences. Note that purging cookies will prompt the Sanctuary Age Gate and Cookie Modal upon your subsequent visit.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}