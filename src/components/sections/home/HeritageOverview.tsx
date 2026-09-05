"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeritageOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const lionWatermarkRef = useRef<HTMLDivElement>(null);
  const count1Ref = useRef<HTMLSpanElement>(null);
  const count2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark Lion Parallax
      if (lionWatermarkRef.current) {
        gsap.fromTo(
          lionWatermarkRef.current,
          { y: -20, rotate: -2 },
          {
            y: 25,
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Headline Entrance
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
          },
        }
      );

      // 3. Image Frame Reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.97, y: 18 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );

      // 4. Metric Counters
      const countTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: metricsRef.current,
          start: "top 90%",
        },
      });

      const countObj = { countries: 0, brands: 0 };
      countTimeline.to(countObj, {
        countries: 16,
        brands: 40,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          if (count1Ref.current) count1Ref.current.textContent = `${Math.floor(countObj.countries)}+`;
          if (count2Ref.current) count2Ref.current.textContent = `${Math.floor(countObj.brands)}+`;
        },
      });

      if (metricsRef.current) {
        gsap.fromTo(
          metricsRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 92%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-cursor-theme="light"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 lg:py-14 bg-gradient-to-b from-[#FBF8F1] via-[#F4EFE6] to-[#E9DFCE] text-[#191713] overflow-hidden select-none"
    >
      {/* Background Lion Crest Watermark */}
      <div
        ref={lionWatermarkRef}
        className="absolute -right-6 lg:right-10 top-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[500px] aspect-square pointer-events-none opacity-[0.05] select-none will-change-transform z-0"
      >
        <Image
          src="/icon.png"
          alt="Bacchus Royal Lion Watermark"
          fill
          priority
          className="object-contain filter drop-shadow-[0_8px_25px_rgba(212,175,55,0.35)]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        
        {/* ================= COMPACT HEADER ================= */}
        <div className="flex items-center justify-between border-b border-[#8E7626]/20 pb-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 flex-shrink-0 drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]">
              <Image
                src="/icon.png"
                alt="Bacchus Crest"
                fill
                className="object-contain"
              />
            </div>
            <span className="w-3 h-[1px] bg-[#8E7626]" />
            <p className="font-serif tracking-[0.25em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
              Since &bull; 1994
            </p>
          </div>
          <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.18em] text-[#6B6353] uppercase font-medium">
            ISO 9001 &bull; HACCP &bull; FSSAI
          </span>
        </div>

        {/* ================= MAIN SPLIT VIEWPORT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT: Curated Statement + Actions (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            <h2
              ref={headlineRef}
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#111] tracking-tight leading-[1.08] mb-3"
            >
              Crafted in Time. <br />
              <span className="italic font-light text-[#8E7626]">Benchmarked Globally.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#3D372E] leading-relaxed mb-5 max-w-lg font-normal">
              One of India’s pioneering private spirit houses. From proprietary copper pot distillation 
              to international cellaring, Bacchus delivers consistent craftsmanship across 16+ countries.
            </p>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-3 mb-6 w-full sm:w-auto">
              <Link
                href="/the-vault"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#12110F] text-[#FAF7F0] font-sans font-semibold text-[11px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#8E7626] text-center cursor-pointer shadow-sm"
              >
                Our Brands
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#12110F]/30 text-[#12110F] font-sans font-semibold text-[11px] uppercase tracking-[0.18em] transition-all duration-300 hover:border-[#8E7626] hover:text-[#8E7626] text-center cursor-pointer"
              >
                Our Legacy
              </Link>
            </div>
          </div>

          {/* RIGHT: Compact Editorial Bottle Asset (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={cardRef}
              className="group relative w-full max-w-[290px] sm:max-w-[320px] aspect-[4/5] max-h-[420px] rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_15px_30px_rgba(30,22,10,0.12)] bg-[#E9DFCE]"
            >
              <Image
                src="/all-brands.png"
                alt="Talsons' Reserve 12 Years"
                fill
                priority
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Light reflection sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Bottom Inset Pill */}
              <div className="absolute bottom-2.5 inset-x-2.5 py-1.5 px-3 rounded-md bg-[#FAF7F0]/95 border border-[#8E7626]/20 backdrop-blur-md flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-1.5">
                  <div className="relative w-3.5 h-3.5 flex-shrink-0">
                    <Image
                      src="/icon.png"
                      alt="Lion Crest"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-serif text-[10px] text-[#12110F] tracking-widest font-bold uppercase">
                    Talsons&apos; Reserve 12
                  </span>
                </div>
                <span className="text-[8px] uppercase font-sans tracking-[0.2em] text-[#8E7626] font-bold">
                  Double Wood
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= COMPACT TELEMETRY METRICS ================= */}
        <div
          ref={metricsRef}
          className="mt-6 pt-5 border-t border-[#8E7626]/20 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <div className="p-3 rounded-lg bg-[#FAF7F0]/85 border border-[#8E7626]/15">
            <span ref={count1Ref} className="font-serif text-2xl lg:text-3xl text-[#12110F] font-bold block leading-none mb-1">
              16+
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8E7626] font-bold block">
              Global Ports
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF7F0]/85 border border-[#8E7626]/15">
            <span ref={count2Ref} className="font-serif text-2xl lg:text-3xl text-[#12110F] font-bold block leading-none mb-1">
              40+
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8E7626] font-bold block">
              Active Brands
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF7F0]/85 border border-[#8E7626]/15">
            <span className="font-serif text-2xl lg:text-3xl text-[#12110F] font-bold block leading-none mb-1">
              1992
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8E7626] font-bold block">
              Distillery Origin
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF7F0]/85 border border-[#8E7626]/15">
            <span className="font-serif text-2xl lg:text-3xl text-[#8E7626] font-bold block leading-none mb-1">
              100%
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8E7626] font-bold block">
              Batch Pure
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}