"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CMD_SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/in/mohit-shukla-b31837185",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mohitshukla_india/",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/mohitshuklaofficial/",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/RIKEZAOFFICIAL",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function CmdDossier() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 }
      )
        .fromTo(
          portraitFrameRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          infoRef.current ? infoRef.current.children : [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cmd-profile"
      data-cursor-theme="light"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#EAE3D2] text-[#14120E] overflow-hidden select-none px-4 sm:px-8 lg:px-12 border-t border-[#8E7626]/20"
    >
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          ref={cardRef}
          className="relative rounded-3xl bg-[#FAF7F2]/95 border border-[#8E7626]/25 p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_rgba(142,118,38,0.08)] overflow-hidden"
        >
          {/* Subtle Top Gold Specular Line */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8E7626]/40 to-transparent" />

          {/* Watermark Crest */}
          <div className="absolute -right-8 -bottom-8 w-48 sm:w-64 aspect-square pointer-events-none opacity-[0.04] z-0">
            <Image
              src="/icon.png"
              alt="Bacchus Crest Watermark"
              fill
              className="object-contain filter grayscale"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* ================= LEFT: EXACT 1:1 SQUARE PORTRAIT (5 COLS) ================= */}
            <div
              ref={portraitFrameRef}
              className="lg:col-span-5 flex flex-col items-center"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-[#8E7626]/30 shadow-md bg-[#EAE3D2] group">
                <Image
                  src="/mohit-sir.jpg"
                  alt="Mohit Shukla — Chairman & Managing Director"
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Inner Border Rim */}
                <div className="absolute inset-0 border border-[#8E7626]/20 rounded-2xl pointer-events-none" />

                {/* Bottom Sovereign Micro-Strip */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#14120E]/85 backdrop-blur-md text-[#FAF7F2]">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold leading-none">
                      Chairman &amp; MD
                    </span>
                    <span className="font-serif text-[11px] font-medium tracking-wide">
                      Mohit Shukla
                    </span>
                  </div>
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <Image
                      src="/icon.png"
                      alt="Crest"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT: EXECUTIVE DOSSIER (7 COLS) ================= */}
            <div
              ref={infoRef}
              className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Eyebrow Label */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[1px] bg-[#8E7626]" />
                <p className="font-serif tracking-[0.25em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
                  Leadership Mandate
                </p>
                <span className="w-4 h-[1px] bg-[#8E7626] lg:hidden" />
              </div>

              {/* Title & Role */}
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-[2.6rem] text-[#14120E] tracking-tight leading-tight mb-1">
                Mohit Shukla
              </h2>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#8E7626] font-semibold mb-3.5">
                Chairman &amp; Managing Director
              </p>

              {/* Concise Narrative */}
              <p className="font-sans text-xs sm:text-[13px] text-[#575043] font-light leading-relaxed max-w-lg mb-5">
                Guiding the global expansion of Bacchus Distillery across 19+ nations, Mohit Shukla aligns 32+ years of distillation craft in Punjab with international trade governance, commanding stringent compliance across HMRC, ISO 9001:2015, and FSSAI standards.
              </p>

              {/* Two-Column Telemetry */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-5">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 flex flex-col items-center lg:items-start">
                  <span className="text-[8px] uppercase tracking-[0.16em] text-[#8E7626] font-semibold">
                    Global Reach
                  </span>
                  <span className="font-serif text-xs sm:text-sm text-[#14120E] font-bold">
                    19+ Nations
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 flex flex-col items-center lg:items-start">
                  <span className="text-[8px] uppercase tracking-[0.16em] text-[#8E7626] font-semibold">
                    Distillation Lineage
                  </span>
                  <span className="font-serif text-xs sm:text-sm text-[#14120E] font-bold">
                    32+ Years
                  </span>
                </div>
              </div>

              {/* Touchpoints & Direct Action */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full">
                {CMD_SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Mohit Shukla on ${social.name}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#8E7626]/25 text-[#575043] hover:border-[#8E7626] hover:text-[#14120E] hover:bg-[#EAE3D2] transition-colors text-[10px] uppercase tracking-wider font-semibold cursor-pointer shadow-xs"
                  >
                    <span>{social.icon}</span>
                    <span>{social.name}</span>
                  </a>
                ))}

                <Link
                  href="/contact?intent=corporate"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#14120E] text-[#FAF7F2] hover:bg-[#8E7626] transition-colors text-[10px] font-bold uppercase tracking-wider cursor-pointer shadow-xs ml-1"
                >
                  <span>Connect</span>
                  <span>&rarr;</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}