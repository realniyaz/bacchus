import FooterContact from "@/components/layout/FooterContact";
import GlobalPresence from "@/components/sections/home/GlobalPresence";
import HeritageOverview from "@/components/sections/home/HeritageOverview";
import HeroCinematic from "@/components/sections/home/HeroCinematic";
import ProductGallery from "@/components/sections/home/ProductGallery";
// import JackiesCrownFeature from "@/components/sections/home/JackiesCrownFeature";
import TalsonsVideoFeature from "@/components/sections/home/TalsonsVideoFeature";
import BrandStrip from "@/components/ui/BrandStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian">
      <HeroCinematic />
      <BrandStrip/>
      <HeritageOverview/>
      <TalsonsVideoFeature/>
      {/* <JackiesCrownFeature/> */}
      <ProductGallery/>
      <GlobalPresence/>
      <FooterContact/>
    </main>
  );
}