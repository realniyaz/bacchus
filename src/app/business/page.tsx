import BusinessHero from "@/components/sections/business/BusinessHero";
import CommercialPillars from "@/components/sections/business/CommercialPillars";
import ManufacturingMatrix from "@/components/sections/business/ManufacturingMatrix";
import PartnerConciergeCTA from "@/components/sections/business/PartnerConciergeCTA";

export default function BusinessPage() {
  return (
  <main className="min-h-screen bg-[#050505]">

        <BusinessHero/>
        <CommercialPillars/>
        <ManufacturingMatrix/>
        <PartnerConciergeCTA/>
  </main>
  );  
}