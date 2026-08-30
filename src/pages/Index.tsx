import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { BoardSection } from "@/components/ui/board-section";
import { DispensenSection } from "@/components/ui/dispensen-section";
import { MasterResultsSection } from "@/components/ui/master-results-section";
import { CalcolatoriSection } from "@/components/ui/calcolatori-section";
import { FreeAtBSection } from "@/components/ui/freeatb-section";
import { MarketplaceSection } from "@/components/ui/marketplace-section";
import { BookFlowSection } from "@/components/ui/bookflow-section";
import { Footer } from "@/components/ui/footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="ASTRA Bocconi - Per Aspera, ad Astra"
        description="Associazione studentesca dell'Università Bocconi: dispense, guide, calcolatori accademici, rappresentanza e iniziative per gli studenti."
        path="/"
      />
      <Navigation />
      <HeroSection />
      <BoardSection />
      <MasterResultsSection />
      <DispensenSection />
      <CalcolatoriSection />
      <MarketplaceSection />
      <BookFlowSection />
      <FreeAtBSection />
      <Footer />
    </div>
  );
};

export default Index;
