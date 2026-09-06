"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const TELEMETRY_METRICS = [
  { value: "32+ YRS", label: "Heritage Distillation" },
  { value: "40+ BRANDS", label: "Portfolio Matrix" },
  { value: "19+ NATIONS", label: "Export Corridors" },
];

export default function BusinessHero() {
  const containerRef = useRef<HTMLElement>(null);
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Dual Canvas Ambient Zoom-In
      gsap.fromTo(
        [desktopImageRef.current, mobileImageRef.current],
        { scale: 1.05, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        }
      );

      // 2. Editorial Typography Stagger
      const textElements = textGroupRef.current?.children;
      if (textElements) {
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.14,
            ease: "power4.out",
            delay: 0.35,
          }
        );
      }

      // 3. CTA Buttons Stagger
      if (ctaGroupRef.current) {
        gsap.fromTo(
          ctaGroupRef.current.children,
          { opacity: 0, y: 18 },
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

      // 4. Telemetry Badges Stagger
      if (telemetryRef.current) {
        gsap.fromTo(
          telemetryRef.current.children,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
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
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-end lg:justify-center bg-[#050505] overflow-hidden select-none"
    >
      {/* ================= 1. DUAL ART DIRECTION CANVASES ================= */}

      {/* DESKTOP CANVAS: banner3.png (Landscape) */}
      <div
        ref={desktopImageRef}
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <Image
          src="/assets/banner3.png"
          alt="Bacchus World Spirits Distillery Facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Desktop Lateral Scrim: Shrouds the right side in obsidian for clear text contrast */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/85 via-50% to-transparent left-auto w-[68%]" />
      </div>

      {/* MOBILE CANVAS: banner4.png (Portrait) */}
      <div
        ref={mobileImageRef}
        className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <Image
          src="/assets/banner4.png"
          alt="Bacchus World Spirits Commercial Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top filter brightness-[0.95] contrast-[1.05]"
        />

        {/* Mobile Scrim: Ambient top reveal fading into deep obsidian foundation */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/25 via-[#050505]/65 via-52% to-[#050505]" />
      </div>

      {/* Ambient Amber Bloom */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.12)_0%,transparent_60%)]" />

      {/* ================= 2. FOREGROUND EDITORIAL CONTENT ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28 sm:pt-36 pb-12 lg:py-24 flex flex-col justify-end lg:justify-center min-h-screen">
        
        {/* Mobile Spacer: Keeps upper bottle/still imagery unobstructed */}
        <div className="lg:hidden h-[34vh] sm:h-[40vh] w-full pointer-events-none" />

        {/* Desktop: Pinned Right (lg:ml-auto lg:items-end lg:text-right) */}
        <div className="w-full lg:max-w-xl xl:max-w-2xl lg:ml-auto flex flex-col items-center lg:items-end text-center lg:text-right">
          
          <div ref={textGroupRef} className="flex flex-col items-center lg:items-end w-full">
            
            {/* Super Badge */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]/50" />
              <p className="font-serif tracking-[0.3em] text-[10px] sm:text-xs text-[#D4AF37] font-semibold uppercase">
                COMMERCIAL &amp; B2B PARTNERSHIPS
              </p>
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]/50" />
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-[#F4F0E6] tracking-wide leading-[1.05] mb-5">
              Built for Growth. <br />
              <span className="italic font-normal text-[#F3D36A]">
                Powered by Partnerships.
              </span>
            </h1>

            {/* Narrative Body */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#C3BDAF]/95 leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg mb-8 font-light">
              Over 32 years of continuous distillation excellence and institutional manufacturing directly 
              from our Punjab distillery. Engineered for global importers, national distributors, and bespoke 
              private label ventures seeking compliant, large-scale spirits production.
            </p>
          </div>

          {/* Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="w-full sm:w-auto flex flex-col sm:flex-row items-center lg:justify-end gap-3.5 sm:gap-4 mb-8 sm:mb-10"
          >
            {/* Primary Action */}
            <Link
              href="#commercial-models"
              className="group relative w-full sm:w-auto px-9 py-3.5 sm:py-4 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-[#F3D36A] shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(243,211,106,0.5)] text-center cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Inquire Distribution
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

            {/* Secondary Action */}
            <Link
              href="/contact"
              className="w-full sm:w-auto px-9 py-3.5 sm:py-4 rounded-full bg-[#12110F]/80 backdrop-blur-md text-[#F4F0E6] border border-[#D4AF37]/35 font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-[#D4AF37] hover:text-[#F3D36A] hover:bg-[#12110F] text-center cursor-pointer shadow-md"
            >
              Private Label Options
            </Link>
          </div>

          {/* Telemetry Dossier Bar */}
          <div
            ref={telemetryRef}
            className="w-full grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-[#D4AF37]/20"
          >
            {TELEMETRY_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center lg:items-end p-2 sm:p-2.5 rounded-lg bg-[#12110F]/60 border border-[#D4AF37]/15 backdrop-blur-sm"
              >
                <span className="text-[#F3D36A] font-serif text-sm sm:text-base font-bold tracking-wider">
                  {metric.value}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#C3BDAF] font-medium mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Subtle floor vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}