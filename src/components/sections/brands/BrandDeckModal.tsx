"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { BRAND_DECKS, BrandDeckItem } from "@/data/brand-decks";

export default function BrandDeckModal() {
  const [selectedBrand, setSelectedBrand] = useState<BrandDeckItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const imageDisplayRef = useRef<HTMLDivElement>(null);

  const handleOpenBrand = (brand: BrandDeckItem) => {
    setSelectedBrand(brand);
    setActiveImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const handleClose = useCallback(() => {
    if (!modalBoxRef.current || !modalBackdropRef.current) {
      setSelectedBrand(null);
      document.body.style.overflow = "";
      return;
    }

    gsap.to(modalBoxRef.current, {
      scale: 0.94,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
    });

    gsap.to(modalBackdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setSelectedBrand(null);
        document.body.style.overflow = "";
      },
    });
  }, []);

  useEffect(() => {
    if (selectedBrand && modalBoxRef.current && modalBackdropRef.current) {
      gsap.fromTo(
        modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        modalBoxRef.current,
        { scale: 0.92, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.2)" }
      );
    }
  }, [selectedBrand]);

  const handleImageSwitch = (idx: number) => {
    if (idx === activeImageIndex || !imageDisplayRef.current) return;

    gsap.fromTo(
      imageDisplayRef.current,
      { opacity: 0.2, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
    );
    setActiveImageIndex(idx);
  };

  return (
    <section id = "deck-modal" className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F3EDE2] to-[#EAE3D2] text-[#12110F] overflow-hidden select-none border-t border-[#8E7626]/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        {/* Section Header (Light Aesthetic) */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 sm:w-12 h-[1px] bg-[#8E7626]" />
            <p className="font-serif tracking-[0.32em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
              HOUSE PORTFOLIO &bull; ARCHIVE INSPECTOR
            </p>
            <span className="w-8 sm:w-12 h-[1px] bg-[#8E7626]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#12110F] tracking-wide leading-tight mb-2.5">
            Distilled Expressions. <br />
            <span className="italic font-light text-[#8E7626]">
              Five Dedicated Visual Portals.
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#575043] max-w-md text-center font-light leading-relaxed">
            Select an expression to inspect curated 4:5 editorial imagery and batch telemetry.
          </p>
        </div>

        {/* 5 Brand Interactive Cards (Light Aesthetic) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {BRAND_DECKS.map((brand, idx) => (
            <button
              key={brand.id}
              onClick={() => handleOpenBrand(brand)}
              className="group relative p-5 rounded-2xl bg-[#FAF7F2]/90 border border-[#8E7626]/25 hover:border-[#8E7626] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(70,55,30,0.12)] cursor-pointer flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-serif text-xs text-[#8E7626] font-bold">
                  0{idx + 1}
                </span>
                <span
                  className="w-2 h-2 rounded-full transition-transform group-hover:scale-150 duration-300"
                  style={{ background: brand.accent }}
                />
              </div>

              <div className="my-2">
                <span className="text-[9px] uppercase font-sans tracking-[0.16em] text-[#6E6554] block mb-1">
                  {brand.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-[#12110F] group-hover:text-[#8E7626] font-bold leading-snug transition-colors">
                  {brand.name}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#8E7626]/15 w-full">
                <span className="text-[9px] uppercase tracking-wider text-[#6E6554] font-semibold">
                  5 Visuals
                </span>
                <span className="text-xs font-serif text-[#8E7626] group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pop-Out Modal Window (Dark Obsidian Aesthetic) */}
      {selectedBrand && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 select-none">
          {/* Backdrop Scrim */}
          <div
            ref={modalBackdropRef}
            onClick={handleClose}
            className="absolute inset-0 bg-[#050505]/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <div
            ref={modalBoxRef}
            className="relative z-20 w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden bg-[#0A0908] text-[#F4F0E6] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-white/10 bg-[#0E0D0B]">
              <div className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ background: selectedBrand.accent }}
                />
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#F4F0E6] tracking-wide leading-none">
                    {selectedBrand.name}
                  </h3>
                  <span className="text-[9px] uppercase font-sans tracking-[0.16em] text-[#C3BDAF] mt-0.5 block">
                    {selectedBrand.sub}
                  </span>
                </div>
              </div>

              <button
                onClick={handleClose}
                aria-label="Close Popout Window"
                className="p-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[#F4F0E6] transition-colors cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 stroke-[2]"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
              {/* Left Column: 1080x1350 Image Box (4:5 Aspect Ratio) */}
              <div className="md:col-span-7 flex flex-col items-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#050505] border border-white/15 shadow-inner flex items-center justify-center">
                  <div
                    ref={imageDisplayRef}
                    className="relative w-full h-full will-change-transform"
                  >
                    <Image
                      src={selectedBrand.images[activeImageIndex].src}
                      alt={selectedBrand.images[activeImageIndex].caption}
                      fill
                      priority
                      quality={95}
                      sizes="(max-width: 768px) 85vw, 360px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] sm:text-[11px] text-[#FAF7F2] font-sans font-light tracking-wide line-clamp-1 drop-shadow-md">
                      {selectedBrand.images[activeImageIndex].caption}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/60 border border-white/15 text-[#FAF7F2] font-serif font-bold">
                      0{activeImageIndex + 1}/05
                    </span>
                  </div>
                </div>

                {/* 5 Horizontal Thumbnails */}
                <div className="grid grid-cols-5 gap-2 w-full max-w-[340px] sm:max-w-[360px] mt-3">
                  {selectedBrand.images.map((img, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={`${selectedBrand.id}-thumb-${idx}`}
                        onClick={() => handleImageSwitch(idx)}
                        className={`relative aspect-[4/5] rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "border-[#D4AF37] scale-[1.03]"
                            : "border-white/10 opacity-50 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          quality={70}
                          sizes="70px"
                          className="object-cover object-center"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Clean Telemetry & Direct Portal Routing */}
              <div className="md:col-span-5 flex flex-col justify-center gap-4">
                <div>
                  <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#C3BDAF] block mb-1">
                    Cask &amp; Line Profile
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#C3BDAF] font-light leading-relaxed">
                    {selectedBrand.tagline}
                  </p>
                </div>

                {/* Concise 2x2 Telemetry */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                    <span className="font-serif text-xs sm:text-sm font-bold text-[#F4F0E6]">
                      {selectedBrand.specs.abv}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.14em] text-[#C3BDAF] mt-0.5">
                      Strength
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                    <span className="font-serif text-xs sm:text-sm font-bold text-[#F4F0E6]">
                      {selectedBrand.specs.proof}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.14em] text-[#C3BDAF] mt-0.5">
                      Proof
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                    <span className="font-serif text-xs sm:text-sm font-bold text-[#F4F0E6]">
                      {selectedBrand.specs.volume}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.14em] text-[#C3BDAF] mt-0.5">
                      Format
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                    <span className="font-serif text-xs sm:text-sm font-bold text-[#F4F0E6] truncate">
                      {selectedBrand.specs.maturation}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.14em] text-[#C3BDAF] mt-0.5">
                      Maturation
                    </span>
                  </div>
                </div>

                {/* Primary CTA */}
                <Link
                  href={selectedBrand.link}
                  className="w-full py-3 rounded-full bg-[#FAF7F2] text-[#12110F] hover:bg-[#D4AF37] font-sans font-bold text-[10px] uppercase tracking-[0.22em] text-center transition-all duration-300 shadow-md mt-1"
                >
                  Enter Brand Portal &rarr;
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-7 py-2.5 bg-[#0E0D0B] border-t border-white/10 flex items-center justify-between text-[9px] text-[#C3BDAF] font-sans">
              <span>Bacchus World Spirits &bull; Cask Archive</span>
              <button
                onClick={handleClose}
                className="underline hover:text-white cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}