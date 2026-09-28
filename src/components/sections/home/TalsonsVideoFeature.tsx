"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TalsonsVideoFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const lightCausticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Smooth entrance scale & reveal
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { opacity: 0.6, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }

      // 2. INFINITE CINEMATIC DRIFT (Breathing Camera Move)
      // Gives the static banner an organic, floating video-like presence
      if (imageInnerRef.current) {
        gsap.to(imageInnerRef.current, {
          scale: 1.045,
          x: "-=18",
          y: "+=8",
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. CONTINUOUS LIQUID CAUSTIC LIGHT PULSE
      // Simulates light refractions passing across the glass bottle
      if (lightCausticRef.current) {
        gsap.to(lightCausticRef.current, {
          x: "110%",
          opacity: 0.45,
          duration: 9,
          repeat: -1,
          ease: "power1.inOut",
          repeatDelay: 2.5,
        });
      }

      // 4. Editorial Typography Staggered Reveal
      const textElements = textGroupRef.current?.children;
      if (textElements) {
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textGroupRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // 5. Sensory Pills Reveal
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

      // 6. Primary CTA Entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    // 7. MOUSE PARALLAX DISPLACEMENT (Desktop only)
    // Image subtly shifts opposite to cursor position
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !imageInnerRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 16;
      const yPos = (clientY / window.innerHeight - 0.5) * 12;

      gsap.to(imageInnerRef.current, {
        x: xPos,
        y: yPos,
        duration: 2.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      data-cursor-theme="dark"
      ref={sectionRef}
      className="relative w-full min-h-[720px] lg:h-screen lg:max-h-[920px] flex flex-col justify-end lg:justify-center bg-obsidian overflow-hidden select-none"
    >
      {/* ================= 1. KINETIC MASTER BANNER CANVAS ================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 w-full h-[52vh] sm:h-[56vh] lg:h-full overflow-hidden will-change-transform"
        >
          {/* Inner animated wrapper driving continuous drift and parallax */}
          <div
            ref={imageInnerRef}
            className="relative w-full h-full will-change-transform transform-gpu scale-105"
          >
            <Image
              src="/talson/creatives/banner.png"
              alt="Talsons' Reserve 12 Single Malt Banner"
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover object-[92%_center] max-sm:scale-115 max-sm:translate-x-8 sm:object-center lg:object-right filter brightness-[0.98] contrast-[1.05]"
            />

            {/* Traveling Caustic Light Sweep over the Bottle */}
            <div
              ref={lightCausticRef}
              className="absolute inset-y-0 -left-[40%] w-[45%] pointer-events-none opacity-0 bg-gradient-to-r from-transparent via-[rgba(243,211,106,0.18)] to-transparent -skew-x-12 mix-blend-screen"
            />
          </div>

          {/* Desktop Left Obsidian Gradient Curtain: Blends edge cleanly into text */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 via-42% to-transparent w-[65%]" />

          {/* Mobile Bottom Scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/30 via-55% to-obsidian lg:hidden" />

          {/* Mobile Top Shadow */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-obsidian/60 to-transparent lg:hidden" />
        </div>

        {/* Ambient Pulsing Liquid Amber Bloom */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,rgba(212,175,55,0.09)_0%,transparent_60%)] animate-pulse [animation-duration:6s]" />
      </div>

      {/* ================= 2. FOREGROUND EDITORIAL CONTENT ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-14 lg:py-0 flex flex-col justify-end lg:justify-center">
        {/* Mobile Spacer: Keeps the upper bottle area clear */}
        <div className="lg:hidden h-[36vh] sm:h-[42vh] w-full pointer-events-none" />

        {/* Text and Actions Column */}
        <div className="w-full lg:max-w-lg xl:max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left">
          <div ref={textGroupRef} className="flex flex-col items-center lg:items-start w-full">
            {/* Crest Mark */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-6 h-6 flex-shrink-0 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                <Image
                  src="/icon.png"
                  alt="Origin Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="w-4 h-[1px] bg-gold-royal/50" />
              <p className="font-serif tracking-[0.28em] text-[10px] sm:text-xs text-gold-royal uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Single Malt &bull; 12 Years
              </p>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-wide leading-[1.08] mb-3.5 drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]">
              Twice Matured. <br />
              <span className="italic font-normal text-gold-bright">
                A Higher Experience.
              </span>
            </h2>

            {/* Editorial Body */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-champagne/95 leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg mb-6 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Crafted in every element, perfected over time. Aged for twelve uninterrupted years
              through selected American and European Oak casks to impart subtle vanilla, rich caramel,
              and a lingering distinctive warmth.
            </p>
          </div>

          {/* Sensory Tasting Nodes */}
          <div
            ref={tagsRef}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-7"
          >
            <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gold-royal/30 backdrop-blur-md text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-ivory flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal" />
              Rich Oak
            </div>
            <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gold-royal/30 backdrop-blur-md text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-ivory flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal" />
              Smooth Spice
            </div>
            <div className="px-3 py-1.5 rounded-full bg-black/40 border border-gold-royal/30 backdrop-blur-md text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-ivory flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-royal" />
              Lingering Finish
            </div>
          </div>

          {/* Action CTA */}
          <div ref={ctaRef} className="w-full sm:w-auto">
            <Link
              href="/the-vault"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gold-royal text-obsidian font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-gold-bright shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(243,211,106,0.5)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore The Vault
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