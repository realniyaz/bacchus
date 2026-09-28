"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PartnerConciergeCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (leftColRef.current && rightColRef.current) {
          gsap.fromTo(
            [leftColRef.current, rightColRef.current],
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.18,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      id="inquiry-concierge"
      data-cursor-theme="light"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE5] to-[#EAE3D2] text-[#14120E] overflow-hidden select-none border-t border-[#8E7626]/20"
    >
      {/* Ambient Warm Radial Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: DIRECTORY & DIRECT DESK ================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#8E7626]" />
              <p className="font-serif tracking-[0.26em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
                PARTNER CONCIERGE
              </p>
              <span className="w-5 h-[1px] bg-[#8E7626] lg:hidden" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14120E] tracking-tight leading-[1.15] mb-3">
              Raise a Toast <br />
              <span className="italic font-light text-[#8E7626]">To Your Growth.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#524E45] font-light leading-relaxed mb-6 max-w-md lg:max-w-none">
              Connect with our corporate distillation desk regarding import mandates, turnkey private labelling, or domestic state manufacturing rights.
            </p>

            {/* Direct Connect Strip */}
            <div className="w-full flex flex-col items-center lg:items-start gap-2.5 pt-5 border-t border-[#8E7626]/20">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-xs font-sans text-[#14120E]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E7626]" />
                  <span className="font-bold text-[#8E7626]">Direct Executive Desk:</span>
                </div>
                <a
                  href="mailto:contact@origindistillery.in"
                  className="hover:text-[#8E7626] underline transition-colors break-all"
                >
                  contact@origindistillery.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-sans text-[#77736A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#77736A]/40" />
                <span>Operational Hours: 9:00 AM – 5:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: REDIRECTION CONSOLE ================= */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 rounded-2xl bg-[#FFFFFF] border border-[#8E7626]/25 p-7 sm:p-10 shadow-[0_12px_35px_rgba(142,118,38,0.08)] flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-[#8E7626]/20 pb-4 mb-5">
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-[0.24em] text-[#8E7626] font-bold block mb-1">
                    B2B &bull; Allocations Bureau
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#14120E] font-bold tracking-tight">
                    Corporate Trade Desk
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#8E7626]/10 text-[#8E7626] text-[10px] uppercase font-sans tracking-widest font-bold">
                  Direct Inquiries
                </span>
              </div>

              {/* Context Copy */}
              <p className="font-sans text-xs sm:text-sm text-[#524E45] font-light leading-relaxed mb-6">
                Looking to onboard as an international distributor, commission custom batch blending, or discuss regional excise allocations? Our executive commercial desk is at your service.
              </p>

              {/* Highlight Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20">
                  <span className="w-2 h-2 rounded-full bg-[#8E7626]" />
                  <span className="text-[11px] font-sans font-medium text-[#14120E]">
                    24h Executive Response
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20">
                  <span className="w-2 h-2 rounded-full bg-[#8E7626]" />
                  <span className="text-[11px] font-sans font-medium text-[#14120E]">
                    Turnkey Private Label Support
                  </span>
                </div>
              </div>
            </div>

            {/* Redirection CTA */}
            <Link
              href="/contact"
              className="group relative w-full py-4 rounded-full bg-[#14120E] text-[#FAF7F2] hover:bg-[#8E7626] hover:text-[#FFFFFF] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2.5 overflow-hidden text-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Proceed to Trade Portal</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent ease-in-out" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}