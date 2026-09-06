"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

interface PhaseData {
  id: "phase-1" | "phase-2" | "phase-3";
  num: string;
  badge: string;
  title: string;
  desc: string;
  deliverables: string[];
  chips: string[];
  coords: { x: number; y: number };
}

const PHASES: PhaseData[] = [
  {
    id: "phase-1",
    num: "01",
    badge: "Export Readiness",
    title: "Documentation & Global Compliance",
    desc: "Complete international export certification including Certificate of Origin (COO), MSDS dossiers, Health Certificates, and pre-cleared FDA/NAFDAC paperwork to guarantee frictionless customs clearance.",
    deliverables: [
      "Certificate of Origin (COO)",
      "MSDS & Health Verification",
      "FDA / NAFDAC Clearance",
      "Customs Logistics Paperwork",
    ],
    chips: ["COO Ready", "MSDS Compliant", "Customs Fast-Track"],
    coords: { x: 18, y: 58 },
  },
  {
    id: "phase-2",
    num: "02",
    badge: "Volume & Labeling",
    title: "Order Requirements & Flexibility",
    desc: "Standard import dispatches start at one FCL container (20ft or 40ft), with negotiated trial batches on review. Full packaging adaptation covering localized excise tax stamps and mandatory health warnings.",
    deliverables: [
      "20ft & 40ft Container Runs",
      "Negotiated Trial Allocations",
      "Excise Stamp Application",
      "Regional Health Warning Print",
    ],
    chips: ["FCL 20/40ft", "Trial Runs", "Excise Integration"],
    coords: { x: 50, y: 32 },
  },
  {
    id: "phase-3",
    num: "03",
    badge: "Market Penetration",
    title: "Market Launch Support",
    desc: "Turnkey brand introduction kits, full sensory tasting notes, digital activation collateral, point-of-sale assets, and commercial guidance tuned directly to local consumer buying patterns.",
    deliverables: [
      "Turnkey Brand Launch Kits",
      "Master Tasting Dossiers",
      "POS & Trade Marketing Assets",
      "Consumer Trend Intelligence",
    ],
    chips: ["Launch Kits", "Trade POS", "Consumer Intelligence"],
    coords: { x: 82, y: 56 },
  },
];

