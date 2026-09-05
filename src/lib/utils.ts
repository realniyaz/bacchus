import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes cleanly without conflicts, supporting dynamic conditionals,
 * custom luxury color tokens, and utility classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats sensory proof and ABV numbers into a standardized distillery string.
 */
export function formatSpiritTelemetry(abv: string, proof?: string): string {
  if (!proof) return abv;
  return `${abv} • ${proof}`;
}