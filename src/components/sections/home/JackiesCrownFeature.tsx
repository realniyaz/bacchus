"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JackiesCrownFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // 1. Text entrance stagger (from right on desktop)
      const textElements = textGroupRef.current?.children;
      if (textElements) {
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textGroupRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // 2. Flavor node tags
      if (tagsRef.current) {
        gsap.fromTo(
          tagsRef.current.children,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 86%",
            },
          }
        );
      }

      // 3. CTA entry
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
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
      className="relative w-full min-h-[720px] lg:h-screen lg:max-h-[920px] flex flex-col justify-end lg:justify-center bg-obsidian overflow-hidden select-none"
    >
      {/* ================= 1. VIDEO LAYER (ZERO DESKTOP OVERLAY) ================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-full h-[52vh] sm:h-[56vh] lg:h-full overflow-hidden">
          <video
            ref={videoRef}
            src="/jackie crown/jc-vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            /*
              Mobile: anchored to object-[8%_center] with slight rightward nudge to center the bottle
              Desktop: object-center edge-to-edge with 1:1 render fidelity
            */
            className="w-full h-full object-cover object-[8%_center] max-sm:scale-110 max-sm:translate-x-2 sm:object-center lg:object-left filter brightness-[0.98] contrast-[1.05]"
          />

          {/* Mobile Bottom Scrim: Blends lower frame into dark card text */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/30 via-55% to-obsidian lg:hidden" />
          
          {/* Mobile Top Shadow */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-obsidian/60 to-transparent lg:hidden" />
        </div>
      </div>

      {/* ================= 2. FOREGROUND CONTENT (PINNED TO RIGHT SIDE) ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-14 lg:py-0 flex flex-col justify-end lg:justify-center">
        
        {/* Mobile Spacer to leave room for the bottle */}
        <div className="lg:hidden h-[36vh] sm:h-[42vh] w-full pointer-events-none" />

        {/* Right-Aligned Text Column on Desktop */}
        <div className="w-full lg:max-w-lg xl:max-w-xl lg:ml-auto flex flex-col items-center lg:items-end text-center lg:text-right">
          
          <div ref={textGroupRef} className="flex flex-col items-center lg:items-end w-full">
            
            {/* Crest Mark & Eyebrow */}
            <div className="flex items-center gap-2.5 mb-4 lg:flex-row-reverse">
              <div className="relative w-6 h-6 flex-shrink-0 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                <Image
                  src="/icon.png"
                  alt="Origin Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="w-4 h-[1px] bg-gold-royal/50" />
              <p className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-gold-royal uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                Blended Malt &bull; Signature Spirit
              </p>
            </div>

            {/* Display Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-wide leading-[1.08] mb-3.5 drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
              Bold By Heritage. <br />
              <span className="italic font-normal text-gold-bright">
                Crowned In Character.
              </span>
            </h2>

            {/* Editorial Copy */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-champagne/95 leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg mb-6 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              An unyielding expression of character. Distilled with traditional grain precision, 
              matured over seasoned oak barrels, and bottled for those who hold the courage 
              to claim their legacy.
            </p>
          </div>

          {/* Tasting Tags */}
          <div
            ref={tagsRef}
            className="flex flex-wrap items-center justify-center lg:justify-end gap-2 mb-7"
          >
            <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gold-royal/30 backdrop-blur-md text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-ivory flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal" />
              Smoky Malt
            </div>
            <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gold-royal/30 backdrop-blur-md text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-ivory flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal" />
              Toasted Vanilla
            </div>
            <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gold-royal/30 backdrop-blur-md text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-ivory flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal" />
              Robust Finish
            </div>
          </div>

          {/* Action CTA Button */}
          <div ref={ctaRef} className="w-full sm:w-auto">
            <Link
              href="/the-vault#jackies-crown"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gold-royal text-obsidian font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-gold-bright shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(243,211,106,0.5)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Discover The Crown
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

      {/* Bottom Floor Blend */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-obsidian to-transparent pointer-events-none z-20" />
    </section>
  );
}