export default function ImporterOperations() {
  const [activePhase, setActivePhase] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const active = PHASES[activePhase];

  useEffect(() => {
    if (!cardRef.current) return;
    const elements = cardRef.current.children;

    gsap.killTweensOf(elements);
    gsap.fromTo(
      elements,
      { opacity: 0, y: 12, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
      }
    );
  }, [activePhase]);

  return (
    <section
      id="importer-assurance"
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F0] via-[#F4EFE6] to-[#EAE3D2] text-[#14120E] select-none overflow-hidden border-t border-[#8E7626]/20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7626] animate-pulse" />
            <span className="font-serif tracking-[0.24em] text-[10px] sm:text-xs text-[#8E7626] font-bold uppercase">
              Global Supply Architecture
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#14120E] tracking-tight leading-tight mb-3">
            Operational Roadmap &amp;{" "}
            <span className="italic font-light text-[#8E7626]">Importer Assurance.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6E6554] leading-relaxed font-light max-w-lg">
            A linear supply trajectory built for reliable clearances, adaptive container quantities, and rapid overseas market execution.
          </p>
        </div>

        {/* ================= DESKTOP HORIZONTAL S-CURVE ================= */}
        <div className="hidden md:block relative w-full mb-10">
          <div className="relative w-full h-[180px] flex items-center justify-center">
            {/* SVG S-Curve Track */}
            <svg
              viewBox="0 0 1000 200"
              fill="none"
              className="w-full h-full absolute inset-0 pointer-events-none"
            >
              <path
                d="M 120 120 C 320 200, 360 40, 500 65 C 640 90, 700 170, 880 110"
                stroke="rgba(142, 118, 38, 0.15)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 120 120 C 320 200, 360 40, 500 65 C 640 90, 700 170, 880 110"
                stroke="#8E7626"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>

            {/* Interactive Point Markers */}
            {PHASES.map((phase, idx) => {
              const isSelected = activePhase === idx;
              return (
                <div
                  key={phase.id}
                  style={{ left: `${phase.coords.x}%`, top: `${phase.coords.y}%` }}
                  onMouseEnter={() => setActivePhase(idx)}
                  onClick={() => setActivePhase(idx)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
                >
                  {/* Soft Radial Ambient Pulse */}
                  <span
                    className={`absolute -inset-3 rounded-full transition-opacity duration-700 pointer-events-none ${
                      isSelected
                        ? "bg-[#8E7626]/20 animate-ping"
                        : "bg-[#8E7626]/0 group-hover:bg-[#8E7626]/10"
                    }`}
                  />

                  {/* Marker Node */}
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out shadow-md ${
                      isSelected
                        ? "bg-[#14120E] border-[#8E7626] scale-110 shadow-[0_0_24px_rgba(142,118,38,0.35)]"
                        : "bg-[#FAF7F0] border-[#8E7626]/40 group-hover:border-[#8E7626] group-hover:scale-105"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold transition-colors duration-300 ${
                        isSelected ? "text-[#FAF7F0]" : "text-[#8E7626]"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Floating Tag */}
                  <div
                    className={`absolute -bottom-8 whitespace-nowrap px-3 py-0.5 rounded-full border transition-all duration-300 shadow-xs ${
                      isSelected
                        ? "bg-[#FAF7F0] border-[#8E7626] text-[#8E7626]"
                        : "bg-[#FAF7F0]/80 border-[#8E7626]/25 text-[#6E6554] group-hover:text-[#14120E]"
                    }`}
                  >
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-bold">
                      Phase {phase.num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reveal Card Stage */}
          <div
            ref={cardRef}
            className="relative mt-8 rounded-2xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xl p-8 transition-shadow duration-500 will-change-transform"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#8E7626]/20">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8E7626] font-bold block">
                  PHASE {active.num} &bull; {active.badge}
                </span>
                <h3 className="font-serif text-2xl text-[#14120E] font-bold mt-1">
                  {active.title}
                </h3>
              </div>
              <div className="flex gap-2">
                {active.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-md bg-[#F4EFE6] border border-[#8E7626]/20 text-[10px] uppercase tracking-wider font-semibold text-[#8E7626]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <p className="font-sans text-sm text-[#6E6554] leading-relaxed mb-6 font-light max-w-3xl">
              {active.desc}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-[#8E7626]/15">
              {active.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-sans text-[#14120E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E7626] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MOBILE DIRECT VERTICAL STACK ================= */}
        <div className="md:hidden flex flex-col gap-4 mb-10">
          {PHASES.map((phase) => (
            <div
              key={phase.id}
              className="relative rounded-2xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs p-5 flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#8E7626]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#14120E] border border-[#8E7626] flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs font-bold text-[#FAF7F0]">
                      {phase.num}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8E7626] font-bold">
                    {phase.badge}
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#8E7626] animate-pulse" />
              </div>

              <h3 className="font-serif text-lg font-bold text-[#14120E] mb-2 leading-snug">
                {phase.title}
              </h3>
              <p className="font-sans text-xs text-[#6E6554] leading-relaxed mb-4 font-light">
                {phase.desc}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#8E7626]/15">
                {phase.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] text-[#14120E]">
                    <span className="w-1 h-1 rounded-full bg-[#8E7626] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ================= CTA ACTION ================= */}
        <div className="flex flex-col items-center text-center pt-2">
          <Link
            href="/contact?intent=import-operations"
            className="group w-full sm:w-auto px-9 py-4 rounded-full bg-[#14120E] text-[#FAF7F0] hover:bg-[#8E7626] transition-all duration-300 font-sans text-xs uppercase tracking-[0.22em] font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Initiate Direct Importer Inquiry</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}