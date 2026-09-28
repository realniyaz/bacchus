"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CommercialModel {
  id: string;
  num: string;
  tag: string;
  title: string;
  lead: string;
  description: string;
  deliverables: string[];
  compliance: string[];
  ctaText: string;
  ctaHref: string;
  accentBadge: string;
}

const COMMERCIAL_MODELS: CommercialModel[] = [
  {
    id: "distribution",
    num: "01",
    tag: "IMPORT & WHOLESALE",
    title: "Global Brand Distribution",
    lead: "Distribute Origin flagship labels with complete marketing collateral and trade activation support.",
    description:
      "Direct access to our commercially proven brand portfolio including Talsons 12 Single Malt, Jackie’s Crown Blended Whisky, Crazy Boxer XXX Rum, and Rozzita Vodka. Backed by end-to-end POS displays, tasting event kits, and regional marketing allocations.",
    deliverables: [
      "Turnkey POS & Brand Activation Kits",
      "Tiered Container Volume Margins",
      "Dedicated Regional Trade Manager",
      "Co-Op Promotional Campaign Budgets",
    ],
    compliance: ["19+ Nations Approved", "Pre-Registered Corridors", "Duty-Free Tier"],
    ctaText: "Request Distribution Deck",
    ctaHref: "#inquiry-concierge",
    accentBadge: "HIGH-VELOCITY RETAIL",
  },
  {
    id: "private-label",
    num: "02",
    tag: "CUSTOM MANUFACTURING",
    title: "Bespoke Private Labelling",
    lead: "Full-spectrum spirits distillation, custom recipe formulation, and automated contract bottling.",
    description:
      "Over three decades of contract distillation authority. We take your private brand concept from raw grain sourcing and master blending to glass molding, hot-stamped gold labelling, and worldwide export documentation.",
    deliverables: [
      "Custom Cask Aging & Mash Bills",
      "Glass Mold & Label Foil Tooling",
      "HMRC Scotch Empanelled Standards",
      "FDA, NAFDAC & FSSAI Export Clearance",
    ],
    compliance: ["ISO 9001:2015", "HACCP Certified", "HMRC Scotch Empanelled"],
    ctaText: "Consult Distillation Team",
    ctaHref: "#inquiry-concierge",
    accentBadge: "TURNKEY INDUSTRIAL",
  },
  {
    id: "state-ownership",
    num: "03",
    tag: "DOMESTIC LICENSING",
    title: "Statewise Brand Ownership",
    lead: "Exclusive territorial manufacturing, bottling, and distribution rights for Indian states.",
    description:
      "A rare opportunity for domestic beverage consortiums and regional distillers to secure state-level manufacturing licenses and exclusivity for established, high-growth Origin trademarks with local brand equity.",
    deliverables: [
      "Exclusive Territorial Production Rights",
      "State Excise & Compliance Blueprint",
      "Master Blend Concentrate Supply",
      "Centralized Brand Media Support",
    ],
    compliance: ["State Excise Compliant", "Pan-India Pipeline", "Direct L1/L2 Models"],
    ctaText: "Inquire State Licensing",
    ctaHref: "#inquiry-concierge",
    accentBadge: "EXCLUSIVE TERRITORY",
  },
];

