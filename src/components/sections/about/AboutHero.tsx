"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const METRICS = [
  { value: "32+ YEARS", label: "Mastery" },
  { value: "40+ BRANDS", label: "Portfolio" },
  { value: "19 NATIONS", label: "Global Reach" },
];

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial Atmospheric Canvas Scale & Flare Bloom
      tl.fromTo(
        imageWrapRef.current,
        { scale: 1.07, filter: "brightness(0.7) contrast(1.15)" },
        { scale: 1, filter: "brightness(0.92) contrast(1.05)", duration: 2.2, ease: "power2.out" },
        0
      )
      .fromTo(
        ambientGlowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 2.4, ease: "power2.out" },
        0.2
      );

      // 2. Editorial Typography Staggered Reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" },
        0.55
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.75
      );

      // 3. CTA Buttons & Telemetry Bar Entry
      tl.fromTo(
        ctaGroupRef.current ? ctaGroupRef.current.children : [],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        0.95
      )
      .fromTo(
        telemetryRef.current ? telemetryRef.current.children : [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        1.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-cursor-theme="dark"
      className="relative w-full min-h-screen flex flex-col justify-end lg:justify-center bg-[#050505] overflow-hidden select-none"
    >
      {/* ================= MASTER HERO BACKGROUND ================= */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <Image
          src="/assets/about-banner.png"
          alt="House of Bacchus heritage lounge and distillation mastery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[76%_center] lg:object-right filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Desktop Lateral Scrim: Leaves right bottle & dram intact while providing crisp left contrast */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 via-45% to-transparent w-[68%]" />

        {/* Mobile Scrim: Ambient reveal top, dark base below */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/70 to-[#050505]" />
      </div>

      {/* Atmospheric Amber Flare */}
      <div
        ref={ambientGlowRef}
        className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center_left,rgba(200,122,30,0.12)_0%,transparent_65%)]"
      />

      {/* ================= FOREGROUND EDITORIAL CONTENT ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-14 lg:py-24 flex flex-col justify-end lg:justify-center min-h-screen">
        
        {/* Mobile Spacer to clear upper bottle dram */}
        <div className="lg:hidden h-[34vh] sm:h-[40vh] w-full pointer-events-none" />

        {/* Editorial Content Column (Left Aligned) */}
        <div className="w-full lg:max-w-xl xl:max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Eyebrow Stamp */}
          <div ref={eyebrowRef} className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-[1px] bg-gold-royal/50" />
            <p className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-gold-royal uppercase font-semibold">
              BACCHUS WORLD SPIRITS &bull; EST. 1994
            </p>
            <span className="w-6 h-[1px] bg-gold-royal/50" />
          </div>

          {/* Core Display Headline */}
          <h1
            ref={titleRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-ivory tracking-wide leading-[1.06] mb-5"
          >
            A 32-Year Legacy <br />
            <span className="italic font-normal text-gold-bright">
              Distilled in Excellence.
            </span>
          </h1>

          {/* Narrative Body */}
          <p
            ref={descRef}
            className="font-sans text-xs sm:text-sm md:text-base text-champagne/90 leading-relaxed max-w-md lg:max-w-xl mb-8 font-light"
          >
            Blending time-honored distillation heritage with modern innovation to create spirits of 
            uncompromising quality. From our private distillation roots in Punjab to discerning palates 
            across 19 countries, we craft benchmark experiences poured with distinction.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3.5 mb-10"
          >
            <Link
              href="/brands"
              className="group relative w-full sm:w-auto px-8 sm:px-9 py-3.5 rounded-full bg-gold-royal text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-gold-bright shadow-[0_0_25px_rgba(212,175,55,0.28)] hover:shadow-[0_0_35px_rgba(243,211,106,0.5)] text-center cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Brands
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

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 sm:px-9 py-3.5 rounded-full bg-surface-1/80 backdrop-blur-md text-ivory border border-gold-royal/35 font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-gold-royal hover:text-gold-bright hover:bg-surface-2 text-center cursor-pointer shadow-md"
            >
              Investor Connect
            </Link>
          </div>

          {/* Interactive Metric Dossier Tiles */}
          <div
            ref={telemetryRef}
            className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 pt-6 border-t border-gold-royal/20"
          >
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="group flex flex-col items-center lg:items-start p-3 rounded-lg bg-surface-1/60 border border-gold-royal/15 backdrop-blur-sm transition-all duration-300 hover:border-gold-royal/40 hover:bg-surface-1/90 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,122,30,0.12)] cursor-default"
              >
                <span className="text-gold-bright font-serif text-sm sm:text-base font-bold tracking-wider group-hover:text-gold-royal transition-colors">
                  {metric.value}
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-ivory/80 font-medium mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Floor Blend to Obsidian */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}