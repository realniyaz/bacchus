"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const bottle = bottleRef.current;
    if (!dot || !bottle) return;

    // High performance GSAP quick setters
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setBottleX = gsap.quickSetter(bottle, "x", "px");
    const setBottleY = gsap.quickSetter(bottle, "y", "px");
    const setBottleRotate = gsap.quickSetter(bottle, "rotation", "deg");

    const mousePos = { x: 0, y: 0 };
    const bottlePos = { x: 0, y: 0 };
    let velX = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Calculate mouse velocity for a natural physics tilt
      velX = e.clientX - mousePos.x;

      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!isVisible) setIsVisible(true);
      setDotX(mousePos.x);
      setDotY(mousePos.y);

      // Inspect section background theme
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      const section = hoveredElement?.closest("[data-cursor-theme]");
      if (section) {
        const detectedTheme = section.getAttribute("data-cursor-theme") as "dark" | "light";
        if (detectedTheme && detectedTheme !== theme) {
          setTheme(detectedTheme);
        }
      }
    };

    // Fast-tracking physics loop (0.38 rate for high responsiveness)
    const tickerCallback = () => {
      bottlePos.x += (mousePos.x - bottlePos.x) * 0.38;
      bottlePos.y += (mousePos.y - bottlePos.y) * 0.38;

      setBottleX(bottlePos.x);
      setBottleY(bottlePos.y);

      // Subtle dynamic angle tilt when moving fast horizontally
      const tilt = Math.max(-20, Math.min(20, velX * 0.45));
      setBottleRotate(tilt);
      velX *= 0.85; // Damping decay
    };

    gsap.ticker.add(tickerCallback);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Interactive element hit-detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest(".cursor-pointer") ||
        target?.tagName === "INPUT" ||
        target?.tagName === "SELECT" ||
        target?.tagName === "TEXTAREA"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      gsap.ticker.remove(tickerCallback);
    };
  }, [theme, isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hidden lg:block`}
    >
      {/* 1. Precise Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 pointer-events-none z-20 ${
          isHovered ? "w-1 h-1 scale-75" : "w-1.5 h-1.5 scale-100"
        } ${
          theme === "dark"
            ? "bg-[#F3D36A] shadow-[0_0_8px_rgba(243,211,106,0.9)]"
            : "bg-[#12110F] shadow-[0_0_5px_rgba(18,17,15,0.5)]"
        }`}
      />

      {/* 2. Responsive Trailing Spirits Bottle */}
      <div
        ref={bottleRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none will-change-transform z-10 flex items-center justify-center ${
          isHovered ? "scale-125" : "scale-100"
        }`}
      >
        <svg
          width="26"
          height="42"
          viewBox="0 0 26 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-200 ${
            theme === "dark"
              ? isHovered
                ? "drop-shadow-[0_0_12px_rgba(243,211,106,0.85)]"
                : "drop-shadow-[0_0_6px_rgba(212,175,55,0.45)]"
              : isHovered
              ? "drop-shadow-[0_0_8px_rgba(18,17,15,0.4)]"
              : "drop-shadow-[0_0_4px_rgba(142,118,38,0.3)]"
          }`}
        >
          {/* Cork & Seal Cap */}
          <rect
            x="10"
            y="2"
            width="6"
            height="3.5"
            rx="1"
            className={theme === "dark" ? "fill-[#F3D36A]" : "fill-[#8E7626]"}
          />
          {/* Bottle Neck */}
          <path
            d="M10.5 5.5H15.5V11C15.5 13 22 14.5 22 19V36.5C22 39 19.5 40 13 40C6.5 40 4 39 4 36.5V19C4 14.5 10.5 13 10.5 11V5.5Z"
            className={`transition-colors duration-200 ${
              theme === "dark"
                ? isHovered
                  ? "stroke-[#F3D36A] fill-[#D4AF37]/20"
                  : "stroke-[#D4AF37] fill-[#D4AF37]/10"
                : isHovered
                ? "stroke-[#12110F] fill-[#12110F]/15"
                : "stroke-[#8E7626] fill-[#8E7626]/10"
            }`}
            strokeWidth="1.2"
          />
          {/* Center Label Emboss */}
          <rect
            x="7.5"
            y="20.5"
            width="11"
            height="11"
            rx="1"
            className={`transition-colors duration-200 ${
              theme === "dark"
                ? "stroke-[#F3D36A]/70 fill-[#F3D36A]/10"
                : "stroke-[#8E7626]/70 fill-[#8E7626]/10"
            }`}
            strokeWidth="0.8"
          />
          {/* Punt Base Line */}
          <path
            d="M8 38C10.5 37 15.5 37 18 38"
            className={theme === "dark" ? "stroke-[#F3D36A]/80" : "stroke-[#8E7626]/80"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}