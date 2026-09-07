"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MENU_LINKS = [
  { name: "Our Brands", href: "/brands" },
  { name: "About Us", href: "/about" },
  { name: "Global Presence", href: "/international" },
  { name: "Business", href: "/business" },
  { name: "Our Team", href: "/team" },
  { name: "Invest", href: "/invest" },
];

const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Protocol", href: "/terms" },
  { name: "Statutory Compliance", href: "/compliance" },
  { name: "Cookie Governance", href: "/cookies" },
  { name: "Trade Ethics & Export", href: "/export-policy" },
];

const IMPORTANT_LINKS = [
  { name: "Global Operations", href: "/international" },
  { name: "Business Operations", href: "/business" },
  { name: "Invest", href: "/invest" },
  { name: "Press", href: "/media" },
  { name: "Brand Asset Bureau", href: "/brands" },
  
];

const SOCIAL_MEDIA = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandColRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Brand identity fade & drift
      if (brandColRef.current) {
        gsap.fromTo(
          brandColRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: brandColRef.current,
              start: "top 88%",
            },
          }
        );
      }

      // 2. 4-Column navigation columns stagger
      if (matrixRef.current) {
        gsap.fromTo(
          matrixRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: matrixRef.current,
              start: "top 88%",
            },
          }
        );
      }

      // 3. Sub-footer copyright & legal row
      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 95%",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer data-cursor-theme="dark"
      ref={footerRef}
      className="relative w-full bg-[#050505] text-[#E9DFCE] border-t border-gold-royal/20 overflow-hidden select-none"
    >
      {/* Ambient background bloom */}
      <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-cellar-bloom pointer-events-none rounded-full blur-[160px] opacity-25" />

      {/* ================= PRIMARY FOOTER STAGE ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ================= LEFT: ICON & COMPANY OVERVIEW (4 COLS) ================= */}
          <div
            ref={brandColRef}
            className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Crest Mark */}
            <Link href="/" className="flex items-center gap-3.5 mb-5 group">
              <div className="relative w-9 h-9 flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/icon.png"
                  alt="Bacchus Crowned Lion Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="font-serif text-lg text-ivory tracking-[0.16em] uppercase font-bold leading-none">
                  Bacchus
                </span>
                <span className="text-[9px] uppercase font-sans tracking-[0.28em] text-gold-royal mt-1 font-semibold">
                  World Spirits &bull; 1994
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs text-champagne/80 leading-relaxed font-light max-w-sm mb-6">
              Pioneering private spirit distillation. From proprietary copper pot stills 
              to international cellaring, our houses craft benchmark malts and kinetic blends across 19+ countries.
            </p>

            {/* Certifications Badge Line */}
            <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start mb-6">
              <span className="px-2.5 py-1 rounded-full bg-surface-1/80 border border-gold-royal/25 text-[9px] uppercase font-sans tracking-widest text-champagne font-semibold">
                ISO 9001:2015
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-1/80 border border-gold-royal/25 text-[9px] uppercase font-sans tracking-widest text-champagne font-semibold">
                HACCP
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-1/80 border border-gold-royal/25 text-[9px] uppercase font-sans tracking-widest text-champagne font-semibold">
                FSSAI
              </span>
            </div>

            {/* Head Office Location Snippet */}
            <div className="text-[11px] text-stone font-sans leading-relaxed">
              <span className="text-ivory font-medium block mb-0.5">Global Bureau:</span>
              B 28 Manaar Tower, Noida - 132, UP - 201304
            </div>
          </div>

          {/* ================= RIGHT: 4-COLUMN LINK MATRIX (8 COLS) ================= */}
          <div
            ref={matrixRef}
            className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left"
          >
            {/* COLUMN 1: MENU */}
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold-royal font-bold mb-4 block">
                Menu
              </span>
              <ul className="flex flex-col gap-2.5">
                {MENU_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-champagne/80 hover:text-gold-bright transition-colors font-sans font-light tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: LEGAL */}
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold-royal font-bold mb-4 block">
                Legal
              </span>
              <ul className="flex flex-col gap-2.5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-champagne/80 hover:text-gold-bright transition-colors font-sans font-light tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: OTHER IMPORTANT LINKS */}
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold-royal font-bold mb-4 block">
                Important
              </span>
              <ul className="flex flex-col gap-2.5">
                {IMPORTANT_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-champagne/80 hover:text-gold-bright transition-colors font-sans font-light tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4: CONTACT & SOCIAL MEDIA */}
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold-royal font-bold mb-4 block">
                Contact &amp; Connect
              </span>

              {/* Helpline */}
              <div className="flex flex-col mb-3">
                <span className="text-[9px] uppercase font-sans tracking-widest text-stone">Direct Desk</span>
                <a
                  href="tel:+911204664253"
                  className="text-xs text-ivory hover:text-gold-bright transition-colors font-sans font-medium"
                >
                  +91 120 466 4253
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col mb-5">
                <span className="text-[9px] uppercase font-sans tracking-widest text-stone">Trade Inquiries</span>
                <a
                  href="mailto:contact@bacchusdistillery.com"
                  className="text-xs text-ivory hover:text-gold-bright transition-colors font-sans font-medium break-all"
                >
                  contact@bacchusdistillery.com
                </a>
              </div>

              {/* Social Media Nodes */}
              <span className="text-[9px] uppercase font-sans tracking-widest text-stone mb-2 block">
                Official Channels
              </span>
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                {SOCIAL_MEDIA.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-8 h-8 rounded-full bg-surface-1/90 border border-gold-royal/30 flex items-center justify-center text-champagne hover:border-gold-bright hover:bg-gold-royal hover:text-obsidian transition-all duration-300 shadow-xs"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM BAR: COPYRIGHT & POLICIES ================= */}
        <div
          ref={bottomBarRef}
          className="mt-14 pt-8 border-t border-gold-royal/20 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left"
        >
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-serif text-xs text-ivory font-bold uppercase tracking-wider">
              &copy; {new Date().getFullYear()} Bacchus World Spirits Limited.
            </span>
            <span className="hidden sm:inline text-gold-royal/40">&bull;</span>
            <span className="text-[11px] text-stone font-sans">
              All statutory rights reserved.
            </span>
          </div>

          {/* Quick Legal Strip */}
          <div className="flex items-center gap-4 text-[10px] uppercase font-sans tracking-wider text-champagne/75 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-gold-bright transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gold-royal/30">&bull;</span>
            <Link href="/cookies" className="hover:text-gold-bright transition-colors">
              Cookie Settings
            </Link>
            <span className="text-gold-royal/30">&bull;</span>
            <Link href="/terms" className="hover:text-gold-bright transition-colors">
              Terms of Use
            </Link>
            <span className="text-gold-royal/30">&bull;</span>
            <Link href="/sitemap" className="hover:text-gold-bright transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Legal Age Advisory Notice */}
        <div className="mt-6 pt-4 border-t border-surface-2 flex items-center justify-center text-center">
          <p className="text-[9px] uppercase tracking-[0.25em] text-gold-royal font-sans font-semibold">
            Strict Adherence to Legal Drinking Age Laws &bull; Please Drink Responsibly
          </p>
        </div>

      </div>
    </footer>
  );
}