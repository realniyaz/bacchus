"use client";

import React from "react";
import Link from "next/link";

interface BrandItem {
  id: string;
  name: string;
  category: string;
  edition?: string;
  href: string;
  badge?: string;
  highlight?: boolean;
}

const BRANDS: BrandItem[] = [
  {
    id: "brand-talsons",
    name: "TALSONS’ RESERVE",
    category: "Double Wood Single Malt",
    edition: "Aged 12 Years",
    href: "/the-vault",
    highlight: true,
  },
  {
    id: "brand-jackies",
    name: "JACKIE’S CROWN",
    category: "Blended Crafted Whisky",
    edition: "Signature Expression",
    href: "/the-vault#jackies-crown",
  },
  {
    id: "brand-crazy-boxer",
    name: "CRAZY BOXER",
    category: "Straight-Up Punch Spirit",
    edition: "Original Knockout",
    href: "/kinetic-editions#crazy-boxer",
  },
  {
    id: "brand-rozzita",
    name: "ROZZITA VODKAS",
    category: "Artisanal Triple Distilled",
    edition: "Pure Crystal Cut",
    href: "/brands#rozzita-vodkas",
  },
  {
    id: "brand-boxer-rum",
    name: "CRAZY BOXER XXX RUM",
    category: "Deep Spiced Dark Blend",
    edition: "Overproof Reserve",
    href: "/kinetic-editions#xxx-rum",
    badge: "XXX",
  },
  {
    id: "brand-sirena",
    name: "SIRENA",
    category: "Botanical Infused Spirit",
    edition: "Prestige Reserve",
    href: "/brands#sirena",
  },
];

export default function BrandStrip() {
  // Duplicate array once for seamless infinite looping at -50% translateX
  const tickerItems = [...BRANDS, ...BRANDS];

  return (
    <div data-cursor-theme="dark"
      aria-label="Bacchus Distillery Portfolio Brands"
      className="relative w-full overflow-hidden bg-cask border-y border-gold-royal/20 py-4 sm:py-5 z-20 group select-none"
    >
      {/* ---------------- ATMOSPHERIC LIGHTING & SCRIMS ---------------- */}
      {/* Amber glow center leak */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,122,30,0.08)_0%,transparent_75%)] pointer-events-none" />

      {/* Left/Right Edge Shadow Feathers (Ensures seamless entry/exit) */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-cask via-cask/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-cask via-cask/80 to-transparent z-10 pointer-events-none" />

      {/* ---------------- INFINITE MARQUEE RAIL ---------------- */}
      <div className="flex w-max will-change-transform animate-[marquee_24s_linear_infinite] md:animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
        {tickerItems.map((brand, index) => (
          <Link
            key={`${brand.id}-${index}`}
            href={brand.href}
            className="flex items-center gap-6 sm:gap-10 px-5 sm:px-8 group/item transition-opacity duration-300 hover:opacity-100"
          >
            {/* Brand Card Item */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              {/* Monogram Seal / Crest Accent */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  brand.highlight
                    ? "border-gold-royal bg-gold-royal/10 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                    : "border-gold-royal/20 bg-surface-1 group-hover/item:border-gold-royal/60"
                }`}
              >
                <span className="font-serif text-xs text-gold-royal font-bold">
                  {brand.name.charAt(0)}
                </span>
              </div>

              {/* Typography Lockup */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm sm:text-base tracking-[0.2em] text-ivory whitespace-nowrap transition-colors duration-300 group-hover/item:text-gold-bright">
                    {brand.name}
                  </span>

                  {brand.badge && (
                    <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded bg-crimson/80 text-ivory font-sans font-bold tracking-widest">
                      {brand.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-gold-royal/80 font-sans whitespace-nowrap">
                    {brand.category}
                  </span>
                  <span className="text-stone text-[9px] hidden sm:inline">•</span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-stone font-sans whitespace-nowrap hidden sm:inline">
                    {brand.edition}
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Crest Separator (Dividing each brand element) */}
            <div className="flex items-center gap-2 text-gold-royal/30 select-none pl-2 sm:pl-4">
              <span className="w-2 sm:w-3 h-[1px] bg-gold-royal/30" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-royal/50 stroke-[1.5]"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="w-2 sm:w-3 h-[1px] bg-gold-royal/30" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}