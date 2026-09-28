"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const TELEMETRY = [
  { value: "19+", label: "Export Reach", detail: "Nations & Customs Ports" },
  { value: "40+", label: "House Brands", detail: "Single Malts to Spirits" },
  { value: "03", label: "Continents", detail: "Asia • Europe • Africa" },
  { value: "HMRC", label: "Empanelled", detail: "Scotch Bottling License" },
];

export default function GlobalPresenceHero() {
  const containerRef = useRef<HTMLElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const lionRef = useRef<HTMLDivElement>(null);
  const lionImageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 0. Base Initial State Setup (Prevents flickering during reloads)
      gsap.set(
        [
          eyebrowRef.current,
          headlineRef.current,
          copyRef.current,
          ctaGroupRef.current ? ctaGroupRef.current.children : [],
          tickerRef.current ? tickerRef.current.children : [],
        ],
        { autoAlpha: 0 }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // PHASE 1: Gentle Pop, Sovereign 360 Spin & Specular Bloom
      tl.fromTo(
        lionRef.current,
        {
          scale: 0.3,
          autoAlpha: 0,
          rotation: -270,
        },
        {
          scale: 1.15,
          autoAlpha: 1,
          rotation: 0,
          duration: 2.2,
          ease: "expo.out",
        },
        0.1
      )
        .fromTo(
          lionImageRef.current,
          {
            filter: "drop-shadow(0 0 10px rgba(212,175,55,0.2)) brightness(1)",
          },
          {
            filter:
              "drop-shadow(0 0 65px rgba(243,211,106,0.8)) drop-shadow(0 0 30px rgba(200,122,30,0.6)) brightness(1.6)",
            duration: 1.6,
            ease: "sine.inOut",
          },
          0.3
        )
        .fromTo(
          flareRef.current,
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1.25, duration: 2.6, ease: "sine.out" },
          0.1
        );

      // PHASE 2: Emblem Glides Back into the Ambient Watermark
      tl.to(
        lionRef.current,
        {
          scale: 0.95,
          opacity: 0.07,
          duration: 2.2,
          ease: "power2.inOut",
        },
        "-=0.6"
      )
        .to(
          lionImageRef.current,
          {
            filter: "drop-shadow(0 0 20px rgba(212,175,55,0.2)) brightness(1)",
            duration: 2.0,
            ease: "power2.out",
          },
          "-=2.0"
        )
        .to(
          flareRef.current,
          {
            opacity: 0.65,
            scale: 1,
            duration: 2.0,
            ease: "power1.out",
          },
          "-=1.8"
        );

      // PHASE 3: Editorial Typography Reveal Triggered Smoothly by the Recoil
      tl.fromTo(
        eyebrowRef.current,
        { autoAlpha: 0, y: 16, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
        "-=1.3"
      )
        .fromTo(
          headlineRef.current,
          { autoAlpha: 0, y: 24, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
          },
          "-=1.0"
        )
        .fromTo(
          copyRef.current,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "-=1.0"
        )
        .fromTo(
          ctaGroupRef.current ? ctaGroupRef.current.children : [],
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power2.out" },
          "-=0.8"
        )
        .fromTo(
          tickerRef.current ? tickerRef.current.children : [],
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-cursor-theme="dark"
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between bg-[#050505] text-[#F4F0E6] overflow-hidden select-none pt-28 sm:pt-36 pb-12 lg:pb-16"
    >
      {/* Geodesic Grid Projection */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 85%)",
        }}
      />

      {/* Coordinate Framing Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[980px] lg:w-[1280px] aspect-square rounded-full border border-[#D4AF37]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[680px] lg:w-[860px] aspect-square rounded-full border border-dashed border-[#8E7626]/15 pointer-events-none" />

      {/* Ambient Liquid Amber Flare */}
      <div
        ref={flareRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] lg:w-[1100px] h-[450px] sm:h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(200,122,30,0.25)_0%,rgba(142,118,38,0.08)_42%,transparent_70%)] pointer-events-none blur-[90px]"
      />

      {/* Centered Lion Emblem */}
      <div
        ref={lionRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[440px] lg:w-[580px] aspect-square pointer-events-none z-10 flex items-center justify-center will-change-transform"
      >
        <div ref={lionImageRef} className="relative w-full h-full">
          <Image
            src="/icon.png"
            alt="Origin Royal Lion Crest"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Editorial Content Core */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center my-auto">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-5 sm:mb-6">
          <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#F3D36A]" />
          <p className="font-serif tracking-[0.32em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-bold">
            ESTABLISHED 1992 • GLOBAL TRADE FOOTPRINT
          </p>
          <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37] to-[#F3D36A]" />
        </div>

        {/* Display Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-[#F4F0E6] tracking-tight leading-[1.08] mb-6"
        >
          Crafted in Punjab. <br />
          <span className="italic font-normal bg-gradient-to-r from-[#D4AF37] via-[#FFF3D0] to-[#F3D36A] bg-clip-text text-transparent">
            Poured Across Continents.
          </span>
        </h1>

        {/* Editorial Body */}
        <p
          ref={copyRef}
          className="font-sans text-xs sm:text-sm md:text-base text-[#C3BDAF] leading-relaxed max-w-2xl font-light mb-8 sm:mb-10"
        >
          From the copper pot stills of Punjab to commercial corridors spanning
          over 19 countries. Partnering with national distributors, boutique luxury
          retailers, duty-free chains, and institutional buyers across Asia,
          Europe, and Africa.
        </p>

        {/* Trade CTAs */}
        <div
          ref={ctaGroupRef}
          className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5"
        >
          <Link
            href="/brands"
            className="group relative w-full sm:w-auto px-8 sm:px-9 py-3.5 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-[#F3D36A] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(243,211,106,0.5)] text-center cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Brands
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent ease-in-out" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 rounded-full bg-[#0E0C0A]/80 backdrop-blur-md text-[#F4F0E6] border border-[#D4AF37]/35 font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-[#D4AF37] hover:text-[#F3D36A] hover:bg-[#1A1713] text-center cursor-pointer shadow-md"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Macro Telemetry Strip */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 mt-12 lg:mt-16">
        <div
          ref={tickerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#D4AF37]/20"
        >
          {TELEMETRY.map((item) => (
            <div
              key={item.label}
              className="group relative p-4 rounded-xl bg-[#0B0A08]/80 border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F3D36A] tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  {item.value}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 group-hover:bg-[#F3D36A] transition-colors" />
              </div>

              <div>
                <span className="block font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold text-[#F4F0E6]">
                  {item.label}
                </span>
                <span className="block font-sans text-[9px] text-[#C3BDAF]/80 font-light mt-0.5 line-clamp-1">
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}