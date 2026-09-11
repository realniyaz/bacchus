"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { inquiriesApi } from "@/services/inquiries";

gsap.registerPlugin(ScrollTrigger);

export default function ContactLedgerAndHQ() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    category: "General Corporate Inquiries",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const ledgerGridRef = useRef<HTMLDivElement>(null);
  const locationCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Ledger Entry Animation
      if (ledgerGridRef.current) {
        gsap.fromTo(
          ledgerGridRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ledgerGridRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. HQ Location Card Entrance
      if (locationCardRef.current) {
        gsap.fromTo(
          locationCardRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: locationCardRef.current,
              start: "top 88%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await inquiriesApi.submitContact({
        name: formState.name.trim(),
        email: formState.email.trim(),
        category: formState.category,
        message: formState.message.trim(),
      });

      setReferenceCode(res.reference_code);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.detail ||
          "Failed to dispatch inquiry to the corporate desk. Please check your connection and retry."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setReferenceCode(null);
    setFormState({
      name: "",
      email: "",
      category: "General Corporate Inquiries",
      message: "",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact-details"
      data-cursor-theme="light"
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE5] to-[#EAE3D2] text-[#14120E] overflow-hidden select-none border-t border-[#8E7626]/20"
    >
      {/* Background Soft Amber Flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* ================= PART 1: SPLIT INQUIRIES & INTAKE FORM ================= */}
        <div
          ref={ledgerGridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-24"
        >
          {/* Left Column: Direct Desks & Communications */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#8E7626]" />
              <p className="font-serif tracking-[0.26em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
                COMMUNICATION DESKS
              </p>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-tight leading-[1.1] mb-4">
              Direct Channels. <br />
              <span className="italic font-light text-[#8E7626]">
                Prompt Engagements.
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#524E45] font-light leading-relaxed mb-8">
              Reach out directly to our commercial directors, export trade division, or corporate liaison desks for priority assistance.
            </p>

            {/* Channels Directory */}
            <div className="flex flex-col gap-4 border-t border-[#8E7626]/20 pt-6">
              {/* Executive Desk */}
              <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/20 shadow-xs">
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736A] font-semibold">
                  Executive Desk
                </span>
                <a
                  href="mailto:md@bacchusdistelleryindia.com"
                  className="font-serif text-sm sm:text-base font-bold text-[#14120E] hover:text-[#8E7626] transition-colors"
                >
                  md@bacchusdistelleryindia.com
                </a>
              </div>

              {/* General Inquiries */}
              <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/20 shadow-xs">
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736A] font-semibold">
                  Corporate &amp; Trade Inquiries
                </span>
                <a
                  href="mailto:contact@bacchusdistillery.com"
                  className="font-serif text-sm sm:text-base font-bold text-[#14120E] hover:text-[#8E7626] transition-colors"
                >
                  contact@bacchusdistillery.com
                </a>
              </div>

              {/* Direct Telephone Line */}
              <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/20 shadow-xs">
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#77736A] font-semibold">
                  Direct Line (HQ Helpline)
                </span>
                <a
                  href="tel:+911204664253"
                  className="font-serif text-sm sm:text-base font-bold text-[#14120E] hover:text-[#8E7626] transition-colors"
                >
                  +91 120 466 4253
                </a>
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-2 text-xs font-sans text-[#77736A] pt-2 px-1">
                <span className="w-2 h-2 rounded-full bg-[#8E7626]" />
                <span>Operating Desk: 09:00 AM – 05:00 PM IST | Mon – Fri</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Light Form */}
          <div
            id="inquiry-form"
            className="lg:col-span-7 rounded-2xl bg-[#FFFFFF] border border-[#8E7626]/25 p-6 sm:p-8 shadow-[0_12px_35px_rgba(142,118,38,0.08)]"
          >
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#8E7626]/10 text-[#8E7626] font-serif font-bold text-xl flex items-center justify-center mx-auto mb-2">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#14120E] mb-1">
                  Inquiry Dispatched
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#524E45] max-w-sm mx-auto">
                  Thank you. Your dispatch has been transmitted to our corporate liaison desk. We will respond within 24 business hours.
                </p>

                {referenceCode && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/30">
                    <span className="text-[11px] uppercase tracking-wider text-[#77736A] font-medium">
                      Tracking Reference:
                    </span>
                    <span className="font-mono text-xs font-bold text-[#8E7626]">
                      {referenceCode}
                    </span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    type="button"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#8E7626] hover:text-[#14120E] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Submit another inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                      Full Name / Entity
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sterling Imports Ltd."
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Category */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({ ...formState, category: e.target.value })
                    }
                    className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors cursor-pointer"
                  >
                    <option value="General Corporate Inquiries">
                      General Corporate Inquiries
                    </option>
                    <option value="Global Distribution Partnership">
                      Global Distribution Partnership
                    </option>
                    <option value="Private Label & Turnkey Distillation">
                      Private Label &amp; Turnkey Distillation
                    </option>
                    <option value="Institutional Spirit Allocation">
                      Institutional Spirit Allocation
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                    Message / Specifications
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding your inquiry, territory, or volume projections..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-[#14120E] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#8E7626] transition-colors shadow-md cursor-pointer mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Transmit Inquiry</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ================= PART 2: NOIDA CORPORATE HQ & LOCATION ================= */}
        <div
          ref={locationCardRef}
          id="noida-office"
          className="rounded-3xl bg-[#FFFFFF] border border-[#8E7626]/25 p-6 sm:p-10 shadow-[0_16px_40px_rgba(142,118,38,0.09)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* HQ Address Dossier */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[1px] bg-[#8E7626]" />
                <p className="font-serif tracking-[0.25em] text-[10px] text-[#8E7626] uppercase font-bold">
                  Corporate Headquarters
                </p>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#14120E] font-bold mb-3">
                Noida Bureau
              </h3>

              <div className="font-sans text-xs sm:text-sm text-[#524E45] leading-relaxed mb-6 space-y-1">
                <p className="font-semibold text-[#14120E]">B 28 Manaar Tower</p>
                <p>Sector 132, Noida</p>
                <p>Uttar Pradesh &mdash; 201304, India</p>
              </div>

              {/* Transit & Access Notes */}
              <div className="flex flex-col gap-2 w-full pt-4 border-t border-[#8E7626]/20 mb-6">
                <div className="flex items-start gap-2 text-xs text-[#524E45]">
                  <span className="font-bold text-[#8E7626] mt-0.5">&bull;</span>
                  <span>Directly connected via Noida-Greater Noida Expressway.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#524E45]">
                  <span className="font-bold text-[#8E7626] mt-0.5">&bull;</span>
                  <span>Executive appointments scheduled by prior calendar notice.</span>
                </div>
              </div>

              {/* External Map Action */}
              <a
                href="https://maps.google.com/?q=B+28+Manaar+Tower+Sector+132+Noida+Uttar+Pradesh+201304"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FAF7F2] border border-[#8E7626]/35 text-[#14120E] font-sans text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#8E7626] hover:text-[#FFFFFF] transition-all duration-300 shadow-xs"
              >
                <span>Open in Google Maps</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-3.5 h-3.5 stroke-[2.2]"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Embedded Location Map Stage */}
            <div className="lg:col-span-7 h-[280px] sm:h-[350px] w-full rounded-2xl overflow-hidden border border-[#8E7626]/20 relative shadow-inner bg-[#FAF7F2]">
              <iframe
                title="Bacchus Distellery Noida HQ"
                src="https://maps.google.com/maps?q=B+28+Manaar+Tower+Sector+132+Noida+Uttar+Pradesh+201304&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}