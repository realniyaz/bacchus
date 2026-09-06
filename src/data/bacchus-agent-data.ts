export interface BrandBottleIntel {
  name: string;
  category: string;
  specs: string;
  character: string;
  tastingNotes: string[];
  serve: string;
}

export interface FAQItem {
  id: string;
  topic: string;
  question: string;
  answer: string;
  quickAction?: { label: string; href: string };
}

export const AGENT_BRAND_INTEL: Record<string, BrandBottleIntel> = {
  "talsons-12": {
    name: "Talsons' Reserve 12 Years",
    category: "Double Wood Matured Single Malt",
    specs: "42.8% V/V • 75° Proof • 750ml[cite: 1, 2]",
    character: "Patiently twice-matured across American & European oak casks since 1994[cite: 1, 2].",
    tastingNotes: ["Rich Oak[cite: 1, 2]", "Subtle Vanilla Pod[cite: 1]", "Warm Winter Spice[cite: 1]", "Velvety Lingering Warmth[cite: 1]"],
    serve: "Neat or on hand-carved rock ice; cornerstone for a Bacchus Old Fashioned[cite: 1].",
  },
  "jackies-crown": {
    name: "Jackie's Crown",
    category: "Blended Crafted Whisky[cite: 1, 3]",
    specs: "42.8% V/V • 750ml[cite: 1]",
    character: "Where tradition meets swagger. Light on the palate, heavy on conversation[cite: 1].",
    tastingNotes: ["Blossom Honey[cite: 1]", "Toasted Oak[cite: 1]", "Flicker of Spice[cite: 1]"],
    serve: "Crown Highball with sparkling soda, ice block, and lime twist[cite: 1].",
  },
  "crazy-boxer": {
    name: "Crazy Boxer Spirit & Rum",
    category: "Kinetic Punch Spirit & XXX Spiced Rum[cite: 1, 3]",
    specs: "42.8% V/V • High Proof[cite: 1, 3]",
    character: "Straight-up character with knockout impact. Built to break the rules[cite: 1, 3].",
    tastingNotes: ["Toasted Brown Sugar[cite: 1]", "Raw Charred Wood[cite: 1]", "Pungent Warm Spices[cite: 1]"],
    serve: "Ice-cold shot or cut through cloudy apple juice & ginger beer[cite: 1].",
  },
  "rozzita": {
    name: "Rozzita Vodkas",
    category: "Artisanal Cold-Filtered Spirit[cite: 1, 3]",
    specs: "40.0% V/V • Triple Distilled[cite: 1, 3]",
    character: "Pure crystal cut clarity crafted across 4 botanical fruit infusions[cite: 3].",
    tastingNotes: ["Glacial Crisp[cite: 1]", "Green Apple[cite: 1]", "Velvety Cream Texture[cite: 1]"],
    serve: "Sub-zero chilled neat or with clean botanical tonic.",
  },
};

export const AGENT_FAQ: FAQItem[] = [
  {
    id: "legacy",
    topic: "Heritage & Craft",
    question: "What is Bacchus Distillery's legacy?",
    answer:
      "Founded in Punjab (1992/1994) as one of India's pioneering private distilleries[cite: 1, 7]. Backed by over 32 years of distillation mastery, ISO 9001:2015, HACCP, and FSSAI standards[cite: 1, 7].",
    quickAction: { label: "Explore The Craft", href: "/the-craft" },
  },
  {
    id: "hmrc-export",
    topic: "Global Trade & Accreditations",
    question: "Are you licensed for export and Scotch bottling?",
    answer:
      "Yes. Bacchus is empanelled by HMRC (UK) for Scotch bottling in India, certified across Scotland/UK benchmarks, and licensed across 19+ countries in Asia, Europe, and Africa (FDA & NAFDAC approved)[cite: 1, 3, 4].",
    quickAction: { label: "View Global Reach", href: "/international-presence" },
  },
  {
    id: "b2b-models",
    topic: "Commercial Partnerships",
    question: "How can businesses partner with Bacchus?",
    answer:
      "We operate 3 primary pathways: 1) Global Brand Distribution, 2) Turnkey Private Labelling, and 3) Exclusive Statewise Brand Ownership in domestic India[cite: 1, 5].",
    quickAction: { label: "Commercial Models", href: "/our-business" },
  },
  {
    id: "hq-direct",
    topic: "Direct Headquarters",
    question: "Where is corporate HQ and who do I contact?",
    answer:
      "Corporate Office: B 28 Manaar Tower, Sector 132, Noida, UP[cite: 1, 8]. Executive Liaison Desk: md@bacchusspiritsglobal.com[cite: 1, 4, 8]. Operating hours: 9:00 AM – 5:00 PM IST[cite: 1, 4, 8].",
    quickAction: { label: "Contact Liaison", href: "/contact" },
  },
];