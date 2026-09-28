"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InvestorContactBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const cardGroupRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
            },
          }
        );
      }

      if (cardGroupRef.current) {
        gsap.fromTo(
          cardGroupRef.current.children,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardGroupRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#EAE3D2] text-[#12110F] overflow-hidden select-none border-t border-[#8E7626]/20"
    >
      {/* Background Soft Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(200,122,30,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ================= 1. MINIMAL HEADER ================= */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[1px] bg-[#8E7626]" />
            <p className="font-serif tracking-[0.25em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
              Capital &bull; Distribution
            </p>
            <span className="w-5 h-[1px] bg-[#8E7626]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#12110F] tracking-wide leading-tight mb-2">
            Partner With <span className="italic font-light text-[#8E7626]">Origin.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#575043] max-w-md font-light">
            Private cask reserve allocations and global trade distribution.
          </p>
        </div>

        {/* ================= 2. DUAL CARDS (COMPACT & MOBILE-OPTIMIZED) ================= */}
        <div ref={cardGroupRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* CARD 1: INVEST */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF7F2]/90 border border-[#8E7626]/25 hover:border-[#8E7626] shadow-sm hover:shadow-md flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-[#8E7626] font-bold">
                  Institutional
                </span>
                <span className="text-[9px] font-mono text-[#6E6554] bg-[#EAE3D2] px-2 py-0.5 rounded">
                  FSSAI &bull; HMRC
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#12110F] font-bold mb-1.5">
                Invest In Reserve
              </h3>
              <p className="font-sans text-xs text-[#575043] leading-relaxed mb-5">
                Single malt barrel holdings, double-wood maturation programs, and distillery equity allocations.
              </p>
            </div>

            <Link
              href="/invest"
              className="w-full py-3 rounded-full bg-[#12110F] text-[#FAF7F2] hover:bg-[#8E7626] font-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Investments</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* CARD 2: TRADE & CONTACT */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF7F2]/90 border border-[#8E7626]/25 hover:border-[#8E7626] shadow-sm hover:shadow-md flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-[#8E7626] font-bold">
                  Global Trade
                </span>
                <span className="text-[9px] font-mono text-[#6E6554] bg-[#EAE3D2] px-2 py-0.5 rounded">
                  19+ Nations
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#12110F] font-bold mb-1.5">
                Commercial Inquiries
              </h3>
              <p className="font-sans text-xs text-[#575043] leading-relaxed mb-5">
                Inquire for national distributor mandates, duty-free retail, or institutional trade procurement.
              </p>
            </div>

            <Link
              href="/contact"
              className="w-full py-3 rounded-full bg-transparent border border-[#8E7626] text-[#12110F] hover:bg-[#8E7626] hover:text-[#FAF7F2] font-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>Connect With House</span>
              <span>&rarr;</span>
            </Link>
          </div>

        </div>

        {/* ================= 3. ONE-LINE COMPACT FOOTER STRIP ================= */}
        <div className="mt-8 pt-4 border-t border-[#8E7626]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[10px] text-[#6E6554] font-sans">
          <span>Noida - 132, UP &bull; +91 120 466 425</span>
          <span className="text-[#8E7626] font-medium">contact@origindistillery.in</span>
        </div>

      </div>
    </section>
  );
}