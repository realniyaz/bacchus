export interface CocktailSuggestion {
  name: string;
  tagline: string;
  ingredients: string[];
  instructions?: string;
}

export interface ProductDetailPoint {
  id: string;
  title: string;
  tagline: string;
  description: string;
  position?: { x: number; y: number }; // For interactive hotspot positioning
}

export interface TastingNotes {
  aroma: string[];
  palate: string[];
  finish: string[];
  summary: string;
  radarScores?: {
    oak: number;
    spice: number;
    smoke: number;
    sweetness: number;
    warmth: number;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subName: string;
  edition?: string;
  brandTier: "flagship-luxury" | "lifestyle-swagger" | "kinetic-punch";
  accentColor: string;
  specs: {
    abv: string;
    proof?: string;
    volume: string;
    ageStatement?: string;
    maturation?: string;
    origin?: string;
  };
  designAndAttitude: string;
  tastingNotes: TastingNotes;
  howToEnjoy: string[];
  cocktailSuggestions: CocktailSuggestion[];
  perfectPairings: string[];
  whyItWorks?: string;
  editorialQuotes: {
    hero: string;
    statement: string;
  };
  assets: {
    bottleImage: string;
    canisterImage?: string;
    bannerImage?: string;
  };
}

export interface CraftPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}