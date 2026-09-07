export interface BrandHeroBanner {
  id: string;
  brand: string;
  category: string;
  headline: string;
  tagline: string;
  imageSrc: string;
  palette: {
    glow: string;
    accent: string;
  };
  telemetry: {
    left: { value: string; label: string };
    center: { value: string; label: string };
    right: { value: string; label: string };
  };
  link: string;
}

export const BRAND_BANNERS: BrandHeroBanner[] = [
  {
    id: "talsons-12",
    brand: "TALSONS’ RESERVE",
    category: "Single Malt • 12 Years",
    headline: "Twice Matured.",
    tagline: "A Higher Experience in Silence.",
    imageSrc: "/assets/b1.png",
    palette: { glow: "rgba(200,122,30,0.22)", accent: "#D4AF37" },
    telemetry: {
      left: { value: "12 YRS", label: "Double Wood" },
      center: { value: "42.8%", label: "75° Proof" },
      right: { value: "100%", label: "Malt Grain" },
    },
    link: "/brands#deck-modal",
  },
  {
    id: "jackies-crown",
    brand: "JACKIE’S CROWN",
    category: "Blended Malt Whisky",
    headline: "Tradition Meets",
    tagline: "Unapologetic Swagger.",
    imageSrc: "/assets/b2.png",
    palette: { glow: "rgba(243,211,106,0.20)", accent: "#F3D36A" },
    telemetry: {
      left: { value: "OAKED", label: "Selected Staves" },
      center: { value: "42.8%", label: "Blended V/V" },
      right: { value: "1780", label: "Heritage Code" },
    },
    link: "/brands#deck-modal",
  },
  {
    id: "rozzita-vodka",
    brand: "ROZZITA VODKAS",
    category: "Artisanal Cold-Filtered",
    headline: "Pure Crystal Cut.",
    tagline: "Glacial Clarity Across 4 Infusions.",
    imageSrc: "/assets/b3.png",
    palette: { glow: "rgba(195,189,175,0.20)", accent: "#F4F0E6" },
    telemetry: {
      left: { value: "3X", label: "Distilled" },
      center: { value: "40.0%", label: "Pure Neutral" },
      right: { value: "4 CUTS", label: "Natural Flavors" },
    },
    link: "/brands#deck-modal",
  },
  {
    id: "crazy-boxer-whisky",
    brand: "CRAZY BOXER",
    category: "Kinetic Punch Spirit",
    headline: "Knock Out Problems.",
    tagline: "Fight The Life A Champion.",
    imageSrc: "/assets/b4.png",
    palette: { glow: "rgba(181,31,36,0.28)", accent: "#B51F24" },
    telemetry: {
      left: { value: "75°", label: "High Proof" },
      center: { value: "42.8%", label: "V/V Strength" },
      right: { value: "BOLD", label: "Malt & Grain" },
    },
    link: "/brands#deck-modal",
  },
  {
    id: "crazy-boxer-rum",
    brand: "CRAZY BOXER XXX",
    category: "Deep Spiced Rum Reserve",
    headline: "The Cask Storm.",
    tagline: "Forged in Dark Cane & Charred Molasses.",
    imageSrc: "/assets/b5.png",
    palette: { glow: "rgba(142,118,38,0.25)", accent: "#8E7626" },
    telemetry: {
      left: { value: "XXX", label: "Dark Overproof" },
      center: { value: "42.8%", label: "Molasses Cut" },
      right: { value: "AGED", label: "Oak Spiced" },
    },
    link: "/brands#deck-modal",
  },
];