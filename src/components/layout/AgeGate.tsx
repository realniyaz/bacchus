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
  };

  const handleDenyAge = () => {
    setDenied(true);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Age Verification Gate"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-obsidian/95 backdrop-blur-2xl px-6"
    >
      {/* Ambient Cellar Amber Bloom */}
      <div className="absolute w-[360px] md:w-[640px] h-[360px] md:h-[640px] bg-cellar-bloom pointer-events-none rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-lg w-full text-center glass-card p-8 md:p-12 rounded-2xl border border-gold-royal/20 shadow-2xl flex flex-col items-center">
        {/* Crowned Royal Lion Seal */}
        <div className="w-16 h-16 mb-6 rounded-full border border-gold-royal/30 bg-surface-1 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-8 h-8 text-gold-royal stroke-[1.5]"
          >
            <path d="M12 2l3 5h5l-4 4 2 6-6-3-6 3 2-6-4-4h5z" />
            <circle cx="12" cy="14" r="3" />
          </svg>
        </div>

        <p className="text-[10px] uppercase tracking-[0.35em] text-gold-royal font-sans font-semibold mb-2">
          Bacchus Distillery • Est. {SITE_CONFIG.establishedYear}
        </p>

        {!denied ? (
          <>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory tracking-wide mb-3">
              The Sanctuary Gate
            </h2>

            <p className="font-serif italic text-base text-champagne/80 mb-6">
              Are you of legal drinking age ({SITE_CONFIG.legalAgeMin}+)?
            </p>

            <p className="text-stone font-sans text-xs leading-relaxed mb-8 max-w-sm">
              {SITE_CONFIG.legalWarning}
            </p>

            {/* Binary Action Choice */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={handleConfirmAge}
                className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-gold-royal text-obsidian font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gold-bright shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(243,211,106,0.45)] cursor-pointer"
              >
                Yes, I Am
              </button>

              <button
                onClick={handleDenyAge}
                className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-surface-1 text-champagne border border-gold-royal/20 font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold-royal hover:text-ivory cursor-pointer"
              >
                No, Exit
              </button>
            </div>
          </>
        ) : (
          /* Underage Exit State */
          <div className="flex flex-col items-center animate-fade-in">
            <h3 className="font-serif text-2xl text-ivory mb-3">
              Access Restricted
            </h3>
            <p className="text-xs text-champagne leading-relaxed mb-6 max-w-xs">
              You must be of legal drinking age ({SITE_CONFIG.legalAgeMin}+) to view the collections of Bacchus Distillery.
            </p>
            <a
              href="https://www.responsibility.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] text-gold-royal underline hover:text-gold-bright transition-colors"
            >
              Learn More About Responsibility.org
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}