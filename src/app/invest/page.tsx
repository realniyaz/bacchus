import ActivePortfolioMatrix from "@/components/sections/invest/ActivePortfolioMatrix";
import ImporterOperations from "@/components/sections/invest/ImporterOperations";
import InvestHero from "@/components/sections/invest/InvestHero";
import InvestmentModels from "@/components/sections/invest/InvestmentModals";

export default function InvestPage(){
    return (

        <main className="min-h-screen bg-[#050505]">
            <InvestHero/>
            <InvestmentModels/>
            <ActivePortfolioMatrix/>
            <ImporterOperations/>
            </main>

    );
}