import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { BoardSection } from "@/components/ui/board-section";
import { DispensenSection } from "@/components/ui/dispensen-section";
import { MasterResultsSection } from "@/components/ui/master-results-section";
import { CalcolatoriSection } from "@/components/ui/calcolatori-section";
import { FreeAtBSection } from "@/components/ui/freeatb-section";
import { MarketplaceSection } from "@/components/ui/marketplace-section";
import { Footer } from "@/components/ui/footer";
import {
  AstraPaintingHeroPreview,
  AstraPaintingSplitPreview,
  AstraPaintingParallaxPreview,
} from "@/components/ui/astra-painting-previews";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <BoardSection />

      {/* Painting placement previews — temporary showcase */}
      <AstraPaintingHeroPreview />
      <AstraPaintingSplitPreview />
      <AstraPaintingParallaxPreview />

      <MasterResultsSection />
      <DispensenSection />
      <CalcolatoriSection />
      <MarketplaceSection />
      <FreeAtBSection />
      <Footer />
    </div>
  );
};

export default Index;
