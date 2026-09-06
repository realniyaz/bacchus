export interface BrandImage {
  src: string;
  caption: string;
}

export interface BrandDeckItem {
  id: string;
  name: string;
  sub: string;
  category: string;
  tagline: string;
  accent: string;
  glow: string;
  specs: {
    abv: string;
    proof: string;
    volume: string;
    maturation: string;
  };
  link: string;
  images: BrandImage[];
}

export const BRAND_DECKS: BrandDeckItem[] = [
  {
    id: "talson",
    name: "TALSONS’ RESERVE",
    sub: "Double Wood Matured Single Malt",
    category: "Master Flagship",
    tagline: "Twice matured in selected oak casks for twelve uninterrupted years in silence[cite: 1].",
    accent: "#D4AF37",
    glow: "rgba(212, 175, 55, 0.35)",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      maturation: "12 YRS DOUBLE WOOD",
    },
    link: "/the-vault",
    images: [
      { src: "/talson/creatives/productshot.png", caption: "The Cellar Cathedral — Cask Aging" },
      { src: "/talson/creatives/shot2.png", caption: "The Icon Plinth & Gold Foil Seal" },
      { src: "/talson/creatives/shot3.png", caption: "Double Wood Stave Extraction" },
      { src: "/talson/creatives/shot4.png", caption: "The Crystal Rocks Glass Pour" },
      { src: "/talson/creatives/shot5.png", caption: "Macro Inspection of Lion Crest Cap" },
    ],
  },
  {
    id: "jackies-crown",
    name: "JACKIE’S CROWN",
    sub: "Crafted Blended Malt Whisky",
    category: "Metropolis Line",
    tagline: "Where tradition meets swagger. Tailored for lively discourse and bolder nights[cite: 1].",
    accent: "#E5C158",
    glow: "rgba(229, 193, 88, 0.35)",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      maturation: "BLENDED OAK",
    },
    link: "/the-vault#jackies-crown",
    images: [
      { src: "/jackie crown/shot1.png", caption: "The Velvet Metropolis Twilight View" },
      { src: "/jackie crown/shot2.png", caption: "Highball Ritual with Citrus Ribbon" },
      { src: "/jackie crown/shot3.png", caption: "1780 Heritage Label Monogram" },
      { src: "/jackie crown/shot4.png", caption: "Smoked Crystal Penthouse Setting" },
      { src: "/jackie crown/shot5.png", caption: "Emerald Shoulder Embossing" },
    ],
  },
  {
    id: "crazy-boxer",
    name: "CRAZY BOXER",
    sub: "Kinetic Punch Spirit",
    category: "Disruption Line",
    tagline: "Knock out problems. Fight the life a champion. Straight-up character with knockout impact[cite: 1].",
    accent: "#B51F24",
    glow: "rgba(181, 31, 36, 0.4)",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      maturation: "CHARRED WOOD IMPACT",
    },
    link: "/kinetic-editions#crazy-boxer",
    images: [
      { src: "/crazy-boxer/shot1.png", caption: "The Industrial Foundry & Red Canister" },
      { src: "/crazy-boxer/shot2.png", caption: "Full Bottle & Gold Rimmed Glass" },
      { src: "/crazy-boxer/shot3.png", caption: "Crimson Ember Atmospheric Lighting" },
      { src: "/crazy-boxer/shot4.png", caption: "High-Contrast Boxer Crest Detail" },
      { src: "/crazy-boxer/shot5.png", caption: "Charred Wood Barrels Perspective" },
    ],
  },
  {
    id: "rozzita",
    name: "ROZZITA VODKAS",
    sub: "Artisanal Cold-Filtered Spirit",
    category: "Crystal Purity",
    tagline: "Pure crystal cut clarity. Crafted with uncompromising precision across four infusions.",
    accent: "#8BA3B0",
    glow: "rgba(139, 163, 176, 0.35)",
    specs: {
      abv: "40.0% V/V",
      proof: "70° PROOF",
      volume: "750 ML",
      maturation: "TRIPLE SUB-ZERO",
    },
    link: "/brands#rozzita-vodkas",
    images: [
      { src: "/rozzita/shot1.png", caption: "Glacial Fracture Monolithic Ice Blocks" },
      { src: "/rozzita/shot2.png", caption: "The 4 Botanical Infusion Bottles" },
      { src: "/rozzita/shot3.png", caption: "Sub-Zero Chilled Condensation Cut" },
      { src: "/rozzita/shot4.png", caption: "Fresh Fruit Harvest Harmony" },
      { src: "/rozzita/shot5.png", caption: "Weighted Crystal Punt Caustics" },
    ],
  },
  {
    id: "rum",
    name: "CRAZY BOXER XXX",
    sub: "Deep Spiced Dark Overproof Rum",
    category: "Overproof Reserve",
    tagline: "Forged in aged molasses and charred oak staves against dark ocean storm tides.",
    accent: "#C27D38",
    glow: "rgba(194, 125, 56, 0.4)",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      maturation: "MOLASSES CASK",
    },
    link: "/kinetic-editions#xxx-rum",
    images: [
      { src: "/rum/shot1.png", caption: "The Deep Cask Storm & Crashing Tides" },
      { src: "/rum/shot2.png", caption: "Warm Storm Lantern & Spices Plinth" },
      { src: "/rum/shot3.png", caption: "Aged Sugar Cane & Cinnamon Quills" },
      { src: "/rum/shot4.png", caption: "Deep Amber Liquid Refraction" },
      { src: "/rum/shot5.png", caption: "Triple X Seal Closure Detail" },
    ],
  },
];