import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function GlassCard({
  children,
  className,
  interactive = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300",
        interactive &&
          "hover:border-gold-royal/40 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]",
        className
      )}
      {...props}
    >
      {/* Chamfered Top Light Edge */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-ivory/20 to-transparent" />
      {children}
    </div>
  );
}