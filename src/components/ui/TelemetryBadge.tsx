import React from "react";
import { cn } from "@/lib/utils";

interface TelemetryBadgeProps {
  label: string;
  value: string;
  className?: string;
}

export default function TelemetryBadge({
  label,
  value,
  className,
}: TelemetryBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col px-4 py-2 rounded-lg bg-surface-1/90 border border-gold-royal/20 text-center",
        className
      )}
    >
      <span className="text-[9px] uppercase tracking-[0.25em] text-stone font-sans">
        {label}
      </span>
      <span className="text-xs md:text-sm font-sans font-bold text-ivory tracking-wider mt-0.5">
        {value}
      </span>
    </div>
  );
}