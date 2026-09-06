import BrandHeroStage from "@/components/sections/brands/BrandHeroStage";
import BrandDeckModal from "@/components/sections/brands/BrandDeckModal";
import BottleStoryRail from "@/components/sections/brands/BottleStoryRail";
import InvestorContactBanner from "@/components/sections/brands/InvestorContactBanner";

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* 1. Cinematic 5-Banner Hero Showcase */}
      <BrandHeroStage />

      {/* 2. On-Screen Brand Deck & Popout Window Showcase */}
      <BrandDeckModal />

      {/* 3. Dark Aesthetic 5-Bottle Scrub Runway */}
      <BottleStoryRail />

      {/* 4. Light Aesthetic Closing: Investment & Contact Conversion */}
      <InvestorContactBanner />
    </main>
  );
}