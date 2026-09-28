"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const CERTIFICATIONS = [
  {
    name: "ISO 9001:2015",
    label: "Quality Standard",
    icon: "/assets/icon-9001.jpg",
  },
  {
    name: "HACCP",
    label: "Food Safety",
    icon: "/assets/haccp.webp",
  },
  {
    name: "FSSAI",
    label: "Central License",
    icon: "/assets/fsaai.png",
  },
];

const TELEMETRY_STRIP = [
  { value: "18–25%", label: "Annual Projected ROI" },
  { value: "32+ YRS", label: "Punjab Distillation" },
  { value: "19+ NATIONS", label: "Global Corridors" },
];

export default function InvestHero() {
  const containerRef = useRef<HTMLElement>(null);
  const bannerImageRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slow cinematic zoom on the cellar banner
      if (bannerImageRef.current) {
        gsap.fromTo(
          bannerImageRef.current,
          { scale: 1.08, filter: "brightness(0.72) contrast(1.1)" },
          {
            scale: 1,
            filter: "brightness(0.9) contrast(1.05)",
            duration: 2.8,
            ease: "power3.out",
          }
        );
      }

      // 2. Ambient gold flare breathing loop
      if (flareRef.current) {
        gsap.to(flareRef.current, {
          scale: 1.22,
          opacity: 0.9,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Staggered typographic entrance
      const textNodes = textGroupRef.current?.children;
      if (textNodes) {
        gsap.fromTo(
          textNodes,
          { opacity: 0, y: 28 },
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

      // 4. Certification badges entrance
      if (certsRef.current) {
        gsap.fromTo(
          certsRef.current.children,
          { opacity: 0, scale: 0.9, y: 14 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.75,
          }
        );
      }

      // 5. CTAs reveal
      if (ctaGroupRef.current) {
        gsap.fromTo(
          ctaGroupRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.95,
          }
        );
      }

      // 6. Telemetry metrics entrance
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
            delay: 1.15,
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
      {/* ================= 1. CINEMATIC CELLAR BANNER CANVAS ================= */}
      <div
        ref={bannerImageRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <Image
          src="/assets/b5.png"
          alt="Origin Distillery Cellar and Talsons' Reserve 12 Years"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-right filter"
        />

        {/* Desktop Lateral Scrim: Keeps left text readable while revealing right bottle & casks */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 via-52% to-transparent w-[72%]" />

        {/* Mobile Vertical Scrim: Deep bottom fade ensuring full copy and CTA contrast */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/75 via-45% to-[#050505]" />
      </div>

      {/* Centered Ambient Liquid Amber Bloom */}
      <div
        ref={flareRef}
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[540px] sm:w-[840px] h-[540px] sm:h-[840px] bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(142,118,38,0.05)_45%,transparent_72%)] pointer-events-none will-change-transform"
      />

      {/* ================= 2. FOREGROUND EDITORIAL VIEWPORT ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 sm:pt-36 pb-12 lg:py-24 flex flex-col justify-end lg:justify-center min-h-screen">
        
        {/* Mobile Spacer: leaves the bottle neck and cellar beam light clear at the top */}
        <div className="lg:hidden h-[36vh] sm:h-[40vh] w-full pointer-events-none" />

        {/* Content Column */}
        <div className="w-full lg:max-w-2xl xl:max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div ref={textGroupRef} className="flex flex-col items-center lg:items-start w-full">
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12110F]/85 border border-[#D4AF37]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-[0_0_20px_rgba(212,175,55,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#F3D36A] uppercase">
                Origin DISTILLERY &bull; INSTITUTIONAL INVESTOR PORTAL
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] text-[#F4F0E6] tracking-tight leading-[1.06] mb-4 sm:mb-5">
              Strategic  Capital. <br />
              <span className="italic font-light text-[#F3D36A]">
                Sustained Yield.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#C3BDAF] leading-relaxed max-w-sm sm:max-w-lg lg:max-w-xl mb-6 sm:mb-7 font-light">
              Backed by 32+ years of distillation excellence in Punjab, ISO 9001:2015, HACCP, 
              and HMRC empanelled Scotch bottling. Access high-velocity international distribution rights 
              and scalable state-wise brand ownership.
            </p>
          </div>

          {/* ================= CERTIFICATION ICONS ROW ================= */}
          <div
            ref={certsRef}
            className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 mb-7 sm:mb-8"
          >
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="group relative flex items-center gap-2.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[#12110F]/85 border border-[#8E7626]/35 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              >
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 bg-white/95 rounded-full p-0.5 overflow-hidden flex items-center justify-center shadow-inner">
                  <Image
                    src={cert.icon}
                    alt={cert.name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-sans text-[10px] sm:text-[11px] font-bold text-[#F4F0E6] leading-none tracking-wide">
                    {cert.name}
                  </span>
                  <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-wider text-[#D4AF37] mt-0.5 font-medium">
                    {cert.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= ACTION CTAs ================= */}
          <div
            ref={ctaGroupRef}
            className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-7 sm:mb-9"
          >
            {/* Primary Action */}
            <Link
              href="/invest#investment-models"
              className="group relative w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-[#F3D36A] shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(243,211,106,0.55)] text-center cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Investment Models
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
              className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#12110F]/85 backdrop-blur-md text-[#F4F0E6] border border-[#D4AF37]/35 font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-[#D4AF37] hover:text-[#F3D36A] hover:bg-[#12110F] text-center cursor-pointer shadow-md"
            >
              Executive Term Sheet
            </Link>
          </div>

          {/* ================= TELEMETRY METRIC STRIP ================= */}
          <div
            ref={telemetryRef}
            className="w-full grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-5 border-t border-[#D4AF37]/20"
          >
            {TELEMETRY_STRIP.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center lg:items-start p-2.5 sm:p-3 rounded-xl bg-[#12110F]/70 border border-[#D4AF37]/15 backdrop-blur-sm"
              >
                <span className="text-[#F3D36A] font-serif text-sm sm:text-lg font-bold tracking-wider">
                  {metric.value}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#C3BDAF] font-medium mt-0.5 text-center lg:text-left">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Subtle floor vignette blend */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}