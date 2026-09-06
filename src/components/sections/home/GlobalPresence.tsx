"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
  {
    id: "g-icon",
    title: "Talson",
    subtitle: "A Legacy in Every Pour",
    image: "/talson/creatives/pack-shot.png",
  },
  {
    id: "g-pour",
    title: "Jackies Crown",
    subtitle: "Richer Sensory Experience",
    image: "/jackie crown/pack-shot.png",
  },
  {
    id: "g-details",
    title: "Crazy Boxer",
    subtitle: "Signature Embossed Craft",
    image: "/crazy-boxer/product-shot.png",
  },
  {
    id: "g-craft",
    title: "Rozzita Vodka",
    subtitle: "Traditionally Distilled",
    image: "/rozzita/product-shot.png",
  },
];

export default function GlobalPresence() {
  const [activeTab, setActiveTab] = useState<"global" | "domestic">("global");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dossierRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // 2. Dossier card entrance
      if (dossierRef.current) {
        gsap.fromTo(
          dossierRef.current,
          { opacity: 0, scale: 0.96, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: dossierRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 3. Quad Gallery Stagger (Mobile 2x2 & Desktop 1x4)
      if (galleryRef.current) {
        const cards = galleryRef.current.querySelectorAll(".gallery-frame");
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.92, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-cursor-theme="dark"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-obsidian text-ivory overflow-hidden select-none"
    >
      {/* Ambient Cellar Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] lg:w-[900px] h-[450px] sm:h-[650px] bg-cellar-bloom pointer-events-none rounded-full blur-[140px] opacity-35" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ================= 1. EDITORIAL HEADER ================= */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-royal to-gold-bright" />
            <p className="font-serif tracking-[0.32em] text-xs sm:text-sm text-gold-royal uppercase font-semibold">
              Global Distribution &amp; Trade Footprint
            </p>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent via-gold-royal to-gold-bright" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-wide leading-[1.08] max-w-3xl mb-5">
            Global Presence. <br />
            <span className="italic font-light text-gold-bright">
              Crafted for the World Stage.
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-champagne/90 leading-relaxed max-w-2xl font-light">
            Bacchus World Spirits has been expanding and perfecting our business for decades, 
            and we’ve been rewarded with an enormous reach. We now distribute our world-class 
            liquors and spirits to customers all over the world. Through targeted promotional campaigns 
            and global distribution, we&apos;ve reached over 19 countries. We know that every single customer 
            makes us the world-class spirits company we are today.
          </p>

          {/* DUAL MARKET SELECTOR SWITCH */}
          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-surface-1/90 border border-gold-royal/30 backdrop-blur-md mt-6 sm:mt-8 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <button
              onClick={() => setActiveTab("global")}
              className={`px-5 sm:px-8 py-2 rounded-full font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "global"
                  ? "bg-gold-royal text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "text-champagne/80 hover:text-ivory"
              }`}
            >
              Global Operations
            </button>
            <button
              onClick={() => setActiveTab("domestic")}
              className={`px-5 sm:px-8 py-2 rounded-full font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "domestic"
                  ? "bg-gold-royal text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "text-champagne/80 hover:text-ivory"
              }`}
            >
              Domestic Marketing
            </button>
          </div>

          {/* DYNAMIC DOSSIER CARD */}
          <div 
            ref={dossierRef}
            className="w-full max-w-3xl mt-5 sm:mt-6 p-5 sm:p-7 rounded-2xl bg-surface-1/60 border border-gold-royal/20 backdrop-blur-md transition-all duration-500"
          >
            {activeTab === "global" ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-[0.22em] text-gold-royal font-bold mb-1">
                    Export Architecture
                  </span>
                  <p className="text-xs sm:text-sm text-champagne/90 leading-relaxed font-light">
                    Supplying national distributors, boutique luxury retailers, and institutional buyers 
                    across Asian, European, and African customs ports.
                  </p>
                </div>
                <div className="flex-shrink-0 px-6 py-2.5 sm:py-3 rounded-xl bg-obsidian/80 border border-gold-royal/30 text-center w-full sm:w-auto">
                  <span className="block font-serif text-3xl sm:text-4xl text-gold-bright font-bold">
                    19+
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-ivory font-semibold">
                    Countries
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col text-left">
                <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-[0.22em] text-gold-royal font-bold mb-1">
                  Brand Activation &amp; Penetration
                </span>
                <p className="text-xs sm:text-sm text-champagne/90 leading-relaxed font-light mb-3">
                  We offer regular promotions that keep our brand top-of-mind and stimulate sales growth. 
                  By combining these elements, we create a comprehensive marketing strategy that not only attracts 
                  new customers but also builds lasting relationships with them.
                </p>
                <p className="text-[11px] sm:text-xs text-stone italic border-l border-gold-royal/40 pl-3">
                  Services include organizing dynamic opening events and strategic marketing tastings that allow 
                  potential consumers to experience products firsthand.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ================= 2. UNCLUTTERED 4-FRAME GALLERY ================= */}
        <div className="relative w-full max-w-5xl mx-auto pt-4">
          <div 
            ref={galleryRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 relative"
          >
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="gallery-frame group relative aspect-[2/3] rounded-xl sm:rounded-2xl overflow-hidden border border-gold-royal/25 bg-surface-1 shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Obsidian Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent pointer-events-none" />

                {/* Hover Light Sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                {/* Micro Captions */}
                <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3 p-2.5 rounded-lg bg-obsidian/85 border border-gold-royal/20 backdrop-blur-md flex flex-col">
                  <span className="font-serif text-[11px] sm:text-xs text-ivory font-bold tracking-wider uppercase group-hover:text-gold-bright transition-colors line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-sans text-champagne/80 tracking-widest uppercase font-light line-clamp-1">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Router */}
          <div className="flex justify-center mt-10 sm:mt-12">
            <Link
              href="/international"
              className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-surface-1/90 border border-gold-royal/35 text-ivory font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:border-gold-royal hover:text-gold-bright hover:bg-surface-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              Explore International Distribution
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}