"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

interface ModelFeature {
  metric: string;
  label: string;
  detail: string;
}

interface CommercialTrack {
  id: "domestic" | "international";
  badge: string;
  title: string;
  accentTitle: string;
  summary: string;
  projectedYield: string;
  yieldLabel: string;
  features: ModelFeature[];
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
}

const COMMERCIAL_MODELS: CommercialTrack[] = [
  {
    id: "domestic",
    badge: "Domestic Route",
    title: "State-Wise",
    accentTitle: "Brand Ownership",
    summary:
      "Full territorial licensing and distribution equity across select Indian domestic states, backed by verified in-house blending.",
    projectedYield: "18% – 25%",
    yieldLabel: "Annual Target ROI",
    features: [
      {
        metric: "State Depot",
        label: "Market Scope",
        detail: "Exclusive territorial manufacturing, bottling, and distribution rights.",
      },
      {
        metric: "Factory Direct",
        label: "Cost Advantage",
        detail: "Direct pricing structures with flexible bottling runs to match state excise margins.",
      },
      {
        metric: "Turnkey",
        label: "Trade Activation",
        detail: "Point-of-sale assets, sommelier tastings, and high-velocity launch events.",
      },
    ],
    deliverables: [
      "State Excise & Compliance Alignment",
      "Flexible Bottling & Volume Scalability",
      "Regional Marketing & POS Support",
    ],
    ctaText: "Inquire for State Licensing",
    ctaHref: "/contact?intent=domestic-ownership",
  },
  {
    id: "international",
    badge: "Export Route",
    title: "Territorial",
    accentTitle: "Distribution Rights",
    summary:
      "Exclusive national distribution rights for overseas importers, duty-free chains, and institutional retail groups.",
    projectedYield: "Scalable",
    yieldLabel: "Wholesale Margin Spread",
    features: [
      {
        metric: "19+ Ports",
        label: "Export Footprint",
        detail: "Duty-free clearance, bonded corridor logistics, and global transit networks.",
      },
      {
        metric: "HMRC & FDA",
        label: "Compliance Track",
        detail: "Standardized Certificate of Origin, MSDS, and pre-cleared NAFDAC paperwork.",
      },
      {
        metric: "Launch Kit",
        label: "Brand Collateral",
        detail: "Comprehensive media decks, tasting dossiers, and localized POS assets.",
      },
    ],
    deliverables: [
      "FOB / CIF Shipping & Logistics",
      "Tailored Packaging & Stamp Compliance",
      "Custom Import MOQ Negotiation",
    ],
    ctaText: "Request Export Dossier",
    ctaHref: "/contact?intent=export-rights",
  },
];

export default function InvestmentModels() {
  const [activeModel, setActiveModel] = useState<"domestic" | "international">("domestic");
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const current = COMMERCIAL_MODELS.find((m) => m.id === activeModel) || COMMERCIAL_MODELS[0];

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [activeModel]);

  return (
    <section
      ref={sectionRef}
      id="investment-models"
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F0] via-[#F4EFE6] to-[#EAE3D2] text-[#14120E] select-none border-t border-[#8E7626]/20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7626]" />
            <span className="font-serif tracking-[0.24em] text-[10px] sm:text-xs text-[#8E7626] font-bold uppercase">
              Commercial Capital Tracks
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#14120E] tracking-tight leading-tight mb-3">
            Investment Models &amp;{" "}
            <span className="italic font-light text-[#8E7626]">Yield Structures.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6E6554] leading-relaxed font-light max-w-lg mb-6">
            Explore commercial frameworks engineered for regional domestic dominance or overseas container distribution.
          </p>

          {/* Model Switcher Pill */}
          <div className="inline-flex p-1 rounded-full bg-[#EAE3D2] border border-[#8E7626]/25 shadow-inner">
            <button
              onClick={() => setActiveModel("domestic")}
              className={`px-5 sm:px-7 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeModel === "domestic"
                  ? "bg-[#FAF7F0] text-[#14120E] shadow-sm font-bold"
                  : "text-[#6E6554] hover:text-[#14120E]"
              }`}
            >
              State-Wise Ownership
            </button>
            <button
              onClick={() => setActiveModel("international")}
              className={`px-5 sm:px-7 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeModel === "international"
                  ? "bg-[#FAF7F0] text-[#14120E] shadow-sm font-bold"
                  : "text-[#6E6554] hover:text-[#14120E]"
              }`}
            >
              Territorial Rights
            </button>
          </div>
        </div>

        {/* Dynamic Architectural Card */}
        <div
          ref={cardRef}
          className="relative rounded-2xl sm:rounded-3xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xl overflow-hidden p-6 sm:p-10 md:p-12"
        >
          {/* Subtle Top Metallic Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#8E7626] to-transparent" />

          {/* Top Banner Overview */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#8E7626]/20">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase font-sans tracking-[0.24em] text-[#8E7626] font-bold">
                {current.badge}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#14120E] tracking-tight mt-1 mb-2">
                {current.title} <span className="italic font-light text-[#8E7626]">{current.accentTitle}</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6E6554] leading-relaxed font-light">
                {current.summary}
              </p>
            </div>

            {/* Yield Display Block */}
            <div className="flex-shrink-0 flex flex-col items-start lg:items-end justify-center p-4 rounded-xl bg-[#F4EFE6] border border-[#8E7626]/25">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#8E7626]">
                {current.projectedYield}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-[#14120E] font-semibold mt-0.5">
                {current.yieldLabel}
              </span>
            </div>
          </div>

          {/* 3-Column Simple Explanations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-8">
            {current.features.map((feat) => (
              <div
                key={feat.label}
                className="p-4 sm:p-5 rounded-xl bg-[#F4EFE6]/70 border border-[#8E7626]/20 flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-sm sm:text-base font-bold text-[#14120E] block mb-1">
                    {feat.metric}
                  </span>
                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#8E7626] font-semibold block mb-2">
                    {feat.label}
                  </span>
                  <p className="font-sans text-xs text-[#6E6554] leading-relaxed font-light">
                    {feat.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables Checklist & Action Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[#8E7626]/20">
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 sm:gap-6">
              {current.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-sans text-[#14120E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E7626] flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href={current.ctaHref}
              className="w-full md:w-auto px-8 py-3.5 rounded-full bg-[#14120E] text-[#FAF7F0] hover:bg-[#8E7626] transition-colors duration-200 text-center font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{current.ctaText}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-3.5 h-3.5 stroke-[2.5]"
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