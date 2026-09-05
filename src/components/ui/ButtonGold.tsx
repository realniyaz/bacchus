import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonGoldProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export default function ButtonGold({
  href,
  variant = "primary",
  children,
  className,
  ...props
}: ButtonGoldProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-sans font-semibold text-xs uppercase tracking-[0.22em] transition-all duration-300 overflow-hidden cursor-pointer";

  const variants = {
    primary:
      "bg-gold-royal text-obsidian hover:bg-gold-bright shadow-[0_0_20px_rgba(212,175,55,0.22)] hover:shadow-[0_0_35px_rgba(243,211,106,0.4)]",
    secondary:
      "bg-surface-2 text-ivory border border-gold-royal/30 hover:border-gold-royal hover:text-gold-bright",
    outline:
      "bg-transparent border border-gold-royal/40 text-gold-royal hover:bg-gold-royal hover:text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.12)]",
  };

  const combinedClasses = cn(baseClasses, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}