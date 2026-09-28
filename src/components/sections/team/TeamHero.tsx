"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const TEAM_TELEMETRY = [
  { value: "32+ YRS", label: "Distillation Lineage" },
  { value: "40+ BRANDS", label: "In-House Formulations" },
  { value: "19+ NATIONS", label: "Trade Stewardship" },
  { value: "HMRC & ISO", label: "Compliance Officers" },
];

export default function TeamHero() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Ambient Amber Flare & Crest Watermark Bloom
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.75 },
        { opacity: 1, scale: 1.1, duration: 2.2, ease: "power2.out" },
        0
      ).fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.85, rotate: -3 },
        { opacity: 0.08, scale: 1, rotate: 0, duration: 2.0, ease: "power2.out" },
        0.1
      );

      // 2. Editorial Typography Stagger
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" },
          0.45
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.65
        );

      // 3. CTA Buttons & Telemetry Bar
      tl.fromTo(
        ctaGroupRef.current ? ctaGroupRef.current.children : [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        0.85
      ).fromTo(
        telemetryRef.current ? telemetryRef.current.children : [],
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        1.05
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-cursor-theme="dark"
      className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-center items-center bg-[#050505] text-[#F4F0E6] overflow-hidden select-none px-6 pt-36 pb-20"
    >
      {/* ================= ATMOSPHERIC AMBIENCE ================= */}
      {/* Central Liquid Amber Flare */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] lg:w-[900px] h-[380px] sm:h-[500px] pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(200,122,30,0.14)_0%,rgba(14,12,10,0.45)_50%,transparent_75%)]"
      />

      {/* Subtle Copper Architectural Blueprint Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.035] bg-[linear-gradient(to_right,#F4F0E6_1px,transparent_1px),linear-gradient(to_bottom,#F4F0E6_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Watermarked Crowned Lion Crest */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[440px] lg:w-[540px] aspect-square pointer-events-none z-0 flex items-center justify-center will-change-transform"
      >
        <Image
          src="/icon.png"
          alt="Origin Royal Lion Watermark"
          fill
          priority
          className="object-contain filter grayscale contrast-125 brightness-150"
        />
      </div>

      {/* ================= EDITORIAL CONTENT CORE ================= */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Stamp */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-5">
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]/50" />
          <p className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-semibold">
            Origin World Spirits &bull; Custodians of Legacy
          </p>
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]/50" />
        </div>

        {/* Master Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#F4F0E6] tracking-tight leading-[1.08] mb-5"
        >
          The Minds Behind the Malt. <br />
          <span className="italic font-light bg-gradient-to-r from-[#D4AF37] via-[#FFF3D0] to-[#F3D36A] bg-clip-text text-transparent">
            The Custodians of Legacy.
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p
          ref={descRef}
          className="font-sans text-xs sm:text-sm md:text-base text-[#C3BDAF]/90 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10"
        >
          Over three decades of distillation precision in Punjab, steered by master blenders, cellar masters, and global trade directors committed to craft, statutory excellence, and international reach.
        </p>

        {/* Primary & Secondary Actions */}
        <div
          ref={ctaGroupRef}
          className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12 sm:mb-14"
        >
          <Link
            href="/team#cmd-profile"
            className="group relative w-full sm:w-auto px-8 sm:px-9 py-3.5 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-[#F3D36A] shadow-[0_0_25px_rgba(212,175,55,0.28)] hover:shadow-[0_0_35px_rgba(243,211,106,0.5)] text-center cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Meet Leadership
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent ease-in-out" />
          </Link>

          <Link
            href="/contact?intent=corporate"
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 rounded-full bg-[#12110F]/80 backdrop-blur-md text-[#F4F0E6] border border-[#D4AF37]/35 font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-[#D4AF37] hover:text-[#F3D36A] hover:bg-[#14120E] text-center cursor-pointer shadow-md"
          >
            Executive Desk
          </Link>
        </div>

        {/* Telemetry Strip */}
        <div
          ref={telemetryRef}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-6 border-t border-[#D4AF37]/15"
        >
          {TEAM_TELEMETRY.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center py-3 px-3 rounded-xl bg-[#12110F]/60 border border-[#D4AF37]/15 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/40 hover:-translate-y-0.5"
            >
              <span className="font-serif text-sm sm:text-base font-bold text-[#F3D36A] tracking-wider mb-0.5">
                {item.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#C3BDAF] font-medium text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Obsidian Floor Vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
    </section>
  );
}