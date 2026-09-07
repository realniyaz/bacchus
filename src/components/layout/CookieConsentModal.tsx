// src/components/layout/CookieConsentModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { isAgeVerified } from "@/lib/cookies";

const COOKIE_CONSENT_KEY = "bacchus_cookie_consent";

export default function CookieConsentModal() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasStoredConsent = () => {
      try {
        return Boolean(localStorage.getItem(COOKIE_CONSENT_KEY));
      } catch {
        return false;
      }
    };

    // If already consented/rejected, never show again
    if (hasStoredConsent()) return;

    // Case A: User is ALREADY age-verified from a previous session -> Show immediately
    if (isAgeVerified()) {
      setIsVisible(true);
      return;
    }

    // Case B: First visit -> Wait for the Age Gate confirmation event
    const handleAgeVerified = () => {
      if (!hasStoredConsent()) {
        setIsVisible(true);
      }
    };

    window.addEventListener("bacchus:age-verified", handleAgeVerified);
    return () => window.removeEventListener("bacchus:age-verified", handleAgeVerified);
  }, []);

  const handleDecision = (accepted: boolean) => {
    const decision = accepted ? "accepted" : "rejected";
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, decision);
    } catch {}

    document.cookie = `${COOKIE_CONSENT_KEY}=${decision}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;

    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <aside
      aria-label="Cookie Governance Consent"
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-[#050505]/80 backdrop-blur-md px-4 sm:px-6 select-none"
    >
      <div className="absolute w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none rounded-full blur-2xl" />

      <div className="relative z-10 max-w-md w-full bg-[#0C0C0B] border border-[#8E7626]/40 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-center flex flex-col items-center">
        <div className="w-12 h-12 mb-4 rounded-full border border-[#D4AF37]/30 bg-[#12110F] flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 stroke-[1.6]">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M7.5 14.5v.01" />
            <path d="M14.5 15.5v.01" />
            <path d="M11 12v.01" />
          </svg>
        </div>

        <p className="text-[10px] uppercase font-sans tracking-[0.28em] text-[#D4AF37] font-semibold mb-1">
          Bacchus World Spirits &bull; Protocol
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F0E6] tracking-wide mb-3">
          Cookie Governance
        </h3>

        <p className="text-xs sm:text-[13px] font-sans text-[#C3BDAF] leading-relaxed mb-6 font-light max-w-xs">
          This site uses essential cookies and performance telemetry to maintain cellar archives and ensure statutory compliance. Do you accept our cookie protocols?
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mb-4">
          <button
            type="button"
            onClick={() => handleDecision(true)}
            className="w-full sm:w-1/2 py-3 px-5 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#F3D36A] shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
          >
            Accept (Yes)
          </button>

          <button
            type="button"
            onClick={() => handleDecision(false)}
            className="w-full sm:w-1/2 py-3 px-5 rounded-full bg-[#12110F] text-[#C3BDAF] border border-[#8E7626]/30 font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#D4AF37] hover:text-[#F4F0E6] cursor-pointer"
          >
            Reject (No)
          </button>
        </div>

        <Link
          href="/cookies"
          className="text-[10px] uppercase tracking-[0.2em] text-[#77736A] hover:text-[#D4AF37] transition-colors"
        >
          Review Detailed Cookie Policy &rarr;
        </Link>
      </div>
    </aside>
  );
}