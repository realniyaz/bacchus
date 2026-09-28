
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProductItem {
  id: string;
  num: string;
  name: string;
  sub: string;
  badge: string;
  proof: string;
  image: string;
  link: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "talson",
    num: "01",
    name: "TALSONS' RESERVE 12",
    sub: "A Blend of Malt & Selected Indian Grain Spirit",
    badge: "75° PROOF",
    proof: "42.8% V/V • 750 ML",
    image: "/talson/creatives/productshot.png",
    link: "/brands",
  },
  {
    id: "jackies-crown",
    num: "02",
    name: "JACKIES CROWN",
    sub: "Double Wood Matured In Selected Casks",
    badge: "AGED 12 YEARS",
    proof: "42.8% V/V • 75° PROOF",
    image: "/jackie crown/product-shot.png",
    link: "/brands",
  },
  {
    id: "crazy-boxer",
    num: "03",
    name: "CRAZY BOXER",
    sub: "Oak Casks, Finest Grains & Pure Water",
    badge: "COPPER DISTILLED",
    proof: "SPECIAL EDITION",
    image: "/crazy-boxer/product-shot.png",
    link: "/brands",
  },
  {
    id: "rozzita",
    num: "04",
    name: "ROZZITA VODKA",
    sub: "Signature Lion Crest Cap & Embossed Shoulder",
    badge: "HALLMARK",
    proof: "HAND FINISHED",
    image: "/rozzita/product-shot.png",
    link: "/brands",
  },
  {
    id: "rum",
    num: "05",
    name: "RUM",
    sub: "Rich, Smooth, Matured & Distinctive",
    badge: "CELLAR SERVE",
    proof: "RARE RESERVE",
    image: "/rum/product-shot.png",
    link: "/brands",
  },
];

