// src/components/layout/AgeGate.tsx
"use client";

import React, { useState, useEffect } from "react";
import { isAgeVerified, setAgeVerified } from "@/lib/cookies";
import { SITE_CONFIG } from "@/config/site";

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!isAgeVerified()) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirmAge = () => {
    setAgeVerified();
    setIsOpen(false);
    // Notify the Cookie Consent Modal immediately
    window.dispatchEvent(new Event("bacchus:age-verified"));
  };

  const handleDenyAge = () => {
    setDenied(true);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Age Verification Gate"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl px-6"
    >
      <div className="absolute w-[360px] md:w-[640px] h-[360px] md:h-[640px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg w-full text-center bg-[#0C0C0B] p-8 md:p-12 rounded-2xl border border-[#D4AF37]/25 shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 mb-6 rounded-full border border-[#D4AF37]/30 bg-[#14120E] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-[#D4AF37] stroke-[1.5]">
            <path d="M12 2l3 5h5l-4 4 2 6-6-3-6 3 2-6-4-4h5z" />
            <circle cx="12" cy="14" r="3" />
          </svg>
        </div>

        <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-semibold mb-2">
          Bacchus Distillery • Est. {SITE_CONFIG.establishedYear}
        </p>

        {!denied ? (
          <>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F4F0E6] tracking-wide mb-3">
              The Sanctuary Gate
            </h2>

            <p className="font-serif italic text-base text-[#C3BDAF]/80 mb-6">
              Are you of legal drinking age ({SITE_CONFIG.legalAgeMin}+)?
            </p>

            <p className="text-[#77736A] font-sans text-xs leading-relaxed mb-8 max-w-sm">
              {SITE_CONFIG.legalWarning}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={handleConfirmAge}
                className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#F3D36A] shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
              >
                Yes, I Am
              </button>

              <button
                onClick={handleDenyAge}
                className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-[#14120E] text-[#C3BDAF] border border-[#D4AF37]/20 font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#D4AF37] hover:text-[#F4F0E6] cursor-pointer"
              >
                No, Exit
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="font-serif text-2xl text-[#F4F0E6] mb-3">Access Restricted</h3>
            <p className="text-xs text-[#C3BDAF] leading-relaxed mb-6 max-w-xs">
              You must be of legal drinking age ({SITE_CONFIG.legalAgeMin}+) to view the collections of Bacchus Distillery.
            </p>
            <a
              href="https://www.responsibility.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] underline hover:text-[#F3D36A] transition-colors"
            >
              Learn More About Responsibility.org
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}