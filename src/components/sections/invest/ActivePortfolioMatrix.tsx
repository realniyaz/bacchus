"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

interface BrandItem {
  id: string;
  num: string;
  name: string;
  sub: string;
  tagline: string;
  category: string;
  bottleImg: string;
  palette: {
    bgFrom: string;
    bgVia: string;
    radialFlare: string;
    accent: string;
    glow: string;
  };
  telemetry: {
    abv: string;
    proof: string;
    maturation: string;
  };
  link: string;
}

const ACTIVE_BRANDS: BrandItem[] = [
  {
    id: "talsons-12",
    num: "01",
    name: "TALSONS' RESERVE 12",
    sub: "Double Wood Single Malt",
    tagline: "Twice matured in charred American and European oak casks for twelve uninterrupted years.",
    category: "Master Flagship",
    bottleImg: "/3d/shot5.png",
    palette: {
      bgFrom: "#0a0703",
      bgVia: "#1a0f05",
      radialFlare: "rgba(212, 175, 55, 0.22)",
      accent: "#D4AF37",
      glow: "rgba(212, 175, 55, 0.4)",
    },
    telemetry: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      maturation: "12 Yrs Double Wood",
    },
    link: "/invest#portfolio",
  },
  {
    id: "jackies-crown",
    num: "02",
    name: "JACKIE'S CROWN",
    sub: "Blended Crafted Malt",
    tagline: "Where heritage meets swagger. Engineered for late nights and lively discourse.",
    category: "Metropolis Tier",
    bottleImg: "/3d/shot2.png",
    palette: {
      bgFrom: "#0c0a03",
      bgVia: "#1c1706",
      radialFlare: "rgba(243, 211, 106, 0.22)",
      accent: "#F3D36A",
      glow: "rgba(243, 211, 106, 0.4)",
    },
    telemetry: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      maturation: "Selected Blended Oak",
    },
    link: "/invest#portfolio",
  },
  {
    id: "crazy-boxer",
    num: "03",
    name: "CRAZY BOXER WHISKY",
    sub: "Kinetic Spirit",
    tagline: "Unfiltered punch and knockout shelf velocity. Built to break the rules.",
    category: "Disruption Tier",
    bottleImg: "/3d/shot1.png",
    palette: {
      bgFrom: "#0e0304",
      bgVia: "#220508",
      radialFlare: "rgba(181, 31, 36, 0.26)",
      accent: "#B51F24",
      glow: "rgba(181, 31, 36, 0.45)",
    },
    telemetry: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      maturation: "Charred Wood Impact",
    },
    link: "/invest#portfolio",
  },
  {
    id: "rozzita-vodka",
    num: "04",
    name: "ROZZITA VODKA",
    sub: "Artisanal Cold-Filtered",
    tagline: "Triple-distilled clarity and pure glacial precision across bespoke infusions.",
    category: "Pure Crystal Cut",
    bottleImg: "/3d/shot3.png",
    palette: {
      bgFrom: "#04080b",
      bgVia: "#0a151d",
      radialFlare: "rgba(139, 175, 195, 0.24)",
      accent: "#8BAFC3",
      glow: "rgba(139, 175, 195, 0.4)",
    },
    telemetry: {
      abv: "40.0% V/V",
      proof: "70° PROOF",
      maturation: "Sub-Zero Filtered",
    },
    link: "/invest#portfolio",
  },
  {
    id: "crazy-boxer-rum",
    num: "05",
    name: "CRAZY BOXER XXX RUM",
    sub: "Overproof Dark Spiced",
    tagline: "Forged in deep charred molasses staves against dark ocean storm tides.",
    category: "Deep Cask Reserve",
    bottleImg: "/3d/shot4.png",
    palette: {
      bgFrom: "#0d0702",
      bgVia: "#1f1003",
      radialFlare: "rgba(194, 125, 56, 0.25)",
      accent: "#C27D38",
      glow: "rgba(194, 125, 56, 0.45)",
    },
    telemetry: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      maturation: "Charred Molasses Cask",
    },
    link: "/invest#portfolio",
  },
];

