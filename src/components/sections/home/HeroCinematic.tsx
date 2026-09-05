"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Dual Canvas Ambient Scale-In
      gsap.fromTo(
        [desktopImageRef.current, mobileImageRef.current],
        { scale: 1.06, filter: "brightness(0.65) contrast(1.15)" },
        {
          scale: 1,
          filter: "brightness(1) contrast(1)",
          duration: 2.4,
          ease: "power3.out",
        }
      );

      // 2. Editorial Typography Stagger
      const textChildren = textGroupRef.current?.children;
      if (textChildren) {
        gsap.fromTo(
          textChildren,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.14,
            ease: "power4.out",
            delay: 0.35,
          }
        );
      }

      // 3. CTA Action Buttons
      if (ctaGroupRef.current) {
        gsap.fromTo(
          ctaGroupRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.85,
          }
        );
      }

      // 4. Telemetry Dossier Bar
      if (telemetryRef.current) {
        gsap.fromTo(
          telemetryRef.current.children,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            delay: 1.05,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-cursor-theme="dark"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-end lg:justify-center bg-obsidian overflow-hidden select-none"
    >
      {/* ---------------- 1. DUAL VIEWPORT ART DIRECTION ---------------- */}

      {/* DESKTOP BANNER CANVAS (Landscape 21:9) */}
      <div
        ref={desktopImageRef}
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <Image
          src="/assets/banner.png"
          alt="Bacchus Distillery Flagship Collection"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Desktop Obsidian Lateral Shadow Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 via-42% to-transparent w-[68%]" />
      </div>

      {/* MOBILE & TABLET BANNER CANVAS (Portrait 9:16) */}
      <div
        ref={mobileImageRef}
        className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <Image
          src="/assets/mob-banner.png"
          alt="Bacchus Distillery Collection — Mobile View"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Mobile Scrim: Translucent crown reveal at the top, rich obsidian foundation below */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/55 via-55% to-obsidian" />
      </div>

      {/* Master Specular Light Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.12)_0%,transparent_60%)]" />

      {/* ---------------- 2. EDITORIAL CONTENT VIEWPORT ---------------- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-12 lg:py-24 flex flex-col justify-end lg:justify-center min-h-screen">
        
        {/* Mobile Top Viewport: Keeps bottle heads and stone arches completely visible */}
        <div className="lg:hidden h-[34vh] sm:h-[42vh] w-full pointer-events-none" />

        <div className="w-full lg:max-w-xl xl:max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div ref={textGroupRef} className="flex flex-col items-center lg:items-start w-full">
            
            {/* Bespoke Distillery Heading Mark */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-gold-royal to-gold-royal/40" />
              <p className="font-serif tracking-[0.28em] text-[11px] sm:text-xs text-gold-royal font-medium uppercase">
                House of Bacchus &bull; Since 1994
              </p>
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent via-gold-royal to-gold-royal/40" />
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-[2.75rem] sm:text-6xl lg:text-7xl text-ivory tracking-wide leading-[1.04] mb-4">
              A Legacy in <br className="hidden sm:inline" />
              <span className="italic font-normal text-gold-bright">Every Drop.</span>
            </h1>

            {/* Concise Editorial Copy */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-champagne/95 leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg mb-8 font-light">
              From the double wood maturation of <strong className="text-ivory font-medium">Talsons&apos; Reserve 12</strong> to 
              the unyielding presence of <strong className="text-ivory font-medium">Jackie&apos;s Crown</strong> and 
              the raw punch of <strong className="text-ivory font-medium">Crazy Boxer</strong>. 
              Distilled with patience. Bottled with authority.
            </p>
          </div>

          {/* ---------------- 3. ACTION CTAs ---------------- */}
          <div
            ref={ctaGroupRef}
            className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10"
          >
            {/* Primary: Invest in Reserve */}
            <Link
              href="/invest"
              className="group relative w-full sm:w-auto px-10 py-4 rounded-full bg-gold-royal text-obsidian font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-gold-bright shadow-[0_0_25px_rgba(212,175,55,0.32)] hover:shadow-[0_0_35px_rgba(243,211,106,0.5)] text-center cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Invest in Reserve
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent ease-in-out" />
            </Link>

            {/* Secondary: Contact */}
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-surface-1/90 backdrop-blur-md text-ivory border border-gold-royal/40 font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-gold-royal hover:text-gold-bright hover:bg-surface-2 text-center cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              Contact House
            </Link>
          </div>

          {/* ---------------- 4. SENSORY TELEMETRY BAR ---------------- */}
          <div
            ref={telemetryRef}
            className="w-full grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-gold-royal/20"
          >
            <div className="flex flex-col items-center lg:items-start p-2 sm:p-2.5 rounded-lg bg-surface-1/70 border border-gold-royal/15 backdrop-blur-sm">
              <span className="text-gold-bright font-serif text-sm sm:text-base font-bold tracking-wider">
                12 YEARS
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ivory font-medium mt-0.5">
                Double Wood
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-start p-2 sm:p-2.5 rounded-lg bg-surface-1/70 border border-gold-royal/15 backdrop-blur-sm">
              <span className="text-gold-bright font-serif text-sm sm:text-base font-bold tracking-wider">
                42.8% V/V
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ivory font-medium mt-0.5">
                75° Proof
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-start p-2 sm:p-2.5 rounded-lg bg-surface-1/70 border border-gold-royal/15 backdrop-blur-sm">
              <span className="text-gold-bright font-serif text-sm sm:text-base font-bold tracking-wider">
                100%
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ivory font-medium mt-0.5">
                Malt Grain
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Floor Blend to Obsidian */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-obsidian to-transparent pointer-events-none z-20" />
    </section>
  );
}