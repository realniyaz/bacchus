"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DESK_TELEMETRY = [
  { label: "Response Window", value: "< 24 HRS" },
  { label: "Operating Desk", value: "09:00 - 17:00 IST" },
  { label: "Direct Channel", value: "GLOBAL LIAISON" },
];

export default function ContactHero() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 1.8, ease: "power2.out" },
        0
      );

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.15
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
          0.25
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.38
        )
        .fromTo(
          telemetryRef.current ? telemetryRef.current.children : [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 },
          0.5
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-cursor-theme="dark"
      className="relative w-full flex flex-col justify-center items-center bg-[#050505] text-[#F4F0E6] overflow-hidden select-none px-6 pt-28 sm:pt-36 pb-8"
    >
      {/* Ambient Backdrop */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[320px] sm:h-[420px] pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(200,122,30,0.12)_0%,rgba(14,12,10,0.35)_50%,transparent_75%)]"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[linear-gradient(to_right,#F4F0E6_1px,transparent_1px),linear-gradient(to_bottom,#F4F0E6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-3">
          <span className="w-5 sm:w-8 h-[1px] bg-[#D4AF37]/50" />
          <p className="font-serif tracking-[0.25em] text-[10px] sm:text-xs text-[#D4AF37] uppercase font-semibold">
            Origin Distellery
          </p>
          <span className="w-5 sm:w-8 h-[1px] bg-[#D4AF37]/50" />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4F0E6] tracking-tight leading-tight mb-3"
        >
          Contact Us
        </h1>

        {/* Subtitle */}
        <p
          ref={descRef}
          className="font-sans text-xs sm:text-sm md:text-base text-[#C3BDAF]/90 max-w-xl font-light leading-relaxed mb-6"
        >
          Direct inquiries for corporate appointments, global distribution partnerships, and executive assistance.
        </p>

        {/* Telemetry Strip */}
        <div
          ref={telemetryRef}
          className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-5 border-t border-[#D4AF37]/15 text-center"
        >
          {DESK_TELEMETRY.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center py-2 px-3 rounded-lg bg-[#14120E]/40 border border-[#D4AF37]/10 backdrop-blur-xs"
            >
              <span className="font-serif text-xs sm:text-sm font-bold text-[#F3D36A] tracking-wider">
                {item.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#77736A] font-medium mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}