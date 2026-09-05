"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.449-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function FooterContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const lionWatermarkRef = useRef<HTMLDivElement>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark slow parallax drift
      if (lionWatermarkRef.current) {
        gsap.fromTo(
          lionWatermarkRef.current,
          { y: -25, rotate: -2 },
          {
            y: 30,
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }

      // 2. Reveal contact information
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // 3. Reveal inquiry card
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <footer data-cursor-theme="light"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#FAF7F0] via-[#F3ECE0] to-[#E9DFCE] text-[#191713] overflow-hidden select-none"
    >
      {/* Background Watermark Lion Emblem */}
      <div
        ref={lionWatermarkRef}
        className="absolute -right-8 lg:right-10 top-1/3 -translate-y-1/2 w-[320px] sm:w-[480px] lg:w-[620px] aspect-square pointer-events-none opacity-[0.035] select-none will-change-transform z-0"
      >
        <Image
          src="/icon.png"
          alt="Bacchus Crest Watermark"
          fill
          priority
          className="object-contain filter drop-shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* LEFT: CORPORATE & EDITORIAL DETAILS (CENTERED ON MOBILE) */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Header Lockup */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                <Image
                  src="/icon.png"
                  alt="Bacchus Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="w-5 h-[1.5px] bg-[#8E7626]" />
              <p className="font-serif tracking-[0.28em] text-xs sm:text-sm text-[#8E7626] uppercase font-bold">
                Bacchus World Spirits
              </p>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111] tracking-tight leading-[1.1] mb-5">
              Distilling Excellence. <br />
              <span className="italic font-light text-[#8E7626]">
                Commanding Global Reach.
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#4E473B] leading-relaxed max-w-lg mb-8 font-light">
              Connect with our corporate trade bureau for distributor onboarding, duty-free contracts, 
              or institutional brand allocation inquiries worldwide.
            </p>

            {/* Corporate Dossier Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full mb-8 text-center sm:text-left">
              
              {/* Address Block */}
              <div className="p-4 rounded-xl bg-[#FAF7F0]/85 border border-[#8E7626]/20 flex flex-col items-center sm:items-start shadow-xs">
                <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#8E7626] font-bold mb-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#8E7626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Headquarters
                </span>
                <p className="text-xs text-[#2A2620] font-normal leading-relaxed">
                  B 28 Manaar Tower, Noida - 132, <br />
                  Uttar Pradesh - 201304, India
                </p>
              </div>

              {/* Helpline Desk */}
              <div className="p-4 rounded-xl bg-[#FAF7F0]/85 border border-[#8E7626]/20 flex flex-col items-center sm:items-start shadow-xs">
                <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#8E7626] font-bold mb-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#8E7626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Helpline &amp; Desk
                </span>
                <a
                  href="tel:+911204664253"
                  className="text-xs text-[#111] font-semibold tracking-wide hover:text-[#8E7626] transition-colors"
                >
                  +91 120 466 4253
                </a>
                <span className="text-[10px] text-[#786E5D] font-sans mt-0.5">
                  Mon – Sat &bull; 09:30 – 18:30 IST
                </span>
              </div>

              {/* Trade Email */}
              <div className="p-4 rounded-xl bg-[#FAF7F0]/85 border border-[#8E7626]/20 flex flex-col items-center sm:items-start shadow-xs">
                <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#8E7626] font-bold mb-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#8E7626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Trade Email
                </span>
                <a
                  href="mailto:contact@bacchusdistillery.com"
                  className="text-xs text-[#111] font-semibold hover:text-[#8E7626] transition-colors"
                >
                  contact@bacchusdistillery.com
                </a>
                <span className="text-[10px] text-[#786E5D] font-sans mt-0.5">
                  Corporate &amp; Institutional Queries
                </span>
              </div>

              {/* Accreditation */}
              <div className="p-4 rounded-xl bg-[#FAF7F0]/85 border border-[#8E7626]/20 flex flex-col items-center sm:items-start shadow-xs">
                <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#8E7626] font-bold mb-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#8E7626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Accreditation
                </span>
                <p className="text-xs text-[#2A2620] font-normal leading-relaxed">
                  ISO 9001:2015 &bull; HACCP &bull; FSSAI Licensed
                </p>
              </div>

            </div>

            {/* Social Media Linkage Pills */}
            <div className="flex flex-col items-center lg:items-start gap-2.5">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#8E7626] font-bold">
                Follow The House
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-2.5 flex-wrap">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF7F0] border border-[#8E7626]/25 text-[#1D1A14] hover:border-[#8E7626] hover:bg-[#8E7626] hover:text-[#FAF7F0] transition-all duration-300 shadow-2xs group"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: ALLOCATION INQUIRY FORM */}
          <div ref={rightColRef} className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="relative w-full rounded-2xl p-6 sm:p-8 bg-[#FAF7F0]/90 border border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(40,30,15,0.1)] backdrop-blur-md">
              
              <div className="flex items-center justify-between border-b border-[#8E7626]/20 pb-4 mb-6 text-left">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#111] font-bold tracking-wide">
                    Dispatch An Inquiry
                  </h3>
                  <p className="text-[11px] text-[#6E6554] font-sans">
                    Expect confidential advisory within 24 operational hours.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#8E7626]/10 text-[#8E7626] text-[9px] uppercase font-sans tracking-widest font-bold">
                  B2B &bull; Trade
                </span>
              </div>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#8E7626]/15 border border-[#8E7626] flex items-center justify-center text-[#8E7626] mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-lg text-[#111] font-bold mb-1">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-[#5D5545] max-w-xs font-light">
                    Our international trade desk has logged your dossier. A regional director will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#554E41] font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#8E7626]/30 text-xs text-[#111] placeholder:text-[#999080] focus:outline-none focus:border-[#8E7626] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#554E41] font-semibold">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="executive@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#8E7626]/30 text-xs text-[#111] placeholder:text-[#999080] focus:outline-none focus:border-[#8E7626] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#554E41] font-semibold">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 / Country Code"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#8E7626]/30 text-xs text-[#111] placeholder:text-[#999080] focus:outline-none focus:border-[#8E7626] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#554E41] font-semibold">
                        Inquiry Nature
                      </label>
                      <select className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#8E7626]/30 text-xs text-[#111] focus:outline-none focus:border-[#8E7626] transition-colors">
                        <option>Global Distribution / Export</option>
                        <option>Domestic Retail Partnership</option>
                        <option>Talsons' Reserve Private Cask</option>
                        <option>Brand Promotion &amp; Activation</option>
                        <option>General Corporate Dispatch</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#554E41] font-semibold">
                      Dossier Specifications / Message *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Outline target volume, port requirements, or distribution territory..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#8E7626]/30 text-xs text-[#111] placeholder:text-[#999080] focus:outline-none focus:border-[#8E7626] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full mt-2 py-3.5 rounded-full bg-[#12110F] text-[#FAF7F0] font-sans font-semibold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-[#8E7626] shadow-md cursor-pointer text-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Transmit Inquiry
                      <svg
                        className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent ease-in-out" />
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}