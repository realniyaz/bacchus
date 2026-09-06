import DistilleryOrigin from "../../components/sections/about/DistelleryOrigin";
import AboutHero from "../../components/sections/about/AboutHero";
import CraftPillarsGrid from "@/components/sections/about/CraftPillarsGrid";
import GlobalFootprint from "@/components/sections/about/GlobalFootprint";

export default function About() {
  return (
    <main className="min-h-screen bg-obsidian">
      <AboutHero/>
      <DistilleryOrigin/>
      <CraftPillarsGrid/>
      <GlobalFootprint/>
    </main>
  );
}