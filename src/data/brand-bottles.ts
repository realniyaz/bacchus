export interface BrandBottleStory {
  id: string;
  slug: string;
  name: string;
  subTitle: string;
  tagline: string;
  bannerAsset: string;
  storySetting: string;
  palette: {
    ambientGlow: string;
    accentBorder: string;
  };
  telemetry: {
    abv: string;
    proof?: string;
    volume: string;
    maturation?: string;
  };
}

export const BRAND_STORIES: BrandBottleStory[] = [
  {
    id: "talsons-12",
    slug: "talsons-reserve-12",
    name: "TALSONS’ RESERVE",
    subTitle: "Double Wood Matured Single Malt",
    tagline: "Twice Matured. A Higher Experience.",
    bannerAsset: "/editorial/banners/talsons-cathedral.webp",
    storySetting: "The Oak Cathedral — Punjab Distillation Cellars",
    palette: { ambientGlow: "rgba(200, 122, 30, 0.22)", accentBorder: "#D4AF37" },
    telemetry: { abv: "42.8% V/V", proof: "75° PROOF", volume: "750 ml", maturation: "12 Years Double Wood" }
  },
  {
    id: "jackies-crown",
    slug: "jackies-crown",
    name: "JACKIE’S CROWN",
    subTitle: "Blended Crafted Whisky",
    tagline: "Where Tradition Meets Swagger.",
    bannerAsset: "/editorial/banners/jackies-metropolis.webp",
    storySetting: "The Velvet Metropolis — Midnight City Silhouette",
    palette: { ambientGlow: "rgba(243, 211, 106, 0.2)", accentBorder: "#F3D36A" },
    telemetry: { abv: "42.8% V/V", volume: "750 ml", maturation: "Selected Blended Oak" }
  },
  {
    id: "crazy-boxer",
    slug: "crazy-boxer",
    name: "CRAZY BOXER",
    subTitle: "Straight-Up Punch Spirit",
    tagline: "Built to Break the Rules.",
    bannerAsset: "/editorial/banners/boxer-foundry.webp",
    storySetting: "The Industrial Foundry — Brutalist Crimson Embers",
    palette: { ambientGlow: "rgba(181, 31, 36, 0.25)", accentBorder: "#B51F24" },
    telemetry: { abv: "42.8% V/V", volume: "750 ml", maturation: "Charred Wood Impact" }
  },
  {
    id: "rozzita-vodka",
    slug: "rozzita-vodka",
    name: "ROZZITA VODKAS",
    subTitle: "Artisanal Triple Distilled",
    tagline: "Pure Crystal Cut.",
    bannerAsset: "/editorial/banners/rozzita-glacial.webp",
    storySetting: "The Glacial Fracture — Monolithic Ice Refractions",
    palette: { ambientGlow: "rgba(244, 240, 230, 0.18)", accentBorder: "#C3BDAF" },
    telemetry: { abv: "40.0% V/V", volume: "750 ml", maturation: "Triple Cold-Filtered" }
  },
  {
    id: "crazy-boxer-rum",
    slug: "crazy-boxer-rum",
    name: "CRAZY BOXER XXX RUM",
    subTitle: "Deep Spiced Dark Blend",
    tagline: "Overproof Reserve.",
    bannerAsset: "/editorial/banners/rum-cask-storm.webp",
    storySetting: "The Deep Cask Storm — Charred Molasses Staves",
    palette: { ambientGlow: "rgba(142, 118, 38, 0.25)", accentBorder: "#8E7626" },
    telemetry: { abv: "42.8% V/V", volume: "750 ml", maturation: "Aged Molasses & Spice" }
  }
];