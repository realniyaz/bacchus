"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CategorySpec {
  id: string;
  category: string;
  badge: string;
  lead: string;
  specs: { label: string; value: string }[];
  highlight: string;
}

const CATEGORIES: CategorySpec[] = [
  {
    id: "whiskies",
    category: "Whiskies & Malts",
    badge: "AGED & BLENDED",
    lead: "Copper pot & column distillation paired with dual-cask cellar maturation.",
    specs: [
      { label: "Core Profile", value: "Single Malts & Blended British Styles" },
      { label: "Maturation", value: "American Bourbon & European Sherry Oak" },
      { label: "Standard ABV", value: "42.8% V/V (75° Proof)" },
      { label: "Flagships", value: "Talsons' Reserve 12, Jackie's Crown" },
    ],
    highlight: "Empanelled by HMRC for certified Scotch bottling operations in India.",
  },
  {
    id: "white-spirits",
    category: "Vodkas & Artisanal Gins",
    badge: "COLD-FILTERED",
    lead: "High-rectification grain neutral spirit with multi-stage cold filtration.",
    specs: [
      { label: "Distillation", value: "Multi-Column Fractionation" },
      { label: "Filtration", value: "Sub-Zero Activated Carbon Matrix" },
      { label: "Infusions", value: "Botanical Vapor Extraction & Natural Citrus" },
      { label: "Flagships", value: "Rozzita Vodka, Sirena Botanical Gin" },
    ],
    highlight: "Pre-cleared FDA and NAFDAC international export standards.",
  },
  {
    id: "rums-kinetic",
    category: "Rums & Kinetic RTD",
    badge: "OVERPROOF & RTD",
    lead: "Heavy-bodied molasses fermentation and high-energy pre-mixed craft beverages.",
    specs: [
      { label: "Base Spirit", value: "Slow-Fermented Cane Molasses" },
      { label: "Cask Finish", value: "Heavy Charred Oak Staves" },
      { label: "Ready-To-Drink", value: "15% ABV High-Velocity Formulations" },
      { label: "Flagships", value: "Crazy Boxer XXX Rum, Boxer Kinetic" },
    ],
    highlight: "Engineered for high-volume trade margins and dynamic market entry.",
  },
];

const INDUSTRIAL_STATS = [
  { value: "32+", unit: "YEARS", label: "Continuous Distillation" },
  { value: "40+", unit: "LABELS", label: "Active Market Portfolio" },
  { value: "100%", unit: "IN-HOUSE", label: "Automated Bottling Line" },
  { value: "3-TIER", unit: "AUDITED", label: "ISO, HACCP & FSSAI" },
];

export default function ManufacturingMatrix() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate card transition on tab change
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 15, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const currentCategory = CATEGORIES[activeTab];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 bg-[#050505] text-[#F4F0E6] overflow-hidden select-none"
    >
      {/* Dynamic Background Mesh (Pure CSS/Vector) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-serif tracking-[0.3em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-semibold">
              DISTILLERY INFRASTRUCTURE
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F0E6] tracking-tight leading-tight mb-4">
            Industrial Scale. <br />
            <span className="italic font-light text-[#F3D36A]">Uncompromising Depth.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#C3BDAF] font-light max-w-lg leading-relaxed">
            From thermal copper distillation to high-speed contract packaging, our Punjab facility 
            delivers international consistency across spirit categories[cite: 1, 2].
          </p>
        </div>

        {/* Industrial Performance Ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {INDUSTRIAL_STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-[#0C0C0B] border border-[#8E7626]/25 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#F3D36A] tracking-tight">
                  {stat.value}
                </span>
                <span className="font-sans text-[10px] font-semibold text-[#8E7626] tracking-wider">
                  {stat.unit}
                </span>
              </div>
              <p className="font-sans text-[11px] text-[#C3BDAF] uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Matrix Panel */}
        <div className="rounded-2xl bg-[#0C0C0B] border border-[#8E7626]/30 p-6 sm:p-8 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Category Switcher Tabs */}
          <div className="flex items-center gap-2 pb-6 border-b border-[#8E7626]/20 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat, idx) => {
              const active = activeTab === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-[#D4AF37] text-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      : "bg-[#12110F] text-[#C3BDAF] border border-[#8E7626]/20 hover:border-[#8E7626]/50 hover:text-[#F4F0E6]"
                  }`}
                >
                  {cat.category}
                </button>
              );
            })}
          </div>

          {/* Dynamic Category Card */}
          <div ref={cardRef} className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] font-bold">
                {currentCategory.category}
              </h3>
              <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full bg-[#8E7626]/15 border border-[#8E7626]/30 text-[#F3D36A] font-sans text-[9px] uppercase tracking-[0.2em] font-bold">
                {currentCategory.badge}
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#C3BDAF] font-light mb-6">
              {currentCategory.lead}
            </p>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentCategory.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3.5 rounded-lg bg-[#12110F] border border-[#8E7626]/15 flex flex-col justify-center"
                >
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#77736A] mb-1">
                    {spec.label}
                  </span>
                  <span className="font-sans text-xs text-[#F4F0E6] font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Compliance Guarantee Bar */}
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#14120E] border border-[#D4AF37]/25">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <p className="font-sans text-xs text-[#C3BDAF] font-light">
                <span className="font-semibold text-[#F3D36A]">Compliance Note: </span>
                {currentCategory.highlight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}