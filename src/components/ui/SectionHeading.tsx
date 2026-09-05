import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12", alignments[align], className)}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.35em] text-gold-royal font-sans font-semibold mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-5xl text-ivory tracking-wide leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-champagne font-sans text-sm md:text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}