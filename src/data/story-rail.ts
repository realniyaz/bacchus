export interface RailBottleItem {
  id: string;
  num: string;
  name: string;
  sub: string;
  category: string;
  tagline: string;
  specs: {
    abv: string;
    proof: string;
    volume: string;
    cask: string;
  };
  notes: string[];
  bottleImg: string;
  accent: string;
  glow: string;
  link: string;
}

export const RAIL_BOTTLES: RailBottleItem[] = [
  {
    id: "crazy-boxer-whisky",
    num: "01",
    name: "CRAZY BOXER",
    sub: "Whisky • Built to Break the Rules",
    category: "Kinetic Spirit",
    tagline: "Knock out problems. Fight the life a champion. Straight-up character with knockout impact.",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      cask: "Charred Wood Impact",
    },
    notes: ["Toasted Sugar", "Unfiltered Oak", "Cheeky Warmth"],
    bottleImg: "/crazy-boxer/bottle-shot.png",
    accent: "#B51F24",
    glow: "rgba(181, 31, 36, 0.35)",
    link: "/kinetic-editions",
  },
  {
    id: "talsons-12",
    num: "02",
    name: "TALSONS' RESERVE",
    sub: "Double Wood Single Malt",
    category: "Master Flagship",
    tagline: "Twice matured in selected casks for twelve uninterrupted years in silence.",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      cask: "European & American Oak",
    },
    notes: ["Rich Oak", "Smooth Spice", "Lingering Finish"],
    bottleImg: "/talson/creatives/shot.png",
    accent: "#D4AF37",
    glow: "rgba(212, 175, 55, 0.32)",
    link: "/the-vault",
  },
  {
    id: "jackies-crown",
    num: "03",
    name: "JACKIE'S CROWN",
    sub: "Crafted Blended Whisky",
    category: "Lifestyle Expression",
    tagline: "Where tradition meets swagger. Light on the palate, full of conversation.",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      cask: "Selected Blended Oak",
    },
    notes: ["Golden Honey", "Toasted Oak", "Playful Spice"],
    bottleImg: "/jackie crown/bottle-shot.png",
    accent: "#F3D36A",
    glow: "rgba(243, 211, 106, 0.28)",
    link: "/brands/jackies-crown",
  },
  {
    id: "rozzita-vodka",
    num: "04",
    name: "ROZZITA VODKA",
    sub: "Artisanal Cold-Filtered",
    category: "Triple Distilled",
    tagline: "Pure crystal cut clarity. Four natural fruit and botanical infusions.",
    specs: {
      abv: "40.0% V/V",
      proof: "70° PROOF",
      volume: "750 ML",
      cask: "Sub-Zero Filtered",
    },
    notes: ["Glacial Clean", "Crisp Apple", "Velvet Cream"],
   bottleImg: "/rozzita/bottle-shot.png",
    accent: "#F4F0E6",
    glow: "rgba(244, 240, 230, 0.25)",
    link: "/brands/rozzita-vodka",
  },
  {
    id: "crazy-boxer-rum",
    num: "05",
    name: "CRAZY BOXER XXX",
    sub: "Deep Spiced Dark Rum",
    category: "Overproof Reserve",
    tagline: "Forged in aged molasses and charred staves against dark ocean tides.",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ML",
      cask: "Charred Molasses Cask",
    },
    notes: ["Dark Molasses", "Toasted Cassia", "Clove Warmth"],
    bottleImg: "/rum/bottle-shot.png",
    accent: "#8E7626",
    glow: "rgba(142, 118, 38, 0.35)",
    link: "/brands/crazy-boxer-rum",
  },
];