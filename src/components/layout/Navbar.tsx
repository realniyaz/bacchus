"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Brands", href: "/brands" },
  { label: "International Presence", href: "/international" },
  { label: "Business", href: "/business" },
  { label: "Management", href: "/team" },
  { label: "Invest", href: "/invest" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLUListElement>(null);
  const socialMobileRef = useRef<HTMLDivElement>(null);

  // Handle scroll backdrop state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile drawer open/close
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.45,
        ease: "power3.out",
      });

      if (menuLinksRef.current) {
        tl.fromTo(
          menuLinksRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power4.out",
          },
          "-=0.2"
        );
      }

      if (socialMobileRef.current) {
        tl.fromTo(
          socialMobileRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      }
    } else {
      document.body.style.overflow = "";

      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.35,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-obsidian/85 backdrop-blur-xl border-b border-gold-royal/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-5 lg:py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* ================= LEFT: ICON + BRAND ================= */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3.5 group cursor-pointer z-50"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/icon.png"
                alt="Origin Crowned Lion"
                fill
                priority
                className="object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl tracking-[0.2em] text-ivory leading-none group-hover:text-gold-bright transition-colors">
                Origin
              </span>
              <span className="text-[9px] uppercase tracking-[0.38em] text-gold-royal font-sans font-medium mt-1">
                Distillery
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP CENTER: MENU ITEMS ================= */}
          <nav className="hidden xl:flex items-center gap-7 2xl:gap-9">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative font-sans text-xs uppercase tracking-[0.22em] text-champagne hover:text-ivory py-1 transition-colors"
              >
                <span>{item.label}</span>
                {/* Micro gold hairline indicator */}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-gold-royal to-gold-bright transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ================= DESKTOP RIGHT: SOCIAL ICONS ================= */}
         {/* <div className="hidden xl:flex items-center gap-5">
            {/* Instagram */}
            {/*<a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-gold-royal/25 bg-surface-1/50 flex items-center justify-center text-champagne hover:text-gold-bright hover:border-gold-royal transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* X / Twitter */}
           {/* <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-9 h-9 rounded-full border border-gold-royal/25 bg-surface-1/50 flex items-center justify-center text-champagne hover:text-gold-bright hover:border-gold-royal transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            {/*<a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-gold-royal/25 bg-surface-1/50 flex items-center justify-center text-champagne hover:text-gold-bright hover:border-gold-royal transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>*/}

          {/* ================= MOBILE RIGHT: ANIMATED 3-LINE TOGGLE ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="xl:hidden relative w-10 h-10 flex flex-col items-end justify-center gap-1.5 z-50 p-2 focus:outline-none"
          >
            <span
              className={`h-[1.5px] bg-gold-royal transition-all duration-300 ${
                menuOpen ? "w-6 -rotate-45 translate-y-2 bg-gold-bright" : "w-6"
              }`}
            />
            <span
              className={`h-[1.5px] bg-gold-royal transition-all duration-300 ${
                menuOpen ? "opacity-0 -translate-x-2" : "w-4"
              }`}
            />
            <span
              className={`h-[1.5px] bg-gold-royal transition-all duration-300 ${
                menuOpen ? "w-6 rotate-45 -translate-y-2 bg-gold-bright" : "w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY DRAWER ================= */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-3xl flex flex-col justify-between px-8 pt-32 pb-12 opacity-0 pointer-events-none xl:hidden"
      >
        {/* Ambient Backlight for Drawer */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-cellar-bloom pointer-events-none rounded-full blur-3xl opacity-40" />

        {/* Menu Navigation Links */}
        <ul ref={menuLinksRef} className="flex flex-col gap-5 relative z-10">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl text-ivory hover:text-gold-bright transition-colors tracking-wider flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <span className="text-xs text-gold-royal/40 font-sans tracking-[0.2em] group-hover:text-gold-royal transition-colors">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Social Anchors & Founding Mark */}
        <div
          ref={socialMobileRef}
          className="pt-6 border-t border-gold-royal/20 flex flex-col gap-4 relative z-10"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone font-sans">
              Connect With The House
            </span>
            <div className="flex items-center gap-4 text-gold-royal">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gold-bright transition-colors"
              >
                IG
              </a>
              <span>•</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="hover:text-gold-bright transition-colors"
              >
                X
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gold-bright transition-colors"
              >
                IN
              </a>
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-stone text-center">
            Origin Distillery • Established 1994
          </p>
        </div>
      </div>
    </>
  );
}