export default function ActivePortfolioMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const bgFlareRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const desktopBottleRef = useRef<HTMLDivElement>(null);
  const desktopDossierRef = useRef<HTMLDivElement>(null);

  const active = ACTIVE_BRANDS[activeIndex];

  // Smooth dynamic background transition on index change
  useEffect(() => {
    if (!containerRef.current || !bgFlareRef.current) return;

    gsap.to(containerRef.current, {
      backgroundColor: active.palette.bgFrom,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(bgFlareRef.current, {
      backgroundImage: `radial-gradient(ellipse at 50% 45%, ${active.palette.radialFlare} 0%, transparent 70%)`,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [activeIndex, active]);

  // Desktop smooth bottle lift and swap animation
  const handleSelectBrand = useCallback((idx: number) => {
    if (idx === activeIndex) return;

    if (desktopBottleRef.current && desktopDossierRef.current) {
      gsap.to([desktopBottleRef.current, desktopDossierRef.current], {
        opacity: 0.3,
        scale: 0.96,
        y: 10,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(idx);
          gsap.to([desktopBottleRef.current, desktopDossierRef.current], {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        },
      });
    } else {
      setActiveIndex(idx);
    }
  }, [activeIndex]);

  // Mobile Native Snap-Scroller Intersection Observer (Updates background on 1-to-1 swipe)
  useEffect(() => {
    const rail = mobileRailRef.current;
    if (!rail) return;

    const cards = rail.querySelectorAll<HTMLElement>("[data-brand-card]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-brand-index"));
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      { root: rail, threshold: 0.65 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="active-portfolio"
      className="relative w-full min-h-screen py-20 sm:py-28 text-[#F4F0E6] select-none overflow-hidden transition-colors duration-700 bg-[#050505]"
    >
      {/* Dynamic Centered Radial Background Light */}
      <div
        ref={bgFlareRef}
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 45%, ${active.palette.radialFlare} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle CAD / Grid Blueprint Wireframe */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #D4AF37 1px, transparent 1px),
            linear-gradient(to bottom, #D4AF37 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12110F]/80 border border-white/10 mb-3 backdrop-blur-md">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-500 animate-pulse"
              style={{ backgroundColor: active.palette.accent }}
            />
            <span className="font-serif tracking-[0.24em] text-[10px] sm:text-xs text-[#C3BDAF] font-bold uppercase">
              Commercial Matrix &bull; Active Portfolio
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F4F0E6] tracking-tight leading-tight">
            High-Yield <span className="italic font-light" style={{ color: active.palette.accent }}>Spirits Lineup.</span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 1. DESKTOP INTERACTIVE DISPLAY (GRID / DYNAMIC HOVER STAGE)               */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[560px]">
          {/* Left: Interactive 5-Brand Selector List (4 Cols) */}
          <div className="col-span-4 flex flex-col gap-2.5">
            {ACTIVE_BRANDS.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleSelectBrand(idx)}
                  className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#12110F]/90 border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] scale-[1.02]"
                      : "bg-[#0A0908]/50 border-white/5 hover:border-white/20 hover:bg-[#12110F]/40"
                  }`}
                  style={{
                    borderColor: isSelected ? item.palette.accent : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isSelected ? item.palette.accent : "#77736A" }}
                    >
                      {item.num}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#77736A] font-medium">
                      {item.category}
                    </span>
                  </div>

                  <h3
                    className="font-serif text-lg font-bold transition-colors"
                    style={{ color: isSelected ? "#FFFFFF" : "#C3BDAF" }}
                  >
                    {item.name}
                  </h3>

                  <span className="text-[10px] text-[#77736A] font-sans mt-0.5">
                    {item.sub}
                  </span>

                  {/* Left Accent indicator line */}
                  {isSelected && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                      style={{ backgroundColor: item.palette.accent }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Center: High-Res 3D Bottle Viewport (4 Cols) */}
          <div
            ref={desktopBottleRef}
            className="col-span-4 relative h-[560px] flex items-center justify-center will-change-transform"
          >
            <div
              className="absolute w-[280px] h-[440px] rounded-full blur-3xl opacity-40 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: active.palette.glow }}
            />
            <div className="relative w-full h-full max-h-[500px]">
              <Image
                src={active.bottleImg}
                alt={active.name}
                fill
                priority
                sizes="(max-width: 1200px) 33vw, 400px"
                className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          {/* Right: Technical Dossier & Allocation CTA (4 Cols) */}
          <div
            ref={desktopDossierRef}
            className="col-span-4 flex flex-col justify-between h-full max-h-[500px] p-6 rounded-3xl bg-[#12110F]/75 border border-white/10 backdrop-blur-md shadow-2xl will-change-transform"
          >
            <div>
              <span
                className="font-mono text-xs uppercase tracking-widest font-bold block mb-2"
                style={{ color: active.palette.accent }}
              >
                {active.category} &bull; Spec Sheet
              </span>

              <h3 className="font-serif text-3xl font-bold text-white mb-2 leading-tight">
                {active.name}
              </h3>

              <p className="font-sans text-xs text-[#C3BDAF] leading-relaxed font-light mb-6">
                {active.tagline}
              </p>

              {/* Telemetry Matrix Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 mb-6">
                <div className="p-3 rounded-xl bg-[#050505]/70 border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-[#77736A] block">
                    Alcohol Volume
                  </span>
                  <span className="font-serif text-sm font-bold text-white mt-0.5 block">
                    {active.telemetry.abv}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#050505]/70 border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-[#77736A] block">
                    Proof Rating
                  </span>
                  <span className="font-serif text-sm font-bold text-white mt-0.5 block">
                    {active.telemetry.proof}
                  </span>
                </div>

                <div className="col-span-2 p-3 rounded-xl bg-[#050505]/70 border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-[#77736A] block">
                    Maturation Profile
                  </span>
                  <span className="font-serif text-sm font-bold text-white mt-0.5 block">
                    {active.telemetry.maturation}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/contact?intent=portfolio-allocation"
              className="w-full py-4 rounded-full text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.22em] text-center transition-all duration-300 shadow-lg hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: active.palette.accent }}
            >
              <span>Inquire Allocation</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MOBILE VIEW: 1-TO-1 SWIPE CARD CAROUSEL (NATIVE SNAP-SCROLL)           */}
        {/* ========================================================================= */}
        <div className="lg:hidden w-full flex flex-col items-center">
          {/* Snap-X Touch Rail */}
          <div
            ref={mobileRailRef}
            className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 px-1"
          >
            {ACTIVE_BRANDS.map((item, idx) => (
              <div
                key={item.id}
                data-brand-card
                data-brand-index={idx}
                className="snap-center shrink-0 w-[84vw] max-w-[340px] rounded-3xl p-6 bg-[#12110F]/85 border border-white/10 backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden"
              >
                {/* Ambient Top Glow */}
                <div
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-35 pointer-events-none"
                  style={{ backgroundColor: item.palette.accent }}
                />

                {/* Top Badge & Numeral */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-mono font-bold"
                    style={{ color: item.palette.accent }}
                  >
                    0{idx + 1} / 05
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#77736A] px-2 py-0.5 rounded-full bg-white/5">
                    {item.category}
                  </span>
                </div>

                {/* Central 3D Bottle Shot Viewport */}
                <div className="relative w-full h-[320px] my-2 flex items-center justify-center">
                  <Image
                    src={item.bottleImg}
                    alt={item.name}
                    fill
                    sizes="300px"
                    className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)]"
                  />
                </div>

                {/* Bottle Identity & Specs */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs text-[#C3BDAF] leading-snug line-clamp-2 mb-4 font-light">
                    {item.tagline}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mb-4 text-[10px]">
                    <div className="p-2 rounded-lg bg-[#050505]/70 border border-white/5">
                      <span className="text-[#77736A] block">Strength</span>
                      <span className="font-bold text-white mt-0.5 block">
                        {item.telemetry.abv}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#050505]/70 border border-white/5">
                      <span className="text-[#77736A] block">Maturation</span>
                      <span className="font-bold text-white mt-0.5 block truncate">
                        {item.telemetry.maturation}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/contact?intent=portfolio-allocation"
                    className="w-full py-3.5 rounded-full text-[#050505] font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    style={{ backgroundColor: item.palette.accent }}
                  >
                    <span>Inquire Allocation</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe Indicator Pagination Dots */}
          <div className="flex items-center gap-2 mt-2">
            {ACTIVE_BRANDS.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === dotIdx ? "20px" : "6px",
                  backgroundColor:
                    activeIndex === dotIdx ? active.palette.accent : "#3A3834",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}