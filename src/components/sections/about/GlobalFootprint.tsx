"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MapHub {
  id: string;
  name: string;
  flag: string;
  lat: number;
  lng: number;
  territory: string;
  scope: string;
  badge: string;
}

const HUBS: MapHub[] = [
  {
    id: "punjab",
    name: "Punjab, India",
    flag: "🇮🇳",
    lat: 31.1471,
    lng: 75.3412,
    territory: "Distillery Origin & Master Cellars",
    scope: "Copper pot distillation, double-wood maturation, and master vatting.",
    badge: "FSSAI & Origin HQ",
  },
  {
    id: "scotland",
    name: "Scotland & UK",
    flag: "🇬🇧",
    lat: 56.4907,
    lng: -4.2026,
    territory: "Scotch Customs & European Hub",
    scope: "Empanelled by HMRC for Scotch bottling; serving UK boutique distributors.",
    badge: "HMRC Licensed",
  },
  {
    id: "us",
    name: "United States",
    flag: "🇺🇸",
    lat: 38.8951,
    lng: -77.0364,
    territory: "North America Commercial Gateway",
    scope: "Strategic import logistics and nationwide distribution pipelines.",
    badge: "Licensed Ops",
  },
  {
    id: "dubai",
    name: "Dubai, UAE",
    flag: "🇦🇪",
    lat: 25.2048,
    lng: 55.2708,
    territory: "Middle East Logistics Center",
    scope: "Central customs clearing for high-velocity Asian & Gulf distribution.",
    badge: "Trade Gateway",
  },
  {
    id: "tanzania",
    name: "Tanzania & Africa",
    flag: "🇹🇿",
    lat: -6.7924,
    lng: 39.2083,
    territory: "African Scale Corridor",
    scope: "High-volume container import logistics (scaled 10X to 6 containers/mo).",
    badge: "FDA / NAFDAC",
  },
];

