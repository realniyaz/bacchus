"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Pillar {
  num: string;
  tag: string;
  title: string;
  desc: string;
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    tag: "WOOD",
    title: "Oak Casks",
    desc: "American & European oak maturation yielding structured oak tannins and rich spice.",
  },
  {
    num: "02",
    tag: "GRAIN",
    title: "Harvest Barley",
    desc: "Two-row Punjab harvest grains selected for enzymatic power and a viscous mouthfeel.",
  },
  {
    num: "03",
    tag: "WATER",
    title: "Spring Water",
    desc: "Untouched alluvial spring water delivering balanced minerality to every cut.",
  },
  {
    num: "04",
    tag: "TIME",
    title: "Patient Aging",
    desc: "Unbroken maturation in humidified dark cellars, undisturbed since 1994.",
  },
];

const CERTS = [
  { name: "FSSAI Certified", src: "/assets/fsaai.png", alt: "FSSAI" },
  { name: "HACCP Certified", src: "/assets/haccp.webp", alt: "HACCP" },
  { name: "ISO 9001:2015", src: "/assets/icon-9001.jpg", alt: "ISO 9001" },
];

export default function CraftPillarsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  // Mobile 3D Wheel Interactive State
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAngle = useRef(0);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync GSAP rotation
  const applyRotation = useCallback((angle: number, duration: number = 0.5) => {
    if (!wheelRef.current) return;
    gsap.to(wheelRef.current, {
      rotateY: angle,
      duration: duration,
      ease: duration > 0 ? "power3.out" : "none",
    });
  }, []);

  // Continuous subtle auto-spin on mobile when idle
  useEffect(() => {
    const startAutoSpin = () => {
      autoRotateTimer.current = setInterval(() => {
        if (!isDragging.current) {
          currentAngle.current -= 90;
          applyRotation(currentAngle.current, 1.2);
          setRotationAngle(currentAngle.current);
        }
      }, 3500);
    };

    startAutoSpin();
    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    };
  }, [applyRotation]);

  // Touch & Swipe Handlers for Mobile 3D Wheel
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - startX.current;
    const liveAngle = currentAngle.current + deltaX * 0.45;
    applyRotation(liveAngle, 0);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.changedTouches[0].clientX - startX.current;

    // Snap to nearest 90-degree quadrant
    let target = currentAngle.current;
    if (deltaX < -35) {
      target -= 90;
    } else if (deltaX > 35) {
      target += 90;
    }

    // Nearest snap calculation
    target = Math.round(target / 90) * 90;
    currentAngle.current = target;
    applyRotation(target, 0.7);
    setRotationAngle(target);
  };

  // Entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (desktopGridRef.current) {
        gsap.fromTo(
          desktopGridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: desktopGridRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (certsRef.current) {
        gsap.fromTo(
          certsRef.current.children,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: certsRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft-pillars"
      data-cursor-theme="dark"
      className="relative w-full py-16 sm:py-24 bg-[#050505] text-[#F4F0E6] overflow-hidden select-none"
    >
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(200,122,30,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ================= COMPACT HEADER ================= */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <p className="font-serif tracking-[0.28em] text-[10px] text-[#D4AF37] uppercase font-bold">
              THE 4 TENETS
            </p>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-[#F4F0E6] tracking-wide leading-tight">
            Distilled with Truth.{" "}
            <span className="italic font-light text-[#F3D36A]">Perfected in Stillness.</span>
          </h2>
        </div>

        {/* ================= DESKTOP 4-COLUMN CARDS ================= */}
        <div ref={desktopGridRef} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-16">
          {PILLARS.map((p, idx) => (
            <div
              key={p.num}
              className="group relative rounded-xl bg-[#0B0A08]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-[11px] tracking-widest text-[#D4AF37] font-bold">
                    {p.num}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#12110F] border border-[#D4AF37]/20 flex items-center justify-center p-2 text-[#D4AF37] group-hover:text-[#F3D36A] group-hover:border-[#D4AF37]/50 transition-all">
                    {idx === 0 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full stroke-[1.6]">
                        <ellipse cx="12" cy="12" rx="9" ry="10" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="3" y1="15" x2="21" y2="15" />
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full stroke-[1.6]">
                        <path d="M12 2v20" />
                        <path d="M12 5c2-1 3 0 3 2s-1 3-3 3" />
                        <path d="M12 11c-2-1-3 0-3 2s1 3 3 3" />
                        <path d="M12 15c2-1 3 0 3 2s-1 3-3 3" />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full stroke-[1.6]">
                        <path d="M12 2.5s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" />
                      </svg>
                    )}
                    {idx === 3 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full stroke-[1.6]">
                        <circle cx="12" cy="12" r="9.5" />
                        <path d="M12 6.5v5.5l3.5 2" />
                      </svg>
                    )}
                  </div>
                </div>

                <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-[#D4AF37] font-semibold block mb-1">
                  {p.tag}
                </span>
                <h3 className="font-serif text-base lg:text-lg text-[#F4F0E6] font-normal tracking-wide mb-1.5 group-hover:text-[#F3D36A] transition-colors">
                  {p.title}
                </h3>
                <p className="font-sans text-xs text-[#C3BDAF] font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MOBILE 3D ROTARY WHEEL ================= */}
        <div className="sm:hidden w-full h-[280px] flex items-center justify-center my-6 overflow-visible" style={{ perspective: "900px" }}>
          <div
            ref={wheelRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-[260px] h-[220px] will-change-transform cursor-grab active:cursor-grabbing"
            style={{ transformStyle: "preserve-3d" }}
          >
            {PILLARS.map((p, idx) => {
              // 4 faces = 0, 90, 180, 270 degrees on a 170px radius carousel
              const faceAngle = idx * 90;
              return (
                <div
                  key={`wheel-${p.num}`}
                  className="absolute inset-0 rounded-2xl bg-[#0C0B0A] border border-[#D4AF37]/35 p-5 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.9)] backface-hidden select-none"
                  style={{
                    transform: `rotateY(${faceAngle}deg) translateZ(170px)`,
                  }}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs font-bold text-[#D4AF37] tracking-widest">
                      {p.num} / 04
                    </span>
                    <span className="text-[9px] uppercase font-sans tracking-[0.22em] text-[#D4AF37] font-bold px-2 py-0.5 rounded-full bg-[#1A1610] border border-[#D4AF37]/25">
                      {p.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div>
                    <h3 className="font-serif text-xl text-[#F4F0E6] font-bold tracking-wide mb-1.5 text-center">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[11px] text-[#C3BDAF] font-light text-center leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom Wheel Cue */}
                  <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-[#D4AF37]/15 text-[#8E7626] text-[9px] tracking-widest uppercase">
                    <span>Swipe To Rotate</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Swipe / Rotation Cue */}
        <div className="sm:hidden flex items-center justify-center gap-2 text-[#8E7626] text-[10px] uppercase tracking-[0.2em] font-sans font-medium mb-10">
          <span>&larr; Swipe 3D Wheel &rarr;</span>
        </div>

        {/* ================= COMPLIANCE & CERTIFICATIONS ================= */}
        <div className="pt-8 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse hidden sm:block" />
            <p className="font-serif text-xs sm:text-sm text-[#F4F0E6] tracking-wide">
              Certified export-grade production &amp; quality governance[cite: 1].
            </p>
          </div>

          <div ref={certsRef} className="flex items-center gap-5 sm:gap-6 flex-wrap justify-center">
            {CERTS.map((cert) => (
              <div
                key={cert.name}
                className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12110F] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden bg-white/90 p-0.5 shadow-sm">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="font-sans text-[9px] sm:text-[10px] tracking-widest text-[#C3BDAF] uppercase font-semibold group-hover:text-[#F3D36A] transition-colors">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}