export default function CommercialPillars() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeModel = COMMERCIAL_MODELS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="commercial-models"
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE5] to-[#EAE3D2] text-[#14120E] overflow-hidden select-none"
    >
      {/* Editorial Watermark Logo */}
      <div className="absolute right-[-4%] top-1/4 text-[16vw] font-serif font-bold text-[#D4AF37]/[0.06] leading-none pointer-events-none tracking-tight select-none">
        Origin
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ================= 1. LIGHT EDITORIAL HEADER ================= */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3.5">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#8E7626]" />
            <p className="font-serif tracking-[0.3em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
              COMMERCIAL PARTNERSHIP FRAMEWORK
            </p>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#8E7626]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14120E] tracking-tight leading-[1.1] mb-5">
            Three Pathways. <br />
            <span className="italic font-light text-[#8E7626]">
              Engineered for Scalable Value.
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#524E45] font-light leading-relaxed max-w-xl">
            Whether securing national import allocations, distilling an original label, 
            or acquiring state territorial manufacturing rights in India—our 32-year infrastructure 
            powers your commercial expansion.
          </p>
        </div>

        {/* ================= 2. DESKTOP INTERACTIVE STAGE ================= */}
        <div ref={stageRef} className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Selector Rails (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {COMMERCIAL_MODELS.map((model, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={model.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative text-left p-6 rounded-2xl transition-all duration-400 border cursor-pointer ${
                    isActive
                      ? "bg-[#FFFFFF] border-[#D4AF37] shadow-[0_12px_35px_rgba(142,118,38,0.12)] scale-[1.02]"
                      : "bg-[#FFFFFF]/60 border-[#D4AF37]/25 hover:bg-[#FFFFFF]/90 hover:border-[#8E7626]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-serif text-xs font-bold tracking-widest ${
                        isActive ? "text-[#8E7626]" : "text-[#77736A]"
                      }`}
                    >
                      MODEL {model.num}
                    </span>
                    <span
                      className={`text-[9px] font-sans uppercase tracking-[0.2em] font-semibold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#8E7626]/10 text-[#8E7626] border border-[#8E7626]/20"
                          : "bg-[#FAF7F2] text-[#77736A]"
                      }`}
                    >
                      {model.tag}
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-xl font-bold tracking-wide transition-colors ${
                      isActive ? "text-[#14120E]" : "text-[#524E45] group-hover:text-[#14120E]"
                    }`}
                  >
                    {model.title}
                  </h3>

                  <p className="font-sans text-xs text-[#524E45] font-light line-clamp-2 mt-1.5 leading-relaxed">
                    {model.lead}
                  </p>

                  {/* Active Indicator Strip */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-r-full bg-[#8E7626] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Dossier Panel (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FFFFFF] border border-[#D4AF37]/35 p-8 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(142,118,38,0.1)] relative overflow-hidden">
            
            {/* Top Row: Meta Badge & Number */}
            <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8E7626] animate-pulse" />
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] font-bold text-[#8E7626]">
                  {activeModel.accentBadge}
                </span>
              </div>
              <span className="font-serif text-3xl font-bold text-[#D4AF37]/50 tracking-wider">
                {activeModel.num} / 03
              </span>
            </div>

            {/* Dossier Body */}
            <div className="py-6">
              <h4 className="font-serif text-2xl sm:text-3xl text-[#14120E] font-bold tracking-tight mb-3">
                {activeModel.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#524E45] font-light leading-relaxed mb-6">
                {activeModel.description}
              </p>

              {/* Scope Deliverables Grid */}
              <div className="mb-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8E7626] font-bold mb-3">
                  Scope &amp; Commercial Deliverables
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {activeModel.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/20"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8E7626"
                        className="w-4 h-4 stroke-[2.2] flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-xs text-[#14120E] font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Badges */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#77736A] font-semibold mr-1">
                  Accredited:
                </span>
                {activeModel.compliance.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#8E7626]/25 font-sans text-[10px] font-bold text-[#8E7626] uppercase tracking-wider"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Strip */}
            <div className="pt-6 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <span className="font-sans text-xs text-[#77736A] italic">
                Direct manufacturing contract via Punjab facility[cite: 1, 2].
              </span>

              <Link
                href={activeModel.ctaHref}
                className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#14120E] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#8E7626] hover:text-[#FFFFFF] transition-all duration-300 shadow-md"
              >
                <span>{activeModel.ctaText}</span>
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

        {/* ================= 3. MOBILE CAROUSEL & TOUCH DOSSIER ================= */}
        <div className="lg:hidden flex flex-col gap-6">
          {COMMERCIAL_MODELS.map((model) => (
            <div
              key={`mob-${model.id}`}
              className="rounded-2xl bg-[#FFFFFF] border border-[#D4AF37]/30 p-6 shadow-[0_10px_30px_rgba(142,118,38,0.08)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#D4AF37]/15">
                  <span className="font-serif text-xs font-bold text-[#8E7626] tracking-widest">
                    MODEL {model.num}
                  </span>
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full bg-[#8E7626]/10 text-[#8E7626]">
                    {model.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#14120E] mb-2">
                  {model.title}
                </h3>

                <p className="font-sans text-xs text-[#524E45] font-light leading-relaxed mb-5">
                  {model.description}
                </p>

                {/* Scope Points */}
                <div className="flex flex-col gap-2 mb-5">
                  {model.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8E7626] flex-shrink-0" />
                      <span className="font-sans text-xs text-[#14120E] font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Compliance chips */}
                <div className="flex items-center gap-1.5 flex-wrap mb-6">
                  {model.compliance.map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#8E7626]/20 font-sans text-[9px] font-bold text-[#8E7626] uppercase"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={model.ctaHref}
                className="w-full text-center py-3.5 rounded-full bg-[#14120E] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#8E7626] transition-colors"
              >
                {model.ctaText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}