export default function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const desktopImageWrapRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Desktop smooth crossfade & scale swap
  const handleSelectProduct = (index: number) => {
    if (index === activeIndex) return;

    if (desktopImageWrapRef.current) {
      gsap.fromTo(
        desktopImageWrapRef.current,
        { opacity: 0.35, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }

    if (desktopCardRef.current) {
      gsap.fromTo(
        desktopCardRef.current.children,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }

    setActiveIndex(index);
  };

  // Mobile 3D Curved Arc Scroll Interaction
  const updateMobileCurvature = useCallback(() => {
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const cards = container.querySelectorAll<HTMLDivElement>(".mobile-gallery-card");
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = cardCenter - containerCenter;
      const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / (container.offsetWidth * 0.75)));

      // 3D Arc Transformation
      const rotateY = normalizedDistance * -22; // Curves inward toward center
      const scale = 1 - Math.abs(normalizedDistance) * 0.12;
      const opacity = 1 - Math.abs(normalizedDistance) * 0.35;
      const zTranslate = -Math.abs(normalizedDistance) * 60;

      gsap.set(card, {
        transformPerspective: 900,
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
        z: zTranslate,
        ease: "none",
      });
    });
  }, []);

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateMobileCurvature, { passive: true });
    updateMobileCurvature();

    return () => track.removeEventListener("scroll", updateMobileCurvature);
  }, [updateMobileCurvature]);

  return (
    <section data-cursor-theme="light"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FBF8F1] via-[#F4EFE6] to-[#E9DFCE] text-[#191713] overflow-hidden select-none"
    >
      {/* Background Watermark Lion Crest */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] aspect-square pointer-events-none opacity-[0.035] z-0">
        <Image
          src="/icon.png"
          alt="Origin Lion Watermark"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        
        {/* ================= COMPACT HEADER ================= */}
        <div className="flex items-center justify-between border-b border-[#8E7626]/20 pb-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 flex-shrink-0 drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]">
              <Image
                src="/icon.png"
                alt="Origin Crest"
                fill
                className="object-contain"
              />
            </div>
            <span className="w-3 h-[1.5px] bg-[#8E7626]" />
            <p className="font-serif tracking-[0.28em] text-xs text-[#8E7626] uppercase font-bold">
                 &bull; Portfolio Gallery
            </p>
          </div>
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] text-[#6B6353] uppercase font-medium">
            05 Master Releases
          </span>
        </div>

        {/* ================= DESKTOP VIEWPORT (2:3 PORTRAIT LOCKUP) ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12 items-center min-h-[620px]">
          
          {/* LEFT: VERTICAL PRODUCT TABS (6 COLS) */}
          <div className="col-span-6 flex flex-col gap-2.5">
            {PRODUCTS.map((prod, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(idx)}
                  onMouseEnter={() => handleSelectProduct(idx)}
                  className={`group relative p-3.5 xl:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#FAF7F0] border-[#8E7626]/60 shadow-[0_8px_20px_rgba(40,30,15,0.08)] scale-[1.01]"
                      : "bg-[#FAF7F0]/45 border-transparent hover:bg-[#FAF7F0]/80 hover:border-[#8E7626]/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`font-serif text-sm tracking-widest transition-colors ${
                          isSelected
                            ? "text-[#8E7626] font-bold"
                            : "text-[#8E7626]/40 group-hover:text-[#8E7626]"
                        }`}
                      >
                        {prod.num}
                      </span>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-serif text-base xl:text-lg tracking-wide transition-colors ${
                              isSelected
                                ? "text-[#111] font-bold"
                                : "text-[#4A4337] group-hover:text-[#111]"
                            }`}
                          >
                            {prod.name}
                          </h3>
                          <span className="text-[9px] uppercase font-sans tracking-widest px-2 py-0.5 rounded-full bg-[#8E7626]/10 text-[#8E7626] font-bold">
                            {prod.badge}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#6E6554] mt-0.5">
                          {prod.sub}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[#8E7626] text-[#FAF7F0] translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-3 h-3 stroke-[2.5]"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute left-0 inset-y-2 w-1 rounded-r bg-[#8E7626]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: TALL PORTRAIT STAGE (6 COLS, PRESERVING 2:3 ASPECT) */}
          <div className="col-span-6 flex justify-center xl:justify-end">
            <div className="relative w-full max-w-[390px] xl:max-w-[420px] aspect-[2/3] rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_20px_45px_rgba(40,30,15,0.14)] bg-[#0C0B0A]">
              
              <div
                ref={desktopImageWrapRef}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src={PRODUCTS[activeIndex].image}
                  alt={PRODUCTS[activeIndex].name}
                  fill
                  priority
                  quality={95}
                  sizes="420px"
                  className="object-cover object-center"
                />
              </div>

              {/* Bottom Inset Pill */}
              <div
                ref={desktopCardRef}
                className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-[#FAF7F0]/95 border border-[#8E7626]/30 backdrop-blur-md flex items-center justify-between shadow-lg"
              >
                <div className="flex flex-col">
                  <span className="font-serif text-xs font-bold text-[#111] uppercase tracking-wider">
                    {PRODUCTS[activeIndex].name}
                  </span>
                  <span className="text-[10px] font-sans text-[#8E7626] uppercase tracking-[0.16em] font-semibold">
                    {PRODUCTS[activeIndex].proof}
                  </span>
                </div>

                <Link
                  href={PRODUCTS[activeIndex].link}
                  className="px-4 py-2 rounded-full bg-[#12110F] text-[#FAF7F0] font-sans font-semibold text-[10px] uppercase tracking-[0.2em] hover:bg-[#8E7626] transition-colors shadow-xs"
                >
                  Inspect &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ================= MOBILE VIEWPORT: 3D CURVED SLIDE CAROUSEL ================= */}
        <div className="lg:hidden w-full overflow-visible py-4">
          <div
            ref={mobileTrackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 py-6 no-scrollbar"
            style={{ perspective: "1000px" }}
          >
            {PRODUCTS.map((prod) => (
              <div
                key={`mob-${prod.id}`}
                className="mobile-gallery-card min-w-[76vw] sm:min-w-[50vw] max-w-[320px] aspect-[2/3] snap-center flex flex-col justify-end rounded-2xl overflow-hidden border border-[#8E7626]/40 bg-[#0C0B0A] shadow-[0_15px_35px_rgba(40,30,15,0.18)] relative flex-shrink-0 will-change-transform"
              >
                {/* Full-bleed Portrait Render */}
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  quality={92}
                  sizes="80vw"
                  className="object-cover object-center"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FAF7F0]/90 backdrop-blur-md border border-[#8E7626]/30 text-[9px] uppercase font-sans tracking-[0.18em] text-[#8E7626] font-bold shadow-xs">
                  {prod.badge}
                </div>

                {/* Bottom Inset Glass Pill */}
                <div className="relative z-10 m-3 p-3.5 rounded-xl bg-[#FAF7F0]/95 border border-[#8E7626]/30 backdrop-blur-md shadow-md flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[10px] text-[#8E7626] tracking-widest font-bold">
                      {prod.num} / 05
                    </span>
                    <span className="text-[9px] uppercase font-sans tracking-wider text-[#6E6554]">
                      {prod.proof}
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-[#111] uppercase tracking-wide leading-tight">
                    {prod.name}
                  </h3>

                  <Link
                    href={prod.link}
                    className="w-full py-2 rounded-full bg-[#12110F] text-[#FAF7F0] font-sans font-semibold text-[9px] uppercase tracking-[0.2em] text-center mt-1"
                  >
                    Inspect Release &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Cue */}
          <div className="flex items-center justify-center gap-2 pt-1 text-[#8E7626] text-[10px] uppercase tracking-[0.25em] font-sans font-medium">
            <span>&larr; Drag To Curve &amp; Explore &rarr;</span>
          </div>
        </div>

      </div>
    </section>
  );
}