"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DistilleryOrigin() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image stage entrance
      gsap.fromTo(
        imageCardRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Editorial typography reveal
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textColRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 3. Quote reveal
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, x: 18 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 4. Metric pill strip entrance
      if (metricsRef.current) {
        gsap.fromTo(
          metricsRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 88%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="distillery"
      data-cursor-theme="light"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-[#FBF8F1] via-[#F4EFE6] to-[#EAE3D2] text-[#191713] overflow-hidden select-none"
    >
      {/* Background Watermark Lion Crest */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] aspect-square pointer-events-none opacity-[0.038] z-0">
        <Image
          src="/icon.png"
          alt="Bacchus Lion Watermark"
          fill
          className="object-contain"
        />
      </div>

      {/* Subtle Warm Amber Refraction Glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,122,30,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ================= EDITORIAL SECTION HEADER ================= */}
        <div className="flex flex-col items-center lg:items-start mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#8E7626]" />
            <p className="font-serif tracking-[0.3em] text-xs text-[#8E7626] uppercase font-bold">
              ORIGIN &bull; THE DISTILLERY
            </p>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#8E7626]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#14120E] tracking-wide text-center lg:text-left leading-tight">
            The Soul of Bacchus &mdash; <br className="hidden sm:inline" />
            <span className="italic font-light text-[#8E7626]">
              Punjab, India.
            </span>
          </h2>
        </div>

        {/* ================= ASYMMETRIC GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* LEFT: MASTER CRAFT IMAGE STAGE (7 COLS) */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              ref={imageCardRef}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-[#8E7626]/30 shadow-[0_20px_45px_rgba(40,30,15,0.12)] bg-[#12110F] group"
            >
              <Image
                src="/assets/about-banner2.png"
                alt="Bacchus Distillery Punjab copper pot stills and oak barrel cellar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center filter brightness-[0.96] contrast-[1.04] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />

              {/* Light Framing Glaze */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A]/85 via-transparent to-transparent pointer-events-none" />

              {/* Floating Craft Pill: Copper Distillation */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2.5 rounded-xl bg-[#FAF7F0]/95 border border-[#8E7626]/35 backdrop-blur-md flex items-center gap-3 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#8E7626] animate-pulse" />
                <div className="flex flex-col">
                  <span className="font-serif text-[11px] sm:text-xs text-[#14120E] font-bold tracking-wider uppercase">
                    Authentic Copper Stills
                  </span>
                  <span className="font-sans text-[9px] text-[#6E6554] uppercase tracking-[0.16em] font-medium">
                    Batch Pot Distillation
                  </span>
                </div>
              </div>

              {/* Floating Origin Seal */}
              {/* <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-[#FAF7F0]/90 border border-[#8E7626]/30 backdrop-blur-md shadow-sm">
                <span className="font-serif text-[10px] text-[#8E7626] uppercase tracking-[0.2em] font-bold">
                  Punjab Facility &bull; Est. 1994
                </span>
              </div> */}
            </div>
          </div>

          {/* RIGHT: EDITORIAL PROSE & MANIFESTO (5 COLS) */}
          <div ref={textColRef} className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#8E7626] uppercase">
                A 32-Year Journey
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#4A4337] leading-relaxed mb-4 font-normal">
              In the vibrant heart of Punjab stands the soul of Bacchus Distillery &mdash; a facility where 
              craftsmanship meets legacy. Here, copper stills whisper stories of tradition, and every barrel 
              reflects decades of distillation mastery.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#4A4337] leading-relaxed mb-6 font-normal">
              From grain to glass, each spirit is carefully crafted, drawing strength from the land and precision 
              from modern innovation. It is more than a facility; it is a living testament where heritage is distilled, 
              bottled, and shared across 19 countries.
            </p>

            {/* Parchment Pull Quote */}
            <blockquote
              ref={quoteRef}
              className="relative pl-5 sm:pl-6 py-3 border-l-2 border-[#8E7626] bg-[#FAF7F0]/70 rounded-r-xl border border-y-transparent border-r-[#8E7626]/10 mb-7 shadow-xs"
            >
              <p className="font-serif italic text-base sm:text-lg text-[#14120E] leading-snug">
                &ldquo;We don&apos;t just make spirits &mdash; we craft experiences, tailored for every palate and poured with distinction.&rdquo;
              </p>
              <span className="block mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8E7626] font-bold">
                Bacchus Distellery Manifesto
              </span>
            </blockquote>

            {/* Router Action */}
            <div className="flex items-center">
              <Link
                href="/brands"
                className="group inline-flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.22em] text-[#14120E] font-bold hover:text-[#8E7626] transition-colors"
              >
                <span>Explore The Brand Vault</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 text-[#8E7626]"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>

        </div>

        {/* ================= LIGHT DOSSIER PILL STRIP ================= */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-16 sm:mt-20 pt-10 border-t border-[#8E7626]/25"
        >
          <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs flex flex-col">
            <span className="font-serif text-lg sm:text-xl text-[#8E7626] font-bold">1992 / 1994</span>
            <span className="font-sans text-[10px] text-[#6E6554] uppercase tracking-[0.18em] font-semibold mt-1">
              Private Distillation Pioneer
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs flex flex-col">
            <span className="font-serif text-lg sm:text-xl text-[#8E7626] font-bold">Pure Copper</span>
            <span className="font-sans text-[10px] text-[#6E6554] uppercase tracking-[0.18em] font-semibold mt-1">
              Pot Distillation Method
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs flex flex-col">
            <span className="font-serif text-lg sm:text-xl text-[#8E7626] font-bold">Grain To Glass</span>
            <span className="font-sans text-[10px] text-[#6E6554] uppercase tracking-[0.18em] font-semibold mt-1">
              Punjab Harvest Barley
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs flex flex-col">
            <span className="font-serif text-lg sm:text-xl text-[#8E7626] font-bold">19 Nations</span>
            <span className="font-sans text-[10px] text-[#6E6554] uppercase tracking-[0.18em] font-semibold mt-1">
              Global Export Reach
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}