export default function GlobalFootprint() {
  const [selectedId, setSelectedId] = useState<string>("punjab");
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selectedId);

  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);

  // Coordinate Conversion: (lat, lng) -> Canvas (x, y)
  const toCanvasCoords = (lat: number, lng: number, w: number, h: number) => {
    const x = ((lng + 180) / 360) * w;
    const y = ((90 - lat) / 180) * h;
    return { x, y };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let pulseAngle = 0;

    // Offscreen Canvas for landmask processing
    const maskImg = new window.Image();
    maskImg.src = "/textures/earth-land-mask.png";
    let maskProcessed = false;
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    maskImg.onload = () => {
      offscreen.width = maskImg.width;
      offscreen.height = maskImg.height;
      if (!offCtx) return;

      // Draw original black & white mask
      offCtx.drawImage(maskImg, 0, 0);
      const imgData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;

      // Colorize: Black (Oceans) -> Transparent | White (Land) -> Antique Bronze/Parchment
      for (let i = 0; i < data.length; i += 4) {
        const brightness = data[i]; // White = 255, Black = 0
        if (brightness > 60) {
          // Warm Antique Bronze Landmass (#9A814B)
          data[i] = 154;     // R
          data[i + 1] = 129; // G
          data[i + 2] = 75;  // B
          data[i + 3] = Math.floor((brightness / 255) * 85); // Soft translucent wash
        } else {
          // Oceans become completely transparent to show warm background
          data[i + 3] = 0;
        }
      }

      offCtx.putImageData(imgData, 0, 0);
      maskProcessed = true;
    };

    const render = () => {
      const parent = containerRef.current;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // 1. Ocean Background Fill (Warm Bone / Parchment)
      ctx.fillStyle = "#FAF7F0";
      ctx.fillRect(0, 0, w, h);

      // 2. Subtle Coordinate Lat/Lng Grid Graticules
      ctx.strokeStyle = "rgba(142, 118, 38, 0.08)";
      ctx.lineWidth = 0.75;

      for (let lng = -180; lng <= 180; lng += 30) {
        const { x } = toCanvasCoords(0, lng, w, h);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let lat = -60; lat <= 80; lat += 20) {
        const { y } = toCanvasCoords(lat, 0, w, h);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 3. Draw Real Landmasses
      if (maskProcessed) {
        ctx.drawImage(offscreen, 0, 0, w, h);
      }

      // 4. Trade Routing Arcs (Origin: Punjab HQ)
      const punjab = HUBS.find((h) => h.id === "punjab")!;
      const origin = toCanvasCoords(punjab.lat, punjab.lng, w, h);

      HUBS.forEach((hub) => {
        if (hub.id === "punjab") return;
        const target = toCanvasCoords(hub.lat, hub.lng, w, h);
        const isSelected = selectedRef.current === hub.id;

        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);

        // Calculate elevated arc
        const midX = (origin.x + target.x) / 2;
        const arcElevation = Math.abs(origin.x - target.x) * 0.15;
        const midY = Math.min(origin.y, target.y) - (isSelected ? arcElevation + 20 : arcElevation);
        ctx.quadraticCurveTo(midX, midY, target.x, target.y);

        ctx.strokeStyle = isSelected
          ? "rgba(212, 175, 55, 0.9)"
          : "rgba(142, 118, 38, 0.22)";
        ctx.lineWidth = isSelected ? 2 : 1;

        if (isSelected) {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 5. Render Hub Pins & Beacon Pulses
      pulseAngle += 0.045;

      HUBS.forEach((hub) => {
        const pt = toCanvasCoords(hub.lat, hub.lng, w, h);
        const isSelected = selectedRef.current === hub.id;

        // Radiating radar pulse
        ctx.beginPath();
        const pulseSize = isSelected
          ? 8 + Math.sin(pulseAngle) * 3
          : 4 + Math.sin(pulseAngle) * 1.5;
        ctx.arc(pt.x, pt.y, Math.max(0.1, pulseSize), 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? "rgba(212, 175, 55, 0.4)"
          : "rgba(142, 118, 38, 0.2)";
        ctx.fill();

        // Solid Pin Center
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isSelected ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#8E7626" : "#D4AF37";
        ctx.fill();
        ctx.strokeStyle = "#FAF7F0";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label Stamp
        ctx.font = isSelected
          ? "bold 11px system-ui, sans-serif"
          : "10px system-ui, sans-serif";
        ctx.fillStyle = isSelected ? "#14120E" : "#6E6554";
        ctx.fillText(
          `${hub.flag} ${hub.name.split(",")[0]}`,
          pt.x + 8,
          pt.y - 6
        );
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const activeHub = HUBS.find((h) => h.id === selectedId) || HUBS[0];

  return (
    <section
      ref={sectionRef}
      id="footprint"
      data-cursor-theme="light"
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FBF8F1] via-[#F4EFE6] to-[#EAE3D2] text-[#191713] overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* ================= EDITORIAL HEADER ================= */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-[1.5px] bg-[#8E7626]" />
            <p className="font-serif tracking-[0.26em] text-[10px] sm:text-xs text-[#8E7626] uppercase font-bold">
              GLOBAL TRADE FOOTPRINT
            </p>
            <span className="w-6 h-[1.5px] bg-[#8E7626]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14120E] tracking-tight leading-tight mb-2">
            Spirits Connecting{" "}
            <span className="italic font-light text-[#8E7626]">Continents.</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#5D5545] font-normal max-w-lg">
            Certified private distillation reaching 19+ countries through structured export corridors, 
            HMRC bottling licensure, and active trade bureau partnerships.
          </p>
        </div>

        {/* ================= MAP CANVAS & TERRITORY DOSSIER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Flat Architectural Vector Map Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              ref={containerRef}
              className="relative w-full aspect-[2/1] rounded-2xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-[0_15px_35px_rgba(142,118,38,0.14)] overflow-hidden"
            >
              <canvas ref={canvasRef} className="w-full h-full block" />

             
            </div>
          </div>

          {/* RIGHT: Clickable Territory Hub Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {HUBS.map((hub) => {
              const active = selectedId === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedId(hub.id)}
                  className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    active
                      ? "bg-[#FAF7F0] border-[#8E7626] shadow-sm scale-[1.01]"
                      : "bg-[#FAF7F0]/50 border-[#8E7626]/20 hover:bg-[#FAF7F0]/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl">{hub.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-serif text-xs sm:text-sm font-bold text-[#14120E]">
                        {hub.name}
                      </span>
                      <span className="font-sans text-[10px] text-[#6E6554] mt-0.5 line-clamp-1">
                        {hub.territory}
                      </span>
                    </div>
                  </div>

                  <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#8E7626]/10 text-[#8E7626]">
                    {hub.badge}
                  </span>
                </div>
              );
            })}

            {/* Scope Intelligence Callout */}
            <div className="mt-2 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#8E7626]/30 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#8E7626] font-bold">
                  OPERATIONAL SCOPE
                </span>
                <span className="font-serif text-xs text-[#8E7626] font-bold">
                  {activeHub.name}
                </span>
              </div>
              <p className="font-sans text-[11px] text-[#4A4337] leading-relaxed">
                {activeHub.scope}
              </p>
            </div>

            {/* Direct Connect Action */}
            <div className="mt-1">
              <Link
                href="/contact?intent=distribution"
                className="block w-full py-2.5 rounded-full bg-[#14120E] text-[#FAF7F0] font-sans text-xs uppercase tracking-[0.2em] font-bold text-center hover:bg-[#8E7626] transition-colors shadow-xs"
              >
                Become a Partner &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* ================= COMPLIANCE & LEGAL ACCREDITATIONS ================= */}
        <div className="mt-12 pt-6 border-t border-[#8E7626]/25 flex flex-wrap items-center justify-between gap-3 text-[10px] font-sans uppercase tracking-wider text-[#6E6554]">
          <span>HMRC Licensed Scotch Bottling</span>
          <span>&bull;</span>
          <span>Scotland &amp; UK Compliant</span>
          <span>&bull;</span>
          <span>FDA &amp; NAFDAC Authorized</span>
          <span>&bull;</span>
          <span>FSSAI &amp; ISO 9001:2015</span>
        </div>
      </div>
    </section>
  );
}