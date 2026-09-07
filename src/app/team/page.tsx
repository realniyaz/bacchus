import CmdDossier from "@/components/sections/team/CmdDossier";
import TeamHero from "@/components/sections/team/TeamHero";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <TeamHero/>
      <CmdDossier/>
    </main>
  );
}