"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { RAIL_BOTTLES, RailBottleItem } from "@/data/story-rail";

export default function BottleStoryRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const bottleHeroRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const specBoardRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const activeBottle: RailBottleItem = RAIL_BOTTLES[activeIndex];

  // Desktop Transition with GSAP Stagger and Specular Reveal
  const triggerTransition = useCallback((nextIdx: number) => {
    if (nextIdx === activeIndex) return;

    if (bottleHeroRef.current && reflectionRef.current && specBoardRef.current) {
      gsap.to([bottleHeroRef.current, reflectionRef.current], {
        opacity: 0,
        y: 20,
        scale: 0.94,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(nextIdx);
          gsap.fromTo(
            [bottleHeroRef.current, reflectionRef.current],
            { opacity: 0, y: -26, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.4)" }
          );
        },
      });

      gsap.fromTo(
        specBoardRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" }
      );
    } else {
      setActiveIndex(nextIdx);
    }
  }, [activeIndex]);

  // Mobile Swipe Snapping Observer (Auto-detects focused card during scroll)
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    const cards = scrollContainer.querySelectorAll<HTMLDivElement>("[data-mobile-card]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.65) {
            const indexAttr = entry.target.getAttribute("data-index");
            if (indexAttr !== null) {
              const nextIdx = parseInt(indexAttr, 10);
              setActiveIndex(nextIdx);
            }
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.65,
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Programmatic Scroll for Mobile Indicator Buttons
  const scrollToMobileCard = (idx: number) => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    const targetCard = scrollContainer.querySelector<HTMLDivElement>(`[data-index="${idx}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-16 sm:py-24 lg:py-28 bg-[#050505] text-[#F4F0E6] overflow-hidden select-none"
    >
      {/* Dynamic Ambient Backlight Bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[750px] h-[340px] sm:h-[600px] lg:h-[750px] rounded-full blur-[110px] lg:blur-[160px] pointer-events-none transition-all duration-1000 ease-out"
        style={{ background: activeBottle.glow }}
      />

      {/* Atmospheric Studio Vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_95%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        
        {/* ================= HEADER ================= */}
        <div className="w-full flex flex-col items-center text-center mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-6 sm:w-10 h-[1px] transition-colors duration-700"
              style={{ background: activeBottle.accent }}
            />
            <p
              className="font-serif tracking-[0.34em] text-[10px] sm:text-xs uppercase font-bold transition-colors duration-700"
              style={{ color: activeBottle.accent }}
            >
              The Master Reserve &bull; Stage Inspector
            </p>
            <span
              className="w-6 sm:w-10 h-[1px] transition-colors duration-700"
              style={{ background: activeBottle.accent }}
            />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-wide text-[#F4F0E6] transition-all duration-500">
            {activeBottle.name}
          </h2>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C3BDAF] mt-1 font-light">
            {activeBottle.sub}
          </p>
        </div>

        {/* ================= DESKTOP STAGE (SPLIT 3-COLUMN RUNWAY) ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center w-full min-h-[640px]">
          
          {/* LEFT: SELECTOR CAROUSEL RAIL (4 COLS) */}
          <div className="col-span-4 flex flex-col gap-3.5">
            {RAIL_BOTTLES.map((bottle, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={bottle.id}
                  onClick={() => triggerTransition(idx)}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-500 border ${
                    isSelected
                      ? "bg-[#12110F] border-white/20 shadow-[0_12px_35px_rgba(0,0,0,0.85)] translate-x-2"
                      : "bg-[#0C0B09]/50 border-white/5 hover:bg-[#12110F]/70 hover:border-white/15 hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className="font-serif text-xs tracking-widest font-bold transition-colors duration-500"
                        style={{ color: isSelected ? bottle.accent : "#77736A" }}
                      >
                        {bottle.num}
                      </span>
                      <div className="flex flex-col">
                        <h3 className="font-serif text-base text-[#F4F0E6] group-hover:text-white transition-colors">
                          {bottle.name}
                        </h3>
                        <span className="font-sans text-[10px] text-[#C3BDAF] uppercase tracking-[0.14em]">
                          {bottle.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-sans font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded transition-all duration-500 ${
                        isSelected
                          ? "opacity-100 bg-white/10 text-white shadow-inner"
                          : "opacity-0 -translate-x-2"
                      }`}
                    >
                      Active
                    </span>
                  </div>

                  {/* Active Indicator Accent Blade */}
                  <div
                    className={`absolute left-0 inset-y-2 w-1 rounded-r transition-all duration-500 ${
                      isSelected ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    }`}
                    style={{ background: bottle.accent }}
                  />
                </div>
              );
            })}
          </div>

          {/* CENTER: BOTTLE SPOTLIGHT (4 COLS) */}
          <div className="col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-[340px] h-[520px] flex items-center justify-center">
              
              {/* Reflected Base Glow */}
              <div
                ref={reflectionRef}
                className="absolute bottom-2 w-44 h-8 rounded-[100%] blur-[14px] opacity-80 transition-colors duration-1000"
                style={{ background: activeBottle.accent }}
              />

              {/* Main Standing Bottle Canvas */}
              <div
                ref={bottleHeroRef}
                className="relative w-full h-full will-change-transform drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)]"
              >
                <Image
                  src={activeBottle.bottleImg}
                  alt={activeBottle.name}
                  fill
                  priority
                  quality={95}
                  sizes="380px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: SPECIFICATIONS & SENSORY DOSSIER (4 COLS) */}
          <div ref={specBoardRef} className="col-span-4 flex flex-col pl-4">
            <div className="p-7 rounded-2xl bg-[#12110F]/80 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-white/20">
              <span
                className="font-serif text-[11px] uppercase tracking-[0.24em] font-bold transition-colors duration-500"
                style={{ color: activeBottle.accent }}
              >
                Expression Dossier
              </span>

              <p className="font-sans text-xs text-[#C3BDAF] leading-relaxed mt-2.5 mb-6 font-light">
                {activeBottle.tagline}
              </p>

              {/* Sensory Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeBottle.notes.map((note) => (
                  <span
                    key={note}
                    className="px-2.5 py-1 rounded-full bg-[#050505] border border-white/10 text-[10px] text-[#F4F0E6] uppercase tracking-[0.14em] transition-transform duration-300 hover:scale-105"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* 2x2 Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/10 mb-6">
                <div className="flex flex-col">
                  <span className="font-serif text-sm text-[#F4F0E6] font-bold">
                    {activeBottle.specs.abv}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#77736A] mt-0.5">
                    Strength
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-sm text-[#F4F0E6] font-bold">
                    {activeBottle.specs.proof}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#77736A] mt-0.5">
                    Proof
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-sm text-[#F4F0E6] font-bold">
                    {activeBottle.specs.volume}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#77736A] mt-0.5">
                    Volume
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-sm text-[#F4F0E6] font-bold line-clamp-1">
                    {activeBottle.specs.cask}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#77736A] mt-0.5">
                    Maturation
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={activeBottle.link}
                className="group relative w-full py-3.5 rounded-full flex items-center justify-center gap-2 font-sans font-bold text-[10px] uppercase tracking-[0.22em] text-[#050505] overflow-hidden transition-all duration-300 shadow-lg hover:brightness-110"
                style={{ background: activeBottle.accent }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Inspect Vault Profile
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
            </div>
          </div>

        </div>

        {/* ================= MOBILE VIEWPORT (NATIVE TOUCH SWIPE RAIL) ================= */}
        <div className="lg:hidden w-full flex flex-col items-center">
          
          {/* Snap-Mandatory Horizontal Scroller */}
          <div
            ref={mobileScrollRef}
            className="w-full flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 no-scrollbar px-2"
          >
            {RAIL_BOTTLES.map((bottle, idx) => {
              const isCardActive = activeIndex === idx;
              return (
                <div
                  key={`mob-${bottle.id}`}
                  data-mobile-card
                  data-index={idx}
                  className={`min-w-[85vw] sm:min-w-[70vw] snap-center flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 ${
                    isCardActive
                      ? "bg-[#12110F] border-white/25 shadow-[0_20px_45px_rgba(0,0,0,0.9)] scale-[1.01]"
                      : "bg-[#0C0B09]/80 border-white/5 opacity-70 scale-[0.98]"
                  }`}
                >
                  {/* Spotlight Viewport */}
                  <div className="relative w-full h-[360px] sm:h-[400px] bg-gradient-to-b from-[#050505] to-[#12110F] flex items-center justify-center p-6">
                    <div
                      className="absolute w-52 h-52 rounded-full blur-[80px] opacity-40 transition-colors duration-700"
                      style={{ background: bottle.accent }}
                    />
                    
                    {/* Bottle Silhouette */}
                    <div className="relative w-full h-full">
                      <Image
                        src={bottle.bottleImg}
                        alt={bottle.name}
                        fill
                        quality={92}
                        sizes="85vw"
                        className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                      />
                    </div>

                    {/* Proof Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-md"
                      style={{ background: bottle.accent, color: "#050505" }}
                    >
                      {bottle.specs.proof}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-xs tracking-widest text-[#77736A]">
                          {bottle.num} / 05
                        </span>
                        <span
                          className="text-[9px] font-sans font-bold uppercase tracking-[0.16em]"
                          style={{ color: bottle.accent }}
                        >
                          {bottle.category}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#F4F0E6] mb-1">
                        {bottle.name}
                      </h3>
                      <p className="text-[10px] uppercase font-sans tracking-[0.14em] text-[#C3BDAF] mb-3">
                        {bottle.sub}
                      </p>
                      <p className="text-xs text-[#C3BDAF] font-light leading-relaxed mb-4">
                        {bottle.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {bottle.notes.map((note) => (
                          <span
                            key={note}
                            className="px-2 py-0.5 rounded bg-[#050505] border border-white/10 text-[9px] text-[#F4F0E6] uppercase tracking-[0.12em]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-sans font-bold text-[#F4F0E6] uppercase tracking-[0.16em]">
                        {bottle.specs.abv} &bull; {bottle.specs.volume}
                      </span>
                      <Link
                        href={bottle.link}
                        className="px-5 py-2.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#050505] shadow-md"
                        style={{ background: bottle.accent }}
                      >
                        Inspect &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Synchronized Pagination Dots for Mobile */}
          <div className="flex items-center gap-2.5 mt-4">
            {RAIL_BOTTLES.map((bottle, idx) => (
              <button
                key={`dot-${bottle.id}`}
                onClick={() => scrollToMobileCard(idx)}
                aria-label={`Go to ${bottle.name}`}
                className="py-2 px-1 focus:outline-none"
              >
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeIndex === idx
                      ? "w-8 shadow-sm"
                      : "w-2 bg-white/20"
                  }`}
                  style={{
                    background: activeIndex === idx ? activeBottle.accent : undefined,
                  }}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-3 text-[#77736A] text-[10px] uppercase tracking-[0.24em] font-sans">
            <span>&larr; Swipe To Inspect Expressions &rarr;</span>
          </div>
        </div>

      </div>
    </section>
  );
}