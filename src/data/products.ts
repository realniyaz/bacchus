import { Product } from "@/types/product";

export const PRODUCTS: Record<string, Product> = {
  "talsons-reserve-12": {
    id: "prod-talsons-12",
    slug: "talsons-reserve-12",
    name: "Talsons' Reserve",
    subName: "Double Wood Reserve Matured",
    edition: "Special Edition",
    brandTier: "flagship-luxury",
    accentColor: "var(--color-gold-royal)",
    specs: {
      abv: "42.8% V/V",
      proof: "75° PROOF",
      volume: "750 ml",
      ageStatement: "12 Years",
      maturation: "Twice Matured in Selected Casks",
      origin: "Distilled With Perfection — Since 1994",
    },
    designAndAttitude:
      "Our signature bottle design reflects the refined character of the spirits within. The elegant contours and premium glass showcase our commitment to excellence in every detail, from distillation to presentation.",
    tastingNotes: {
      summary:
        "Savor the rich amber hues and experience the perfect balance of smoky undertones with subtle notes of vanilla, caramel, and spice.",
      aroma: ["Rich Oak", "Deep Caramel", "Subtle Vanilla Pod"],
      palate: ["Toasted Oak", "Smooth Warm Spice", "Charred Cask Sweetness"],
      finish: ["Lingering Finish", "Distinctive & Bold", "Velvety Warmth"],
      radarScores: {
        oak: 92,
        spice: 78,
        smoke: 75,
        sweetness: 82,
        warmth: 88,
      },
    },
    howToEnjoy: [
      "Neat: Poured at room temperature to evaluate cask maturation",
      "On the Rocks: Poured over hand-carved clear ice to unlock hidden caramel layers",
      "Elevated Foundation: The cornerstone spirit for ultra-premium cocktail builds",
    ],
    cocktailSuggestions: [
      {
        name: "Bacchus Old Fashioned",
        tagline: "Our signature take on the timeless classic",
        ingredients: [
          "60ml Talsons' Reserve 12",
          "2 dashes Orange Bitters",
          "1 barspoon Artisanal Jaggery Syrup",
          "Torched Orange Peel & Maraschino Cherry",
        ],
        instructions:
          "Stir ingredients over rock ice for 45 seconds until chilled and silky. Strain over an ice sphere into a crystal rocks glass.",
      },
    ],
    perfectPairings: [
      "Sharp Aged Cheddar or Gouda (enhances the oak-aged character)",
      "Smoked Nuts (amplifies the whisky's subtle smokiness)",
      "Dark Cacao Truffles (complements the vanilla and caramel profile)",
    ],
    editorialQuotes: {
      hero: "More Than A Whisky — A Legacy In Every Drop",
      statement: "Tradition Distilled. Exceptionally Matured. Character Forever.",
    },
    assets: {
      bottleImage: "/products/talsons-bottle.webp",
      canisterImage: "/products/talsons-canister.webp",
      bannerImage: "/editorial/talsons-hero-banner.webp",
    },
  },

  "jackies-crown": {
    id: "prod-jackies-crown",
    slug: "jackies-crown",
    name: "Jackie's Crown",
    subName: "Blended Crafted Whisky",
    edition: "Signature Expression",
    brandTier: "lifestyle-swagger",
    accentColor: "var(--color-gold-bright)",
    specs: {
      abv: "42.8% V/V",
      volume: "750 ml",
      maturation: "Selected Blended Oak",
      origin: "Crafted for the Bold & Curious",
    },
    designAndAttitude:
      "Jackie’s Crown isn’t just a whisky — it’s a vibe. With its edgy bottle design and sleek curves, it’s made to stand out on the shelf and in your hand. Built for the bold, crafted for the curious — this is where tradition meets swagger.",
    tastingNotes: {
      summary:
        "A rich golden pour kicks things off, leading into smooth layers of toasted oak, a hint of honey, and a playful flicker of spice. Light on the palate but full of character — it’s whisky that keeps the conversation going.",
      aroma: ["Golden Blossom Honey", "Light Toasted Oak", "Fresh Citrus Zest"],
      palate: ["Creamy Honeyed Malt", "Playful Flicker of Spice", "Soft Grain Sweetness"],
      finish: ["Smooth", "Crisp & Clean", "Gentle Warming Spice"],
      radarScores: {
        oak: 65,
        spice: 68,
        smoke: 35,
        sweetness: 86,
        warmth: 72,
      },
    },
    howToEnjoy: [
      "Straight or On the Rocks: Clean, confident, classic",
      "With Cola or Ginger Ale: Easygoing mixers that let the flavor shine",
    ],
    cocktailSuggestions: [
      {
        name: "Crown Highball",
        tagline: "Fresh, fizzy, unforgettable",
        ingredients: [
          "50ml Jackie's Crown",
          "120ml Premium Soda Water",
          "Fresh Squeeze of Lime",
          "Block Ice & Fresh Mint Sprig",
        ],
        instructions:
          "Build directly into a chilled highball glass packed with ice cubes. Top with sparkling soda and stir once gently.",
      },
    ],
    perfectPairings: [
      "Grilled Wings or BBQ Sliders (for the chill nights)",
      "Salted Caramel Popcorn (sweet meets smoky — trust us)",
    ],
    editorialQuotes: {
      hero: "Where Tradition Meets Swagger",
      statement: "Light on the palate, heavy on character.",
    },
    assets: {
      bottleImage: "/products/jackies-crown-bottle.webp",
      bannerImage: "/editorial/jackies-crown-banner.webp",
    },
  },

  "crazy-boxer": {
    id: "prod-crazy-boxer",
    slug: "crazy-boxer",
    name: "Crazy Boxer",
    subName: "Straight-Up Punch Spirit",
    edition: "Kinetic Edition",
    brandTier: "kinetic-punch",
    accentColor: "var(--color-crimson)",
    specs: {
      abv: "42.8% V/V",
      volume: "750 ml",
      origin: "No Frills, Straight-Up Character",
    },
    designAndAttitude:
      "Crazy Boxer isn’t here to whisper — it hits loud and proud. With a vibrant label and a name that speaks for itself, this bottle was built to break the rules. No frills, no fuss — just straight-up spirit with knockout value.",
    tastingNotes: {
      summary:
        "Expect bold character with every pour. Smooth enough to sip, strong enough to mix — it brings notes of toasted sugar, oak, and a cheeky kick of warmth. It’s everything you want, nothing you don’t.",
      aroma: ["Toasted Brown Sugar", "Raw Cask Wood", "Pungent Warm Spices"],
      palate: ["Unfiltered Oak Punch", "Toasted Caramel", "Robust Grain Backbone"],
      finish: ["Cheeky Kick of Warmth", "Dry Oak Fade", "High-Energy Finish"],
      radarScores: {
        oak: 74,
        spice: 85,
        smoke: 50,
        sweetness: 60,
        warmth: 95,
      },
    },
    howToEnjoy: [
      "Straight Up Shot: Immediate impact, knockout punch",
      "High-Energy Mixer: Cuts effortlessly through cola, energy sodas, or cold brew",
    ],
    cocktailSuggestions: [
      {
        name: "Knockout Punch",
        tagline: "Built to break the rules",
        ingredients: [
          "60ml Crazy Boxer",
          "90ml Cloudy Apple Juice or Ginger Beer",
          "A dash of Angostura Bitters",
          "Fresh Lime Wedge",
        ],
        instructions:
          "Shake hard with ice and dump unstrained into a tumbler. Garnish with a burnt cinnamon stick or lime wheel.",
      },
    ],
    perfectPairings: [
      "Loaded Nachos with Jalapeños",
      "Spicy Smoked Ribs & Tangy Glazes",
    ],
    whyItWorks:
      "Because sometimes, you just want a good drink without breaking the bank. Crazy Boxer delivers the goods — every time.",
    editorialQuotes: {
      hero: "Built To Break The Rules",
      statement: "Hits loud and proud. Straight-up spirit with knockout value.",
    },
    assets: {
      bottleImage: "/products/crazy-boxer-bottle.webp",
      bannerImage: "/editorial/crazy-boxer-banner.webp",
    },
  },
};