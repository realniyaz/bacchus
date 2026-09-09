"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PartnerConciergeCTA() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    intent: "distribution",
    region: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftColRef.current && formCardRef.current) {
        gsap.fromTo(
          [leftColRef.current, formCardRef.current],
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      id="inquiry-concierge"
      data-cursor-theme="light"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE5] to-[#EAE3D2] text-[#14120E] overflow-hidden select-none border-t border-[#8E7626]/20"
    >
      {/* Background Soft Glow Flare */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.09)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: CONCISE DIRECTORY ================= */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#8E7626]" />
              <p className="font-serif tracking-[0.26em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
                PARTNER CONCIERGE
              </p>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14120E] tracking-tight leading-[1.1] mb-3">
              Raise a Toast <br />
              <span className="italic font-light text-[#8E7626]">To Your Growth.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#524E45] font-light leading-relaxed mb-6">
              Connect with our corporate distillation desk regarding import mandates, turnkey private labelling, or domestic state manufacturing rights.
            </p>

            {/* Direct Connect Chips */}
            <div className="w-full flex flex-col gap-2.5 pt-4 border-t border-[#8E7626]/20">
              <div className="flex items-center gap-2 text-xs font-sans text-[#14120E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E7626]" />
                <span className="font-bold text-[#8E7626]">Direct Executive Desk:</span>
                <a
                  href="mailto:md@bacchusdistellryindia.com"
                  className="hover:text-[#8E7626] underline transition-colors"
                >
                  md@bacchusdistellryindia.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-sans text-[#77736A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#77736A]/40" />
                <span>Operational Hours: 9:00 AM – 5:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: COMPACT B2B FORM ================= */}
          <div
            ref={formCardRef}
            className="lg:col-span-7 rounded-2xl bg-[#FFFFFF] border border-[#8E7626]/25 p-6 sm:p-8 shadow-[0_12px_35px_rgba(142,118,38,0.08)]"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 rounded-full bg-[#8E7626]/10 text-[#8E7626] font-serif font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  ✓
                </div>
                <h3 className="font-serif text-xl font-bold text-[#14120E] mb-1">
                  Inquiry Dispatched
                </h3>
                <p className="font-sans text-xs text-[#524E45]">
                  Our commercial trade team will reach out within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                      Entity / Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Imports Ltd."
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="trade@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Commercial Intent */}
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                      Partnership Model
                    </label>
                    <select
                      value={formState.intent}
                      onChange={(e) => setFormState({ ...formState, intent: e.target.value })}
                      className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors cursor-pointer"
                    >
                      <option value="distribution">Global Brand Distribution</option>
                      <option value="private-label">Turnkey Private Labelling</option>
                      <option value="state-licensing">Statewise Brand Ownership</option>
                    </select>
                  </div>

                  {/* Target Market */}
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-sans tracking-wider text-[#77736A] font-semibold mb-1">
                      Target Country / State
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kenya, Canada, Maharashtra"
                      value={formState.region}
                      onChange={(e) => setFormState({ ...formState, region: e.target.value })}
                      className="px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#8E7626]/20 text-[#14120E] text-xs focus:outline-none focus:border-[#8E7626] transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-full bg-[#14120E] text-[#FAF7F2] hover:bg-[#8E7626] hover:text-[#FFFFFF] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Commercial Inquiry</span>
                  <span>&rarr;</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}