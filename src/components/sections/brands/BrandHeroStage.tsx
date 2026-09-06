"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { BRAND_BANNERS } from "@/data/brand-banners";

export default function BrandHeroStage() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const activeSlide = BRAND_BANNERS[index];

  const changeSlide = (nextIndex: number) => {
    if (nextIndex === index) return;

    gsap.to(textGroupRef.current, {
      opacity: 0,
      y: -14,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setIndex(nextIndex);
        gsap.fromTo(
          textGroupRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
        );
      },
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((index + 1) % BRAND_BANNERS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-end items-center bg-[#050505] overflow-hidden select-none"
    >
      {/* ---------------- 1. CROSS-FADING CINEMATIC BACKGROUNDS ---------------- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {BRAND_BANNERS.map((banner, i) => (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transition: "opacity 1.2s ease-in-out, transform 8s ease-out" }}
          >
            <Image
              src={banner.imageSrc}
              alt={banner.brand}
              fill
              priority={i === 0}
              quality={95}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Studio Lighting Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_95%)] pointer-events-none" />

        {/* Dynamic Studio Gradient Scrims: Center Highlight Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 via-45% to-transparent lg:via-[#050505]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent h-40" />

        {/* Ambient Radial Color Bloom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000"
          style={{ background: activeSlide.palette.glow }}
        />
      </div>

      {/* ---------------- 2. CENTERED TEXT CONTENT (DESKTOP & MOBILE) ---------------- */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-36 pb-12 sm:pb-16 flex flex-col items-center text-center">
        
        {/* Mobile Viewport Breathing Room for Bottle Visuals */}
        <div className="lg:hidden h-[26vh] sm:h-[32vh] w-full pointer-events-none" />

        <div ref={textGroupRef} className="w-full flex flex-col items-center">
          
          {/* Category Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-6 sm:w-10 h-[1px] transition-colors duration-700"
              style={{ background: activeSlide.palette.accent }}
            />
            <p
              className="font-serif tracking-[0.3em] text-[10px] sm:text-xs uppercase font-semibold transition-colors duration-700"
              style={{ color: activeSlide.palette.accent }}
            >
              {activeSlide.category}
            </p>
            <span
              className="w-6 sm:w-10 h-[1px] transition-colors duration-700"
              style={{ background: activeSlide.palette.accent }}
            />
          </div>

          {/* Master Display Brand Title */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F4F0E6] tracking-wide mb-2 leading-none">
            {activeSlide.brand}
          </h2>

          {/* Headline & Narrative Tagline */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F3D36A] italic font-light tracking-wide mb-3 leading-tight">
            {activeSlide.headline}
          </h1>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#C3BDAF] max-w-md sm:max-w-lg leading-relaxed mb-6 font-light">
            {activeSlide.tagline}
          </p>

          {/* CTA Action */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link
              href={activeSlide.link}
              className="group relative px-8 sm:px-10 py-3.5 rounded-full bg-[#D4AF37] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-[#F3D36A] shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Discover Expression
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

          {/* 3-Column Centered Telemetry Bar */}
          <div className="w-full max-w-md grid grid-cols-3 gap-2.5 sm:gap-4 pt-5 border-t border-white/10">
            <div className="flex flex-col items-center p-2 rounded-lg bg-[#12110F]/60 border border-white/5 backdrop-blur-sm">
              <span className="text-[#F3D36A] font-serif text-xs sm:text-sm font-bold tracking-wider">
                {activeSlide.telemetry.left.value}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#C3BDAF] mt-0.5">
                {activeSlide.telemetry.left.label}
              </span>
            </div>

            <div className="flex flex-col items-center p-2 rounded-lg bg-[#12110F]/60 border border-white/5 backdrop-blur-sm">
              <span className="text-[#F3D36A] font-serif text-xs sm:text-sm font-bold tracking-wider">
                {activeSlide.telemetry.center.value}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#C3BDAF] mt-0.5">
                {activeSlide.telemetry.center.label}
              </span>
            </div>

            <div className="flex flex-col items-center p-2 rounded-lg bg-[#12110F]/60 border border-white/5 backdrop-blur-sm">
              <span className="text-[#F3D36A] font-serif text-xs sm:text-sm font-bold tracking-wider">
                {activeSlide.telemetry.right.value}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#C3BDAF] mt-0.5">
                {activeSlide.telemetry.right.label}
              </span>
            </div>
          </div>

        </div>

        {/* ---------------- 3. SLIDE CONTROLS / PAGINATION DOTS ---------------- */}
        <div className="flex items-center gap-2.5 mt-8 z-30">
          {BRAND_BANNERS.map((banner, i) => (
            <button
              key={banner.id}
              onClick={() => changeSlide(i)}
              aria-label={`Go to ${banner.brand}`}
              className="group py-2 px-1 focus:outline-none cursor-pointer"
            >
              <div
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    : "w-3 bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>

      </div>

      {/* Subtle floor vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}